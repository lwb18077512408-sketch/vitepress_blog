function setCorsHeaders(req, res, allowedOrigin) {
  const requestOrigin = req.headers.origin;

  if (allowedOrigin && requestOrigin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  } else if (!allowedOrigin && requestOrigin) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readJsonBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  if (typeof body === "object") {
    return body;
  }

  return null;
}

function normalizeVisitorId(visitorId) {
  if (typeof visitorId !== "string") {
    return "";
  }

  const normalized = visitorId.trim();
  if (!normalized || normalized.length > 128) {
    return "";
  }

  return normalized;
}

async function runRedisCommand(restUrl, restToken, command) {
  const response = await fetch(restUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${restToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const data = await response.json();

  if (!response.ok || data?.error) {
    throw new Error(data?.error || `Redis command failed with status ${response.status}`);
  }

  return data.result;
}

async function updateUvStats(body) {
  const restUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  const keyPrefix = process.env.UV_KEY_PREFIX?.trim() || "bbgs";
  const visitorId = normalizeVisitorId(body.visitor_id);

  if (!restUrl || !restToken) {
    return { enabled: false, total: null, isNewVisitor: false, reason: "not-configured" };
  }

  if (!visitorId) {
    return { enabled: true, total: null, isNewVisitor: false, reason: "missing-visitor-id" };
  }

  const visitorSetKey = `${keyPrefix}:visitors:seen`;
  const uvTotalKey = `${keyPrefix}:stats:uv:total`;

  const addedCount = Number(
    await runRedisCommand(restUrl, restToken, ["SADD", visitorSetKey, visitorId]),
  );
  const isNewVisitor = addedCount === 1;

  const total = Number(
    isNewVisitor
      ? await runRedisCommand(restUrl, restToken, ["INCR", uvTotalKey])
      : await runRedisCommand(restUrl, restToken, ["GET", uvTotalKey]),
  );

  return {
    enabled: true,
    total: Number.isFinite(total) ? total : 0,
    isNewVisitor,
    reason: null,
  };
}

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN?.trim() || "";

  setCorsHeaders(req, res, allowedOrigin);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (allowedOrigin && req.headers.origin && req.headers.origin !== allowedOrigin) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  const token = process.env.GITHUB_PAT?.trim();
  const owner = process.env.PV_OWNER?.trim();
  const repo = process.env.PV_REPO?.trim();
  const issueNumber = Number(process.env.PV_ISSUE_NUMBER || "0");

  if (!token || !owner || !repo || !issueNumber) {
    return res.status(500).json({
      error: "Missing required server configuration",
      required: ["GITHUB_PAT", "PV_OWNER", "PV_REPO", "PV_ISSUE_NUMBER"],
    });
  }

  const body = readJsonBody(req.body);

  if (!body) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  let uvStats = { enabled: false, total: null, isNewVisitor: false, reason: "not-configured" };

  try {
    uvStats = await updateUvStats(body);
  } catch (uvError) {
    console.error("UV stats update failed:", uvError);
    uvStats = { enabled: false, total: null, isNewVisitor: false, reason: "redis-error" };
  }

  const eventType = body.event_type || "update-pv";

  if (eventType !== "update-pv") {
    return res.status(400).json({ error: "Unsupported event_type", uv: uvStats });
  }

  const payload = {
    event_type: "update-pv",
    client_payload: {
      owner,
      repo,
      issue_number: issueNumber,
      increment: 1,
    },
  };

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "vitepress-blog-pv-proxy",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(response.status).json({
      error: "GitHub dispatch failed",
      details: errorText,
      uv: uvStats,
    });
  }

  return res.status(200).json({ ok: true, pvDispatched: true, uv: uvStats });
}
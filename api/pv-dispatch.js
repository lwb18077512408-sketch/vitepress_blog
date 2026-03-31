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

  const eventType = body.event_type || "update-pv";

  if (eventType !== "update-pv") {
    return res.status(400).json({ error: "Unsupported event_type" });
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
    });
  }

  return res.status(202).json({ ok: true });
}
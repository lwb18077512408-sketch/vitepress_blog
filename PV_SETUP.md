# PV dispatch setup

This project supports two ways to trigger `repository_dispatch` for PV updates:

1. Recommended (secure): set `themeConfig.github.dispatchProxy` to your own server endpoint.
2. Fallback (test only): set `themeConfig.github.clientToken` and call GitHub API directly from browser.

## Current config fields

In `themeConfig.mjs`:

- `github.owner`: repository owner
- `github.repo`: repository name
- `github.pageViewsIssueId`: issue number storing `PV: <number>`
- `github.dispatchProxy`: optional URL for server-side forwarding
- `github.clientToken`: optional, local testing only

## Secure production flow

- Browser calls `dispatchProxy` with payload `{ event_type, client_payload }`.
- Your server endpoint adds PAT in header and forwards to:
  `POST https://api.github.com/repos/{owner}/{repo}/dispatches`
- GitHub Actions workflow updates the issue title.

## Verify

1. Open site and refresh once.
2. Check Actions workflow `Update PV from repository dispatch` is triggered.
3. Confirm issue title increments from `PV: N` to `PV: N+1`.
4. Redeploy and verify PV value does not reset.

## Vercel relay API for this repo

This repo already supports the secure relay mode through `themeConfig.github.dispatchProxy`.
The recommended production setup on Vercel is:

1. Deploy the current repo to Vercel.
2. Add these Environment Variables in Vercel Project Settings:
   - `GITHUB_PAT`: GitHub PAT with permission to trigger repository dispatch on this repo
   - `PV_OWNER`: `lwb18077512408-sketch`
   - `PV_REPO`: `vitepress_blog`
   - `PV_ISSUE_NUMBER`: `1`
   - `ALLOWED_ORIGIN`: `https://www.bbgs.xyz`
3. Set `themeConfig.github.dispatchProxy` to `/api/pv-dispatch` if the API is deployed in the same Vercel project.
4. Keep `themeConfig.github.clientToken` empty.

### What the relay does

- Browser sends a request to `/api/pv-dispatch`.
- Vercel function reads the PAT from server-side environment variables.
- Vercel forwards `repository_dispatch` to GitHub.
- GitHub Actions updates the issue title from `PV: N` to `PV: N+1`.

### Security notes

- Do not put PAT into `themeConfig.mjs`.
- `api/pv-dispatch.js` ignores client-supplied owner, repo, and issue number and uses server-side env only.
- Set `ALLOWED_ORIGIN` to your production domain to reduce abuse.

### Minimal front-end config

In `themeConfig.mjs`:

```js
github: {
  owner: "lwb18077512408-sketch",
  repo: "vitepress_blog",
  pageViewsIssueId: 1,
  dispatchProxy: "/api/pv-dispatch",
  clientToken: "",
}
```

## Optional cumulative UV support

If you also want real cumulative unique visitors, keep the current PV flow and add Upstash Redis for deduplication.

### Required extra services

- One Upstash Redis database

### Required extra Vercel environment variables

- `UPSTASH_REDIS_REST_URL`: REST URL from your Upstash Redis database
- `UPSTASH_REDIS_REST_TOKEN`: standard REST token from your Upstash Redis database

### Optional extra Vercel environment variables

- `UV_KEY_PREFIX`: Redis key prefix, default is `bbgs`

### How cumulative UV works in this repo

- Browser creates and stores a persistent `visitor_id` in `localStorage`.
- Browser sends `visitor_id` to `/api/pv-dispatch` together with the PV event.
- Vercel function adds the visitor id into a Redis set.
- If Redis reports the id is new, Vercel increments cumulative UV total.
- Vercel returns the latest UV total to the browser.
- PV still uses GitHub Actions and Issue title as before.

### Upstash setup steps

1. Create an Upstash account and open Redis.
2. Create one Redis database.
3. In the database page, copy:
   - REST URL
   - REST TOKEN
4. Add them into Vercel Project Settings -> Environment Variables.
5. Redeploy the Vercel project.
6. Redeploy the front-end project if needed.

### Verify cumulative UV

1. Open the blog in your normal browser profile and refresh once.
2. Confirm PV increments.
3. Confirm the `独立访客` number increases only on the first visit of a new browser profile.
4. Refresh again in the same browser profile and confirm UV does not increase.

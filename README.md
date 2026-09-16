# AI Lab

AI Lab is a Next.js workspace with Puter.com authentication and a server-side GitHub MCP proxy.

## Run

```bash
npm install
npm run dev
```

## Puter login

The app loads the official Puter JavaScript SDK from `https://js.puter.com/v2/` and provides a Puter sign-in button.

## GitHub MCP

Set `GITHUB_PERSONAL_ACCESS_TOKEN` in the deployment environment. The token is server-side only and is never committed to the repository.

Endpoint: `/api/github-mcp`

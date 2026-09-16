import { NextRequest } from "next/server";

const GITHUB_MCP_URL = "https://api.githubcopilot.com/mcp/";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function proxy(request: NextRequest) {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) return Response.json({ error: "GITHUB_PERSONAL_ACCESS_TOKEN is not configured" }, { status: 503 });

  const headers = new Headers({ Authorization: `Bearer ${token}` });
  for (const name of ["accept", "content-type", "mcp-session-id", "last-event-id", "mcp-protocol-version"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
  const upstream = await fetch(GITHUB_MCP_URL, { method: request.method, headers, body, cache: "no-store" });
  const responseHeaders = new Headers();
  for (const name of ["content-type", "cache-control", "mcp-session-id", "last-event-id", "www-authenticate"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
}

export const GET = proxy;
export const POST = proxy;
export const DELETE = proxy;
export const OPTIONS = () => new Response(null, { status: 204 });

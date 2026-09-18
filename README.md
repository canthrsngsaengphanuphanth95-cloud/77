# Xboss123

Grok Chat Assistant foundation.

## Architecture
UI → Orchestrator → TaskEngine → WorkerManager → ProviderRegistry → PuterBackend → Puter AI

## Run
Serve this directory with any static web server and open `index.html`.

## AI backend
Puter.js is loaded from the official CDN and the provider adapter calls `puter.ai.chat()`. No API key is hard-coded in this repository.

## Status
Foundation scaffold is active. The Grok UI archive has not yet been attached to this branch, so the current UI is a minimal working shell ready for UI replacement/integration.

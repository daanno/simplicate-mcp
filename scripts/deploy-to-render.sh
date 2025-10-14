#!/usr/bin/env bash
# Trigger a Render deploy using the Render API.
# Usage:
#   export RENDER_SERVICE_ID=svc_xxx
#   export RENDER_API_KEY=key_xxx
#   ./scripts/deploy-to-render.sh

set -euo pipefail

if [ -z "${RENDER_SERVICE_ID:-}" ] || [ -z "${RENDER_API_KEY:-}" ]; then
  echo "RENDER_SERVICE_ID and RENDER_API_KEY must be set in the environment"
  exit 2
fi

echo "Triggering deploy for service: ${RENDER_SERVICE_ID}"

resp=$(curl -s -w "\n%{http_code}" -X POST "https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys" \
  -H "Authorization: Bearer ${RENDER_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"clearCache":false}')

body=$(echo "$resp" | sed '$d')
code=$(echo "$resp" | tail -n1)

echo "HTTP status: $code"
echo "$body"

if [ "$code" != "201" ] && [ "$code" != "200" ]; then
  echo "Deploy trigger failed"
  exit 1
fi

echo "Deploy triggered successfully. Use the Render dashboard to watch build logs."

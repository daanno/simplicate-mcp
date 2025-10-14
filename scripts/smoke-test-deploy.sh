#!/usr/bin/env bash
# Simple smoke-tests for a deployed MCP server
# Usage:
#   ./scripts/smoke-test-deploy.sh https://your-deploy-url

set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 https://your-deploy-url"
  exit 2
fi

BASE="$1"

echo "Checking $BASE/health"
curl -s -D - "$BASE/health" || true
echo -e "\n\nChecking $BASE/tools"
curl -s -D - "$BASE/tools" || true
echo -e "\n\nCalling get_projects (POST /call)"
curl -s -D - -X POST "$BASE/call" -H "Content-Type: application/json" -d '{"name":"get_projects","arguments":{"limit":1}}' || true

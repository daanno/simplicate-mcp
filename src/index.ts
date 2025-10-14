#!/usr/bin/env node

import { SimplicateMCPServerFull } from './mcp/server-full.js';

async function main() {
  try {
    const server = new SimplicateMCPServerFull();
    await server.start();
  } catch (error) {
    console.error('Failed to start Simplicate MCP server:', error);
    process.exit(1);
  }
}

main();


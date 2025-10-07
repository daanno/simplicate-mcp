#!/usr/bin/env node

import { SimplicateMCPServer } from './mcp/server';

async function main() {
  try {
    const server = new SimplicateMCPServer();
    await server.start();
  } catch (error) {
    console.error('Failed to start Simplicate MCP server:', error);
    process.exit(1);
  }
}

main();


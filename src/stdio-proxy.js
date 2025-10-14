#!/usr/bin/env node
"use strict";

// Small stdio -> HTTP proxy for MCP transport
// Reads newline-delimited JSON messages from stdin, forwards them to a remote
// MCP HTTP endpoint, and writes the remote JSON response to stdout (newline-delimited).

const readline = require('readline');
const axios = require('axios');

const REMOTE_MCP_URL = process.env.REMOTE_MCP_URL || 'https://simplicate.onrender.com/mcp';
const API_KEY = process.env.SIMPLICATE_API_KEY || '';
const API_SECRET = process.env.SIMPLICATE_API_SECRET || '';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

function writeStdout(obj) {
  try {
    process.stdout.write(JSON.stringify(obj) + '\n');
  } catch (err) {
    // best-effort
    process.stderr.write('Failed to write stdout: ' + String(err) + '\n');
  }
}

async function forwardMessage(msg) {
  try {
    const resp = await axios.post(REMOTE_MCP_URL, msg, {
      headers: {
        'Content-Type': 'application/json',
        'Authentication-Key': API_KEY,
        'Authentication-Secret': API_SECRET,
      },
      timeout: 30000,
    });

    // forward response body back to stdout
    writeStdout(resp.data);
  } catch (err) {
    const errorObj = {
      error: true,
      message: err.message || 'Request failed',
      // include response data if available
      response: err.response ? { status: err.response.status, data: err.response.data } : undefined,
    };
    writeStdout(errorObj);
    process.stderr.write('Proxy error: ' + (err.stack || err.message) + '\n');
  }
}

rl.on('line', (line) => {
  if (!line || !line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch (err) {
    process.stderr.write('Invalid JSON input on stdin: ' + String(err) + '\n');
    writeStdout({ error: true, message: 'invalid_json', details: err.message });
    return;
  }

  // Forward asynchronously, but don't block reading next lines
  forwardMessage(msg);
});

rl.on('close', () => {
  process.stderr.write('Stdin closed, exiting proxy.\n');
  process.exit(0);
});

process.on('SIGINT', () => process.exit(0));

// small startup banner
process.stderr.write(`stdio-proxy starting, forwarding to ${REMOTE_MCP_URL}\n`);

module.exports = { REMOTE_MCP_URL };

#!/usr/bin/env node

/**
 * Simple test script to verify Simplicate API connection
 * Run with: node test-connection.js
 */

require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.SIMPLICATE_API_KEY;
const API_SECRET = process.env.SIMPLICATE_API_SECRET;
const BASE_URL = process.env.SIMPLICATE_API_BASE_URL;

console.log('🧪 Testing Simplicate MCP Server Connection\n');
console.log('📡 API Base URL:', BASE_URL);
console.log('🔑 API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : '❌ Missing');
console.log('🔐 API Secret:', API_SECRET ? `${API_SECRET.substring(0, 10)}...` : '❌ Missing');
console.log('');

if (!API_KEY || !API_SECRET || !BASE_URL) {
  console.error('❌ Missing configuration! Check your .env file.');
  process.exit(1);
}

async function testEndpoint(name, endpoint) {
  try {
    console.log(`Testing ${name}...`);
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authentication-Key': API_KEY,
        'Authentication-Secret': API_SECRET,
        'Content-Type': 'application/json',
      },
      params: { limit: 2 },
    });
    
    const count = response.data?.data?.length || 0;
    console.log(`  ✅ ${name}: Success (${count} records retrieved)`);
    return true;
  } catch (error) {
    if (error.response) {
      console.log(`  ❌ ${name}: Failed (${error.response.status} ${error.response.statusText})`);
      if (error.response.status === 401) {
        console.log(`     → Check your API credentials`);
      } else if (error.response.status === 404) {
        console.log(`     → Endpoint may not exist or no data available`);
      }
    } else {
      console.log(`  ❌ ${name}: Failed (${error.message})`);
    }
    return false;
  }
}

async function runTests() {
  console.log('🔍 Running API Connection Tests...\n');
  
  const tests = [
    ['Projects', '/projects/project'],
    ['Organizations', '/crm/organization'],
    ['Persons', '/crm/person'],
    ['Hours', '/hours/hours'],
    ['Invoices', '/invoices/invoice'],
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const [name, endpoint] of tests) {
    const result = await testEndpoint(name, endpoint);
    if (result) passed++;
    else failed++;
    console.log('');
  }
  
  console.log('═'.repeat(50));
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Your MCP server is ready to use.\n');
    console.log('Next steps:');
    console.log('  1. Add configuration to Claude Desktop');
    console.log('  2. Restart Claude Desktop');
    console.log('  3. Ask Claude: "Show me all projects from Simplicate"\n');
  } else if (passed > 0) {
    console.log('⚠️  Some tests passed, but others failed.');
    console.log('    Check your API credentials and permissions.\n');
  } else {
    console.log('❌ All tests failed. Please check:');
    console.log('   1. API credentials are correct');
    console.log('   2. API base URL is correct');
    console.log('   3. Network connection is working');
    console.log('   4. API key has necessary permissions\n');
    console.log('   Verify at: https://act.simplicate.com/settings/api\n');
  }
  
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('\n💥 Unexpected error:', error.message);
  process.exit(1);
});




#!/usr/bin/env node

/**
 * Comprehensive test of all Simplicate API endpoints
 * This will help identify which endpoints work in your Simplicate instance
 */

require('dotenv').config({ path: '.env' });
const axios = require('axios');

const API_KEY = process.env.SIMPLICATE_API_KEY;
const API_SECRET = process.env.SIMPLICATE_API_SECRET;
const BASE_URL = process.env.SIMPLICATE_API_BASE_URL;

const endpoints = {
  // Projects
  'Projects': '/projects/project',
  'Project Services': '/projects/service',
  'Project Tasks': '/projects/task',
  
  // CRM
  'Organizations': '/crm/organization',
  'Persons': '/crm/person',
  'Contracts': '/crm/contract',
  
  // Sales
  'Sales Quotes': '/sales/quote',
  'Sales': '/sales/sale',
  
  // Hours & Time
  'Hours': '/hours/hours',
  'Timesheets': '/hours/timesheet',
  
  // HRM
  'Employees': '/hrm/employee',
  'Leave (HRM)': '/hrm/leave',
  'Absences (HRM)': '/hrm/absence',
  'Timetable': '/hrm/timetable',
  
  // Invoices & Finance
  'Invoices': '/invoices/invoice',
  'Payments': '/invoices/payment',
  'Revenue': '/invoices/revenue',
  
  // Services
  'Services': '/services/service',
  'Default Services': '/services/defaultservice',
  
  // Costs
  'Costs': '/costs/cost',
  'Mileage': '/costs/mileage',
  
  // Documents
  'Documents': '/documents/document',
  
  // Custom Fields
  'Custom Fields': '/customfields/customfield',
};

const results = {
  working: [],
  notFound: [],
  badRequest: [],
  forbidden: [],
  other: []
};

async function testEndpoint(name, path) {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, {
      headers: {
        'Authentication-Key': API_KEY,
        'Authentication-Secret': API_SECRET,
        'Content-Type': 'application/json',
      },
      params: { limit: 1, offset: 0 },
      timeout: 5000
    });
    
    const count = response.data?.data?.length || 0;
    results.working.push({ name, path, count });
    return { status: 'success', count };
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const result = { name, path, status, message: error.response.statusText };
      
      if (status === 404) {
        results.notFound.push(result);
      } else if (status === 400) {
        results.badRequest.push(result);
      } else if (status === 403) {
        results.forbidden.push(result);
      } else {
        results.other.push(result);
      }
      
      return { status: 'error', code: status };
    } else {
      results.other.push({ name, path, error: error.message });
      return { status: 'error', message: error.message };
    }
  }
}

async function runTests() {
  console.log('🧪 Testing ALL Simplicate API Endpoints\n');
  console.log('📡 API Base URL:', BASE_URL);
  console.log('🔑 API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : '❌ Missing');
  console.log('');
  console.log('═'.repeat(70));
  console.log('');
  
  const total = Object.keys(endpoints).length;
  let current = 0;
  
  for (const [name, path] of Object.entries(endpoints)) {
    current++;
    process.stdout.write(`[${current}/${total}] Testing ${name.padEnd(25)}... `);
    
    const result = await testEndpoint(name, path);
    
    if (result.status === 'success') {
      console.log(`✅ OK (${result.count} records)`);
    } else if (result.code === 404) {
      console.log(`❌ Not Found (404)`);
    } else if (result.code === 400) {
      console.log(`⚠️  Bad Request (400)`);
    } else if (result.code === 403) {
      console.log(`🔒 Forbidden (403)`);
    } else {
      console.log(`❌ Error (${result.code || 'unknown'})`);
    }
  }
  
  console.log('');
  console.log('═'.repeat(70));
  console.log('\n📊 TEST RESULTS SUMMARY\n');
  
  console.log(`✅ Working Endpoints: ${results.working.length}/${total}`);
  if (results.working.length > 0) {
    console.log('   Available:');
    results.working.forEach(r => {
      console.log(`   • ${r.name.padEnd(25)} → ${r.path} (${r.count} records)`);
    });
  }
  
  console.log('');
  
  if (results.badRequest.length > 0) {
    console.log(`⚠️  Bad Request (400): ${results.badRequest.length}`);
    console.log('   These may need specific parameters or filtering:');
    results.badRequest.forEach(r => {
      console.log(`   • ${r.name.padEnd(25)} → ${r.path}`);
    });
    console.log('');
  }
  
  if (results.notFound.length > 0) {
    console.log(`❌ Not Available (404): ${results.notFound.length}`);
    console.log('   These endpoints don\'t exist in your Simplicate instance:');
    results.notFound.forEach(r => {
      console.log(`   • ${r.name.padEnd(25)} → ${r.path}`);
    });
    console.log('');
  }
  
  if (results.forbidden.length > 0) {
    console.log(`🔒 Forbidden (403): ${results.forbidden.length}`);
    console.log('   Your API key doesn\'t have permission for these:');
    results.forbidden.forEach(r => {
      console.log(`   • ${r.name.padEnd(25)} → ${r.path}`);
    });
    console.log('');
  }
  
  if (results.other.length > 0) {
    console.log(`❓ Other Errors: ${results.other.length}`);
    results.other.forEach(r => {
      console.log(`   • ${r.name} → ${r.error || r.message}`);
    });
    console.log('');
  }
  
  console.log('═'.repeat(70));
  console.log('');
  
  const successRate = ((results.working.length / total) * 100).toFixed(1);
  console.log(`🎯 Success Rate: ${successRate}% (${results.working.length}/${total} endpoints working)`);
  console.log('');
  
  if (results.working.length > 0) {
    console.log('✅ Your MCP server can use these working endpoints!');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Update the MCP server to only use working endpoints');
    console.log('   2. Add better error handling for unavailable endpoints');
    console.log('   3. Document which features are available');
  } else {
    console.log('❌ No endpoints are working. Check your API credentials and permissions.');
  }
  
  console.log('');
}

runTests().catch(error => {
  console.error('\n💥 Test failed:', error.message);
  process.exit(1);
});


# n8n Direct MCP Setup - No AI Agent Needed!

## 🚨 The Problem

When you use an **AI Agent** node and say "Show me absences from Simplicate", the AI doesn't understand the exact tool format and gives schema errors.

## ✅ The Solution: Use Direct MCP Node

Don't use AI Agent! Use the **MCP node directly**.

---

## 📋 Step-by-Step Setup

### Option 1: Direct MCP Tool Call (RECOMMENDED)

1. **Add a Manual Trigger Node** (or any trigger)
2. **Add an MCP Node** (search for "MCP" in nodes)
3. **Configure the MCP Node:**
   - **Credential:** Select "Simplicate" (your MCP server)
   - **Operation:** Select "Execute Tool" (or "Call Tool")
   - **Tool Name:** Type exactly: `get_absences`
   - **Tool Parameters/Arguments:** 
     ```json
     {
       "limit": 50,
       "offset": 0
     }
     ```
4. **Execute the node** ✅

---

## 🎯 Complete Working Examples

### Example 1: Get All Absences

**Node Configuration:**
```
Operation: Execute Tool
Tool Name: get_absences
Parameters: {
  "limit": 50,
  "offset": 0
}
```

### Example 2: Get All Employees

**Node Configuration:**
```
Operation: Execute Tool
Tool Name: get_employees
Parameters: {
  "limit": 100,
  "offset": 0
}
```

### Example 3: Get All Hours

**Node Configuration:**
```
Operation: Execute Tool
Tool Name: get_hours
Parameters: {
  "limit": 100,
  "offset": 0
}
```

### Example 4: Get All Projects

**Node Configuration:**
```
Operation: Execute Tool
Tool Name: get_projects
Parameters: {
  "limit": 50,
  "offset": 0
}
```

---

## 🔧 If You MUST Use AI Agent

If you want to use the AI Agent node, you need to be VERY specific:

### ❌ DON'T Say:
```
"Show me absences from Simplicate"
```

### ✅ DO Say:
```
Execute the Simplicate MCP tool named "get_absences" with these exact parameters:
{
  "limit": 50,
  "offset": 0
}

Return the raw results without any interpretation.
```

Or even better:

```
Call tool: get_absences
Parameters: {"limit": 50, "offset": 0}
```

---

## 📊 Complete Workflow Example

### Workflow: Get Dwayne's Absences

```
1. Manual Trigger
   └─> Click to start

2. MCP Node (Get Absences)
   ├─ Tool: get_absences
   └─ Params: {"limit": 100, "offset": 0}

3. Code Node (Filter for Dwayne)
   └─ Filter items where employee.name contains "Dwayne"

4. Send to Slack/Email/etc
   └─ Format and send results
```

**Code Node Example:**
```javascript
// Filter for Dwayne
const allAbsences = $input.all();
const dwayneAbsences = allAbsences.filter(item => {
  const name = item.json.employee?.name?.toLowerCase() || '';
  return name.includes('dwayne') || name.includes('paisley');
});

return dwayneAbsences;
```

---

## 🎯 All Available Tools (Copy-Paste Ready)

### HRM & Time Management
```json
{"name": "get_employees", "params": {"limit": 100}}
{"name": "get_absences", "params": {"limit": 50}}
{"name": "get_leave", "params": {"limit": 50}}
{"name": "get_hours", "params": {"limit": 100}}
{"name": "get_calendar_events", "params": {"limit": 50}}
```

### Projects & CRM
```json
{"name": "get_projects", "params": {"limit": 50}}
{"name": "get_organizations", "params": {"limit": 50}}
{"name": "get_persons", "params": {"limit": 50}}
```

### Finance
```json
{"name": "get_invoices", "params": {"limit": 50}}
{"name": "get_payments", "params": {"limit": 50}}
{"name": "get_quotes", "params": {"limit": 50}}
```

### Other
```json
{"name": "get_services", "params": {"limit": 50}}
{"name": "get_documents", "params": {"limit": 50}}
```

---

## 🧪 Quick Test

### Test 1: Basic Connection
1. Add Manual Trigger
2. Add MCP Node
   - Tool: `get_employees`
   - Params: `{"limit": 10, "offset": 0}`
3. Execute ✅

### Test 2: Get Your Data
1. Add Manual Trigger
2. Add MCP Node
   - Tool: `get_employee`
   - Params: `{"employee_id": "employee:3b70f4dd49fafb356d44e34a3f0f8c3d"}`
3. Execute ✅

---

## 💡 Pro Tips

1. **Don't use AI Agent for direct API calls** - Use MCP node directly
2. **Always specify limit & offset** - Prevents timeouts
3. **Use Code nodes for filtering** - Get all data, then filter
4. **Chain tools together** - Get employees → Get their hours → Analyze
5. **Save common queries as templates** - Reuse working patterns

---

## 🚨 Troubleshooting

### Error: "Input did not match expected schema"
**Problem:** Using natural language with AI Agent  
**Solution:** Use direct MCP node or be extremely specific

### Error: "Tool not found"
**Problem:** Wrong tool name  
**Solution:** Use exact names from list (see `MCP_TOOL_REFERENCE.md`)

### Error: "Bad request"
**Problem:** Missing required parameters  
**Solution:** Always include `limit` and `offset`

---

## 📚 More Information

- **All 63 Tools:** See `MCP_TOOL_REFERENCE.md`
- **API Status:** See `ENDPOINT_STATUS.md`
- **Quick Start:** See `N8N_QUICK_REFERENCE.md`

---

**Remember:** Skip the AI Agent, use the MCP node directly! 🎯


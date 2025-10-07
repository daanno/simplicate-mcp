# n8n MCP Simplicate - Quick Reference Guide

## 🚨 IMPORTANT: Exact Tool Names Required

In n8n, you **MUST** use the exact tool name and JSON parameters. Natural language won't work!

---

## ✅ Working Tools (Copy & Paste These)

### 1️⃣ Get Absences
```json
{
  "name": "get_absences",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 2️⃣ Get Employees
```json
{
  "name": "get_employees",
  "arguments": {
    "limit": 100,
    "offset": 0
  }
}
```

### 3️⃣ Get Hours
```json
{
  "name": "get_hours",
  "arguments": {
    "limit": 100,
    "offset": 0
  }
}
```

### 4️⃣ Get Leave (Vacation/Time Off)
```json
{
  "name": "get_leave",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 5️⃣ Get Projects
```json
{
  "name": "get_projects",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 6️⃣ Get Organizations
```json
{
  "name": "get_organizations",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 7️⃣ Get Persons (Contacts)
```json
{
  "name": "get_persons",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 8️⃣ Get Invoices
```json
{
  "name": "get_invoices",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 9️⃣ Get Sales Quotes
```json
{
  "name": "get_quotes",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 🔟 Get Timetable (Schedule)
```json
{
  "name": "get_calendar_events",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 1️⃣1️⃣ Get Services
```json
{
  "name": "get_services",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 1️⃣2️⃣ Get Documents
```json
{
  "name": "get_documents",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

### 1️⃣3️⃣ Get Payments
```json
{
  "name": "get_payments",
  "arguments": {
    "limit": 50,
    "offset": 0
  }
}
```

---

## 🎯 Get Specific Items by ID

### Get Specific Employee
```json
{
  "name": "get_employee",
  "arguments": {
    "employee_id": "employee:3b70f4dd49fafb356d44e34a3f0f8c3d"
  }
}
```

### Get Specific Project
```json
{
  "name": "get_project",
  "arguments": {
    "project_id": "project:xxxxx"
  }
}
```

### Get Specific Organization
```json
{
  "name": "get_organization",
  "arguments": {
    "organization_id": "organization:xxxxx"
  }
}
```

### Get Specific Invoice
```json
{
  "name": "get_invoice",
  "arguments": {
    "invoice_id": "invoice:xxxxx"
  }
}
```

---

## 🔧 How to Use in n8n

### Method 1: AI Agent Node (Recommended)
1. Add **AI Agent** node
2. Connect to **Simplicate MCP** tool
3. In the prompt, be VERY specific:
   ```
   Use the tool "get_absences" with arguments {"limit": 50, "offset": 0}
   ```

### Method 2: Direct MCP Tool Call
1. Add **MCP** node
2. Select **Simplicate** server
3. **Tool Name:** `get_absences` (exact, no quotes)
4. **Arguments:** 
   ```json
   {
     "limit": 50,
     "offset": 0
   }
   ```

---

## 🚨 Common Mistakes

### ❌ DON'T Say:
- "Show me absences from Simplicate"
- "Get absences"
- "List all employees"
- "Fetch hours"

### ✅ DO Say (in AI Agent):
```
Execute the tool "get_absences" with parameters:
{
  "limit": 50,
  "offset": 0
}
```

Or even better, use the direct MCP node with exact tool names!

---

## 📋 Complete Tool List

All 63+ tools are documented in `MCP_TOOL_REFERENCE.md`, but here are the most reliable ones:

| Tool Name | What It Gets | Status |
|-----------|-------------|--------|
| `get_employees` | All employees | ✅ Working |
| `get_absences` | Employee absences | ✅ Working |
| `get_leave` | Vacation/leave | ✅ Working |
| `get_hours` | Logged hours | ✅ Working |
| `get_calendar_events` | Schedules/timetable | ✅ Working |
| `get_projects` | All projects | ✅ Working |
| `get_organizations` | CRM organizations | ✅ Working |
| `get_persons` | CRM contacts | ✅ Working |
| `get_quotes` | Sales quotes | ✅ Working |
| `get_invoices` | Invoices | ✅ Working |
| `get_payments` | Invoice payments | ✅ Working |
| `get_services` | Services catalog | ✅ Working |
| `get_documents` | Documents | ✅ Working |

---

## 🧪 Test Your Setup

### In n8n Workflow:

1. **Add MCP node**
2. **Server:** Select "Simplicate"
3. **Tool:** `get_absences`
4. **Arguments:**
   ```json
   {
     "limit": 10,
     "offset": 0
   }
   ```
5. **Execute** ✅

---

## 💡 Pro Tips for n8n

1. **Always use exact tool names** - No natural language
2. **Always provide limit/offset** - Default is usually 10
3. **Use Code node for filtering** - Get all data, then filter in n8n
4. **Chain tools together** - Get employees → Filter → Get their hours

---

## 🎯 Example n8n Workflow: Get Dwayne's Absences

```
Step 1: Get All Absences
├─ MCP Node
├─ Tool: "get_absences"
└─ Args: {"limit": 100, "offset": 0}

Step 2: Filter for Dwayne
├─ Code Node
└─ Filter items where employee.name contains "Dwayne"

Step 3: Format Output
├─ Code Node
└─ Create readable list
```

---

## 📞 Need Help?

- **Full API Reference:** See `MCP_TOOL_REFERENCE.md`
- **Endpoint Status:** See `ENDPOINT_STATUS.md`
- **Test Commands:** Run `npm run test:all`

---

**Remember:** In n8n, the AI agent needs EXACT tool names, not natural language! 🎯


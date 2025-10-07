# n8n Visual Configuration Guide 📸

## 🎯 The Exact Setup You Need

---

## Screenshot 1: Your Current Setup (AI Agent - Causing Issues)

**What you have now:**
```
┌─────────────────────────────┐
│  AI Agent Node              │
│  ├─ Credential: Simplicate  │
│  ├─ Prompt: "Show me..."    │
│  └─ ❌ Schema Error          │
└─────────────────────────────┘
```

**The Problem:** AI Agent doesn't understand the exact tool format!

---

## Screenshot 2: What You SHOULD Use (Direct MCP)

**What you need:**
```
┌─────────────────────────────┐
│  MCP Node                   │
│  ├─ Credential: Simplicate  │
│  ├─ Operation: Execute Tool │
│  ├─ Tool Name: get_absences │
│  └─ Parameters:             │
│     {                       │
│       "limit": 50,          │
│       "offset": 0           │
│     }                       │
└─────────────────────────────┘
```

---

## 🔧 Exact Field Values

### Field 1: Credential
```
Value: Simplicate (or whatever you named your MCP connection)
```

### Field 2: Operation
```
Value: Execute Tool
(NOT "List Tools", NOT "Get Tool Info")
```

### Field 3: Tool Name
```
Value: get_absences
(exact text, no quotes, no extra spaces)
```

### Field 4: Tool Parameters (JSON)
```json
{
  "limit": 50,
  "offset": 0
}
```

---

## 📋 Copy-Paste Values for Different Queries

### Query 1: Get Absences
```
Tool Name: get_absences
Parameters: {"limit": 50, "offset": 0}
```

### Query 2: Get All Employees
```
Tool Name: get_employees
Parameters: {"limit": 100, "offset": 0}
```

### Query 3: Get Dwayne's Employee Info
```
Tool Name: get_employee
Parameters: {"employee_id": "employee:3b70f4dd49fafb356d44e34a3f0f8c3d"}
```

### Query 4: Get All Hours
```
Tool Name: get_hours
Parameters: {"limit": 100, "offset": 0}
```

### Query 5: Get All Projects
```
Tool Name: get_projects
Parameters: {"limit": 50, "offset": 0}
```

### Query 6: Get Leave Entries
```
Tool Name: get_leave
Parameters: {"limit": 50, "offset": 0}
```

### Query 7: Get Timetable/Schedule
```
Tool Name: get_calendar_events
Parameters: {"limit": 50, "offset": 0}
```

---

## 🎯 Complete Working Workflow

### Workflow: "Check Dwayne's Availability"

```
Step 1: Manual Trigger
├─ When: Manually or on schedule
└─ Output: Trigger signal

Step 2: Get Leave Entries
├─ Node Type: MCP
├─ Tool: get_leave
├─ Params: {"limit": 100, "offset": 0}
└─ Output: All leave entries

Step 3: Filter for Dwayne
├─ Node Type: Code
├─ Code: 
│   const leaves = $input.all();
│   return leaves.filter(item => 
│     item.json.employee?.name?.toLowerCase().includes('dwayne')
│   );
└─ Output: Only Dwayne's leave

Step 4: Get Absences
├─ Node Type: MCP
├─ Tool: get_absences
├─ Params: {"limit": 100, "offset": 0}
└─ Output: All absences

Step 5: Filter for Dwayne
├─ Node Type: Code
├─ Code: (same as step 3)
└─ Output: Only Dwayne's absences

Step 6: Get Hours
├─ Node Type: MCP
├─ Tool: get_hours
├─ Params: {"limit": 100, "offset": 0}
└─ Output: All hours

Step 7: Filter for Dwayne This Week
├─ Node Type: Code
├─ Code: 
│   const hours = $input.all();
│   const today = new Date();
│   const weekStart = new Date(today);
│   weekStart.setDate(today.getDate() - 7);
│   
│   return hours.filter(item => {
│     const name = item.json.employee?.name?.toLowerCase() || '';
│     const date = new Date(item.json.start_date);
│     return (name.includes('dwayne') || name.includes('paisley')) 
│            && date >= weekStart;
│   });
└─ Output: Dwayne's hours this week

Step 8: Merge Data
├─ Node Type: Merge
└─ Output: Combined availability report

Step 9: Send to Slack/Email
├─ Node Type: Slack/Email/etc
└─ Message: "Dwayne's availability report..."
```

---

## 🧪 Quick Test - 30 Seconds

1. **Delete your AI Agent node**
2. **Add new MCP node**
3. **Set these exact values:**
   - Credential: `Simplicate`
   - Operation: `Execute Tool`
   - Tool Name: `get_employees`
   - Parameters: `{"limit": 10, "offset": 0}`
4. **Click "Execute node"**
5. **See results!** ✅

---

## 💡 Why This Works

| Approach | Result |
|----------|--------|
| AI Agent + "Show me absences" | ❌ Schema error |
| AI Agent + Natural language | ❌ Misinterprets |
| **MCP Node + Exact tool name** | **✅ Works!** |
| **MCP Node + JSON params** | **✅ Works!** |

---

## 🚨 Common Mistakes

### Mistake 1: Using AI Agent
```
❌ AI Agent → "Show me absences"
✅ MCP Node → Tool: get_absences
```

### Mistake 2: Wrong operation
```
❌ Operation: List Tools
✅ Operation: Execute Tool
```

### Mistake 3: Adding quotes to tool name
```
❌ Tool Name: "get_absences"
✅ Tool Name: get_absences
```

### Mistake 4: Missing parameters
```
❌ No parameters
✅ Parameters: {"limit": 50, "offset": 0}
```

---

## 📞 Need Help?

If you're still getting errors:

1. **Check your MCP server is running**
   ```bash
   cd /Users/dwayne/Documents/Playground/Simplicate
   npm start
   ```

2. **Check your .env file exists**
   ```bash
   cat .env
   ```

3. **Test the API directly**
   ```bash
   npm run test:all
   ```

4. **Check n8n can see the tools**
   - Use "List Tools" operation first
   - Verify "get_absences" is in the list
   - Then switch to "Execute Tool"

---

## ✅ Success Checklist

- [ ] Using **MCP Node** (not AI Agent)
- [ ] Operation set to **"Execute Tool"**
- [ ] Tool name is **exact** (e.g., `get_absences`)
- [ ] Parameters are **valid JSON**
- [ ] MCP server is **running**
- [ ] Credentials are **configured in n8n**

---

**Once all checkboxes are ticked, it WILL work!** 🎉


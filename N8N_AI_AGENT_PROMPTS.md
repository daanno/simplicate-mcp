# How to Make AI Agent Work with Simplicate MCP

## 🎯 The Problem

When you say: **"Show me absences from Simplicate"**

The AI Agent doesn't know:
- What tool to call
- What parameters to use
- What format is expected

## ✅ The Solution: System Prompt

You need to **teach the AI Agent** how to use your tools with a **System Prompt**.

---

## 🔧 Step 1: Add System Prompt to AI Agent

In your AI Agent node, add this to the **System Prompt** field:

```
You are an assistant that helps retrieve data from Simplicate using MCP tools.

CRITICAL RULES:
1. Always use the EXACT tool names provided
2. Always include required parameters: limit and offset
3. Never try to interpret - just call the tool directly

AVAILABLE TOOLS AND THEIR EXACT FORMAT:

1. Get Absences:
   Tool: get_absences
   Parameters: {"limit": 50, "offset": 0}

2. Get Employees:
   Tool: get_employees
   Parameters: {"limit": 100, "offset": 0}

3. Get Hours:
   Tool: get_hours
   Parameters: {"limit": 100, "offset": 0}

4. Get Leave:
   Tool: get_leave
   Parameters: {"limit": 50, "offset": 0}

5. Get Projects:
   Tool: get_projects
   Parameters: {"limit": 50, "offset": 0}

6. Get Organizations:
   Tool: get_organizations
   Parameters: {"limit": 50, "offset": 0}

7. Get Persons:
   Tool: get_persons
   Parameters: {"limit": 50, "offset": 0}

8. Get Invoices:
   Tool: get_invoices
   Parameters: {"limit": 50, "offset": 0}

9. Get Quotes:
   Tool: get_quotes
   Parameters: {"limit": 50, "offset": 0}

10. Get Calendar/Timetable:
    Tool: get_calendar_events
    Parameters: {"limit": 50, "offset": 0}

11. Get Services:
    Tool: get_services
    Parameters: {"limit": 50, "offset": 0}

12. Get Documents:
    Tool: get_documents
    Parameters: {"limit": 50, "offset": 0}

13. Get Payments:
    Tool: get_payments
    Parameters: {"limit": 50, "offset": 0}

14. Get Specific Employee:
    Tool: get_employee
    Parameters: {"employee_id": "employee:ID_HERE"}

WHEN USER ASKS FOR DATA:
- Match their request to the appropriate tool
- Call the tool with the exact parameters shown
- Return the raw data without modification
- If filtering is needed, get all data first, then filter

EXAMPLES:
User: "Show me absences"
You: Call get_absences with {"limit": 50, "offset": 0}

User: "Get all employees"
You: Call get_employees with {"limit": 100, "offset": 0}

User: "Show Dwayne's hours"
You: Call get_hours with {"limit": 100, "offset": 0}, then filter for Dwayne

User: "List projects"
You: Call get_projects with {"limit": 50, "offset": 0}
```

---

## 🎯 Step 2: Better User Prompts

Instead of:
```
❌ "Show me absences from Simplicate"
```

Say:
```
✅ "Use get_absences to retrieve absence data"
```

Or even better:
```
✅ "Call the get_absences tool with limit 50"
```

---

## 📋 Complete AI Agent Configuration

### Configuration Tab:
```
Agent Type: Tools Agent
Model: gpt-4 or claude-3-sonnet (or whatever you use)
```

### System Prompt:
```
[Copy the system prompt from Step 1 above]
```

### Tools:
```
✅ Simplicate MCP Tools (enabled)
```

### User Message Examples:
```
✅ "Get absences using get_absences"
✅ "Retrieve employees with get_employees"
✅ "Fetch hours using get_hours"
✅ "Show projects via get_projects"
```

---

## 🎯 Alternative: Use Few-Shot Examples

Add this to your System Prompt for even better results:

```
EXAMPLE CONVERSATIONS:

Example 1:
User: Show me all absences
Assistant: I'll use the get_absences tool.
[Calls: get_absences with {"limit": 50, "offset": 0}]
Result: Retrieved 50 absence records

Example 2:
User: Get employee list
Assistant: I'll use the get_employees tool.
[Calls: get_employees with {"limit": 100, "offset": 0}]
Result: Retrieved 100 employee records

Example 3:
User: What hours did Dwayne log?
Assistant: I'll get all hours first, then filter for Dwayne.
[Calls: get_hours with {"limit": 100, "offset": 0}]
[Filters results for employee name containing "Dwayne"]
Result: Found X hours logged by Dwayne

Example 4:
User: Show me projects
Assistant: I'll use the get_projects tool.
[Calls: get_projects with {"limit": 50, "offset": 0}]
Result: Retrieved 50 project records
```

---

## 🧪 Complete Working System Prompt (Copy This!)

```
You are a Simplicate data assistant. Your job is to retrieve data from Simplicate using MCP tools.

TOOL CALLING RULES:
1. Use EXACT tool names (no variations)
2. Always include limit and offset parameters
3. Default limit: 50 for most tools, 100 for employees/hours
4. Default offset: 0
5. Never make up data - only return what the tools provide

AVAILABLE TOOLS:
- get_absences: Get employee absence records
- get_employees: Get all employees
- get_employee: Get specific employee (requires employee_id)
- get_hours: Get timesheet hours
- get_leave: Get leave/vacation records
- get_calendar_events: Get schedules/timetables
- get_projects: Get all projects
- get_project: Get specific project (requires project_id)
- get_organizations: Get CRM organizations
- get_persons: Get CRM contacts
- get_invoices: Get invoices
- get_quotes: Get sales quotes
- get_payments: Get payment records
- get_services: Get services catalog
- get_documents: Get documents

PARAMETER FORMAT:
All list tools: {"limit": NUMBER, "offset": NUMBER}
Specific item tools: {"[id_field]": "ID_VALUE"}

IMPORTANT NOTES:
- Dwayne's employee_id: employee:3b70f4dd49fafb356d44e34a3f0f8c3d
- To find specific people/projects: Get all, then filter
- Date filtering: Get all, then filter by date in results
- Always return the full data structure from the API

RESPONSE FORMAT:
1. Acknowledge what the user wants
2. State which tool you'll use
3. Call the tool with correct parameters
4. Present the results clearly
5. If filtering is needed, explain what you filtered

EXAMPLES:
User: "Show me absences"
Response: "I'll retrieve absence records using get_absences."
Action: Call get_absences with {"limit": 50, "offset": 0}

User: "Get all employees"
Response: "I'll fetch the employee list using get_employees."
Action: Call get_employees with {"limit": 100, "offset": 0}

User: "What hours did Dwayne log this week?"
Response: "I'll get recent hours and filter for Dwayne this week."
Action: Call get_hours with {"limit": 100, "offset": 0}, then filter

User: "Is Dwayne available next week?"
Response: "I'll check leave, absences, and timetable for Dwayne."
Actions:
1. Call get_leave with {"limit": 50, "offset": 0}
2. Call get_absences with {"limit": 50, "offset": 0}
3. Call get_calendar_events with {"limit": 50, "offset": 0}
4. Filter all results for Dwayne and next week's dates
```

---

## 🎯 Step 3: Test Your AI Agent

### Test 1: Simple Query
**User Message:** "Get absences"
**Expected Behavior:** AI calls `get_absences` with `{"limit": 50, "offset": 0}`

### Test 2: Specific Person
**User Message:** "Show me Dwayne's leave"
**Expected Behavior:** AI calls `get_leave`, then filters for Dwayne

### Test 3: Multiple Tools
**User Message:** "Check if Dwayne is available next week"
**Expected Behavior:** AI calls `get_leave`, `get_absences`, and `get_calendar_events`

---

## 🔧 Debugging AI Agent Issues

### Issue 1: "Input did not match expected schema"
**Cause:** AI is not using exact tool name or parameters
**Fix:** Add more explicit examples to system prompt

### Issue 2: AI says "I don't have access to that tool"
**Cause:** MCP connection not configured in AI Agent
**Fix:** Check that Simplicate MCP is enabled in the Tools section

### Issue 3: AI returns empty results
**Cause:** API returned data but AI didn't parse it correctly
**Fix:** Add instruction: "Always return the raw data from the tool"

---

## 📊 Comparison: Direct MCP vs AI Agent

| Aspect | Direct MCP Node | AI Agent with Prompt |
|--------|----------------|---------------------|
| Setup Complexity | ⭐ Simple | ⭐⭐⭐ Complex |
| Reliability | ⭐⭐⭐⭐⭐ 100% | ⭐⭐⭐ 80-90% |
| Flexibility | ⭐⭐ Fixed | ⭐⭐⭐⭐⭐ Very flexible |
| Natural Language | ❌ No | ✅ Yes |
| Speed | ⭐⭐⭐⭐⭐ Fast | ⭐⭐⭐ Slower (LLM call) |
| Cost | ⭐⭐⭐⭐⭐ Free | ⭐⭐⭐ Token costs |

**Recommendation:**
- **Simple workflows:** Use Direct MCP Node
- **Complex/conversational workflows:** Use AI Agent with proper prompt

---

## 🎯 Advanced: Chain of Thought Prompting

For complex queries, add this to your system prompt:

```
REASONING PROCESS:
1. Understand what the user wants
2. Identify which tool(s) are needed
3. Determine if filtering/processing is required
4. Call the tool(s) with correct parameters
5. Process the results if needed
6. Present clearly to the user

ALWAYS THINK STEP BY STEP:
- What data is needed?
- Which tool provides that data?
- What parameters are required?
- Do I need to call multiple tools?
- Do I need to filter or combine results?
```

---

## 💡 Pro Tips

### Tip 1: Pre-load Context
Add recent employee IDs to the system prompt:
```
KNOWN EMPLOYEES:
- Dwayne Paisley-Marshall: employee:3b70f4dd49fafb356d44e34a3f0f8c3d
- Robin van Polen: [add ID if needed]
```

### Tip 2: Add Common Queries
```
COMMON QUERIES AND SOLUTIONS:
- "Is [name] available?" → Check leave, absences, hours
- "What hours were logged?" → get_hours, filter by date range
- "Show me projects" → get_projects with limit 50
```

### Tip 3: Error Handling
```
IF A TOOL FAILS:
1. Try with different parameters (higher limit)
2. Try a related tool
3. Explain to the user what went wrong
```

---

## ✅ Final Checklist

- [ ] Added comprehensive system prompt
- [ ] Listed all available tools
- [ ] Included parameter formats
- [ ] Added examples for common queries
- [ ] Specified Dwayne's employee ID
- [ ] Enabled Simplicate MCP in tools
- [ ] Tested with simple query
- [ ] Tested with complex query

---

## 🎉 Result

With the proper system prompt, you can now say:

```
"Show me absences from Simplicate"
```

And the AI Agent will:
1. Understand you want absences
2. Know to use the `get_absences` tool
3. Call it with `{"limit": 50, "offset": 0}`
4. Return the results ✅

**The key is teaching the AI Agent the exact tool format through the system prompt!**


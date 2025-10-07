# How to Set Up AI Agent for Simplicate (Complete Guide)

## 🎯 Overview

You now have **TWO system prompts** to choose from:

1. **`MASTER_AI_AGENT_PROMPT.txt`** (5,000+ tokens)
   - 📚 Complete, comprehensive, educational
   - 🎓 Teaches AI everything about Simplicate
   - 🔍 Best for complex workflows and deep analysis
   - ⚡ Uses more tokens but gives best results

2. **`AI_AGENT_PROMPT_OPTIMIZED.txt`** (1,800 tokens)
   - ⚡ Fast, efficient, condensed
   - 🎯 All essential information
   - 💰 Token-efficient for high-volume usage
   - ✅ Best for simple, frequent queries

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Open Your n8n AI Agent Node

1. In your n8n workflow, click on the **AI Agent** node
2. Look for the **"System Prompt"** or **"System Message"** field

### Step 2: Copy the Prompt

**For best results (recommended):**
```bash
cat /Users/dwayne/Documents/Playground/Simplicate/MASTER_AI_AGENT_PROMPT.txt
```

**For token efficiency:**
```bash
cat /Users/dwayne/Documents/Playground/Simplicate/AI_AGENT_PROMPT_OPTIMIZED.txt
```

### Step 3: Paste Into n8n

1. **Copy the ENTIRE contents** of one of the files above
2. **Paste into the System Prompt field** in your AI Agent node
3. **Save the node**

### Step 4: Enable Simplicate Tools

1. In the AI Agent node, find the **"Tools"** section
2. Make sure **"Simplicate MCP"** is **enabled/checked** ✅
3. Save

### Step 5: Test It!

Try these queries:

```
✅ "Show me all employees from Simplicate"
✅ "Is Dwayne available next week?"
✅ "Get absences from Simplicate"
✅ "What hours were logged this month?"
✅ "Show me all projects"
```

---

## 📊 Comparison: Which Prompt Should You Use?

| Feature | MASTER (Full) | OPTIMIZED (Condensed) |
|---------|---------------|----------------------|
| **Size** | ~5,000 tokens | ~1,800 tokens |
| **Detail** | ⭐⭐⭐⭐⭐ Comprehensive | ⭐⭐⭐ Essential |
| **Examples** | ⭐⭐⭐⭐⭐ Many | ⭐⭐⭐ Key ones |
| **Intelligence** | ⭐⭐⭐⭐⭐ Very smart | ⭐⭐⭐⭐ Smart |
| **Token Cost** | Higher | Lower |
| **Best For** | Complex analysis | Simple queries |
| **Reliability** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Very good |

**Recommendation:**
- **Start with MASTER** → See how it performs
- **Switch to OPTIMIZED** → If you need to reduce token costs

---

## 🎯 What The Prompt Does

The system prompt teaches the AI Agent:

### 1. **All 60+ Tools Available**
```
✅ get_employees, get_absences, get_leave, get_hours
✅ get_projects, get_tasks, get_organizations, get_persons
✅ get_invoices, get_payments, get_quotes, get_services
✅ create_hours, create_leave, create_project, create_invoice
✅ And 40+ more...
```

### 2. **Exact Parameter Formats**
```json
{
  "limit": 50,
  "offset": 0
}
```

### 3. **Known People & IDs**
```
Dwayne: employee:3b70f4dd49fafb356d44e34a3f0f8c3d
```

### 4. **Query Intelligence**
```
"Is Dwayne available?" 
→ Check leave + absences + timetable + hours
→ Filter for Dwayne + date range
→ Synthesize availability report
```

### 5. **Multi-Step Reasoning**
```
"How's project X doing?"
→ Get project details
→ Get hours logged
→ Get costs
→ Get tasks
→ Calculate budget vs actual
→ Report status
```

---

## 🧪 Test Scenarios

### Test 1: Simple List Query
**User:** "Show me all employees"
**Expected:** AI calls `get_employees` with `{"limit": 100, "offset": 0}`, returns employee list

### Test 2: Availability Check (Complex)
**User:** "Is Dwayne available next week?"
**Expected:** AI calls multiple tools (leave, absences, timetable), filters for Dwayne and next week, synthesizes answer

### Test 3: Project Analysis (Very Complex)
**User:** "How's the Meta API project doing?"
**Expected:** AI finds project, gets hours/costs/tasks, calculates progress, provides comprehensive status

### Test 4: Financial Query
**User:** "What invoices are overdue?"
**Expected:** AI gets invoices, filters for due_date < today, lists overdue amounts

### Test 5: Time Tracking
**User:** "How many hours did Dwayne log this month?"
**Expected:** AI gets hours, filters for Dwayne + this month, sums total

---

## 🎓 Example Conversations After Setup

### Example 1: Basic Query
```
User: Show me absences from Simplicate

AI: I'll retrieve the absence records for you.
[Calls: get_absences with {"limit": 50, "offset": 0}]
AI: I found 50 absence records. Here are the recent ones:
1. Robin van Polen - 2021-11-04 - 0.5 hours
2. Robin van Polen - 2021-11-15 to 2021-11-16 - 16 hours
[etc]
```

### Example 2: Smart Query
```
User: Is Dwayne free next week?

AI: Let me check Dwayne's availability for next week (Oct 14-20, 2025).
[Calls: get_leave, get_absences, get_calendar_events, get_hours]
AI: Based on Dwayne's schedule:
✅ No planned leave or vacation
✅ No absences scheduled  
✅ Regular working hours: Mon-Fri 9am-5pm
📊 Recent activity: Logged 40 hours last week
Yes, Dwayne is available next week!
```

### Example 3: Complex Analysis
```
User: How much have we spent on the Meta API project?

AI: I'll analyze the Meta API project financials.
[Calls: get_projects to find it, get_hours for time costs, get_costs for expenses]
AI: Here's the financial summary for Meta API Explorer:
💰 Budget: $10,000
⏱️ Hours logged: 45.5 hours × $100/hr = $4,550
💵 Direct costs: $850
📊 Total spent: $5,400 (54% of budget)
💡 Remaining: $4,600
The project is on track and under budget!
```

---

## 🔧 Troubleshooting

### Issue 1: "Input did not match expected schema"
**Cause:** AI still doesn't understand tool format
**Fix:** 
1. Make sure you copied the ENTIRE prompt
2. Check that Simplicate MCP tools are enabled
3. Try the MASTER prompt (more explicit)

### Issue 2: AI says "I don't have access to that tool"
**Cause:** MCP tools not enabled
**Fix:** In AI Agent node → Tools section → Enable "Simplicate MCP"

### Issue 3: AI returns empty/wrong data
**Cause:** AI called wrong tool or with wrong parameters
**Fix:** 
1. Check the prompt is pasted correctly
2. Try being more specific in your query
3. Use optimized prompt for simpler queries

### Issue 4: Slow responses
**Cause:** MASTER prompt uses many tokens
**Fix:** Switch to OPTIMIZED prompt for faster responses

---

## 💡 Pro Tips

### Tip 1: Reference Dwayne by Name
```
✅ "Is Dwayne available?"
✅ "Show Dwayne's hours"
✅ "What's Dwayne working on?"
```
The AI knows Dwayne's ID automatically!

### Tip 2: Use Natural Language
```
✅ "Who's on vacation next week?"
✅ "What projects are we working on?"
✅ "How much did we bill this month?"
```

### Tip 3: Ask Complex Questions
```
✅ "Compare project A and project B hours and costs"
✅ "Who are our top 5 clients by revenue?"
✅ "Show me team utilization this month"
```

### Tip 4: Chain Questions
```
1. "Show me all projects"
2. "How many hours on the Meta project?"
3. "Who worked on that?"
4. "What did they log?"
```

---

## 📚 Additional Resources

- **`MCP_TOOL_REFERENCE.md`** - Complete tool documentation (753 lines)
- **`ENDPOINT_STATUS.md`** - Which endpoints work reliably
- **`N8N_DIRECT_SETUP.md`** - How to use direct MCP nodes (no AI)
- **`N8N_QUICK_REFERENCE.md`** - Quick tool name reference

---

## ✅ Setup Checklist

- [ ] Opened AI Agent node in n8n
- [ ] Copied MASTER or OPTIMIZED prompt
- [ ] Pasted entire prompt into System Prompt field
- [ ] Enabled Simplicate MCP in Tools section
- [ ] Saved the node
- [ ] Tested with "Show me all employees"
- [ ] Tested with "Is Dwayne available next week?"
- [ ] Verified results are correct

---

## 🎉 You're Done!

Your AI Agent now has **complete intelligence** about Simplicate and can:

✅ Understand natural language queries  
✅ Know all 60+ available tools  
✅ Use correct parameters automatically  
✅ Handle complex multi-step queries  
✅ Filter and analyze data intelligently  
✅ Provide helpful, conversational responses  

**Just start asking questions!** 🚀

---

## 🔄 Next Steps

1. **Test different queries** to see what it can do
2. **Build workflows** that automate your Simplicate tasks
3. **Share with your team** so they can use it too
4. **Customize the prompt** with your specific business rules
5. **Add more known entities** (project IDs, client IDs, etc.)

---

**Questions?** Check the docs or test with simple queries first! 💪


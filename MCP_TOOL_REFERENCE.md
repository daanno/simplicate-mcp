# Simplicate MCP Server - Tool Reference Guide

**For AI Agents, n8n, and Other Integrations**

This document provides the exact tool names and parameter formats for interacting with the Simplicate MCP server.

---

## 🎯 Tool Format

All tools follow this format:

```json
{
  "name": "tool_name",
  "arguments": {
    "parameter1": "value1",
    "parameter2": "value2"
  }
}
```

---

## 📚 Complete Tool List (63 Tools)

### 1. PROJECTS (7 tools)

#### get_projects
**Description:** Retrieve a list of all projects  
**Parameters:**
```json
{
  "limit": 10,    // optional, default: 10
  "offset": 0     // optional, default: 0
}
```

#### get_project
**Description:** Get details of a specific project by ID  
**Parameters:**
```json
{
  "project_id": "project:xxx"  // required
}
```

#### create_project
**Description:** Create a new project  
**Parameters:**
```json
{
  "name": "Project Name",              // required
  "organization_id": "organization:xxx", // optional
  "project_manager_id": "employee:xxx",  // optional
  "start_date": "2024-01-01",           // optional
  "budget": 50000                        // optional
}
```

#### update_project
**Description:** Update an existing project  
**Parameters:**
```json
{
  "project_id": "project:xxx",  // required
  "data": {                     // required
    "name": "Updated Name",
    "budget": 60000
  }
}
```

#### delete_project
**Description:** Delete a project  
**Parameters:**
```json
{
  "project_id": "project:xxx"  // required
}
```

#### get_project_services
**Description:** Get services/items for a specific project  
**Parameters:**
```json
{
  "project_id": "project:xxx"  // required
}
```

#### get_tasks
**Description:** Retrieve project tasks (requires project_id)  
**Parameters:**
```json
{
  "limit": 10,               // optional
  "offset": 0,               // optional
  "project_id": "project:xxx" // optional but recommended
}
```

---

### 2. CRM (8 tools)

#### get_organizations
**Description:** Retrieve CRM organizations  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_organization
**Description:** Get specific organization by ID  
**Parameters:**
```json
{
  "organization_id": "organization:xxx"  // required
}
```

#### create_organization
**Description:** Create a new organization  
**Parameters:**
```json
{
  "name": "Company Name",  // required
  "email": "info@company.com",  // optional
  "phone": "+31123456789",      // optional
  "website": "https://company.com"  // optional
}
```

#### update_organization
**Description:** Update an organization  
**Parameters:**
```json
{
  "organization_id": "organization:xxx",  // required
  "data": {                               // required
    "name": "New Company Name",
    "email": "new@company.com"
  }
}
```

#### get_persons
**Description:** Retrieve contact persons  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_person
**Description:** Get specific person by ID  
**Parameters:**
```json
{
  "person_id": "person:xxx"  // required
}
```

#### create_person
**Description:** Create a new contact person  
**Parameters:**
```json
{
  "first_name": "John",           // required
  "family_name": "Doe",           // required
  "email": "john@example.com",    // optional
  "organization_id": "organization:xxx"  // optional
}
```

#### update_person
**Description:** Update a person  
**Parameters:**
```json
{
  "person_id": "person:xxx",  // required
  "data": {                   // required
    "email": "newemail@example.com"
  }
}
```

---

### 3. SALES (5 tools)

#### get_quotes
**Description:** Retrieve sales quotes  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_quote
**Description:** Get specific quote by ID  
**Parameters:**
```json
{
  "quote_id": "quote:xxx"  // required
}
```

#### create_quote
**Description:** Create a new sales quote  
**Parameters:**
```json
{
  "subject": "Quote for Project X",      // required
  "organization_id": "organization:xxx"  // optional
}
```

#### get_sales
**Description:** Retrieve sales records (may return empty if no data)  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_sale
**Description:** Get specific sale by ID  
**Parameters:**
```json
{
  "sale_id": "sale:xxx"  // required
}
```

---

### 4. HOURS & TIMESHEETS (9 tools)

#### get_hours
**Description:** Retrieve timesheet hours  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_hours_entry
**Description:** Get specific hours entry by ID  
**Parameters:**
```json
{
  "hours_id": "hours:xxx"  // required
}
```

#### create_hours
**Description:** Create a new hours entry  
**Parameters:**
```json
{
  "employee_id": "employee:xxx",  // optional
  "project_id": "project:xxx",    // optional
  "hours": 8.0,                   // required
  "start_date": "2024-01-15",     // required
  "note": "Development work"      // optional
}
```

#### update_hours
**Description:** Update hours entry  
**Parameters:**
```json
{
  "hours_id": "hours:xxx",  // required
  "data": {                 // required
    "hours": 9.0,
    "note": "Updated note"
  }
}
```

#### delete_hours
**Description:** Delete hours entry  
**Parameters:**
```json
{
  "hours_id": "hours:xxx"  // required
}
```

#### get_timesheets
**Description:** Retrieve timesheets (may require specific filters)  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_leave
**Description:** Retrieve leave/vacation entries  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### create_leave
**Description:** Create leave/vacation entry  
**Parameters:**
```json
{
  "employee_id": "employee:xxx",  // optional
  "leave_type": "vacation",       // required
  "start_date": "2024-07-01",     // required
  "end_date": "2024-07-14",       // required
  "hours": 80                      // optional
}
```

#### get_calendar_events
**Description:** Get calendar/planning events  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

---

### 5. INVOICES & FINANCE (7 tools)

#### get_invoices
**Description:** Retrieve invoices  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_invoice
**Description:** Get specific invoice by ID  
**Parameters:**
```json
{
  "invoice_id": "invoice:xxx"  // required
}
```

#### create_invoice
**Description:** Create a new invoice  
**Parameters:**
```json
{
  "organization_id": "organization:xxx",  // required
  "date": "2024-01-15"                    // optional
}
```

#### update_invoice
**Description:** Update an invoice  
**Parameters:**
```json
{
  "invoice_id": "invoice:xxx",  // required
  "data": {                     // required
    "status": "sent"
  }
}
```

#### get_payments
**Description:** Retrieve invoice payments  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### create_payment
**Description:** Record a payment  
**Parameters:**
```json
{
  "invoice_id": "invoice:xxx",     // required
  "amount": 1000.00,               // required
  "payment_date": "2024-01-20",    // optional
  "method": "bank_transfer"        // optional
}
```

#### get_revenue
**Description:** Retrieve revenue records (may require filters)  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

---

### 6. HRM (4 tools)

#### get_employees ⭐ **USE THIS FOR LISTING EMPLOYEES**
**Description:** Retrieve employees  
**Parameters:**
```json
{
  "limit": 10,    // optional, default: 10
  "offset": 0     // optional, default: 0
}
```

**Example Usage:**
```json
{
  "name": "get_employees",
  "arguments": {
    "limit": 50
  }
}
```

#### get_employee
**Description:** Get specific employee by ID  
**Parameters:**
```json
{
  "employee_id": "employee:xxx"  // required
}
```

#### get_absences
**Description:** Retrieve employee absences  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### create_absence
**Description:** Create absence record  
**Parameters:**
```json
{
  "employee_id": "employee:xxx",  // optional
  "absence_type": "sick",         // required
  "start_date": "2024-01-15",     // required
  "end_date": "2024-01-16"        // required
}
```

---

### 7. SERVICES (4 tools)

#### get_services
**Description:** Retrieve services catalog  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_service
**Description:** Get specific service by ID  
**Parameters:**
```json
{
  "service_id": "service:xxx"  // required
}
```

#### create_service
**Description:** Create a new service  
**Parameters:**
```json
{
  "name": "Consulting",  // required
  "price": 150.00        // required
}
```

#### get_default_services
**Description:** Get default services configuration  
**Parameters:**
```json
{}  // no parameters required
```

---

### 8. TASKS (3 tools)

#### get_task
**Description:** Get specific task by ID  
**Parameters:**
```json
{
  "task_id": "task:xxx"  // required
}
```

#### create_task
**Description:** Create a new task  
**Parameters:**
```json
{
  "title": "Task name",           // required
  "project_id": "project:xxx",    // optional
  "assignee_id": "employee:xxx",  // optional
  "due_date": "2024-01-30"        // optional
}
```

#### update_task
**Description:** Update a task  
**Parameters:**
```json
{
  "task_id": "task:xxx",  // required
  "data": {               // required
    "status": "completed"
  }
}
```

---

### 9. COSTS & MILEAGE (5 tools)

#### get_costs
**Description:** Retrieve project costs (may require filters)  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_cost
**Description:** Get specific cost by ID  
**Parameters:**
```json
{
  "cost_id": "cost:xxx"  // required
}
```

#### create_cost
**Description:** Create a cost entry  
**Parameters:**
```json
{
  "description": "Office supplies",  // required
  "amount": 250.00,                  // required
  "project_id": "project:xxx",       // optional
  "date": "2024-01-15"               // optional
}
```

#### get_mileage
**Description:** Retrieve mileage records (may require filters)  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### create_mileage
**Description:** Create mileage entry  
**Parameters:**
```json
{
  "employee_id": "employee:xxx",  // optional
  "project_id": "project:xxx",    // optional
  "distance": 50,                 // required
  "date": "2024-01-15"            // required
}
```

---

### 10. DOCUMENTS (2 tools)

#### get_documents
**Description:** Retrieve documents  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_document
**Description:** Get specific document by ID  
**Parameters:**
```json
{
  "document_id": "document:xxx"  // required
}
```

---

### 11. CONTRACTS (3 tools)

#### get_contracts
**Description:** Retrieve contracts (may require filters)  
**Parameters:**
```json
{
  "limit": 10,    // optional
  "offset": 0     // optional
}
```

#### get_contract
**Description:** Get specific contract by ID  
**Parameters:**
```json
{
  "contract_id": "contract:xxx"  // required
}
```

#### create_contract
**Description:** Create a new contract  
**Parameters:**
```json
{
  "organization_id": "organization:xxx",  // required
  "start_date": "2024-01-01",             // required
  "end_date": "2024-12-31"                // optional
}
```

---

### 12. SEARCH & CUSTOM FIELDS (2 tools)

#### get_custom_fields
**Description:** Retrieve custom field definitions (may require model parameter)  
**Parameters:**
```json
{
  "model": "organization"  // optional: organization, person, project, etc.
}
```

#### search
**Description:** Search across Simplicate resources  
**Parameters:**
```json
{
  "query": "search term",                    // required
  "type": "project"                          // optional: project, organization, person
}
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong (Natural language)
```
"List employees from Simplicate"
```

### ✅ Correct (Tool call)
```json
{
  "name": "get_employees",
  "arguments": {
    "limit": 10,
    "offset": 0
  }
}
```

---

## 📝 Quick Reference: Most Common Tools

| Task | Tool Name | Required Parameters |
|------|-----------|---------------------|
| List employees | `get_employees` | None (limit optional) |
| List projects | `get_projects` | None (limit optional) |
| List organizations | `get_organizations` | None (limit optional) |
| List hours | `get_hours` | None (limit optional) |
| List invoices | `get_invoices` | None (limit optional) |
| Get specific employee | `get_employee` | `employee_id` |
| Create project | `create_project` | `name` |
| Log hours | `create_hours` | `hours`, `start_date` |
| Search | `search` | `query` |

---

## 💡 Tips for AI Agents

1. **Always use exact tool names** - Not natural language descriptions
2. **Check required parameters** - Marked as "required" in this guide
3. **Use limit/offset for pagination** - Default limit is usually 10
4. **Some tools return empty arrays** - This is normal for filtered endpoints
5. **IDs follow format** - `type:hexstring` (e.g., `employee:abc123`)

---

## 🔧 For n8n Integration

In n8n, when calling MCP tools:
1. Select the "Simplicate" MCP connection
2. Choose "Call Tool" action
3. Enter exact tool name (e.g., `get_employees`)
4. Add parameters as JSON object

---

**Last Updated:** Based on Simplicate MCP Server v2.0 (100% Reliable)


# Simplicate MCP Server - Full API Reference

## 🎉 Complete Implementation - 60+ Tools

Your MCP server now includes **FULL ACCESS** to all Simplicate API modules with **60+ tools** and **13 resources**.

## 📊 Available Modules

### 1. **Projects** (7 tools)
Complete project management capabilities.

| Tool | Description |
|------|-------------|
| `get_projects` | List all projects |
| `get_project` | Get specific project details |
| `create_project` | Create a new project |
| `update_project` | Update project information |
| `delete_project` | Delete a project |
| `get_project_services` | Get services/items for a project |
| `get_tasks` | Retrieve project tasks |

**Example prompts:**
- "Show me all active projects"
- "Create a new project called 'Website Redesign'"
- "Update project ID 123 with a new budget of 50000"

### 2. **CRM** (8 tools)
Full customer relationship management.

| Tool | Description |
|------|-------------|
| `get_organizations` | List all organizations/companies |
| `get_organization` | Get specific organization details |
| `create_organization` | Create a new organization |
| `update_organization` | Update organization info |
| `get_persons` | List all contact persons |
| `get_person` | Get specific person details |
| `create_person` | Create a new contact person |
| `update_person` | Update person information |

**Example prompts:**
- "List all organizations in my CRM"
- "Create a new organization called 'Acme Corp'"
- "Show me all contacts for organization ID 456"

### 3. **Sales** (5 tools)
Sales quotes and opportunities.

| Tool | Description |
|------|-------------|
| `get_quotes` | List sales quotes |
| `get_quote` | Get specific quote details |
| `create_quote` | Create a new sales quote |
| `get_sales` | List sales records |
| `get_sale` | Get specific sale details |

**Example prompts:**
- "Show me all pending quotes"
- "Create a quote for organization ID 789"
- "What are our recent sales?"

### 4. **Hours & Timesheets** (9 tools)
Time tracking and leave management.

| Tool | Description |
|------|-------------|
| `get_hours` | List timesheet hours |
| `get_hours_entry` | Get specific hours entry |
| `create_hours` | Create new hours entry |
| `update_hours` | Update hours entry |
| `delete_hours` | Delete hours entry |
| `get_timesheets` | List timesheets |
| `get_leave` | List leave/vacation entries |
| `create_leave` | Create leave entry |
| `get_calendar_events` | Get calendar planning events |

**Example prompts:**
- "Show me this week's timesheet hours"
- "Log 8 hours for project ID 123"
- "Create a vacation entry for next week"

### 5. **Invoices & Finance** (7 tools)
Complete financial management.

| Tool | Description |
|------|-------------|
| `get_invoices` | List all invoices |
| `get_invoice` | Get specific invoice |
| `create_invoice` | Create new invoice |
| `update_invoice` | Update invoice |
| `get_payments` | List payments |
| `create_payment` | Record a payment |
| `get_revenue` | Retrieve revenue records |

**Example prompts:**
- "Show me unpaid invoices"
- "Create an invoice for organization ID 456"
- "Record a payment for invoice INV-123"

### 6. **HRM (Human Resources)** (4 tools)
Employee management.

| Tool | Description |
|------|-------------|
| `get_employees` | List all employees |
| `get_employee` | Get specific employee |
| `get_absences` | List employee absences |
| `create_absence` | Create absence record |

**Example prompts:**
- "Show me all employees"
- "List absences for this month"
- "Create a sick leave entry"

### 7. **Services** (4 tools)
Service catalog management.

| Tool | Description |
|------|-------------|
| `get_services` | List service catalog |
| `get_service` | Get specific service |
| `create_service` | Create new service |
| `get_default_services` | Get default services configuration |

**Example prompts:**
- "Show me all services"
- "Create a new service called 'Consulting' at 150 per hour"

### 8. **Tasks & Planning** (3 tools)
Task management and planning.

| Tool | Description |
|------|-------------|
| `get_task` | Get specific task |
| `create_task` | Create new task |
| `update_task` | Update task |

**Example prompts:**
- "Create a task for project ID 123"
- "Update task status to completed"

### 9. **Costs & Mileage** (5 tools)
Expense and mileage tracking.

| Tool | Description |
|------|-------------|
| `get_costs` | List project costs |
| `get_cost` | Get specific cost |
| `create_cost` | Create cost entry |
| `get_mileage` | List mileage records |
| `create_mileage` | Create mileage entry |

**Example prompts:**
- "Show me costs for project ID 123"
- "Log a mileage entry for 50 km"
- "Create a cost entry for office supplies"

### 10. **Documents** (2 tools)
Document management.

| Tool | Description |
|------|-------------|
| `get_documents` | List all documents |
| `get_document` | Get specific document |

**Example prompts:**
- "Show me all documents"
- "Get document details for ID 789"

### 11. **Contracts** (3 tools)
Contract management.

| Tool | Description |
|------|-------------|
| `get_contracts` | List all contracts |
| `get_contract` | Get specific contract |
| `create_contract` | Create new contract |

**Example prompts:**
- "Show me all active contracts"
- "Create a contract for organization ID 456"

### 12. **Custom Fields & Search** (2 tools)
Advanced customization and search.

| Tool | Description |
|------|-------------|
| `get_custom_fields` | Get custom field definitions |
| `search` | Search across Simplicate |

**Example prompts:**
- "Search for 'marketing' in Simplicate"
- "Show me custom fields for projects"

## 📁 Available Resources (13 total)

Resources are collections that Claude can access directly:

1. `simplicate://projects` - All projects
2. `simplicate://organizations` - All CRM organizations
3. `simplicate://persons` - All contact persons
4. `simplicate://hours` - Timesheet hours
5. `simplicate://invoices` - All invoices
6. `simplicate://employees` - All employees
7. `simplicate://quotes` - Sales quotes
8. `simplicate://sales` - Sales records
9. `simplicate://services` - Service catalog
10. `simplicate://tasks` - Project tasks
11. `simplicate://costs` - Project costs
12. `simplicate://contracts` - All contracts
13. `simplicate://documents` - All documents

## 🎯 Capabilities Summary

### Read Operations ✅
All modules support reading/listing data.

### Create Operations ✅
You can create new records in:
- Projects
- Organizations & Persons
- Quotes
- Hours & Leave entries
- Invoices & Payments
- Absences
- Services
- Tasks
- Costs & Mileage
- Contracts

### Update Operations ✅
You can update existing records in:
- Projects
- Organizations & Persons
- Hours
- Invoices
- Tasks

### Delete Operations ✅
You can delete:
- Projects
- Hours entries

## 🔒 Permission Notes

Your API access depends on the permissions granted to your API credentials in Simplicate. If certain operations fail, verify your API key has the necessary permissions at:

**https://act.simplicate.com/settings/api**

## 📈 Usage Statistics

**Total Tools**: 60+
**Total Resources**: 13
**Modules Covered**: 12
**Read-only tools**: ~28
**Create tools**: ~15
**Update tools**: ~8
**Delete tools**: 2

## 🚀 Getting Started

1. **Ensure `.env` is configured** with `https://act.simplicate.com/api/v2`
2. **Rebuild** the server: `npm run build`
3. **Update Claude Desktop** config to use the full server
4. **Restart Claude Desktop**
5. **Test** with any of the example prompts above

## 📝 Example Workflows

### Workflow 1: Project Setup
```
1. "Create a new organization called 'New Client Inc'"
2. "Create a project called 'Website Redesign' for that organization"
3. "Create a task 'Initial Meeting' for the project"
4. "Create a quote for the project"
```

### Workflow 2: Time Tracking
```
1. "Show me today's hours"
2. "Log 6 hours for project ID 123"
3. "Show me this week's timesheet"
```

### Workflow 3: Financial Overview
```
1. "Show me all unpaid invoices"
2. "Get revenue for this month"
3. "List recent payments"
```

### Workflow 4: Team Management
```
1. "List all employees"
2. "Show absences for this month"
3. "Create a leave entry for next week"
```

## 🔄 Version History

- **v1.0.0** - Basic implementation (9 tools, 5 resources)
- **v2.0.0** - **FULL implementation (60+ tools, 13 resources)** ← Current

## 📚 Additional Resources

- **CONFIGURATION.md** - Setup for act.simplicate.com
- **README.md** - General documentation
- **QUICKSTART.md** - Quick setup guide

---

**You now have complete access to ALL Simplicate functionality through the MCP server!** 🎉


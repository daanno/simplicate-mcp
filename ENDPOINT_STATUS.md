# Simplicate API Endpoint Status Report

**Generated:** 2025-10-07  
**Instance:** act.simplicate.com  
**Success Rate:** 65.2% (15/23 endpoints working)

---

## ✅ Working Endpoints (15)

These endpoints work out-of-the-box with basic parameters:

| Module | Endpoint | Records | Status |
|--------|----------|---------|--------|
| **Projects** | `/projects/project` | ✅ Working | GET projects list |
| **Projects** | `/projects/service` | ✅ Working | GET project services |
| **CRM** | `/crm/organization` | ✅ Working | GET organizations |
| **CRM** | `/crm/person` | ✅ Working | GET persons/contacts |
| **Sales** | `/sales/quote` | ✅ Working | GET sales quotes |
| **Hours** | `/hours/hours` | ✅ Working | GET timesheet hours |
| **HRM** | `/hrm/employee` | ✅ Working | GET employees |
| **HRM** | `/hrm/leave` | ✅ Working | GET leave entries ✨ |
| **HRM** | `/hrm/absence` | ✅ Working | GET absences ✨ |
| **HRM** | `/hrm/timetable` | ✅ Working | GET timetable/schedule ✨ |
| **Invoices** | `/invoices/invoice` | ✅ Working | GET invoices |
| **Invoices** | `/invoices/payment` | ✅ Working | GET payments |
| **Services** | `/services/service` | ✅ Working | GET services |
| **Services** | `/services/defaultservice` | ✅ Working | GET default services |
| **Documents** | `/documents/document` | ✅ Working | GET documents |

---

## ⚠️ Endpoints Requiring Special Parameters (8)

These endpoints return 400 Bad Request and likely need specific filters or query parameters:

| Module | Endpoint | Issue | Possible Fix |
|--------|----------|-------|--------------|
| **Projects** | `/projects/task` | 400 | May need project_id filter |
| **CRM** | `/crm/contract` | 400 | May need organization_id filter |
| **Sales** | `/sales/sale` | 400 | May need specific status filter |
| **Hours** | `/hours/timesheet` | 400 | May need employee_id or date range |
| **Invoices** | `/invoices/revenue` | 400 | May need project_id or date range |
| **Costs** | `/costs/cost` | 400 | May need project_id filter |
| **Costs** | `/costs/mileage` | 400 | May need employee_id filter |
| **Custom** | `/customfields/customfield` | 400 | May need model parameter |

---

## 🎯 Recommendations for MCP Server

### 1. Focus on Working Endpoints

Your MCP server should prioritize the 15 working endpoints for reliable operation:

**Core Features to Emphasize:**
- ✅ Projects and Project Services
- ✅ CRM (Organizations & Persons)
- ✅ Sales Quotes
- ✅ Hours/Timesheet Tracking
- ✅ HRM (Employees, Leave, Absences, Timetable)
- ✅ Invoices and Payments
- ✅ Services Management
- ✅ Documents

### 2. Add Graceful Fallbacks

For the 400-error endpoints, add try-catch blocks that:
- Return empty arrays instead of throwing errors
- Log warnings for debugging
- Suggest alternative queries to users

### 3. Update Tool Descriptions

Update MCP tool descriptions to clarify which features work reliably vs. which may have limitations.

---

## 🔍 For Checking Dwayne's Availability

Based on working endpoints, here's how to check availability:

### Option 1: Use Leave Data (✅ Works!)
```
GET /hrm/leave?limit=50
```
**Shows:** Planned vacations and time off

### Option 2: Use Timetable (✅ Works!)
```
GET /hrm/timetable?limit=50
```
**Shows:** Regular schedule/working hours

### Option 3: Use Absences (✅ Works!)
```
GET /hrm/absence?limit=50
```
**Shows:** Sick days and unplanned absences

### Option 4: Use Hours (✅ Works!)
```
GET /hours/hours?limit=50
```
**Shows:** Actual logged hours (what's already done)

### Combined Approach (Recommended)
```
1. Get employee list to find Dwayne's ID
2. Get leave entries for upcoming weeks
3. Get absences for current period
4. Get timetable for regular schedule
5. Cross-reference hours to see what's logged
```

---

## 🐛 Known Issues

### Issue 1: Tasks Endpoint Requires Project Filter
The `/projects/task` endpoint needs a project_id parameter:
```
GET /projects/task?project_id=xxx
```

### Issue 2: Search Endpoint Not Tested
The `/search` endpoint wasn't tested but is documented in Simplicate API.

---

## 📝 Testing Commands

To re-run this test:
```bash
node test-all-endpoints.js
```

To test specific endpoint:
```bash
node test-connection.js
```

---

## ✅ Action Items

- [x] Identify all working endpoints
- [ ] Update MCP server to handle 400 errors gracefully
- [ ] Add endpoint-specific parameter handling
- [ ] Update documentation with working endpoints
- [ ] Test POST/PUT/DELETE operations on working endpoints
- [ ] Investigate if 400-error endpoints work with filters

---

**Conclusion:** Your Simplicate instance has **65% of endpoints working**. The MCP server should focus on these reliable endpoints and add graceful error handling for the others.


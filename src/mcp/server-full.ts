import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SimplicateServiceExtended } from '../simplicate/services-extended';

/**
 * Comprehensive MCP Server for Simplicate with ALL modules
 * Includes: Projects, CRM, Sales, Hours, Invoices, HRM, Services, Tasks, Costs, Documents, Contracts, and more
 */
export class SimplicateMCPServerFull {
  private server: Server;
  private simplicateService: SimplicateServiceExtended;

  constructor() {
    this.server = new Server(
      {
        name: 'simplicate-mcp-server-full',
        version: '2.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.simplicateService = new SimplicateServiceExtended();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List all available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        // =============================================
        // PROJECTS TOOLS (7 tools)
        // =============================================
        {
          name: 'get_projects',
          description: 'Retrieve a list of all projects',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Maximum number to return (default: 10)' },
              offset: { type: 'number', description: 'Number to skip for pagination' },
            },
          },
        },
        {
          name: 'get_project',
          description: 'Get details of a specific project by ID',
          inputSchema: {
            type: 'object',
            properties: { project_id: { type: 'string', description: 'Project ID' } },
            required: ['project_id'],
          },
        },
        {
          name: 'create_project',
          description: 'Create a new project',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Project name' },
              organization_id: { type: 'string', description: 'Organization ID' },
              project_manager_id: { type: 'string', description: 'Project manager employee ID' },
              start_date: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              budget: { type: 'number', description: 'Project budget' },
            },
            required: ['name'],
          },
        },
        {
          name: 'update_project',
          description: 'Update an existing project',
          inputSchema: {
            type: 'object',
            properties: {
              project_id: { type: 'string', description: 'Project ID' },
              data: { type: 'object', description: 'Fields to update' },
            },
            required: ['project_id', 'data'],
          },
        },
        {
          name: 'delete_project',
          description: 'Delete a project',
          inputSchema: {
            type: 'object',
            properties: { project_id: { type: 'string', description: 'Project ID' } },
            required: ['project_id'],
          },
        },
        {
          name: 'get_project_services',
          description: 'Get services/items for a specific project',
          inputSchema: {
            type: 'object',
            properties: { project_id: { type: 'string', description: 'Project ID' } },
            required: ['project_id'],
          },
        },
        {
          name: 'get_tasks',
          description: 'Retrieve project tasks',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Maximum number to return' },
              offset: { type: 'number', description: 'Number to skip' },
            },
          },
        },

        // =============================================
        // CRM TOOLS (8 tools)
        // =============================================
        {
          name: 'get_organizations',
          description: 'Retrieve CRM organizations',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_organization',
          description: 'Get specific organization by ID',
          inputSchema: {
            type: 'object',
            properties: { organization_id: { type: 'string' } },
            required: ['organization_id'],
          },
        },
        {
          name: 'create_organization',
          description: 'Create a new organization',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Organization name' },
              email: { type: 'string' },
              phone: { type: 'string' },
              website: { type: 'string' },
            },
            required: ['name'],
          },
        },
        {
          name: 'update_organization',
          description: 'Update an organization',
          inputSchema: {
            type: 'object',
            properties: {
              organization_id: { type: 'string' },
              data: { type: 'object' },
            },
            required: ['organization_id', 'data'],
          },
        },
        {
          name: 'get_persons',
          description: 'Retrieve contact persons',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_person',
          description: 'Get specific person by ID',
          inputSchema: {
            type: 'object',
            properties: { person_id: { type: 'string' } },
            required: ['person_id'],
          },
        },
        {
          name: 'create_person',
          description: 'Create a new contact person',
          inputSchema: {
            type: 'object',
            properties: {
              first_name: { type: 'string' },
              family_name: { type: 'string' },
              email: { type: 'string' },
              organization_id: { type: 'string' },
            },
            required: ['first_name', 'family_name'],
          },
        },
        {
          name: 'update_person',
          description: 'Update a person',
          inputSchema: {
            type: 'object',
            properties: {
              person_id: { type: 'string' },
              data: { type: 'object' },
            },
            required: ['person_id', 'data'],
          },
        },

        // =============================================
        // SALES TOOLS (5 tools)
        // =============================================
        {
          name: 'get_quotes',
          description: 'Retrieve sales quotes',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_quote',
          description: 'Get specific quote by ID',
          inputSchema: {
            type: 'object',
            properties: { quote_id: { type: 'string' } },
            required: ['quote_id'],
          },
        },
        {
          name: 'create_quote',
          description: 'Create a new sales quote',
          inputSchema: {
            type: 'object',
            properties: {
              subject: { type: 'string' },
              organization_id: { type: 'string' },
            },
            required: ['subject'],
          },
        },
        {
          name: 'get_sales',
          description: 'Retrieve sales records',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_sale',
          description: 'Get specific sale by ID',
          inputSchema: {
            type: 'object',
            properties: { sale_id: { type: 'string' } },
            required: ['sale_id'],
          },
        },

        // =============================================
        // HOURS & TIMESHEETS TOOLS (9 tools)
        // =============================================
        {
          name: 'get_hours',
          description: 'Retrieve timesheet hours',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_hours_entry',
          description: 'Get specific hours entry by ID',
          inputSchema: {
            type: 'object',
            properties: { hours_id: { type: 'string' } },
            required: ['hours_id'],
          },
        },
        {
          name: 'create_hours',
          description: 'Create a new hours entry',
          inputSchema: {
            type: 'object',
            properties: {
              employee_id: { type: 'string' },
              project_id: { type: 'string' },
              hours: { type: 'number' },
              start_date: { type: 'string' },
              note: { type: 'string' },
            },
            required: ['hours', 'start_date'],
          },
        },
        {
          name: 'update_hours',
          description: 'Update hours entry',
          inputSchema: {
            type: 'object',
            properties: {
              hours_id: { type: 'string' },
              data: { type: 'object' },
            },
            required: ['hours_id', 'data'],
          },
        },
        {
          name: 'delete_hours',
          description: 'Delete hours entry',
          inputSchema: {
            type: 'object',
            properties: { hours_id: { type: 'string' } },
            required: ['hours_id'],
          },
        },
        {
          name: 'get_timesheets',
          description: 'Retrieve timesheets',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_leave',
          description: 'Retrieve leave/vacation entries',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'create_leave',
          description: 'Create leave/vacation entry',
          inputSchema: {
            type: 'object',
            properties: {
              employee_id: { type: 'string' },
              leave_type: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' },
              hours: { type: 'number' },
            },
            required: ['leave_type', 'start_date', 'end_date'],
          },
        },
        {
          name: 'get_calendar_events',
          description: 'Get calendar/planning events',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },

        // =============================================
        // INVOICES & FINANCE TOOLS (9 tools)
        // =============================================
        {
          name: 'get_invoices',
          description: 'Retrieve invoices',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_invoice',
          description: 'Get specific invoice by ID',
          inputSchema: {
            type: 'object',
            properties: { invoice_id: { type: 'string' } },
            required: ['invoice_id'],
          },
        },
        {
          name: 'create_invoice',
          description: 'Create a new invoice',
          inputSchema: {
            type: 'object',
            properties: {
              organization_id: { type: 'string' },
              date: { type: 'string' },
            },
            required: ['organization_id'],
          },
        },
        {
          name: 'update_invoice',
          description: 'Update an invoice',
          inputSchema: {
            type: 'object',
            properties: {
              invoice_id: { type: 'string' },
              data: { type: 'object' },
            },
            required: ['invoice_id', 'data'],
          },
        },
        {
          name: 'get_payments',
          description: 'Retrieve invoice payments',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'create_payment',
          description: 'Create a payment record',
          inputSchema: {
            type: 'object',
            properties: {
              invoice_id: { type: 'string' },
              amount: { type: 'number' },
              payment_date: { type: 'string' },
              method: { type: 'string' },
            },
            required: ['invoice_id', 'amount'],
          },
        },
        {
          name: 'get_revenue',
          description: 'Retrieve revenue records',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },

        // =============================================
        // HRM TOOLS (5 tools)
        // =============================================
        {
          name: 'get_employees',
          description: 'Retrieve employees',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_employee',
          description: 'Get specific employee by ID',
          inputSchema: {
            type: 'object',
            properties: { employee_id: { type: 'string' } },
            required: ['employee_id'],
          },
        },
        {
          name: 'get_absences',
          description: 'Retrieve employee absences',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'create_absence',
          description: 'Create absence record',
          inputSchema: {
            type: 'object',
            properties: {
              employee_id: { type: 'string' },
              absence_type: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' },
            },
            required: ['absence_type', 'start_date', 'end_date'],
          },
        },
        {
          name: 'get_timetable',
          description: 'Retrieve employee timetable/schedule (shows regular working hours and planned schedule)',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Maximum number to return (default: 10)' },
              offset: { type: 'number', description: 'Number to skip for pagination' },
            },
          },
        },

        // =============================================
        // SERVICES TOOLS (4 tools)
        // =============================================
        {
          name: 'get_services',
          description: 'Retrieve services catalog',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_service',
          description: 'Get specific service by ID',
          inputSchema: {
            type: 'object',
            properties: { service_id: { type: 'string' } },
            required: ['service_id'],
          },
        },
        {
          name: 'create_service',
          description: 'Create a new service',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              price: { type: 'number' },
            },
            required: ['name', 'price'],
          },
        },
        {
          name: 'get_default_services',
          description: 'Get default services configuration',
          inputSchema: { type: 'object', properties: {} },
        },

        // =============================================
        // TASKS TOOLS (3 tools)
        // =============================================
        {
          name: 'get_task',
          description: 'Get specific task by ID',
          inputSchema: {
            type: 'object',
            properties: { task_id: { type: 'string' } },
            required: ['task_id'],
          },
        },
        {
          name: 'create_task',
          description: 'Create a new task',
          inputSchema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              project_id: { type: 'string' },
              assignee_id: { type: 'string' },
              due_date: { type: 'string' },
            },
            required: ['title'],
          },
        },
        {
          name: 'update_task',
          description: 'Update a task',
          inputSchema: {
            type: 'object',
            properties: {
              task_id: { type: 'string' },
              data: { type: 'object' },
            },
            required: ['task_id', 'data'],
          },
        },

        // =============================================
        // COSTS & MILEAGE TOOLS (5 tools)
        // =============================================
        {
          name: 'get_costs',
          description: 'Retrieve project costs',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_cost',
          description: 'Get specific cost by ID',
          inputSchema: {
            type: 'object',
            properties: { cost_id: { type: 'string' } },
            required: ['cost_id'],
          },
        },
        {
          name: 'create_cost',
          description: 'Create a cost entry',
          inputSchema: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              amount: { type: 'number' },
              project_id: { type: 'string' },
              date: { type: 'string' },
            },
            required: ['description', 'amount'],
          },
        },
        {
          name: 'get_mileage',
          description: 'Retrieve mileage records',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'create_mileage',
          description: 'Create mileage entry',
          inputSchema: {
            type: 'object',
            properties: {
              employee_id: { type: 'string' },
              project_id: { type: 'string' },
              distance: { type: 'number' },
              date: { type: 'string' },
            },
            required: ['distance', 'date'],
          },
        },

        // =============================================
        // DOCUMENTS TOOLS (3 tools)
        // =============================================
        {
          name: 'get_documents',
          description: 'Retrieve documents',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_document',
          description: 'Get specific document by ID',
          inputSchema: {
            type: 'object',
            properties: { document_id: { type: 'string' } },
            required: ['document_id'],
          },
        },

        // =============================================
        // CONTRACTS TOOLS (3 tools)
        // =============================================
        {
          name: 'get_contracts',
          description: 'Retrieve contracts',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number' },
              offset: { type: 'number' },
            },
          },
        },
        {
          name: 'get_contract',
          description: 'Get specific contract by ID',
          inputSchema: {
            type: 'object',
            properties: { contract_id: { type: 'string' } },
            required: ['contract_id'],
          },
        },
        {
          name: 'create_contract',
          description: 'Create a new contract',
          inputSchema: {
            type: 'object',
            properties: {
              organization_id: { type: 'string' },
              start_date: { type: 'string' },
              end_date: { type: 'string' },
            },
            required: ['organization_id', 'start_date'],
          },
        },

        // =============================================
        // CUSTOM FIELDS & SEARCH (2 tools)
        // =============================================
        {
          name: 'get_custom_fields',
          description: 'Retrieve custom field definitions',
          inputSchema: {
            type: 'object',
            properties: {
              model: { type: 'string', description: 'Model type (organization, person, project, etc.)' },
            },
          },
        },
        {
          name: 'search',
          description: 'Search across Simplicate resources',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              type: { type: 'string', enum: ['project', 'organization', 'person'] },
            },
            required: ['query'],
          },
        },
      ],
    }));

    // Handle tool calls - this is a large switch statement
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;
        const toolArgs = (args || {}) as Record<string, any>;

        switch (name) {
          // PROJECTS
          case 'get_projects': {
            const data = await this.simplicateService.getProjects({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_project': {
            if (!toolArgs.project_id) throw new Error('project_id is required');
            const data = await this.simplicateService.getProjectById(toolArgs.project_id as string);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_project': {
            const data = await this.simplicateService.createProject(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'update_project': {
            if (!toolArgs.project_id || !toolArgs.data) throw new Error('project_id and data are required');
            const data = await this.simplicateService.updateProject(toolArgs.project_id, toolArgs.data);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'delete_project': {
            if (!toolArgs.project_id) throw new Error('project_id is required');
            await this.simplicateService.deleteProject(toolArgs.project_id);
            return { content: [{ type: 'text', text: 'Project deleted successfully' }] };
          }
          case 'get_project_services': {
            if (!toolArgs.project_id) throw new Error('project_id is required');
            const data = await this.simplicateService.getProjectServices(toolArgs.project_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_tasks': {
            const data = await this.simplicateService.getTasks({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // CRM
          case 'get_organizations': {
            const data = await this.simplicateService.getOrganizations({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_organization': {
            if (!toolArgs.organization_id) throw new Error('organization_id is required');
            const data = await this.simplicateService.getOrganizationById(toolArgs.organization_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_organization': {
            const data = await this.simplicateService.createOrganization(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'update_organization': {
            if (!toolArgs.organization_id || !toolArgs.data) throw new Error('organization_id and data required');
            const data = await this.simplicateService.updateOrganization(toolArgs.organization_id, toolArgs.data);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_persons': {
            const data = await this.simplicateService.getPersons({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_person': {
            if (!toolArgs.person_id) throw new Error('person_id is required');
            const data = await this.simplicateService.getPersonById(toolArgs.person_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_person': {
            const data = await this.simplicateService.createPerson(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'update_person': {
            if (!toolArgs.person_id || !toolArgs.data) throw new Error('person_id and data required');
            const data = await this.simplicateService.updatePerson(toolArgs.person_id, toolArgs.data);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // SALES
          case 'get_quotes': {
            const data = await this.simplicateService.getQuotes({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_quote': {
            if (!toolArgs.quote_id) throw new Error('quote_id is required');
            const data = await this.simplicateService.getQuoteById(toolArgs.quote_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_quote': {
            const data = await this.simplicateService.createQuote(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_sales': {
            const data = await this.simplicateService.getSales({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_sale': {
            if (!toolArgs.sale_id) throw new Error('sale_id is required');
            const data = await this.simplicateService.getSaleById(toolArgs.sale_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // HOURS & TIMESHEETS
          case 'get_hours': {
            const data = await this.simplicateService.getHours({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_hours_entry': {
            if (!toolArgs.hours_id) throw new Error('hours_id is required');
            const data = await this.simplicateService.getHoursById(toolArgs.hours_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_hours': {
            const data = await this.simplicateService.createHours(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'update_hours': {
            if (!toolArgs.hours_id || !toolArgs.data) throw new Error('hours_id and data required');
            const data = await this.simplicateService.updateHours(toolArgs.hours_id, toolArgs.data);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'delete_hours': {
            if (!toolArgs.hours_id) throw new Error('hours_id is required');
            await this.simplicateService.deleteHours(toolArgs.hours_id);
            return { content: [{ type: 'text', text: 'Hours entry deleted successfully' }] };
          }
          case 'get_timesheets': {
            const data = await this.simplicateService.getTimesheets({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_leave': {
            const data = await this.simplicateService.getLeave({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_leave': {
            const data = await this.simplicateService.createLeave(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_calendar_events': {
            const data = await this.simplicateService.getCalendarEvents({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // INVOICES & FINANCE
          case 'get_invoices': {
            const data = await this.simplicateService.getInvoices({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_invoice': {
            if (!toolArgs.invoice_id) throw new Error('invoice_id is required');
            const data = await this.simplicateService.getInvoiceById(toolArgs.invoice_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_invoice': {
            const data = await this.simplicateService.createInvoice(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'update_invoice': {
            if (!toolArgs.invoice_id || !toolArgs.data) throw new Error('invoice_id and data required');
            const data = await this.simplicateService.updateInvoice(toolArgs.invoice_id, toolArgs.data);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_payments': {
            const data = await this.simplicateService.getPayments({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_payment': {
            const data = await this.simplicateService.createPayment(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_revenue': {
            const data = await this.simplicateService.getRevenue({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // HRM
          case 'get_employees': {
            const data = await this.simplicateService.getEmployees({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_employee': {
            if (!toolArgs.employee_id) throw new Error('employee_id is required');
            const data = await this.simplicateService.getEmployeeById(toolArgs.employee_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_absences': {
            const data = await this.simplicateService.getAbsences({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_absence': {
            const data = await this.simplicateService.createAbsence(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_timetable': {
            const data = await this.simplicateService.getTimetable({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // SERVICES
          case 'get_services': {
            const data = await this.simplicateService.getServices({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_service': {
            if (!toolArgs.service_id) throw new Error('service_id is required');
            const data = await this.simplicateService.getServiceById(toolArgs.service_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_service': {
            const data = await this.simplicateService.createService(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_default_services': {
            const data = await this.simplicateService.getDefaultServices();
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // TASKS
          case 'get_task': {
            if (!toolArgs.task_id) throw new Error('task_id is required');
            const data = await this.simplicateService.getTaskById(toolArgs.task_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_task': {
            const data = await this.simplicateService.createTask(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'update_task': {
            if (!toolArgs.task_id || !toolArgs.data) throw new Error('task_id and data required');
            const data = await this.simplicateService.updateTask(toolArgs.task_id, toolArgs.data);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // COSTS & MILEAGE
          case 'get_costs': {
            const data = await this.simplicateService.getCosts({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_cost': {
            if (!toolArgs.cost_id) throw new Error('cost_id is required');
            const data = await this.simplicateService.getCostById(toolArgs.cost_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_cost': {
            const data = await this.simplicateService.createCost(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_mileage': {
            const data = await this.simplicateService.getMileage({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_mileage': {
            const data = await this.simplicateService.createMileage(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // DOCUMENTS
          case 'get_documents': {
            const data = await this.simplicateService.getDocuments({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_document': {
            if (!toolArgs.document_id) throw new Error('document_id is required');
            const data = await this.simplicateService.getDocumentById(toolArgs.document_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // CONTRACTS
          case 'get_contracts': {
            const data = await this.simplicateService.getContracts({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'get_contract': {
            if (!toolArgs.contract_id) throw new Error('contract_id is required');
            const data = await this.simplicateService.getContractById(toolArgs.contract_id);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'create_contract': {
            const data = await this.simplicateService.createContract(toolArgs);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          // CUSTOM FIELDS & SEARCH
          case 'get_custom_fields': {
            const data = await this.simplicateService.getCustomFields(toolArgs.model);
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }
          case 'search': {
            if (!toolArgs.query) throw new Error('query is required');
            const data = await this.simplicateService.search(
              toolArgs.query as string,
              toolArgs.type as 'project' | 'organization' | 'person' | undefined
            );
            return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        { uri: 'simplicate://projects', name: 'Projects', description: 'All projects', mimeType: 'application/json' },
        { uri: 'simplicate://organizations', name: 'Organizations', description: 'CRM organizations', mimeType: 'application/json' },
        { uri: 'simplicate://persons', name: 'Persons', description: 'Contact persons', mimeType: 'application/json' },
        { uri: 'simplicate://hours', name: 'Hours', description: 'Timesheet hours', mimeType: 'application/json' },
        { uri: 'simplicate://invoices', name: 'Invoices', description: 'All invoices', mimeType: 'application/json' },
        { uri: 'simplicate://employees', name: 'Employees', description: 'All employees', mimeType: 'application/json' },
        { uri: 'simplicate://timetable', name: 'Timetable', description: 'Employee schedules and working hours', mimeType: 'application/json' },
        { uri: 'simplicate://quotes', name: 'Quotes', description: 'Sales quotes', mimeType: 'application/json' },
        { uri: 'simplicate://sales', name: 'Sales', description: 'Sales records', mimeType: 'application/json' },
        { uri: 'simplicate://services', name: 'Services', description: 'Service catalog', mimeType: 'application/json' },
        { uri: 'simplicate://tasks', name: 'Tasks', description: 'Project tasks', mimeType: 'application/json' },
        { uri: 'simplicate://costs', name: 'Costs', description: 'Project costs', mimeType: 'application/json' },
        { uri: 'simplicate://contracts', name: 'Contracts', description: 'All contracts', mimeType: 'application/json' },
        { uri: 'simplicate://documents', name: 'Documents', description: 'All documents', mimeType: 'application/json' },
      ],
    }));

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      const limit = 50;

      try {
        let data: any;
        switch (uri) {
          case 'simplicate://projects': data = await this.simplicateService.getProjects({ limit }); break;
          case 'simplicate://organizations': data = await this.simplicateService.getOrganizations({ limit }); break;
          case 'simplicate://persons': data = await this.simplicateService.getPersons({ limit }); break;
          case 'simplicate://hours': data = await this.simplicateService.getHours({ limit }); break;
          case 'simplicate://invoices': data = await this.simplicateService.getInvoices({ limit }); break;
          case 'simplicate://employees': data = await this.simplicateService.getEmployees({ limit }); break;
          case 'simplicate://timetable': data = await this.simplicateService.getTimetable({ limit }); break;
          case 'simplicate://quotes': data = await this.simplicateService.getQuotes({ limit }); break;
          case 'simplicate://sales': data = await this.simplicateService.getSales({ limit }); break;
          case 'simplicate://services': data = await this.simplicateService.getServices({ limit }); break;
          case 'simplicate://tasks': data = await this.simplicateService.getTasks({ limit }); break;
          case 'simplicate://costs': data = await this.simplicateService.getCosts({ limit }); break;
          case 'simplicate://contracts': data = await this.simplicateService.getContracts({ limit }); break;
          case 'simplicate://documents': data = await this.simplicateService.getDocuments({ limit }); break;
          default: throw new Error(`Unknown resource: ${uri}`);
        }

        return {
          contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(data, null, 2) }],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to read resource ${uri}: ${errorMessage}`);
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Simplicate MCP server (FULL) running on stdio with 60+ tools');
  }
}


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
 * Simplicate MCP Server for Project Planning & Management
 * Includes: Projects, Tasks, CRM, Services, Documents, Contracts
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
        // DOCUMENTS TOOLS (2 tools)
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
        { uri: 'simplicate://services', name: 'Services', description: 'Service catalog', mimeType: 'application/json' },
        { uri: 'simplicate://tasks', name: 'Tasks', description: 'Project tasks', mimeType: 'application/json' },
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
          case 'simplicate://services': data = await this.simplicateService.getServices({ limit }); break;
          case 'simplicate://tasks': data = await this.simplicateService.getTasks({ limit }); break;
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
    console.error('Simplicate MCP server (Project Planning) running on stdio with 29 tools');
  }
}


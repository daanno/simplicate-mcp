import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SimplicateService } from '../simplicate/services';

export class SimplicateMCPServer {
  private server: Server;
  private simplicateService: SimplicateService;

  constructor() {
    this.server = new Server(
      {
        name: 'simplicate-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.simplicateService = new SimplicateService();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_projects',
          description: 'Retrieve a list of projects from Simplicate',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Maximum number of projects to return (default: 10)',
              },
              offset: {
                type: 'number',
                description: 'Number of projects to skip (for pagination)',
              },
            },
          },
        },
        {
          name: 'get_project',
          description: 'Get details of a specific project by ID',
          inputSchema: {
            type: 'object',
            properties: {
              project_id: {
                type: 'string',
                description: 'The ID of the project to retrieve',
              },
            },
            required: ['project_id'],
          },
        },
        {
          name: 'get_organizations',
          description: 'Retrieve a list of organizations (CRM) from Simplicate',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Maximum number of organizations to return (default: 10)',
              },
              offset: {
                type: 'number',
                description: 'Number of organizations to skip (for pagination)',
              },
            },
          },
        },
        {
          name: 'get_organization',
          description: 'Get details of a specific organization by ID',
          inputSchema: {
            type: 'object',
            properties: {
              organization_id: {
                type: 'string',
                description: 'The ID of the organization to retrieve',
              },
            },
            required: ['organization_id'],
          },
        },
        {
          name: 'get_persons',
          description: 'Retrieve a list of persons (contacts) from Simplicate',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Maximum number of persons to return (default: 10)',
              },
              offset: {
                type: 'number',
                description: 'Number of persons to skip (for pagination)',
              },
            },
          },
        },
        {
          name: 'get_person',
          description: 'Get details of a specific person by ID',
          inputSchema: {
            type: 'object',
            properties: {
              person_id: {
                type: 'string',
                description: 'The ID of the person to retrieve',
              },
            },
            required: ['person_id'],
          },
        },
        {
          name: 'get_hours',
          description: 'Retrieve timesheet hours from Simplicate',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Maximum number of hour entries to return (default: 10)',
              },
              offset: {
                type: 'number',
                description: 'Number of hour entries to skip (for pagination)',
              },
            },
          },
        },
        {
          name: 'get_invoices',
          description: 'Retrieve invoices from Simplicate',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'number',
                description: 'Maximum number of invoices to return (default: 10)',
              },
              offset: {
                type: 'number',
                description: 'Number of invoices to skip (for pagination)',
              },
            },
          },
        },
        {
          name: 'search',
          description: 'Search across Simplicate resources',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'The search query',
              },
              type: {
                type: 'string',
                description: 'The type of resource to search (project, organization, person)',
                enum: ['project', 'organization', 'person'],
              },
            },
            required: ['query'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;
        const toolArgs = (args || {}) as Record<string, any>;

        switch (name) {
          case 'get_projects': {
            const projects = await this.simplicateService.getProjects({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(projects, null, 2),
                },
              ],
            };
          }

          case 'get_project': {
            if (!toolArgs.project_id) {
              throw new Error('project_id is required');
            }
            const project = await this.simplicateService.getProjectById(
              toolArgs.project_id as string
            );
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(project, null, 2),
                },
              ],
            };
          }

          case 'get_organizations': {
            const organizations = await this.simplicateService.getOrganizations({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(organizations, null, 2),
                },
              ],
            };
          }

          case 'get_organization': {
            if (!toolArgs.organization_id) {
              throw new Error('organization_id is required');
            }
            const organization = await this.simplicateService.getOrganizationById(
              toolArgs.organization_id as string
            );
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(organization, null, 2),
                },
              ],
            };
          }

          case 'get_persons': {
            const persons = await this.simplicateService.getPersons({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(persons, null, 2),
                },
              ],
            };
          }

          case 'get_person': {
            if (!toolArgs.person_id) {
              throw new Error('person_id is required');
            }
            const person = await this.simplicateService.getPersonById(
              toolArgs.person_id as string
            );
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(person, null, 2),
                },
              ],
            };
          }

          case 'get_hours': {
            const hours = await this.simplicateService.getHours({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(hours, null, 2),
                },
              ],
            };
          }

          case 'get_invoices': {
            const invoices = await this.simplicateService.getInvoices({
              limit: (toolArgs.limit as number) || 10,
              offset: (toolArgs.offset as number) || 0,
            });
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(invoices, null, 2),
                },
              ],
            };
          }

          case 'search': {
            if (!toolArgs.query) {
              throw new Error('query is required');
            }
            const results = await this.simplicateService.search(
              toolArgs.query as string,
              toolArgs.type as 'project' | 'organization' | 'person' | undefined
            );
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(results, null, 2),
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'simplicate://projects',
          name: 'Projects',
          description: 'All projects in Simplicate',
          mimeType: 'application/json',
        },
        {
          uri: 'simplicate://organizations',
          name: 'Organizations',
          description: 'All organizations (CRM) in Simplicate',
          mimeType: 'application/json',
        },
        {
          uri: 'simplicate://persons',
          name: 'Persons',
          description: 'All persons (contacts) in Simplicate',
          mimeType: 'application/json',
        },
        {
          uri: 'simplicate://hours',
          name: 'Hours',
          description: 'Timesheet hours in Simplicate',
          mimeType: 'application/json',
        },
        {
          uri: 'simplicate://invoices',
          name: 'Invoices',
          description: 'All invoices in Simplicate',
          mimeType: 'application/json',
        },
      ],
    }));

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      try {
        switch (uri) {
          case 'simplicate://projects': {
            const projects = await this.simplicateService.getProjects({ limit: 50 });
            return {
              contents: [
                {
                  uri,
                  mimeType: 'application/json',
                  text: JSON.stringify(projects, null, 2),
                },
              ],
            };
          }

          case 'simplicate://organizations': {
            const organizations = await this.simplicateService.getOrganizations({ limit: 50 });
            return {
              contents: [
                {
                  uri,
                  mimeType: 'application/json',
                  text: JSON.stringify(organizations, null, 2),
                },
              ],
            };
          }

          case 'simplicate://persons': {
            const persons = await this.simplicateService.getPersons({ limit: 50 });
            return {
              contents: [
                {
                  uri,
                  mimeType: 'application/json',
                  text: JSON.stringify(persons, null, 2),
                },
              ],
            };
          }

          case 'simplicate://hours': {
            const hours = await this.simplicateService.getHours({ limit: 50 });
            return {
              contents: [
                {
                  uri,
                  mimeType: 'application/json',
                  text: JSON.stringify(hours, null, 2),
                },
              ],
            };
          }

          case 'simplicate://invoices': {
            const invoices = await this.simplicateService.getInvoices({ limit: 50 });
            return {
              contents: [
                {
                  uri,
                  mimeType: 'application/json',
                  text: JSON.stringify(invoices, null, 2),
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown resource: ${uri}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to read resource ${uri}: ${errorMessage}`);
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Simplicate MCP server running on stdio');
  }
}


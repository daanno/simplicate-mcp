# Simplicate MCP Server

A Model Context Protocol (MCP) server that integrates with [Simplicate](https://www.simplicate.com/), enabling AI assistants like Claude to securely access and interact with your Simplicate business data including CRM, projects, timesheets, and invoices.

## Overview

This MCP server exposes Simplicate's API through the [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), allowing AI tools to:

- Retrieve projects, organizations, persons, hours, and invoices
- Search across Simplicate resources
- Access detailed information about specific entities

## Prerequisites

- Node.js 18+ and npm
- A Simplicate account with API credentials
- Claude Desktop app (for testing with Claude)

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Edit `.env` and add your Simplicate API credentials:

```env
SIMPLICATE_API_KEY=your_api_key_here
SIMPLICATE_API_SECRET=your_api_secret_here
SIMPLICATE_API_BASE_URL=https://yourdomain.simplicate.com/api/v2
```

**Getting Simplicate API Credentials:**
- Log in to your Simplicate account
- Navigate to Settings → API
- Generate or retrieve your API key and secret
- Update the `SIMPLICATE_API_BASE_URL` with your actual Simplicate domain

## Usage

### Running the Server

**Development mode** (with TypeScript):
```bash
npm run dev
```

**Production mode** (compile first):
```bash
npm run build
npm start
```

### Connecting to Claude Desktop

To use this MCP server with Claude Desktop, add the following configuration to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "simplicate": {
      "command": "node",
      "args": ["/absolute/path/to/Simplicate/dist/index.js"],
      "env": {
        "SIMPLICATE_API_KEY": "your_api_key_here",
        "SIMPLICATE_API_SECRET": "your_api_secret_here",
        "SIMPLICATE_API_BASE_URL": "https://yourdomain.simplicate.com/api/v2"
      }
    }
  }
}
```

Alternatively, using `ts-node` for development:

```json
{
  "mcpServers": {
    "simplicate": {
      "command": "npx",
      "args": ["ts-node", "/absolute/path/to/Simplicate/src/index.ts"],
      "env": {
        "SIMPLICATE_API_KEY": "your_api_key_here",
        "SIMPLICATE_API_SECRET": "your_api_secret_here",
        "SIMPLICATE_API_BASE_URL": "https://yourdomain.simplicate.com/api/v2"
      }
    }
  }
}
```

After updating the configuration, restart Claude Desktop.

## Available Tools

The MCP server exposes the following tools to AI assistants:

### Projects
- `get_projects` - Retrieve a list of projects
- `get_project` - Get details of a specific project by ID

### Organizations (CRM)
- `get_organizations` - Retrieve a list of organizations
- `get_organization` - Get details of a specific organization by ID

### Persons (Contacts)
- `get_persons` - Retrieve a list of persons
- `get_person` - Get details of a specific person by ID

### Hours (Timesheets)
- `get_hours` - Retrieve timesheet hours

### Invoices
- `get_invoices` - Retrieve invoices

### Search
- `search` - Search across Simplicate resources (projects, organizations, persons)

## Available Resources

The server also exposes the following resources that can be read by AI assistants:

- `simplicate://projects` - All projects
- `simplicate://organizations` - All organizations
- `simplicate://persons` - All persons
- `simplicate://hours` - Timesheet hours
- `simplicate://invoices` - All invoices

## Project Structure

```
├── src/
│   ├── config/
│   │   └── config.ts           # Configuration management
│   ├── simplicate/
│   │   ├── client.ts           # Simplicate API client
│   │   └── services.ts         # Service layer for Simplicate API
│   ├── mcp/
│   │   └── server.ts           # MCP server implementation
│   └── index.ts                # Entry point
├── .env                        # Environment variables (not in git)
├── .env.example                # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Security Notes

- Never commit your `.env` file or expose your API credentials
- The `.env` file is included in `.gitignore` by default
- Use environment variables for production deployments
- Simplicate API credentials are transmitted securely via HTTPS

## Development

### Building
```bash
npm run build
```

### Watch mode (auto-rebuild on changes)
```bash
npm run watch
```

## Troubleshooting

### Authentication Errors
- Verify your API key and secret are correct
- Ensure your Simplicate API base URL is correct (including your domain)
- Check that your API credentials have the necessary permissions

### Connection Issues
- Ensure the MCP server is running
- Check Claude Desktop config file syntax (valid JSON)
- Verify the absolute path to the server entry point
- Restart Claude Desktop after config changes

### API Rate Limits
- Simplicate may have API rate limits; adjust pagination parameters if needed
- Consider caching frequently accessed data

## Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- All new features include appropriate error handling

## Automatic deploys to Render (GitHub Actions)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-to-render.yml` which runs on push to `main`. The workflow builds the project and triggers a deploy via the Render API.

Required GitHub repository secrets:

- `RENDER_SERVICE_ID` — the ID of your Render service (find in your Render dashboard)
- `RENDER_API_KEY` — a Render API key with permission to create deploys

How it works:

- On push to `main`, Actions checks out the code, installs dependencies (`npm ci`) and runs `npm run build`.
- If the build succeeds, the workflow calls the Render API to trigger a deploy for the specified `RENDER_SERVICE_ID`.

Note: Render will still run your specified build/start commands as configured in the Render service settings.

- Documentation is updated for new features

## License

MIT

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Simplicate API Documentation](https://developer.simplicate.com/)
- [Claude Desktop](https://claude.ai/desktop)

## Support

For issues related to:
- **MCP Server**: Open an issue in this repository
- **Simplicate API**: Contact [Simplicate Support](https://www.simplicate.com/support)
- **Claude/MCP Protocol**: Visit [Anthropic's Documentation](https://docs.anthropic.com/)


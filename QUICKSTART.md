# Quick Start Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Simplicate API Credentials

Update the `.env` file with your Simplicate API base URL:

```env
SIMPLICATE_API_KEY=cDfOE6LLYzFk4F2rZyBkVur5mp4qri4S
SIMPLICATE_API_SECRET=H2yMIChUpKutBYtT52q7XvDrNqZhXpKM
SIMPLICATE_API_BASE_URL=https://act.simplicate.com/api/v2
```

**Note**: The base URL is configured for `act.simplicate.com`. If your Simplicate instance is different, update accordingly.

## 3. Build the Project

```bash
npm run build
```

## 4. Test the Server (Optional)

You can test the server by running it directly:

```bash
npm start
```

The server will start and listen on stdio (standard input/output) for MCP protocol messages.

## 5. Connect to Claude Desktop

### Find Your Claude Desktop Config File

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### Add the MCP Server Configuration

Open the config file and add:

```json
{
  "mcpServers": {
    "simplicate": {
      "command": "node",
      "args": ["/Users/dwayne/Documents/Playground/Simplicate/dist/index.js"],
      "env": {
        "SIMPLICATE_API_KEY": "cDfOE6LLYzFk4F2rZyBkVur5mp4qri4S",
        "SIMPLICATE_API_SECRET": "H2yMIChUpKutBYtT52q7XvDrNqZhXpKM",
        "SIMPLICATE_API_BASE_URL": "https://act.simplicate.com/api/v2"
      }
    }
  }
}
```

**Note**: This is configured for `act.simplicate.com`.

### Restart Claude Desktop

After updating the config file, restart Claude Desktop to load the MCP server.

## 6. Test in Claude

Once connected, you can ask Claude to interact with your Simplicate data:

**Example prompts:**
- "Show me all my projects from Simplicate"
- "Get the details of project ID 12345"
- "List all organizations in my CRM"
- "Search for projects related to 'marketing'"
- "Show me recent timesheet hours"
- "Get all invoices"

## Troubleshooting

### Using a different Simplicate domain?

If you're using a different Simplicate instance (not `act.simplicate.com`), update the base URL in both:
- `.env` file
- Claude Desktop config

The format is: `https://[your-domain].simplicate.com/api/v2`

### Authentication errors?

1. Verify your API credentials are correct
2. Check that your API key has the necessary permissions in Simplicate
3. Ensure the base URL is correct (including `/api/v2`)

### Claude Desktop not connecting?

1. Check that the path to `dist/index.js` is absolute and correct
2. Verify the JSON syntax in the config file (use a JSON validator)
3. Check Claude Desktop logs for error messages
4. Restart Claude Desktop after making changes

## Development Mode

For development, you can use `ts-node` instead of building:

```json
{
  "mcpServers": {
    "simplicate": {
      "command": "npx",
      "args": ["ts-node", "/Users/dwayne/Documents/Playground/Simplicate/src/index.ts"],
      "env": {
        "SIMPLICATE_API_KEY": "cDfOE6LLYzFk4F2rZyBkVur5mp4qri4S",
        "SIMPLICATE_API_SECRET": "H2yMIChUpKutBYtT52q7XvDrNqZhXpKM",
        "SIMPLICATE_API_BASE_URL": "https://act.simplicate.com/api/v2"
      }
    }
  }
}
```

This allows you to make changes without rebuilding, but it's slower to start.

**See CONFIGURATION.md for complete setup instructions specific to act.simplicate.com**


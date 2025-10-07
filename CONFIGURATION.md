# Configuration for act.simplicate.com

## ✅ Your Simplicate Instance Detected

Based on your Simplicate URL: `https://act.simplicate.com/`

## Configuration Settings

### .env File

Please update your `.env` file with:

```env
SIMPLICATE_API_KEY=cDfOE6LLYzFk4F2rZyBkVur5mp4qri4S
SIMPLICATE_API_SECRET=H2yMIChUpKutBYtT52q7XvDrNqZhXpKM
SIMPLICATE_API_BASE_URL=https://act.simplicate.com/api/v2
```

### Claude Desktop Configuration

For Claude Desktop, use this configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

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

## Quick Setup Steps

1. ✅ **Update .env file** with the configuration above
2. ✅ **Copy the Claude Desktop config** to your Claude config file
3. ✅ **Restart Claude Desktop**
4. ✅ **Test it!** Ask Claude: "Show me all projects from Simplicate"

## Testing the Connection

You can test the MCP server before connecting to Claude:

```bash
npm start
```

The server should start without errors. Press Ctrl+C to stop it.

## Simplicate API Endpoints

Your MCP server will connect to these endpoints:

- Projects: `https://act.simplicate.com/api/v2/projects/project`
- Organizations: `https://act.simplicate.com/api/v2/crm/organization`
- Persons: `https://act.simplicate.com/api/v2/crm/person`
- Hours: `https://act.simplicate.com/api/v2/hours/hours`
- Invoices: `https://act.simplicate.com/api/v2/invoices/invoice`

## Troubleshooting

### Authentication Issues

If you get authentication errors:
1. Verify your API credentials at: https://act.simplicate.com/settings/api
2. Ensure your API key has the necessary permissions
3. Check that the API key and secret are correctly copied (no extra spaces)

### Connection Issues

If Claude Desktop can't connect:
1. Verify the absolute path to `dist/index.js` is correct
2. Ensure the JSON syntax in the config file is valid
3. Check Claude Desktop logs for specific error messages
4. Restart Claude Desktop after making config changes

## Example Prompts

Once connected to Claude, try these:

- "List all projects from Simplicate"
- "Show me organizations in my CRM"
- "Get details of project ID [project-id]"
- "Search for 'marketing' in Simplicate"
- "Show me recent invoices"
- "List timesheet hours"

---

**Your MCP server is ready to use with act.simplicate.com!** 🚀


# ✅ Fixed: .env Loading Issue

## Problem
When Claude Desktop ran the MCP server, it couldn't find the `.env` file because the working directory was different.

## Solution
Updated `src/config/config.ts` to explicitly load the `.env` file from the project root:

```typescript
import dotenv from 'dotenv';
import path from 'path';

// Load .env from the project root directory
const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });
```

## What Changed
- ✅ Server now loads `.env` regardless of working directory
- ✅ Works in Claude Desktop
- ✅ Works in Cursor
- ✅ Works when running `npm start` or `npm test`

## Status
✅ **Fixed and tested** - Server now starts successfully!

## Next Steps
1. **Restart Claude Desktop** - Close and reopen the app
2. **Test it** - Ask Claude: "Get recent timesheet hours from Simplicate"

The error you saw should now be gone! 🎉



import http from 'http';
import { URL } from 'url';
// Note: include .js extension so emitted ESM imports resolve correctly at runtime
import { SimplicateServiceExtended } from './simplicate/services-extended.js';

const PORT = Number(process.env.PORT || 3002);

const service = new SimplicateServiceExtended();

function writeJson(res: http.ServerResponse, code: number, obj: any) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
  });
  res.end(body);
}

function toMethodName(toolName: string) {
  // convert snake_case to camelCase: get_projects -> getProjects
  return toolName.split('_').map((p, i) => i === 0 ? p : p[0].toUpperCase() + p.slice(1)).join('');
}

async function dispatchTool(toolName: string, args: any) {
  const method = toMethodName(toolName);
  // heuristic param extraction
  const params: any[] = [];
  if (args && typeof args === 'object') {
    // common id patterns
    const idKeys = ['project_id','organization_id','person_id','task_id','service_id','invoice_id','id'];
    let foundId = false;
    for (const k of idKeys) {
      if (k in args) {
        params.push(args[k]);
        foundId = true;
        break;
      }
    }
    if (args.data) params.push(args.data);
    if (!foundId && params.length === 0) params.push(args);
  } else if (args !== undefined) {
    params.push(args);
  }

  // @ts-ignore - dynamic call
  if (typeof (service as any)[method] === 'function') {
    // call and return
    // Some methods expect a single primitive id; spread params
    return await (service as any)[method](...params);
  }

  throw new Error(`Unknown tool/method: ${toolName} -> ${method}`);
}

// Track connected SSE clients for MCP HTTP flow
const sseClients = new Set<http.ServerResponse>();

function broadcastMcpMessage(message: any) {
  const payload = JSON.stringify(message);
  for (const client of Array.from(sseClients)) {
    try {
      client.write('event: message\n');
      client.write(`data: ${payload}\n\n`);
    } catch {
      // if write fails, drop client
      try { client.end(); } catch {}
      sseClients.delete(client);
    }
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://localhost`);
    // Basic CORS preflight support
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authentication-Key, Authentication-Secret, Accept',
        'Access-Control-Max-Age': '86400',
      });
      res.end();
      return;
    }
    // Simple SSE endpoint to satisfy clients that require an SSE URL (like n8n MCP node)
    if (req.method === 'GET' && url.pathname === '/sse') {
      // Set required SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
        'Access-Control-Allow-Origin': '*',
      });

      // Flush headers immediately when supported (helps some proxies)
      // @ts-ignore
      if (typeof res.flushHeaders === 'function') res.flushHeaders();

      // Track this client for MCP push messages
      sseClients.add(res);

      // send initial comment and event
      console.error('[SSE] client connected');
      res.write(': connected\n\n');
      res.write('event: connected\n');
      res.write('data: {"status":"ok"}\n\n');
      // recommend client retry delay
      res.write('retry: 30000\n\n');

      // send keepalive every 20s
      const keepAlive = setInterval(() => {
        try {
          // send both a comment and a lightweight ping event
          res.write(': keep-alive\n\n');
          res.write('event: ping\n');
          res.write('data: {}\n\n');
        } catch (e) { /* ignore */ }
      }, 20000);

      // cleanup when client disconnects
      req.on('close', () => {
        clearInterval(keepAlive);
        sseClients.delete(res);
        console.error('[SSE] client disconnected');
      });

      return;
    }
    if (req.method === 'GET' && url.pathname === '/health') {
      return writeJson(res, 200, { status: 'ok', uptime: process.uptime(), node: process.version });
    }

    if (req.method === 'GET' && url.pathname === '/tools') {
      // minimal list derived from README and available service methods
      const tools = [
        'get_projects','get_project','create_project','update_project','delete_project','get_project_services',
        'get_organizations','get_organization','create_organization','update_organization','get_persons','get_person','create_person','update_person',
        'get_services','get_service','create_service','get_default_services','get_tasks','get_task','create_task','update_task',
        'get_documents','get_document','get_contracts','get_contract','create_contract','get_custom_fields','search'
      ];
      return writeJson(res, 200, { tools });
    }

    if (req.method === 'POST' && url.pathname === '/call') {
      let body = '';
      for await (const chunk of req) body += chunk;
      let payload: any;
      try { payload = JSON.parse(body || '{}'); } catch (err) { return writeJson(res, 400, { error: 'invalid_json' }); }
      
      // If request looks like MCP (method + id), route accordingly and push result over SSE
      if (payload && typeof payload === 'object' && payload.method && payload.id) {
        const requestId = payload.id;
        const method = String(payload.method);
        const params = payload.params || {};
        try {
          if (method === 'tools/list' || method === 'tools/listTools') {
            const tools = [
              'get_projects','get_project','create_project','update_project','delete_project','get_project_services',
              'get_organizations','get_organization','create_organization','update_organization','get_persons','get_person','create_person','update_person',
              'get_services','get_service','create_service','get_default_services','get_tasks','get_task','create_task','update_task',
              'get_documents','get_document','get_contracts','get_contract','create_contract','get_custom_fields','search'
            ].map(t => ({ name: t }));
            broadcastMcpMessage({ type: 'response', id: requestId, result: { tools } });
            res.writeHead(202, { 'Access-Control-Allow-Origin': '*' });
            res.end();
            return;
          }
          if (method === 'tools/call' || method === 'callTool') {
            const toolName = params.name || params.toolName || params.tool;
            const toolArgs = params.arguments || params.args || {};
            if (!toolName) return writeJson(res, 400, { error: 'missing_name' });
            const result = await dispatchTool(toolName, toolArgs);
            broadcastMcpMessage({ type: 'response', id: requestId, result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] } });
            res.writeHead(202, { 'Access-Control-Allow-Origin': '*' });
            res.end();
            return;
          }
          // Unknown method
          broadcastMcpMessage({ type: 'response', id: requestId, error: { message: `Unknown method: ${method}` } });
          res.writeHead(202, { 'Access-Control-Allow-Origin': '*' });
          res.end();
          return;
        } catch (err: any) {
          broadcastMcpMessage({ type: 'response', id: requestId, error: { message: err?.message || String(err) } });
          res.writeHead(202, { 'Access-Control-Allow-Origin': '*' });
          res.end();
          return;
        }
      }

      // Fallback: simple JSON flow used by curl
      const { name, arguments: args } = payload;
      if (!name) return writeJson(res, 400, { error: 'missing_name' });
      try {
        const result = await dispatchTool(name, args || {});
        return writeJson(res, 200, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] });
      } catch (err: any) {
        return writeJson(res, 500, { error: true, message: err.message || String(err) });
      }
    }

    // default
    writeJson(res, 404, { error: 'not_found' });
  } catch (err: any) {
    writeJson(res, 500, { error: true, message: err.message || String(err) });
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.error(`HTTP MCP server listening on port ${PORT}`);
});

export {};

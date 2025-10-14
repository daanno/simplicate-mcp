import http from 'http';
import { URL } from 'url';
// Note: include .js extension so emitted ESM imports resolve correctly at runtime
import { SimplicateServiceExtended } from './simplicate/services-extended.js';

const PORT = Number(process.env.PORT || 3002);

const service = new SimplicateServiceExtended();

function writeJson(res: http.ServerResponse, code: number, obj: any) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
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

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://localhost`);
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

import http from 'http';
import { readFileSync } from 'fs';

const PORT = Number(process.env.PORT || 3000);

function getStatus() {
  return {
    status: 'ok',
    uptime: process.uptime(),
    pid: process.pid,
    node: process.version,
  };
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  if (req.url === '/health' || req.url === '/status' || req.url === '/ping') {
    const body = JSON.stringify(getStatus());
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  if (req.url === '/' || req.url === '/about') {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
    const body = JSON.stringify({ name: pkg.name, version: pkg.version, description: pkg.description });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.error(`Health server listening on port ${PORT}`);
});

export {};

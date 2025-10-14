addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  return new Response(JSON.stringify({ status: 'ok', message: 'placeholder worker' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

// exported for testability
export { handleRequest };

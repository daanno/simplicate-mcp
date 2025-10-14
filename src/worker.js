addEventListener('fetch', (event) => {
  event.respondWith(
    new Response(JSON.stringify({ status: 'ok', message: 'placeholder worker' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  );
});

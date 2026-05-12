// ByteOS Service Worker: The Header Stripper
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            // We clone the response to modify headers
            const newHeaders = new Headers(response.headers);
            
            // KILL the blockers
            newHeaders.delete('X-Frame-Options');
            newHeaders.delete('Content-Security-Policy');
            
            // Allow everything to be embedded
            newHeaders.set('Access-Control-Allow-Origin', '*');

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders,
            });
        }).catch(() => {
            // Fallback if the fetch fails
            return new Response("ByteOS: Site Connection Failed.");
        })
    );
});

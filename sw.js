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
// ByteOS Logic - Add this to the bottom of your existing file
self.addEventListener('fetch', (event) => {
    // We only want to intercept if the request is for an external site
    if (event.request.url.startsWith('http')) {
        event.respondWith(
            fetch(event.request).then((response) => {
                const newHeaders = new Headers(response.headers);
                newHeaders.delete('X-Frame-Options');
                newHeaders.delete('Content-Security-Policy');
                return new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: newHeaders,
                });
            }).catch(() => fetch(event.request)) // Fallback to normal fetch
        );
    }
});

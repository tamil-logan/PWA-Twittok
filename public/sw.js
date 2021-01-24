let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([

                '/index.html',
                '/',
                '/static/js/bundle.js',
                '/static/js/0.chunk.js',
                '/static/js/main.chunk.js',
                'https://fonts.googleapis.com/css?family=Open+Sans&display=swap',
                'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
                'https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap',
                '/static/media/twit-tok-logo.1d18ad24.png',
                '/static/media/bg_image.bcb260de.png',
                '/twit-tok-logo.png',
                '/twit-tok-logo%20144x144.png',
                '/manifest.json',
                '/signin',
                '/signup'

            ])
        })
    )

});

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
            })
        )
    }
})
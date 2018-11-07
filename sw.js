// here I used code provided at https://developers.google.com/web/fundamentals/primers/service-workers/

const cacheName = 'v1';

//Add an install event listener to the service worker to cashe offline files
self.addEventListener('install', function(event) {
    event.waitUntil(
        //stores pages to a new cache 'v1'
      caches.open(cacheName).then(function(cache) {
        return cache.addAll([
            '/index.html',
            '/restaurant.html',
            '/css/styles.css',
            '/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/data/restaurants.json',
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.jpg',
            '/img/5.jpg',
            '/img/6.jpg',
            '/img/7.jpg',
            '/img/8.jpg',
            '/img/9.jpg',
            '/img/10.jpg'
        ]);
      })
    );
});

//If resource is not in cashe, it is requested from network
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        // A request can only be consumed once thus we need
        // to clone the response.
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            /*if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }*/
            var responseToCache = response.clone();
            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
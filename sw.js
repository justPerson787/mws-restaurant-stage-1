// here I used some code provided by https://developers.google.com/web/fundamentals/primers/service-workers/

const casheName = 'v1';

//Add an install event listener to the service worker to cashe offline files
self.addEventListener('install', function(event) {
    event.waitUntil(
        //stores pages to a new cache 'v1'
      caches.open(casheName).then(function(cache) {
        return cache.addAll([
            '/',
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
        return response || fetch(event.request);
      })
    );
});
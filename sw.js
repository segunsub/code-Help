self.addEventListener("install", e => {
    e.waitUntil( 
        caches.open("static").then(cache => {

           return cache.addAll(["sw.js","index.html","manifest.json","src/index.js","src/index.css","icon/iphone6_splash.png","icon/iphoneplus_splash.png","icon/iphonex_splash.png","icon/iphonexsmax_splash.png","src/prism.css","src/prism.js","src/align-justify.svg","icon/iphonexr_splash.png","icon/gold.png","icon/wrk.png","icon/xxxhdpi.png"]) 
        })
    )     
})       



self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });
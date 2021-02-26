self.addEventListener("install", e => {
    e.waitUntil( 
        caches.open("static").then(cache => {
            console.log(cache)
           return cache.addAll(["index.html", "sw.js","manifest.json","src/index.js","src/index.css","src/prism.css","src/prism.js","src/align-justify.svg","icon/gold.png","icon/wrk.png","icon/xxxhdpi.png"]) 
        })
    )     
})       
 
self.addEventListener("fetch", e => {
   e.respondWith(
       caches.match(e.request).then(response => {
           return response || fetch(e.request);
       })
   )
})
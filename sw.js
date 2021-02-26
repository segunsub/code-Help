self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
           return cache.addAll(["./", "./icon/gold.png","./icon/wrk.png","./icon/xxxhdpi.png"])
        })
    )
})

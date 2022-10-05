const cacheName = "set-gems-v5";
const contentToCache = [
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/image/gems/blue-oval.png",
  "/image/gems/blue-square.png",
  "/image/gems/green-pear.png",
  "/image/gems/red-oval.png",
  "/image/gems/red-square.png",
  "/image/gems/blue-pear.png",
  "/image/gems/green-oval.png",
  "/image/gems/green-square.png",
  "/image/gems/red-pear.png",
  "/image/backgrounds/rose-circle.png",
  "/image/backgrounds/white-circle.png",
  "/image/backgrounds/yellow-circle.png",
  "/image/backgrounds/rose-door.png",
  "/image/backgrounds/white-door.png",
  "/image/backgrounds/yellow-door.png",
  "/image/backgrounds/rose-spider.png",
  "/image/backgrounds/white-spider.png",
  "/image/backgrounds/yellow-spider.png",
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(createCache());
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(clearCache());
});

self.addEventListener("fetch", (ev) => {
  if (ev.request.mode === "cors") {
    return;
  }

  ev.respondWith(findOrCreateCache(ev.request));
});

async function createCache() {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(contentToCache);
  } catch(err) {
    console.log("Failed to cache", err);
  }
}

async function clearCache() {
  try {
    const keys = await caches.keys();
    const pendingDeleteCaches = keys.map((key) => {
      if (cacheName !== key) {
        return caches.delete(key);
      }
    });

    await Promise.all(pendingDeleteCaches);
  } catch(err) {
    console.log("Failed to clear caches", err);
  }
}

async function findOrCreateCache(request) {
  try {
    const resource = await caches.match(request);

    if (resource) {
      return resource;
    }

    const response = await fetch(request);

    if (request.url.startsWith("http") && !request.url.includes("socket")) {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
    }

    return response;
  } catch(err) {
    console.log("Failed add cache", err, request.url);
  }
}

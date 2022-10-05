import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { RangeRequestsPlugin } from "workbox-range-requests";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

import preCachedFiles from "./addPrecache";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute(preCachedFiles);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");

registerRoute(
  ({ request, url }) => {
    if (request.mode !== "navigate") {
      return false;
    }

    if (url.pathname.startsWith("/_")) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "way-images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 31536000
      })
    ]
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

registerRoute(
  ({url}) => url.origin === `${process.env.REACT_APP_API_URL}` &&
             url.pathname.startsWith("/game/"),
  new StaleWhileRevalidate({
    cacheName: "way-api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

registerRoute(
  ({url}) => url.pathname.endsWith(".mp3"),
  new StaleWhileRevalidate({
    cacheName: "way-music",
    plugins: [
      new RangeRequestsPlugin()
    ]
  })
);

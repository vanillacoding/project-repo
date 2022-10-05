import { registerRoute } from "workbox-routing";
import { precacheAndRoute } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from "workbox-strategies";

registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages",
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "manifest",
  new StaleWhileRevalidate({
    cacheName: "assets",
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 100 }),
    ],
  })
);

precacheAndRoute([
  { url: "background/desk1.png", revision: null },
  { url: "background/desk2.png", revision: null },
  { url: "background/desk3.png", revision: null },
  { url: "background/stage.png", revision: null },
  { url: "background/lobby.png", revision: null },
  { url: "card/card.png", revision: null },
  { url: "card/check-blue.png", revision: null },
  { url: "card/check-green.png", revision: null },
  { url: "card/check-yellow.png", revision: null },
  { url: "card/kiwi1.png", revision: null },
  { url: "card/kiwi2.png", revision: null },
  { url: "card/kiwi3.png", revision: null },
  { url: "card/music-blue.png", revision: null },
  { url: "card/music-green.png", revision: null },
  { url: "card/music-yellow.png", revision: null },
  { url: "card/orange1.png", revision: null },
  { url: "card/orange2.png", revision: null },
  { url: "card/orange3.png", revision: null },
  { url: "card/star-blue.png", revision: null },
  { url: "card/star-green.png", revision: null },
  { url: "card/star-yellow.png", revision: null },
  { url: "card/strawberry1.png", revision: null },
  { url: "card/strawberry2.png", revision: null },
  { url: "card/strawberry3.png", revision: null },
  { url: "card/trophy-blue.png", revision: null },
  { url: "card/trophy-green.png", revision: null },
  { url: "card/trophy-yellow.png", revision: null },
  { url: "character/run.json", revision: null },
  { url: "character/run.png", revision: null },
  { url: "character/stand.json", revision: null },
  { url: "character/stand.png", revision: null },
  { url: "character/stone1.png", revision: null },
  { url: "character/stone2.png", revision: null },
  { url: "character/stone3.png", revision: null },
  { url: "character/stone4.png", revision: null },
  { url: "favicon.4c03e4e8.ico", revision: null },
  { url: "game/board.png", revision: null },
  { url: "game/enemy-blue.png", revision: null },
  { url: "game/enemy-green.png", revision: null },
  { url: "game/enemy-yellow.png", revision: null },
  { url: "game/cannon.png", revision: null },
  { url: "game/coin-image.png", revision: null },
  { url: "game/coin.json", revision: null },
  { url: "game/coin.png", revision: null },
  { url: "game/cursor-anim.json", revision: null },
  { url: "game/cursor-anim.png", revision: null },
  { url: "game/cursor.png", revision: null },
  { url: "game/cursorClick.png", revision: null },
  { url: "game/goBackButton.png", revision: null },
  { url: "game/heart.png", revision: null },
  { url: "game/help.png", revision: null },
  { url: "game/lock.png", revision: null },
  { url: "game/logout.png", revision: null },
  { url: "game/point.png", revision: null },
  { url: "game/sound-off.png", revision: null },
  { url: "game/sound-on.png", revision: null },
  { url: "game/star-empty.png", revision: null },
  { url: "game/star.png", revision: null },
  { url: "game/user-info.png", revision: null },
  { url: "sound/background-music.mp3", revision: null },
  { url: "sound/beep.wav", revision: null },
  { url: "sound/click.wav", revision: null },
  { url: "sound/coin.wav", revision: null },
  { url: "sound/correct.mp3", revision: null },
  { url: "sound/jump.wav", revision: null },
  { url: "sound/pop.wav", revision: null },
]);

import home from "./Components/home/home";
import play from "./Components/play/play";

import fontNaruto from "../assets/font/njnaruto.ttf";
import faviconHead from "../assets/images/ninja6_head.png";

export const routes = {
  "/": {
    html: home.html,
    js: home.execute,
  },
  "/play": {
    html: play.html,
    js: play.execute,
  },
};

const rootDiv = document.getElementById("root");
const currentRoute = window.location.pathname;
const fontFace = new FontFace("fontNaruto", `url(${fontNaruto})`);

(function attatchFavicon() {
  const link = document.createElement("link");

  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = faviconHead;
  document.getElementsByTagName("head")[0].appendChild(link);
}());

fontFace.load().then((loadedFace) => {
  document.fonts.add(loadedFace);
  rootDiv.style.fontFamily = "fontNaruto";

  rootDiv.innerHTML = routes[currentRoute].html;
  routes[currentRoute].js();

  window.isWindowReady = true;
});

export function moveToRoute(data, route) {
  window.history.pushState({ data }, route, route);

  if (route === "/") {
    window.location.reload();
    window.onload = () => {
      window.isWindowReady = true;
      loadPage(route);
    };
  } else {
    loadPage(route);
  }
}

export function loadPage(route) {
  rootDiv.innerHTML = routes[route].html;
  routes[route].js();
  addRouteEvent();
}

export function addRouteEvent() {
  const routeButtons = document.getElementsByClassName("route");

  Array.from(routeButtons).forEach(routeButton => {
    routeButton.addEventListener("click", () => {
      const route = routeButton.getAttribute("route");

      moveToRoute("test", route);
    });
  });
}

addRouteEvent();

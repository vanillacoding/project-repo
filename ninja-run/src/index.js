import { loadPage } from "./router";
import "./store/store";

window.onpopstate = () => {
  const currentPath = window.location.pathname;

  if (currentPath === "/") {
    window.location.reload();
    window.onload = () => {
      window.isWindowReady = true;
      loadPage(currentPath);
    };
  } else {
    loadPage(currentPath);
  }
};

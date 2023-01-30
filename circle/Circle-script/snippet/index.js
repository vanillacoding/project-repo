(function () {
  function postUserInfo() {
    window.q = arguments;
  }

  window.circle = postUserInfo;

  function async_load() {
    if (window.CircleInitialized) {
      return;
    }

    window.CircleInitialized = true;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://cdn.jsdelivr.net/gh/Team-TTT/Circle-script@ttt/circleScript/index.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  if (document.readyState === "complete") {
    async_load();
  } else if (window.attachEvent) {
    window.attachEvent("onload", async_load);
  } else {
    window.addEventListener("DOMContentLoaded", async_load, false);
    window.addEventListener("load", async_load, false);
  }
})();

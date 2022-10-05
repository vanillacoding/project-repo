const fadeOut = (el) => {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.01) < 0) {
      el.remove();
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

export default fadeOut;

import gsap from "gsap";

const transition = (() => {
  const showView = (element, duration) => {
    gsap.to(element, { opacity: 1, duration });
  };

  const showInputError = (element, message) => {
    element.textContent = message;
    gsap.to(element, { duration: 2, y: 10, ease: "elastic.out(1, 0.3)" });
  };

  return Object.freeze({
    showView,
    showInputError,
  });
})();

export default transition;

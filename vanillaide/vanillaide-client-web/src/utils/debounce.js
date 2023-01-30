export default function (func) {
  let timer = null;

  return function (...args) {
    const delay = args[args.length - 1];
    const parameter = args.slice(0, -1);
    if (timer) {
      clearTimeout(timer);
    }
    if (delay === 0) {
      func(...parameter);
    } else {
      timer = setTimeout(() => {
        func(...parameter);
      }, delay);
    }
  };
}

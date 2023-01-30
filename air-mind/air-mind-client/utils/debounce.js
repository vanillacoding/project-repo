let inDebounce;

export default function debounce(callback, wait = 1000, ...arg) {
  clearTimeout(inDebounce);
  inDebounce = setTimeout(() => {
    callback(...arg);
  }, wait);
}

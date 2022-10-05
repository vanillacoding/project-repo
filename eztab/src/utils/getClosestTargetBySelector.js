const getClosestTargetBySelector = ($target, selector) => {
  if ($target.classList.contains(selector.substring(1))) {
    return $target;
  }

  return $target.closest(selector);
};

export default getClosestTargetBySelector;

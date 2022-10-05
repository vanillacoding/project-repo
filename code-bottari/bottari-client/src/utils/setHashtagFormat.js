function setHashtagFormat(event) {
  const { nativeEvent, target } = event;
  const { data: PressedKey } = nativeEvent;
  let { value } = target;

  if (PressedKey === " ") {
    value += "#";
  }

  if (value[value.length - 1] === " ") {
    value = value.slice(0, -1);
  }

  if (value === "") {
    value = "#";
  }

  return value;
}

export default setHashtagFormat;

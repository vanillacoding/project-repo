export const selectColor = (props) => {
  switch (props.color) {
    case "white":
      return props.theme.color.white;
    case "black":
      return props.theme.color.black;
    case "blue":
      return props.theme.color.blue;
    default:
      return props.theme.color.black;
  }
};

export const selectSize = (props) => {
  switch (props.size) {
    case "small":
      return props.theme.padding.small;
    case "base":
      return props.theme.padding.base;
    case "middle":
      return props.theme.padding.middle;
    case "big":
      return props.theme.padding.big;
    default:
      return props.theme.color.black;
  }
};

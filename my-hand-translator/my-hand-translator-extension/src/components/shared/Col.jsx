import { styled } from "@stitches/react";

const Col = styled("div", {
  textAlign: "center",

  variants: {
    grid: {
      col1: {
        flex: 1,
      },
      col2: {
        flex: 2,
      },
    },
  },
});

export default Col;

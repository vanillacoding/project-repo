import { styled } from "@stitches/react";

const Title = styled("h1", {
  color: "$black",
  fontSize: "20px",
  fontWeight: "800",

  variants: {
    color: {
      blue: { color: "$blue" },
      lightBlue: { color: "$lightBlue" },
      apricot: { color: "$apricot" },
      white: { color: "$white" },
    },

    align: {
      center: { textAlign: "center" },
    },
  },
});

export default Title;

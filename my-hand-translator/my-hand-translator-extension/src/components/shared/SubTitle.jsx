import { styled } from "@stitches/react";

const SubTitle = styled("h3", {
  color: "$black",
  fontSize: "20px",
  margin: "10px",

  variants: {
    color: {
      blue: { color: "$blue" },
      lightBlue: { color: "$lightBlue" },
      apricot: { color: "$apricot" },
      white: { color: "$white" },
    },

    fontSize: {
      big: { fontSize: "30px" },
      middle: { fontSize: "20px" },
      small: { fontSize: "10px" },
    },

    align: {
      center: { textAlign: "center" },
    },

    bgColor: {
      aqua: { backgroundColor: "aqua" },
    },
  },
});

export default SubTitle;

import { styled } from "@stitches/react";

const ContainerStyled = styled("div", {
  display: "flex",
  padding: "10px",
  borderRadius: "10px",
  backgroundColor: "#FBFBFB",

  variants: {
    flex: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },

    size: {
      big: {
        width: "400px",
        height: "max-content",
      },
      medium: {
        width: "300px",
        height: "600px",
      },
      small: {
        width: "200px",
        height: "400px",
      },
    },

    justify: {
      start: { justifyContent: "flex-start" },
      end: { justifyContent: "flex-end" },
      center: { justifyContent: "center" },
      spaceBetween: { justifyContent: "space-between" },
      spaceAround: { justifyContent: "space-around" },
      spaceEvenly: { justifyContent: "space-evenly" },
    },

    alignContent: {
      start: { alignContent: "flex-start" },
    },

    align: {
      start: { alignItems: "flex-start" },
      end: { alignItems: "flex-end" },
      center: { alignItems: "center" },
      spaceBetween: { alignItems: "space-between" },
      spaceAround: { alignItems: "space-around" },
      itemCenter: { alignItems: "center" },
    },

    border: {
      black: {
        border: "1px solid $black",
      },
    },

    pos: {
      relative: { position: "relative" },
    },
  },
});

export default ContainerStyled;

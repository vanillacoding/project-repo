import { styled } from "../config/stitches.config";

const ButtonToGoAnotherSite = styled("a", {
  display: "flex",
  minWidth: "150px",
  padding: "20px 40px",
  margin: "10px",
  borderRadius: "4px",
  background: "$apricot",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: 600,
  textDecoration: "none",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all .2s ease",
  boxShadow:
    "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",

  "&:hover": {
    background: "$lightApricot",
  },
});

export default ButtonToGoAnotherSite;

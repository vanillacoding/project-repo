import { styled } from "../config/stitches.config";

const Article = styled("article", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#444444",
  flex: 1,

  "& h1": {
    fontSize: "2em",
    marginBottom: "10px",
  },
  "& h2": {
    fontSize: "2em",
    marginBottom: "30px",
  },
  "& p": {
    fontSize: "1.3em",
    lineHeight: "1.7",
    marginBottom: "10px",
    wordBreak: "keep-all",
  },
});

export default Article;

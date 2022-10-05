import { styled } from "../../config/stitches.config";

export const Button = styled("button", {
  borderRadius: "5px",
  backgroundColor: "white",
  padding: "5px 15px",
  color: "#1976d2",
  fontSize: "20px",
  wordBreak: "keep-all",
  overflowWrap: "break-word",
  border: "1px solid rgba(25, 118, 210, 0.5)",
  boxShadow:
    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.3)",
  },

  variants: {
    status: {
      on: { color: "$apricot" },
      off: { color: "#1976d2" },
    },
  },
});

export const TransitionButton = styled(Button, {
  padding: "6px 16px",
  backgroundColor: "#1a6dd9",
  color: "white",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "&:hover": {
    backgroundColor: "rgb(210 227 252)",
  },
});

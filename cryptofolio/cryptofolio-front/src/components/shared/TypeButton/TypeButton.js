import styled from "styled-components";

const TypeButton = styled.button`
  margin-top: ${(props) => (props.margin && props.margin[0]) || "0"};
  margin-right: ${(props) => (props.margin && props.margin[1]) || "0"};
  margin-bottom: ${(props) => (props.margin && props.margin[2]) || "0"};
  margin-left: ${(props) => (props.margin && props.margin[3]) || "0"};

  padding-top: ${(props) => (props.padding && props.padding[0]) || "8px"};
  padding-right: ${(props) => (props.padding && props.padding[1]) || "16px"};
  padding-bottom: ${(props) => (props.padding && props.padding[2]) || "8px"};
  padding-left: ${(props) => (props.padding && props.padding[3]) || "16px"};

  background-color: ${(props) =>
    props.picked ? props.bgColor || "#f1c40f" : "white"};
  font-weight: ${(props) => (props.picked ? "600" : "400")};
  font-size: ${(props) => props.fontSize || "0.9rem"};
  color: ${(props) => (props.picked ? props.color || "black" : "#57606f")};

  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

export default TypeButton;

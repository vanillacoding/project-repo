import styled from "styled-components";

const Button = styled.button`
  margin-top: ${(props) => (props.margin && props.margin[0]) || "0"};
  margin-right: ${(props) => (props.margin && props.margin[1]) || "0"};
  margin-bottom: ${(props) => (props.margin && props.margin[2]) || "0"};
  margin-left: ${(props) => (props.margin && props.margin[3]) || "0"};
  padding: 10px 20px;
  border: 3px solid black;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: ${(props) => props.bgColor || "#f1c40f"};
  font-weight: ${(props) => props.fontWeight || "600"};
  font-size: ${(props) => props.fontSize || "1.2rem"};
  color: black;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

export default Button;

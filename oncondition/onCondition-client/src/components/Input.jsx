import styled from "styled-components";

const Input = styled.input`
  border-radius: 10px;
  border: 3px solid ${(props) => props.lineColor
    ? props.lineColor : props.theme.background.main};
  width: ${(props) => props.width
    ? (props.width + "px") : "150px"};
  height: ${(props) => props.height
    ? (props.height + "px") : "50px"};
  margin: 5px;
  outline: none;
`;

export default Input;

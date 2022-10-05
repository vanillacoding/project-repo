import styled from "styled-components";

const Input = styled.input`
  margin-top: ${(props) => (props.margin && props.margin[0]) || "0"};
  margin-right: ${(props) => (props.margin && props.margin[1]) || "0"};
  margin-bottom: ${(props) => (props.margin && props.margin[2]) || "0"};
  margin-left: ${(props) => (props.margin && props.margin[3]) || "0"};

  width: 100%;
  padding: 10px;
  border: 0.5px solid gray;
  border-radius: 2px;
  outline: none;
  color: white;
  font-weight: 800;
  background-color: inherit;

  :focus {
    outline: none;
  }
`;

export default Input;

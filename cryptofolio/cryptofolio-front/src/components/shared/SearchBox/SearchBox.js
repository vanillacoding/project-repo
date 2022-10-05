import styled from "styled-components";

const SearchBox = styled.form`
  font-weight: ${(props) => props.fontWeight || "600"};
  font-size: ${(props) => props.fontSize || "0.7rem"};
  color: ${(props) => (props.picked ? "white" : "black")};

  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 2px;
  border: 0.5px solid #b2bec3;
  color: #b2bec3;
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: "white";

  input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    color: white;
    font-weight: 800;
    background-color: inherit;
  }

  input::placeholder {
    font-weight: 400;
    color: #dfe6e9;
  }

  button {
    border: none;
    color: #b2bec3;
    background-color: inherit;
  }
`;

export default SearchBox;

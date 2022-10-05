import styled from "styled-components";

// TODO: 버튼 스타일 작업
const StyledButton = styled.button`
  border: 1px solid black;
  border-radius: 0.3rem;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }
`;

export default StyledButton;

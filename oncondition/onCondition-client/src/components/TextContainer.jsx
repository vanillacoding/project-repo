import styled from "styled-components";

const TextContainer = styled.div`
  flex-grow: 1;
  height: 12rem;
  margin: 5px 20px 20px 20px;
  padding: 5px 15px;
  line-height: 2rem;
  border-radius: 7px;
  background: ${({ theme }) => theme.background.input};
  opacity: 0.9;
  color: ${({ theme }) => theme.text.input};
  text-align: left;
  overflow: auto;
`;

export default TextContainer;

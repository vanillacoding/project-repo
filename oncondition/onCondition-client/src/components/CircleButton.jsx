import styled from "styled-components";

const CircleButton = styled.button`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  padding-bottom: 0.3rem;
  background-color: ${(props) => props.color};
  color: ${({ theme }) => theme.text.button};
  box-shadow: ${({ theme }) => theme.shadow.main};
`;

export default CircleButton;

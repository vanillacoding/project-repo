import styled from "styled-components";

export default styled.div`
  display: flex;
  padding-right: 50px;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.Solitude};
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.ItemHoverColor};
  }
`;

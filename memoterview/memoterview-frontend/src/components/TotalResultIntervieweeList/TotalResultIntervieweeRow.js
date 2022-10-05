import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.3fr 0.4fr 0.05fr;
  height: 40px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.LinkWater};
  border-radius: 5px;
  box-sizing: border-box;

  &:not(:first-child) {
    border-top: none;
  }
`;

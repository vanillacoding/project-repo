import styled from "styled-components";

export default styled.div`
  min-height: 100vh;

  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  color: ${({ theme }) => theme.COLOR};
`;

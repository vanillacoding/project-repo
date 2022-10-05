import styled from "styled-components";

const GraphWrapper = styled.div`
  margin-top: 5rem;
  padding: 3rem 5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.background.graph};

  @media screen and (max-width: 500px) {
    padding: 2rem;
  }
`;

export default GraphWrapper;

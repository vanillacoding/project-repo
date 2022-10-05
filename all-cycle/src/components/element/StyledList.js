import styled from "styled-components";

const Container = styled.ul`
  width: 100%;
  margin: auto;
  margin-top: 15px;
  padding: 1em;
`;

function StyledList({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default StyledList;

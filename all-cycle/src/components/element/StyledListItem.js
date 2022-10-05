import styled from "styled-components";

const Container = styled.li`
  width: 100%;
  height: 100%;
  min-height: 10vh;
  display: flex;
  padding: 0.3em;

  border-top: 1px solid ${(props) => props.theme.darkGreen.color};
`;

function StyledListItem({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default StyledListItem;

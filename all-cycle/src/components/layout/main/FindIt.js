import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 30%;
  left: 15%;
  width: 70vw;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2vw;
  background-color: ${(props) => props.theme.white.color};
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
`;

const Message = styled.div`
  color: ${(props) => props.theme.primary.color};
`;

function FindIt({ result }) {
  return (
    <Container>
      <Message>{result}</Message>
    </Container>
  );
}

export default FindIt;

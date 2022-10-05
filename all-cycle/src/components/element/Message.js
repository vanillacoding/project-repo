import styled from "styled-components";

const Container = styled.div`
  font-size: 1.3em;
  color: red;
`;

function Message(message) {
  return (
    <Container>{message}</Container>
  );
}

export default Message;

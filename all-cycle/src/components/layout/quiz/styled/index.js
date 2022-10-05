import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  color: ${(props) => props.theme.primary.color};
  background-color:  ${(props) => props.theme.badgeBg.color};
`;

const CreatedBy = styled.p`
  color: ${(props) => props.theme.gray.color};
  font-size: 0.3em;
  margin-left: 1em;
`;

const Message = styled.div`
  padding: 0.5em;
  text-align: end;
  font-family: ${(props) => props.theme.fontKor};
`;

const H3 = styled.h3`
  font-size: 3em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 0;
`;

const Text = styled.p`
  font-size: 0.9em;
  color: ${(props) => props.theme.darkGray.color};
`;

export {
  Container,
  Message,
  H3,
  Text,
  CreatedBy,
};

import styled from "styled-components";

import NextLink from "@/components/element/NextLink";

const Container = styled.div`
  width: 100%;
  max-height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  font-family: ${(props) => props.theme.fontEng};
  color: ${(props) => props.theme.white.color};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  margin-bottom: 1em;
`;

const Title = styled.span`
  font-size: 1.2em;
  font-weight: 600;
`;

const Text = styled.span`
  padding: 0.5em 1em;
  border-radius: 2vw;
  color: ${(props) => props.theme.white.color};
  font-size: 0.7em;
  background-color: ${(props) => props.theme.lightGreen.color};


  &:hover {
    transition: all 0.5s;
    transform: translateX(100px);
  }
`;

function HeadingLine({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Text>
        <NextLink href="/product">
          MORE..
        </NextLink>
      </Text>
    </Container>
  );
}

export default HeadingLine;

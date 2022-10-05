import Head from "next/head";
import styled from "styled-components";

const Container = styled.div`
  color: ${(props) => props.theme.font.color};
`;

const Main = styled.main`
`;

function Layout(props) {
  return (
    <Container>
      <Head>
        <title>ALL-Cycle</title>
        <meta name="description" content="Search first, Buy next!" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,500&family=Nanum+Gothic:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <Main>
        {props.children}
      </Main>
    </Container>
  );
}

export default Layout;

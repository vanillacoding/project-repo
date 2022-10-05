import { useEffect, useState } from "react";
import styled from "styled-components";

import fetchData from "@/utils/fetchData";
import HeadingLine from "@/components/element/HeadingLine";
import Loading from "@/components/layout/Loading";
import MainCamera from "@/components/layout/main";
import Slider from "@/components/layout/main/Slider";

const Container = styled.div`
  /* width: 100vw; */
  width: 550px;
  height: 90vh;
  margin: 0;
  background-color: ${(props) => props.theme.primary.color};
  overflow: hidden;
`;

export default function Main({ topScoreList }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(setTimeoutId);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <MainCamera />
      <HeadingLine title="TOP LANK ITEMS" />
      <Slider list={topScoreList} />
    </Container>
  );
}

export async function getServerSideProps() {
  const response = await fetchData("GET", `${process.env.HOMEPAGE_URL}/api/product/topScore`);

  return {
    props: {
      topScoreList: response.data || [],
    },
  };
}

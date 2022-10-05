import fetchData from "@/utils/fetchData";
import useManager from "@/hooks/useManager";
import ProductList from "@/components/layout/manager";
import {
  Container,
  Info,
  Strong,
  ButtonContainer,
  Button,
} from "@/components/layout/manager/styled";

function Manager({ list = [] }) {
  const {
    count,
    message,
    crawlData,
    updateData,
    handleChange,
  } = useManager(list);

  return (
    <Container>
      <Info>
        <Strong>관리자페이지 </Strong>
        {message && <span>{message}</span>}
        {count && <span>업데이트 된 제품 수: {count}</span>}
        <ButtonContainer>
          <Button onClick={crawlData}>
            NEW 크롤링
          </Button>
          <Button onClick={updateData}>
            DB 업데이트
          </Button>
        </ButtonContainer>
      </Info>

      <ProductList list={list} handleChange={handleChange} />
    </Container>
  );
}

export default Manager;

export async function getServerSideProps() {
  const response = await fetchData("GET", `${process.env.HOMEPAGE_URL}/api/product`);

  if (response.result) {
    return {
      props: { list: response.data },
    };
  }

  return {
    props: { list: [] },
  };
}

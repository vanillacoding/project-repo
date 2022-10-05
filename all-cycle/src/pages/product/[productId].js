import { useState } from "react";

import connectDB from "@/utils/connectDB";
import fetchData from "@/utils/fetchData";
import ReviewForm from "@/components/layout/review/ReviewForm";
import ReviewList from "@/components/layout/review/ReviewList";
import ScoreContainer from "@/components/layout/product/ScoreContainer";
import {
  ProductItemContainer,
  ProductContainer,
  Picture,
  ProductInfo,
  ProductName,
} from "@/components/layout/product/styled";

function ProductItem({ product }) {
  const {
    _id,
    name,
    imgUrl,
    imgAlt,
    recycleScoreAvg,
    preferenceScoreAvg,
    reviews,
  } = product;

  const [isList, setIsList] = useState(true);

  function toggle() {
    setIsList((prev) => !prev);
  }

  return (
    <ProductItemContainer>
      <ProductContainer>
        <Picture src={imgUrl} alt={imgAlt} width={100} height={100} />
        <ProductInfo>
          <ProductName>{name}</ProductName>
        </ProductInfo>
      </ProductContainer>

      {isList ? (
        <>
          <ScoreContainer
            recycleScoreAvg={recycleScoreAvg}
            preferenceScoreAvg={preferenceScoreAvg}
          />
          <ReviewList reviews={reviews} toggle={toggle} />
        </>
      ) : (
        <ReviewForm productId={_id} toggle={toggle} />
      )}
    </ProductItemContainer>
  );
}

export default ProductItem;

export async function getServerSideProps(context) {
  await connectDB();

  const { productId } = context.params;
  const response = await fetchData("GET", `${process.env.HOMEPAGE_URL}/api/product/${productId}`);

  if (!response.result) {
    return {
      props: { product: {} },
    };
  }

  return {
    props: { product: response.data },
  };
}

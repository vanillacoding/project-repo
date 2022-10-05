import ScoreContainer from "@/components/layout/product/ScoreContainer";
import {
  Section,
  ItemImage,
  InfoContainer,
  Name,
} from "@/components/layout/product/styled";

function ProductItem({ product, isEven }) {
  const {
    name,
    imgUrl,
    imgAlt,
    recycleScoreAvg,
    preferenceScoreAvg,
  } = product;

  return (
    <Section isEven={isEven}>
      <ItemImage src={imgUrl} alt={imgAlt} />

      <InfoContainer>
        <Name isEven={isEven} size={0.7}>{name}</Name>
        <ScoreContainer
          recycleScoreAvg={recycleScoreAvg}
          preferenceScoreAvg={preferenceScoreAvg}
        />
      </InfoContainer>
    </Section>
  );
}

export default ProductItem;

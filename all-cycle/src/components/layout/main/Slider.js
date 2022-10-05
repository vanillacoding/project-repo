import NextLink from "@/components/element/NextLink";
import {
  SliderContainer,
  Wrapper,
  ItemImage,
  ImageContainer,
} from "@/components/layout/main/styled";

function Slider({ list }) {
  const carouselList = list.concat(list[0]);

  return (
    <SliderContainer>
      <Wrapper>
        {carouselList.map((letter) => {
          const { _id, imgUrl, imgAlt } = letter;

          return (
            <NextLink key={_id + Math.random(2)} href={`/product/${_id}`}>
              <ImageContainer>
                <ItemImage src={imgUrl} alt={imgAlt} />
              </ImageContainer>
            </NextLink>
          );
        })}
      </Wrapper>
    </SliderContainer>
  );
}

export default Slider;

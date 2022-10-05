import { PhotoList, ImageContainer, Image } from "@/components/layout/myPage/styled/ReviewsStyled";

function Photos({ pictures }) {
  return (
    <PhotoList>
      {pictures?.map((picture) => (
        <ImageContainer key={picture}>
          <Image src={picture} alt={picture} />
        </ImageContainer>
      ))}
    </PhotoList>
  );
}

export default Photos;

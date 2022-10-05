/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { styled } from "../config/stitches.config";

import Container from "./Container";
import Article from "./Article";
import useScrollFadeIn from "../hooks/useScrollFadeIn";

function ContentWithImage({ title, descriptions, imgSrc, style, reverse }) {
  const animatedItem = useScrollFadeIn();

  return (
    <ContentWithImageStyled css={style}>
      {reverse && (
        <Container {...animatedItem}>
          <ContentStyled
            css={{
              "@medium": {
                flexDirection: "column-reverse",
              },
            }}
          >
            <ImageWrap
              css={{
                marginRight: "50px",
              }}
            >
              <img src={imgSrc} alt="서비스_사진" />
            </ImageWrap>

            <Article>
              <h2>{title}</h2>
              {descriptions.map((description) => (
                <p key={description.id}>{description.text}</p>
              ))}
            </Article>
          </ContentStyled>
        </Container>
      )}

      {!reverse && (
        <Container {...animatedItem}>
          <ContentStyled>
            <Article
              css={{
                marginRight: "50px",
              }}
            >
              <h2>{title}</h2>
              {descriptions.map((description) => (
                <p key={description.id}>{description.text}</p>
              ))}
            </Article>

            <ImageWrap>
              <img src={imgSrc} alt="서비스_사진" />
            </ImageWrap>
          </ContentStyled>
        </Container>
      )}
    </ContentWithImageStyled>
  );
}

const ImageWrap = styled("div", {
  flex: 1,
  overflow: "hidden",
  borderRadius: "10px",
  boxShadow:
    "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",

  "& img": {
    width: "100%",
  },
  "@medium": {
    marginRight: "0",
    marginTop: "30px",
  },
});

const ContentStyled = styled("div", {
  display: "flex",

  "@medium": {
    flexDirection: "column",
  },
});

const ContentWithImageStyled = styled("section", {
  padding: "50px 0",
  overflow: "hidden",
});

export default ContentWithImage;

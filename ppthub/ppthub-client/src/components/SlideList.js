import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import SlideListSlideSection from "./SlideListSlideSection";

function SlideList({ fileType }) {
  const { slides, slideWidth, slideHeight } = useSelector(
    ({ pptData }) => pptData[fileType].data,
  );

  return (
    <SlideListContainer>
      {slides.map((slideData) => (
        <SlideListSlideSection
          key={slideData.slideId}
          slideData={{
            ...slideData,
            slideWidth,
            slideHeight,
          }}
          fileType={fileType}
        />
      ))}
    </SlideListContainer>
  );
}

const SlideListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  margin: 0.5rem;
  margin-top: 1rem;
`;

export default SlideList;

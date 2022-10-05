import { ScaleOrdinal } from "d3-scale";
import styled from "styled-components";
import { UrlTransition } from "../types/history";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 5px;
`;

const DescriptionBox = styled.div`
  display: flex;
  gap: 5px;
  font-size: 10px;
`;

const ColorBox = styled.div<{ backgroundColor: string }>`
  width: 15px;
  height: 15px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

interface LinkDescriptionProps {
  colorScaleOrdinal: ScaleOrdinal<UrlTransition, string>;
}

export default function LinkDescription({ colorScaleOrdinal }: LinkDescriptionProps) {
  const colors = colorScaleOrdinal.range();
  const transitionTypes = colorScaleOrdinal.domain().map((type) => type.replace("_", " "));

  return (
    <Wrapper>
      {transitionTypes.map((transitionType, index) => (
        <DescriptionBox key={transitionType}>
          <ColorBox backgroundColor={colors[index]} />
          <div>{transitionType}</div>
        </DescriptionBox>
      ))}
    </Wrapper>
  );
}

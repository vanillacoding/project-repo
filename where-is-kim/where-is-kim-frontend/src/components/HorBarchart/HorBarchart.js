import React from "react";
import styled from "styled-components";

export default function HorBarchart({ records, chartRef }) {
  return (
    <Wrapper>
      <canvas id="line" ref={chartRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 200px;
`;

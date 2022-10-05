import styled from "styled-components";

const Modalview = styled.div`
  position: relative;
  padding: ${({ padding }) => padding}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  box-sizing: border-box;
  background: ${({ color }) => color};
  border-radius: 5px;
`;

export default Modalview;

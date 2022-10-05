import styled from "styled-components";

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 1rem;
  padding: 0 5vw;
`;

export default GridBox;

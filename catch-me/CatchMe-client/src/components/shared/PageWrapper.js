import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ color }) => color};
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: repeat-x; 
`;

export default PageWrapper;

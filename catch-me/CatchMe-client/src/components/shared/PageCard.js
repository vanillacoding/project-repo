import styled from "styled-components";

const PageCard = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  flex-direction: ${({ isColumn }) => isColumn && "column"};
  background: #FFFFFF78;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2);
`;

export default PageCard;

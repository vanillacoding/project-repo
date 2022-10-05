import styled from "styled-components";

const Aside = styled.aside<{ direction: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 10%;
  ${({ direction }) => (direction === "right" ? "right: 0;" : "left: 0;")}
  width: fit-content;
  height: 80vh;
  margin: 20px;
  gap: 10px;
`;

export default Aside;

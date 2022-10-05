import styled from "styled-components";

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 10px auto;

  button {
    flex: 1;
  }

  @media screen and (max-width: 400px) {
    width: calc(100% - 30px);
  }
`;

export default ButtonsWrapper;

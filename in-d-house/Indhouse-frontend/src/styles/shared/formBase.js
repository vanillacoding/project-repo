import styled from "styled-components";
import theme from "../themes";

const FormBase = styled.div`
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  height: 60vh;
  padding: 3rem;

  .title {
    width: 100%;

    h1 {
      font-size: ${theme.fontSizes.miniTitleSize};
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.blue};
      text-align: left;
    }
  }

  .form-input {
    position: relative;
    height: 3rem;

    input {
      width: 100%;
      padding: 0.2rem;
      border-bottom: 1px solid ${theme.colors.gray};
      font-size: ${theme.fontSizes.small};

      &:focus {
        outline: none;
        border-bottom: 1px solid ${theme.colors.blue};
      }
    }

    span {
      position: absolute;
      top: 2rem;
      left: 0;
      color: ${theme.colors.red};
    }
  }

  .submit {
    display: flex;
    justify-content: center;

    button {
      background-color: ${theme.colors.blue};
      width: 10rem;
      border-radius: 50px;
      padding: 0.2rem 0;
      color: ${theme.colors.white};
      font-size: ${theme.fontSizes.lg};
    }
  }
`;

export default FormBase;

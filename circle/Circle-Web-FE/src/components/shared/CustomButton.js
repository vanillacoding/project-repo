import styled from "styled-components";
import theme from "../../config/constants/theme";

const CustomButton = styled.button`
  width: 80px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.skyBlue};
  cursor: pointer;

  &:hover {
    color: ${theme.white};
    background-color: ${theme.blue};
  }
`;

export default CustomButton;

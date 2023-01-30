import styled from "styled-components";
import theme from "../../config/constants/theme";

const StyledInput = styled.input`
  flex: 1;
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1.5px solid ${theme.blue};
  border-radius: 5px;
  font-size: 18px;
  ::placeholder {
    color: palevioletred;
  }
`;

export default StyledInput;

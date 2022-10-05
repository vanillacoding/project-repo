import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color ?? props.theme.lightGray.color};
`;

export default StyledIcon;

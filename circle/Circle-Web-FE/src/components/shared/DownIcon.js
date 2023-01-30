import styled, { keyframes } from "styled-components";
import { FaLongArrowAltDown } from "react-icons/fa";

const iconAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const DownIcon = styled(FaLongArrowAltDown)`
  font-size: 48px;
  cursor: pointer;
  animation: ${iconAnimation} 2s ease infinite;
`;

export default DownIcon;

import PropTypes from "prop-types";
import styled from "styled-components";

import { HEADER, LIGHT_GREY_50 } from "../constants/color";

export default function AppHeader({ children }) {
  return <Container>{children}</Container>;
}

AppHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  width: 100%;
  background: ${HEADER};

  .function-icon {
    font-size: 30px;
    color: ${LIGHT_GREY_50};
  }
`;

import PropTypes from "prop-types";
import styled from "styled-components";

import { DARK_BLUE_50, LIGHT_GREY_50 } from "../constants/color";

const signsArray = [
  "<",
  ">",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "`",
  JSON.stringify(""),
];

export default function ToolBar({ handleClick }) {
  return (
    <Container>
      {signsArray.map((sign) => {
        return (
          <SignWrapper key={sign} onClick={() => handleClick(sign)}>
            {sign}
          </SignWrapper>
        );
      })}
      <SignWrapper onClick={() => handleClick("  ")}>TAB</SignWrapper>
    </Container>
  );
}

ToolBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background: ${DARK_BLUE_50};
`;

const SignWrapper = styled.div`
  padding: 10px;
  color: ${LIGHT_GREY_50};
`;

import PropTypes from "prop-types";
import styled from "styled-components";

import { LIGHT_GREY_50 } from "../../constants/color";

import MoveUpButton from "./MoveUpButton/MoveUpButton";
import MoveDownButton from "./MoveDownButton/MoveDownButton";
import MoveLeftButton from "./MoveLeftButton/MoveLeftButton";
import MoveRightButton from "./MoveRightButton/MoveRightButton";

export default function MoveCursorButtons({
  handleMoveUpClick,
  handleMoveDownClick,
  handleMoveLeftClick,
  handleMoveRightClick,
}) {
  return (
    <Container>
      <MoveUpButton handleClick={handleMoveUpClick} />
      <MoveDownButton handleClick={handleMoveDownClick} />
      <MoveLeftButton handleClick={handleMoveLeftClick} />
      <MoveRightButton handleClick={handleMoveRightClick} />
    </Container>
  );
}

MoveCursorButtons.propTypes = {
  handleMoveUpClick: PropTypes.func.isRequired,
  handleMoveDownClick: PropTypes.func.isRequired,
  handleMoveLeftClick: PropTypes.func.isRequired,
  handleMoveRightClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  min-height: 100%;

  .cursor-icon {
    position: absolute;
    font-size: 35px;
    color: ${LIGHT_GREY_50};
  }

  .up {
    top: 70%;
    left: 78vw;
  }

  .down {
    top: 80%;
    left: 78vw;
  }

  .left {
    top: 75%;
    left: 66vw;
  }

  .right {
    top: 75%;
    left: 89vw;
  }
`;

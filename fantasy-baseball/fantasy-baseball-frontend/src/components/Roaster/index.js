import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { SLOT_POSITIONS } from "../../constants";
import Slot from "./Slot/Slot";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.darkgrey};
  display: grid;
  grid-template: repeat(12, 7vmin) / repeat(12, 7vmin);
`;

const Rhombus = styled.div`
  border: 1px solid white;
  grid-area: 6 / 5 / span 4 / span 4;
  transform: rotate(45deg) skew(-0.15739559rad, -0.15739556rad);
`;

function Roaster({ roaster, isSkeleton }) {
  return (
    <Wrapper>
      <Rhombus />
      {isSkeleton
        ? (
          SLOT_POSITIONS.map((slotPosition, index) => (
            <Slot
              key={index}
              slotPosition={slotPosition}
              roasterPosition={roaster[slotPosition.position]}
              isSkeleton={true}
            />
          ))
        )
        : (
          SLOT_POSITIONS.map((slotPosition, index) => (
            <Slot
              key={index}
              slotPosition={slotPosition}
              roasterPosition={roaster[slotPosition.position]}
            />
          ))
        )}
    </Wrapper>
  );
}

Roaster.defaultProps = {
  isSkeleton: false,
};

Roaster.propTypes = {
  roaster: PropTypes.instanceOf(Object).isRequired,
  isSkeleton: PropTypes.bool,
};

export default React.memo(Roaster);

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ClearButtonContainer = styled.div`
  .colorpicker-container-up {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    transform: translateY(-100%);
  }

  .clearbutton {
    width: 50px;
    height: 30px;
    border-radius: 13%;
    border: solid 0px;
    cursor: pointer;
    background-color: #5C377F;
    font-weight: bold;
    color: #FFFFFF;
    transition: all .5s ease;

    &:hover {
      box-shadow: 0px 0px 0px 7px rgba(92, 55, 127, 0.6);
    }
  }
`;

function ClearButton({ className, buttonClickEvent }) {
  return (
    <ClearButtonContainer className={className}>
      <div className="colorpicker-container-up">
        <button className="clearbutton" onClick={buttonClickEvent}>
          Clear!
        </button>
      </div>
    </ClearButtonContainer>
  );
}

ClearButton.propTypes = {
  className: PropTypes.string.isRequired,
  buttonClickEvent: PropTypes.func.isRequired
};

export default React.memo(ClearButton);

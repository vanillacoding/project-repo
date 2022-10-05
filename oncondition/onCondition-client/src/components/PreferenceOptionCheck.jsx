import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RadioComponent from "./Radio";
import theme from "../theme";

const PreferenceOptionCheckWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  p {
    margin: auto 2%;
    color: ${({ theme }) => theme.text.sub};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

const RADIO_COLOR = theme.background.main;

function PreferenceOptionCheck({
  value,
}) {
  return (
    <PreferenceOptionCheckWrapper>
      <RadioComponent
        color={RADIO_COLOR}
        value={value}
      />
      <p>{value}</p>
    </PreferenceOptionCheckWrapper>
  );
}

PreferenceOptionCheck.propTypes = {
  imageSrc: PropTypes.string,
  value: PropTypes.string,
};

export default PreferenceOptionCheck;

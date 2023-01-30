import PropTypes from "prop-types";
import styled from "styled-components";

import { LIGHT_GREY_50, CONTENT } from "../constants/color";

export default function LanguageBar({ selectedLanguage, handlePress }) {
  const languagesArray = ["HTML", "CSS", "JS"];

  return (
    <Container>
      {languagesArray.map((language) => {
        return (
          <LanguageWrapper
            key={language}
            onClick={() => handlePress(language.toLowerCase())}
            backgroundColor={
              selectedLanguage === language.toLowerCase()
                ? LIGHT_GREY_50
                : CONTENT
            }
          >
            {language}
          </LanguageWrapper>
        );
      })}
    </Container>
  );
}

LanguageBar.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  background: ${CONTENT};
`;

const LanguageWrapper = styled.div`
  display: flex;
  margin: 1px;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px;
  font-size: 20px;
  font-family: "FiraCode";
`;

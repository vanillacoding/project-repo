import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RiBook2Fill, RiFileWord2Line } from "react-icons/ri";

import Container from "./shared/Container";

import { styled } from "../config/stitches.config";
import { OTHER_GLOSSARIES } from "../constants/url";

const GlossaryContainer = styled(Container, {
  width: "100%",
  padding: "2em",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  textAlign: "center",

  "@tabMedium": {
    flexDirection: "column",
  },

  "& span": {
    marginLeft: "5px",
  },
});

const GlossaryContent = styled(Container, {
  flex: "1 1 50%",
});

const LinkStyled = styled(Link, {
  display: "flex",
  color: "$black",
  textDecoration: "none",
  outline: "none",
  margin: "1.5em 0",
});

export default function OtherGlossary({ glossary }) {
  const {
    glossary: { keywords },
  } = glossary;

  const username = glossary.userEmail.split("@")[0];

  return (
    <LinkStyled to={`${OTHER_GLOSSARIES}/${glossary.userEmail}`}>
      <GlossaryContainer justify="spaceBetween">
        <GlossaryContent justify="start" align="center">
          <RiBook2Fill size="24px" color="#F2B988" />
          <span>{username}</span>
        </GlossaryContent>

        <GlossaryContent justify="start" align="center">
          <RiFileWord2Line size="24px" color="#1D8FF2" />
          <Container justify="center" align="center">
            <span>
              {keywords.length !== 0 &&
                keywords.map((keyword, index) => {
                  return (
                    <span key={keyword}>
                      {keyword}
                      {index === keywords.length - 1 ? "" : ", "}
                    </span>
                  );
                })}
            </span>
          </Container>
        </GlossaryContent>
      </GlossaryContainer>
    </LinkStyled>
  );
}

OtherGlossary.defaultProps = {
  glossary: PropTypes.object,
};

OtherGlossary.propTypes = {
  glossary: PropTypes.shape({
    glossary: PropTypes.shape({
      keywords: PropTypes.arrayOf.isRequired,
      updateAt: PropTypes.string,
      wordPairs: PropTypes.objectOf(PropTypes.string),
    }),
    userEmail: PropTypes.string.isRequired,
  }),
};

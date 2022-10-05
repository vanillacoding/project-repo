import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "../../../config/stitches.config";

import {
  MY_GLOSSARY,
  MY_TRANSLATIONS,
  OTHER_GLOSSARIES,
} from "../../../constants/url";
import chromeStore from "../../../utils/chromeStore";

import ContainerStyled from "../Container";
import TabContainer from "../TabContainer";
import Title from "../Title";

function Header() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      const user = await chromeStore.get("userData");

      setUserData(user);
    })();
  }, []);

  return (
    <header>
      <TabContainer justify="spaceBetween">
        <ContainerStyled
          className="header-content"
          flex="row"
          justify="spaceBetween"
          align="itemCenter"
          css={{
            height: "80px",
          }}
        >
          <Title>My Hand Translator</Title>

          <Nav>
            <NavLink to={MY_GLOSSARY} activeClassName="selected">
              내 용어집 편집
            </NavLink>
            <NavLink to={MY_TRANSLATIONS} activeClassName="selected">
              내 번역 기록
            </NavLink>
            {userData?.isServerOn && (
              <NavLink to={OTHER_GLOSSARIES} activeClassName="selected">
                다른 사람 용어집
              </NavLink>
            )}
          </Nav>
        </ContainerStyled>
      </TabContainer>
    </header>
  );
}

const Nav = styled("nav", {
  "& a": {
    marginLeft: "10px",
    marginRight: "10px",
    textDecoration: "none",
    color: "$blue",
  },
  "& .selected": {
    color: "$apricot",
  },
});

export default Header;

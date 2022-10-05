import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./styles/MainNavigation.module.css";
import HeaderBoard from "./shared/HeaderBoard";

const MainNavigation = () => {
  const location = useLocation();
  const navigations = [
    { en: "posts", ko:"게시글" },
    { en: "dogs", ko: "강아지들" },
    { en: "menu", ko: "메뉴" },
  ].map(({ en, ko }, index) => {
      return (
        <HeaderBoard
          key={index}
          boardClassName={styles.headerBoard}
          barClassName={styles.headerBar}
        >
          <Link
            className={styles.anchor}
            to={{
              pathname: `/${en}`,
              state: { modal: location },
            }}
          >
            {ko}
          </Link>
        </HeaderBoard>
      );
  });

  return (
    <nav className={styles.navigation}>
      {navigations}
    </nav>
  );
};

export default MainNavigation;

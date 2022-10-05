import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { remove } from "../../features/userSlice";
import { postLogout } from "../../api";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const preload = useSelector((state) => state.preload.isLoaded);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (preload) {
        setIsAnimated(true);
      }
    }, 2300);
  }, [preload]);

  const handleLogout = async (event) => {
    event.preventDefault();

    const { result } = await postLogout();

    if (result === "success") {
      dispatch(remove());
      history.push("/login");
    }
  };

  return (
    <Wrapper isAnimated={isAnimated}>
      <h1><a href="/">FSS</a></h1>
      <nav>
        <h2 className="sr-only">navigation</h2>
        <ul>
          <li><a href="/">MAIN</a></li>
          {user && user.is_matched &&
            <>
              <li><a href="/chat">CHAT</a></li>
              <li><a href="/settings">SETTINGS</a></li>
            </>
          }
        </ul>
      </nav>
      <Description isAnimated={isAnimated}>
        <li>FLOWER SHOES STORY</li>
        <li>{user ? <a href="/logout" onClick={handleLogout}>LOGOUT</a> : "FOR SOLDIER"}</li>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;

  * {
    font-family: "adrianna-extended";
    letter-spacing: .17em;
  }

  h1 {
    position: fixed;
    left: 50px;
    top: 50px;
    z-index: 500;
    transform: ${({ isAnimated }) => isAnimated ? "translateY(0)" : "translateY(-75px)"};
    opacity: ${({ isAnimated }) => isAnimated ? "1" : "0"};
    transition: 0.95s cubic-bezier(0.82, 0.01, 0.21, 1);
  }

  h1 a {
    font-size: 15px;
    font-weight: 600;
  }

  nav {
    position: fixed;
    right: 50px;
    top: 47px;
    margin-left: auto;

    ul {
      display: flex;
    }

    li {
      margin-left: 20px;
      transform: ${({ isAnimated }) => isAnimated ? "translateY(0);" : "translateY(-110%)"};
      opacity: ${({ isAnimated }) => isAnimated ? "1" : "0"};
    }

    li:first-child {
      transition: .67s cubic-bezier(.36,.01,.18,1) .12s;
    }

    li:nth-child(2) {
      transition: .79s cubic-bezier(.36,.01,.18,1) .24s;
    }

    li:last-child {
      transition: .91s cubic-bezier(.36,.01,.18,1) .36s;
    }

    li a {
      font-size: 11px;
    }
  }
`;

const Description = styled.ul`
  display: flex;
  position: fixed;
  left: 20px;
  bottom: 50px;
  padding: 30px;
  transform: ${({ isAnimated }) => isAnimated ? "rotate(-90deg) translateX(-90px);" : "rotate(-90deg) translateX(0)"};
  transition: .68s cubic-bezier(.82,.01,.21,1);
  transform-origin: 20px 20px;

  li {
    position: relative;
    padding: 0 30px;
    font-family: "adrianna-extended";
    letter-spacing: .17em;
    font-size: 8px;
    line-height: 1.6em;
    color: #1a1a1e;
    transform: ${({ isAnimated }) => isAnimated ? "rotate(0) translateX(0)" : "rotate(0) translateY(-90px)"};
    transition: .59s cubic-bezier(.36,.01,.18,1) .40s;
    opacity: ${({ isAnimated }) => isAnimated ? "1" : "0"};
  }

  li + li {
    transition: .71s cubic-bezier(.36,.01,.18,1) .44s;
  }

  li + li:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 1px;
    background-color: rgba(26,26,30,.65);
    transform-origin: 0 0;
  }
`;

export default Header;

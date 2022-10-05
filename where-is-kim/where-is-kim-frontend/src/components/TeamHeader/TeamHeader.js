import React from "react";
import styled from "styled-components";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TeamHeader({ teamName, currentPage, isAdmin }) {
  return (
    <>
      <Wrapper>
        <h3>{currentPage}</h3>
        <ToggleActiveButton htmlFor="side-nav">
          <FaBars />
        </ToggleActiveButton>
      </Wrapper>
      <NavController type="checkbox" id="side-nav" />
      <label htmlFor="side-nav"></label>
      <nav>
        <ToggleButtonWrap>
          <ToggleActiveButton htmlFor="side-nav">
            <FaTimes />
          </ToggleActiveButton>
        </ToggleButtonWrap>
        <ul>
          <li>
            <Link to={`/team/${teamName}`}>Thread</Link>
          </li>
          <li>
            <Link to={`/team/${teamName}/record`}>Record</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to={`/team/${teamName}/admin`}>Dashboard</Link>
              </li>
              <li>
                <Link to={`/team/${teamName}/admin/analytics`}>Analytics</Link>
              </li>
              <li>
                <Link to={`/team/${teamName}/admin/participants`}>
                  participants
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

const Wrapper = styled.div`
  padding: 15px 30px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  & h3 {
    margin-bottom: 0;
    text-transform: uppercase;
  }
`;
const ToggleActiveButton = styled.label`
  display: inline-block;
  & svg {
    font-size: 30px;
  }
`;
const ToggleButtonWrap = styled.div`
  text-align: right;
  color: #fff;
  margin-bottom: 30px;
`;
const NavController = styled.input`
  display: none;
  &:checked + label {
    display: block;
  }
  &:checked + label + nav {
    right: 0;
  }
  & + label {
    z-index: 10;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  & + label + nav {
    z-index: 10;
    transition: all 0.3s;
    position: fixed;
    top: 0;
    bottom: 0;
    right: -260px;
    width: 260px;
    background-color: #3f0e40;
    padding: 15px 30px;
    & li {
      margin-bottom: 21px;
    }
    & a {
      text-transform: uppercase;
      font-size: 20px;
      color: #fff;
    }
  }
`;

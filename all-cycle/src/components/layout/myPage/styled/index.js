import styled from "styled-components";

import StyledButton from "@/components/element/StyledButton";

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  padding: 1em 1.5em;
  background-color: ${(props) => props.theme.font.color};
  font-family: ${(props) => props.theme.fontEng};
  overflow-y: visible;
`;

const UserInfo = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  border-radius: 2vw;
  font-weight: 400;
  font-size: 1.3em;
  color: ${(props) => props.theme.white.color};
  text-align: end;
  border-radius: 4vw;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
`;

const UserProfile = styled.div`
  width: 90px;
  height: 90px;
  padding: 0.2em;
  border-radius: 50%;
  background-color: ${(props) => props.theme.lightFont.color};
`;

const UserImage = styled.img`
  height: 100%;
  border-radius: 50%;
`;

const Email = styled.div`
  font-size: 0.2em;
`;

const Text = styled.span`
  font-size: 1em;
  font-weight: 600;
  color: ${(props) => props.theme.badgeBg.color};
  margin-top: 1.5em;
  text-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.15);
`;

const Footer = styled.p`
  color: ${(props) => props.theme.lightFont.color};
  font-size: 0.3em;
  font-style: italic;
  text-align: center;
`;

const BadgeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  justify-content: center;
  gap: 0.5em;
  padding: 1em;
`;

export {
  Container,
  StyledButton,
  UserInfo,
  UserProfile,
  UserImage,
  Email,
  Text,
  BadgeContainer,
  Footer,
};

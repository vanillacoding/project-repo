import styled from "styled-components";

import StyledButton from "@/components/element/StyledButton";

const Container = styled.div`
  margin: 0.3em;
  margin-top: 2em;
  border: 1px solid ${(props) => props.theme.graishGreen.color};
  border-radius: 2vw;
  font-size: 1em;
  background-color: ${(props) => props.theme.lightGray.color};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-top-left-radius: 2vw;
  border-top-right-radius: 2vw;
  font-style: italic;
  font-weight: 600;
  color: ${(props) => props.theme.darkGreen.color};
  background-color: ${(props) => props.theme.lightGreen.color};
`;

const ReviewButton = styled(StyledButton)`
  height: 2vh;
  font-size: 0.7em;
  border: none;
  color: ${(props) => props.theme.white.color};
  background-color: ${(props) => props.theme.graishGreen.color};

  &:hover {
    color: ${(props) => props.theme.graishGreen.color};
    background-color: ${(props) => props.theme.white.color};
  }
`;

const Li = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1em;

  border-top: 1px solid ${(props) => props.theme.darkGreen.color};
`;

const Content = styled.dl`
  width: 100%;
  padding: 0.3em;
`;

const Info = styled.dt`
  flex-basis: 60%;

  font-size: 1em;
  color: ${(props) => props.theme.green.color};
`;

const UserName = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const Comment = styled.div`
  display: block;
  margin-top: 1em;
  color: ${(props) => props.theme.gray.color};
`;

const CreatedAt = styled.div`
  font-size: 0.5em;
  color: ${(props) => props.theme.gray.color};
`;

const ImageContainer = styled.div`
  flex-basis: 40%;
  background-color: blue;
  text-align: center;
`;

const Picture = styled.img`
  width: 100%;
  height: 100%;
  max-width: 10vh;
  object-fit: cover;
`;

export {
  Container,
  Title,
  ReviewButton,
  Li,
  Picture,
  Content,
  Info,
  UserName,
  CreatedAt,
  Comment,
  ImageContainer,
};

import styled from "styled-components";

const ReviewList = styled.ul`
  max-height: 180px;
  padding: 1em;
  overflow-y: scroll;
`;

const Content = styled.li`
  width: 100%;
  max-width: 450px;
  display: flex;
  justify-content: space-between;
  padding: 0.4em 1em;
  border-radius: 2vw;
  font-size: 0.5em;
  color: white;
  background-color: ${(props) => props.theme.darkGray.color};

  & + & {
    margin-top: 0.7em;
  }
`;

const Score = styled.span`
  font-size: 0.3em;
  color: ${(props) => props.theme.gray.color};
`;

const PhotoList = styled.ul`
  display: flex;
  width: 100%;
  height: 130px;
  grid-auto-columns: 1vw;
  margin: 0.5em;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const ImageContainer = styled.li`
  height: 100%;
  object-fit: cover;
  border-radius: 1em;
  text-align: center;
  padding: 0.5em;
  background-color: ${(props) => props.theme.lightFont.color};

  & + & {
    margin-left: 0.5em;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const Image = styled.img`
  height: 100%;
  border-radius: 10%;
`;

export {
  ReviewList,
  Content,
  Score,
  PhotoList,
  ImageContainer,
  Image,
};

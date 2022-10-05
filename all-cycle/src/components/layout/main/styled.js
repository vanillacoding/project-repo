import styled, { keyframes } from "styled-components";

import StyledButton from "@/components/element/StyledButton";

const PhotoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ImagePreview = styled.img`
  width: 100vw;
  height: 100vh;
`;

const ToggleButton = styled(StyledButton)`
  position: absolute;
  top: 3vh;
  left: 3vw;
  color: ${(props) => props.theme.primary.color};
  background-color: ${(props) => props.theme.white.color};
  z-index: 2;
`;

const Message = styled.div`
  width: 100%;
  position: fixed;
  top: 40vh;
  text-align: center;
  font-size: 10vw;
  color: ${(props) => props.theme.primary.color};
  background-color: ${(props) => props.theme.white.color};
  z-index: 2;
`;

const SliderContainer = styled.div`
  width: 1500px;
  margin: auto;
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
   }
	100% {
    transform: translateX(calc(-100px * 8));
  }
`;

const Wrapper = styled.div`
  width: calc(100px * 16);
  position: relative;
  display: flex;
  animation: ${scroll} 20s linear infinite;
  overflow: hidden;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100%;

  &:hover {
    transform: scale(1.2);
  }
`;

const ImageContainer = styled.div`
  flex-basis: 50%;
  height: 12vh;
  object-fit: cover;
  border-top-left-radius: 5vw;
  border-bottom-left-radius: 5vw;

  text-align: center;
  &:hover {
    transform: scale(1.2);
  }
`;

const AnimationContainer = styled.div`
  text-align: center;
`;

const Comment = styled.div`
  height: 5vh;
  margin: 2em;
  font-size: 1em;
  font-weight: 400;
  color: ${(props) => props.theme.white.color};
  text-shadow: inset 1px 1px 1px ${(props) => props.theme.gray.color};
`;

const Logo = styled.div`
  padding: 0.5em;
  color: ${(props) => props.theme.white.color};
  font-size: 3em;
  font-weight: 700;
  font-style: italic;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-shadow: 1px 1px 2px ${(props) => props.theme.gray.color};
`;

const shake = keyframes`
  0% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg);
  }
`;

const ShakeCamera = styled.div`
  position: absolute;
  top: 35%;
  right: 35%;
  display: inline-block;
  border-radius: 5vw;
  animation: ${shake} 2s ease-in-out infinite;

  color: ${(props) => props.theme.font.color};
  background-color: ${(props) => props.theme.lightGray.color};
`;

const Bubble = styled.div`
  position: absolute;
  top: 24%;
  right: 40%;
  font-size: 5em;
  transform: rotateY(180deg);
`;

const BubbleText = styled.span`
  position: absolute;
  top: 28%;
  right: 41%;
  color: ${(props) => props.theme.gray.color};
  font-size: 1.3em;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontEng};
  z-index: 1;
  text-shadow: 1px 1px 2px ${(props) => props.theme.font.color};
`;

export {
  PhotoContainer,
  ImagePreview,
  ToggleButton,
  Message,
  SliderContainer,
  Wrapper,
  ItemImage,
  ImageContainer,
  AnimationContainer,
  Logo,
  BubbleText,
  Bubble,
  ShakeCamera,
  Comment,
};

import styled from "styled-components";

import ManagerOptions from "@/components/layout/ManagerOptions";
import ButtonContainer from "@/components/element/ButtonContainer";

const Container = styled.div`
  width: 500px;
  padding-top: 1em;
  font-family: ${(props) => props.theme.fontEng};
  background-color: ${(props) => props.theme.lightGray.color};
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.font.color};
  margin-bottom: 1em;
  padding: 0 1em;
`;

const Strong = styled.strong`
  all: unset;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Li = styled.li`
  width: 100%;
  padding: 0.2em 1em;
  margin-bottom: 0.2em;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  padding: 0.5em 1.2em;
  border-bottom: 1px solid ${(props) => props.theme.skyblue.color};
  border-left: 1px solid ${(props) => props.theme.skyblue.color};
  border-right: 1px solid ${(props) => props.theme.skyblue.color};
  background-color: ${(props) => props.theme.white.color};
`;

const ImageContainer = styled.div`
  flex-basis: 20%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 5vw;
  border-bottom-left-radius: 5vw;
  margin-left: 1em;
  margin-right: 1em;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  border-radius: 2vw;
`;

const SelectContainer = styled.section`
  all: unset;
  width: 100%;
  padding: 1em;
  font-size: 2vw;
`;

const ProductName = styled.div`
  padding: 0.3em 0.7em;
  border: 1px solid ${(props) => props.theme.skyblue.color};
  font-size: 0.9em;
  font-weight: 500;
  color: ${(props) => props.theme.skyblue.color};
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.lightGray.color};
`;

const Button = styled.button`
  border: none;
  border-radius: 2vw;
  padding: 0.5em 1em;
  font-size: 0.5em;
  color: ${(props) => props.theme.white.color};
  background-color: ${(props) => props.theme.skyblue.color};
`;

export {
  Container,
  Info,
  Strong,
  ButtonContainer,
  Li,
  Wrapper,
  ImageContainer,
  Image,
  SelectContainer,
  ManagerOptions,
  ProductName,
  Button,
};

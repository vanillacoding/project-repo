import styled, { css } from "styled-components";

import NextLink from "@/components/element/NextLink";

const Container = styled.div`
  margin: 0;
  max-width: 510px;
  padding: 0.3em;
  padding-bottom: 2em;
`;

const ProductItemContainer = styled.div`
  margin: 0;
  max-width: 510px;
  padding: 0.3em;
  padding-bottom: 2em;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3vw;
`;

const Picture = styled.img`
  width: 300px;
  height: 100%;
  object-fit: contain;
  border-radius: 3vw;
  box-shadow: 0px 5px 11px rgba(0, 0, 0, 0.15);
  margin-bottom: 1em;
`;

const ProductInfo = styled.div`
  width: 500px;
  position: relative;
  padding: 3vw;
  text-align: center;
  background-color: ${(props) => props.theme.lightGray.color};
`;

const ProductName = styled.div`
  color: ${(props) => props.theme.darkGray.color};
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const colorTheme = css`
  ${({ isEven }) => {
    if (isEven) {
      return css`
        color: ${(props) => props.theme.darkGray.color};
        background-color: ${(props) => props.theme.lightGray.color};
      `;
    }

    return css`
      color: ${(props) => props.theme.darkGray.color};
      background-color: ${(props) => props.theme.badgeBg.color};;
    `;
  }}
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 510px;
  height: 17vh;
  border-bottom: 2px solid ${(props) => props.theme.lightGray.color};
  font-family: ${(props) => props.theme.fontKor};
  padding: 0.7em;

  ${colorTheme}
`;

const InfoContainer = styled.dl`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 1em;
`;

const ItemImage = styled.img`
  height: 100%;
  border-radius: 2vw;
`;

const Name = styled.span`
  margin: 0;
  padding: 0;
  font-size: 0.8em;
  font-weight: 600;
`;

const Form = styled.form`
  width: 90%;
  height: 5vh;
  display: flex;
  align-items: center;
  margin: auto;
  padding-left: 2vw;
  border-radius: 2vw;
  background-color: ${(props) => props.theme.lightGray.color};
`;

const Input = styled.input`
  all: unset;
  width: 100%;

  ::placeholder {
    color: ${(props) => props.theme.gray.color};
  }
`;

const List = styled.ul`
  width: 100%;
`;

export {
  Container,
  NextLink,
  ProductContainer,
  ProductItemContainer,
  Picture,
  ProductInfo,
  ProductName,
  Section,
  ItemImage,
  InfoContainer,
  Name,
  Form,
  Input,
  List,
};

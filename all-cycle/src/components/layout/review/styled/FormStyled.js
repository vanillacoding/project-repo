import styled from "styled-components";
import StyledIcon from "@/components/element/StyledIcon";

const Form = styled.form`
  padding: 1em;
`;

const FormGroup = styled.div`
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  resize: none;
  min-height: calc(1.5em + 2rem + 2px);
  padding: 0.375rem 0.75rem;
  margin-bottom: 1em;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
`;

const RangeFigure = styled.figure`
  display: flex;
  align-items: center;
  margin: 0.5em auto;
`;

const RangeSlider = styled.input`
  all: unset;
  width: 70vw;
  height: 3vh;
  background-color: ${(props) => props.theme.badgeBg.color};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20%;
    height: 3vh;
    background-color: ${(props) => props.theme.green.color};
  }

  &:focus {
    outline: none;
  }
`;

const RangeDataList = styled.datalist`
  width: 70vw;
  display: inline-flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: ${(props) => props.theme.gray.color};
`;

const FigCaption = styled.figcaption`
  padding: 0.5em;
  border-radius: 2vw;
  text-align: center;
  text-decoration: underline;
  font-size: 0.8em;
  font-family: ${(props) => props.theme.fontKor};
`;

const SmileIcon = styled(StyledIcon)`
  margin: 0 0.8em;
  font-size: 1.5em;
  color: ${(props) => props.theme.yellow.color};
`;

const SadIcon = styled(StyledIcon)`
  margin: 0 0.8em;
  font-size: 1.5em;
  color: ${(props) => props.theme.graishGreen.color};
`;

const Message = styled.span`
  margin: 0.7em;
  font-size: 0.7em;
  font-weight: 400;
  color: ${(props) => props.theme.red.color};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 0.7em;
`;

export {
  Form,
  FormGroup,
  Textarea,
  FigCaption,
  Container,
  RangeFigure,
  SmileIcon,
  RangeSlider,
  SadIcon,
  RangeDataList,
  Message,
  ButtonWrapper,
};

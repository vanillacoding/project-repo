import styled from 'styled-components';
import { HelpCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-feather';

export const GuideModal = {};

GuideModal.ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 30px;
`;

GuideModal.DivideLine = styled.hr`
  width: 100%;
`;

GuideModal.HelpButton = styled(HelpCircle)`
  cursor: pointer;
`;

GuideModal.GuideContent = styled.div`
  position: fixed;
  bottom: 100px;
  left: ${props => props.toggled === true ? '0' : '-300px'};
  display: flex;
  flex-direction: column;
  align-content: center;
  width: auto;
  min-width: 220px;
  height: auto;
  margin-left: 30px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all .5s;
`;

GuideModal.GuideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 10px;
`;

GuideModal.Title = styled.span`
  font-size: 20px;
`;

GuideModal.Text = styled.span`
  color: black;
  margin-bottom: 5px;
`;

GuideModal.KeyBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-auto-rows: 40px;
  gap: 5px;
`;

GuideModal.KeyBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  border-radius: 3px;
`;

GuideModal.KeyText = styled.span`
  display: flex;
  margin: auto;
  color: white;
  font-size: 20px;
`;

GuideModal.ArrowUpKey = styled(ArrowUp)`
  margin: auto;
`;

GuideModal.ArrowDownKey = styled(ArrowDown)`
  margin: auto;
`;

GuideModal.ArrowLeftKey = styled(ArrowLeft)`
  margin: auto;
`;

GuideModal.ArrowRightKey = styled(ArrowRight)`
  margin: auto;
`;

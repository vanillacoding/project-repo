import styled from 'styled-components';

export const CharacterSelection = {};

CharacterSelection.Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

CharacterSelection.TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: center;
`;

CharacterSelection.Form = styled.form`
  display: flex;
  flex-direction: column;
`;

CharacterSelection.Input = styled.input`
  margin: 10px auto;
  padding: 5px;
  border-radius: 5px;
  width: 60%;
  height: 40px;

  &:focus {
    outline: none;
  }
`;

CharacterSelection.CanvasWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
`;

CharacterSelection.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10%;
`;

CharacterSelection.Button = styled.button`
  margin: 10px 20px;
  padding: 10px 20px;
  background-color: #74b9ff;
  border-radius: 5px;
  border: 1px;
  cursor: pointer;

  &:hover {
    background-color: #0984e3;
  }

  & span {
    font-size: 15px;
    font-weight: 600;
  }
`;

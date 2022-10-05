import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  background: rgba(93, 95, 95, 0.6);
  color: white;
  border-radius: 75px;
  z-index: 2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.CircleButtonGray};
    color: ${({ theme }) => theme.white};
  }
`;

export default function CircleButton({ onClick, isClicked, clickedState, unClickedState }) {
  return (
    <ButtonWrapper>
      <FontAwesomeIcon icon={isClicked ? clickedState : unClickedState} onClick={onClick} />
    </ButtonWrapper>
  );
}

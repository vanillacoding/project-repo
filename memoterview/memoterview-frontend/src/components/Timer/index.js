import { faRecordVinyl, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TimerWrapper = styled.div`
  position: absolute;
  top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px 0 20px;
  width: 160px;
  height: 40px;
  background-color: #00000069;
  font-weight: bold;
  color: #dcdada;
  border-radius: 15px;
  z-index: 1;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .timer-icon {
    font-size: 1.4em;
    color: ${(({ isRecording }) => isRecording ? "#ff5555" : "#6ce86c")};
  }
`;

export default function Timer({ isRecording, time }) {
  const { hour, minute, second } = time;
  return (
    <TimerWrapper isRecording={isRecording}>
      <div className="timer-icon">
        <FontAwesomeIcon icon={isRecording? faRecordVinyl : faStopCircle} />
      </div>
      {`${hour}:${minute}:${second}`}
    </TimerWrapper>
  );
}

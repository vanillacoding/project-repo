import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 0;
  padding: 0;
  text-align: center;
  border-radius: 10%;
  color: ${({ theme }) => theme.InterviewModalContent};
`;

const QuestionEvaluationForm = styled.form`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ViewContent = styled.div`
  display: flex;
  height: 100%;
`;

const InputButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 23%;
  background: ${({ theme }) => theme.BabyPowder};
  margin-top: 2.45em;
  color: ${({ theme }) => theme.Arsenic};
  font-weight: 500;
  border-radius: 0 0 3% 3%;
  border: 0;
  border-top: 1.5px solid ${({ theme }) => theme.InterviewModalBorder};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.BabyPowder};
    background: ${({ theme }) => theme.StatusMenuGreen};
  }
`;

export default function InterviewQuestionModalView({
  onRateChange,
  onResultSubmit,
}) {
  return (
    <ViewWrapper>
      <ModalView width="400px" height="200px" backgroundColor="#f9f8f5">
        <h3>답변 평가</h3>
        <QuestionEvaluationForm onSubmit={onResultSubmit}>
          <ViewContent>
            <RatingStars onChange={onRateChange} />
          </ViewContent>
          <InputButton type="submit">OK</InputButton>
        </QuestionEvaluationForm>
      </ModalView>
    </ViewWrapper>
  );
}

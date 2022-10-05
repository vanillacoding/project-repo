import { faComment, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 5em;
  max-width: 20em;
  margin: 15px;
  align-items: center;
  justify-content: center;

  .question-list {
    
  }
`;

const QuestionWrapper = styled.div`
  margin: 0 2rem 1rem 0;
  font-size: 12px;
  color: ${({ theme }) => theme.QuestionContentGray};
  overflow-y: visible;

  .question-list-content {
    display: flex;
    margin: 10px auto;

    .question-list-icon {
      margin-right: 10px;
      color: ${({ theme }) => theme.QuestionContentGray};
    }
  }
`;

const RefreshButton = styled.button`
  position: absolute;
  right: 10%;
  bottom: 2%;
  width: 2em;
  height: 2em;
  background: ${({ theme }) => theme.StatusMenuGreenDark};
  color: white;
  border-radius: 175px;
  border: 0;
`;

export default function QuestionBoard({ questions, onChange }) {
  return (
    <BoardWrapper>
      <QuestionWrapper>
        {questions?.length ? (
          <>
            <h3>추천 질문</h3>
            {questions.map((question, index) => (
              <div className="question-list-content" key={index}>
                <FontAwesomeIcon
                  className="question-list-icon"
                  icon={faComment}
                />
                <>{question.title}</>
              </div>
            ))}
            <RefreshButton onClick={onChange}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </RefreshButton>
          </>
        ) : (
          "추천 드릴 질문이 없습니다"
        )}
      </QuestionWrapper>
    </BoardWrapper>
  );
}

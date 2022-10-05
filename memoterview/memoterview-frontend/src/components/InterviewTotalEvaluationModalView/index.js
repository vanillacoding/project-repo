import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  text-align: center;
  color: ${({ theme }) => theme.InterviewModalContent};

  h2 {
    margin: 0;
  }
`;

const EvaluationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: 35% auto;
  margin-top: 0.5em;
  width: 80%;
`;

const ButtonWrapper = styled.button`
  width: 100%;
  height: 3.5em;
  margin-top: 2em;
  border: 0;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.InterviewModalBorder};
  background: ${({ theme }) => theme.BabyPowder};
  color: ${({ theme }) => theme.Arsenic};

  :hover {
    color: ${({ theme }) => theme.BabyPowder};
    background: ${({ theme }) => theme.StatusMenuGreen};
  }
`;

const TotalOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
  width: 100%;

  .interview-input {
    width: 60%;
    height: 20px;
    margin: 0 auto .5em;
    border: 1px solid ${({ theme }) => theme.InterviewModalBorder};
  }

  ::before {
    display: block;
    margin: auto;
    width: 80%;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.InterviewModalBorder};
    content: "";
  }
`;

export default function InterviewTotalEvaluationModalView({
  filters,
  onCommentChange,
  onTotalRateChange,
  onFilterRateChange,
  onResultSubmit,
}) {
  function handleInputKeyDown(event) {
    event.stopPropagation();
  }

  return (
    <ModalView backgroundColor="#f9f8f5" width="500px">
      <ViewWrapper>
        <h3>최종 평가</h3>
        <EvaluationForm onSubmit={onResultSubmit}>
          {filters?.map((filter, index) => (
            <FilterOptions key={index}>
              <h4>{filter}</h4>
              <RatingStars onChange={onFilterRateChange} rateOption={filter} />
            </FilterOptions>
          ))}
          <TotalOptions>
            <h4 className="comment-text">코멘트</h4>
            <input className="interview-input" type="text" onChange={onCommentChange} onKeyDown={handleInputKeyDown} required/>
            <h4>종합 점수</h4>
            <RatingStars onChange={onTotalRateChange} />
            <ButtonWrapper type="submit">OK</ButtonWrapper>
          </TotalOptions>
        </EvaluationForm>
      </ViewWrapper>
    </ModalView>
  );
}

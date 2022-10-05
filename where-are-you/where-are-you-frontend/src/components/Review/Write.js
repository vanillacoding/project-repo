import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { checkPlayerReview } from "../../actions/player";
import { createReview } from "../../actions/review";
import { postReview } from "../../api";
import convertTime from "../../utils/time";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0 0 2.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
`;

const Title = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const Info = styled.div`
  margin: 0 0 0.5rem 0;

  > div {
    margin: 0 1.5rem 0 0;
    display: inline-block;
  }
`;

const Label = styled.span`
  margin: 0 0.3rem 0 0;
  padding: 0 0.3rem;
  display: inline-block;
  background: ${({ theme }) => theme.color.orange};
  color: #ffffff;
  font-weight: 700;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  background: rgba(255, 255, 255, 0.5);
  resize: none;

  &::placeholder {
    color: #bbbbbb;
  }

  &:focus {
    outline: none;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Validation = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.red};
`;

const ButtonList = styled.div`
  margin: 0.5rem 0 0 0;
  text-align: right;

  button {
    margin: 0 0.3rem 0 0;

    &:last-child {
      margin: 0;
    }
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.color.yellow};
  border: none;
  font-size: 0.8rem;
`;

function Write() {
  const playerInfo = useSelector((state) => state.player);
  const [review, setReview] = useState({
    name: playerInfo.name,
    clearTime: playerInfo.clearTime,
    content: ""
  });
  const [validationText, setValidationText] = useState(null);
  const dispatch = useDispatch();

  const handleContent = (event) => {
    const { value } = event.target;
    setReview((review) => ({
      ...review,
      content: value
    }));
  };

  const submitReview = async (event) => {
    event.preventDefault();

    if (review.content === "") {
      setValidationText("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await postReview(review);

      if (response.status !== 200) {
        setValidationText("리뷰 등록에 실패하였습니다. 다시 시도해주세요.");
      }

      const { data } = await response.json();
      dispatch(createReview(data));
      dispatch(checkPlayerReview());
    } catch (err) {
      setValidationText("리뷰 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrapper>
      <Title>리뷰 남기기</Title>
      <Info>
        <div>
          <Label>Name</Label>
          {review.name}
        </div>
        <div>
          <Label>Clear Time</Label>
          {convertTime(review.clearTime)}
        </div>
      </Info>
      <label
        htmlFor="review"
        className="sr-only"
      >
        리뷰 작성
      </label>
      <TextArea
        id="review"
        placeholder="리뷰를 입력해주세요."
        onChange={handleContent}
        value={review.content}
      />
      <Bottom>
        <Validation>{validationText}</Validation>
        <ButtonList>
          <Button
            type="submit"
            onClick={submitReview}
          >
            등록하기
          </Button>
        </ButtonList>
      </Bottom>
    </Wrapper>
  );
}

export default Write;

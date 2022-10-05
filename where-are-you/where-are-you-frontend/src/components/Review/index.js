import React, { useState, useRef, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import topIcon from "../../assets/common/top_icon.png";
import useFetchReviews from "../../hooks/useFetchReviews";
import LinkButton from "../Shared/LinkButton";
import View from "./View";
import Write from "./Write";

const Wrapper = styled.div`
  width: 800px;
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  margin: 0;
  font-size: 4rem;
  font-weight: 700;
`;

const Alert = styled.div`
  width: 100%;
  margin: 0 0 2.5rem 0;
  padding: ${({ theme }) => theme.padding.big};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
`;

const Notice = styled.div`
  margin: 0 0 0.3rem 0;
  color: ${({ theme }) => theme.color.red};
  font-size: 1rem;
`;

const TopButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: #9f716f;
  text-align: center;
`;

function Review() {
  const [page, setPage] = useState(1);
  const isLastPasswordUnlocked = useSelector((state) => state.game.playerPassword["password5"].isUnlocked);
  const hasReview = useSelector((state) => state.player.hasReview);
  const reviews = useSelector((state) => state.review.list);

  const observer = useRef();
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    hasMore
  } = useFetchReviews(page, dispatch);

  const lastReviewElementRef = useCallback((node) => {
    if (isLoading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore]);

  const renderWrite = () => {
    if (isLastPasswordUnlocked === false) {
      return (
        <Alert
          bgColor="rgba(0, 0, 0, 0.3)"
          color="#ffffff"
        >
          엔딩을 본 이후에 리뷰를 남길 수 있습니다.
        </Alert>);
    }

    if (hasReview) {
      return (
        <Alert
          bgColor="rgba(0, 0, 0, 0.3)"
          color="#ffffff"
        >
          리뷰는 한 번만 작성할 수 있습니다.
        </Alert>);
    }

    return <Write />;
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return (
      <Alert
        bgColor="#ffffff"
        color="black"
      >
        등록된 리뷰가 없습니다.
      </Alert>);
    }

    return reviews.map((review, index) => {
      if (reviews.length === index + 1) {
        return (
          <View
            lastRef={lastReviewElementRef}
            key={review._id}
            name={review.name}
            clearTime={review.clearTime}
            content={review.content}
          />
        );
      }

      return (
        <View
          lastRef={null}
          key={review._id}
          name={review.name}
          clearTime={review.clearTime}
          content={review.content}
        />
      );
    });
  };

  return (
    <Wrapper>
      <TopBox>
        <Title>REVIEW</Title>
        <LinkButton
          path="/"
          title="메인으로 가기"
          color="black"
        />
      </TopBox>
      <Notice>* 게임에 대한 스포일러와 비밀번호는 피해서 적어주세요!!</Notice>
      {renderWrite()}
      {renderReviews()}
      {isLoading && <p>Loading...</p>}
      {error && (
        <Alert
          bgColor="#ffffff"
          color="black"
        >
          {error}
        </Alert>)}
      <TopButton
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={topIcon} alt="위로 가기 아이콘" />
        TOP
      </TopButton>
    </Wrapper>
  );
}

export default Review;

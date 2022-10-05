import { useState } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Button from "../../common/Button";

import { setLiker } from "../../../api/service";

import { ICON } from "../../../constants/variants";
import { LIKE } from "../../../constants/types";
import { OK } from "../../../constants/messages";

import {
  ADD,
  REMOVE,
} from "../../../constants/tasks";

const buildStyle = ({ cursor }) => css`
  cursor: ${cursor};
`;

const IconType = {
  like: {
    cursor: "pointer",
  },
  comment: {
    cursor: "default",
  },
};

const StyledInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 65px;
  height: 40px;
  margin: 0px 10px;
`;

const Count = styled.div`
  width: 35px;
  font-weight: bold;
  text-align: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;

  ${({ type }) => buildStyle(IconType[type])}
`;

const LIKE_IMAGE = "/images/like.png";
const DISLIKE_IMAGE = "/images/dislike.png";

export default function Info({ type, image, count, isLiked, snippetId }) {
  const userId = localStorage.getItem("userId");

  const isLogin = userId !== null;
  const isLike = type === LIKE;

  const [likeStatus, setLikeStatus] = useState({
    isLiking: isLiked,
    showingNumber: count,
    likeIcon: isLiked ? LIKE_IMAGE : DISLIKE_IMAGE,
  });

  const { mutate } = useMutation(({ snippetId, taskType }) => setLiker(snippetId, taskType), {
    onSuccess: (data) => {
      if (data.result === OK) {
        setLikeStatus({
          isLiking: !likeStatus.isLiking,
          showingNumber: data.likerNumber,
          likeIcon: likeStatus.likeIcon === LIKE_IMAGE ? DISLIKE_IMAGE : LIKE_IMAGE,
        });
      }
    },
  });

  const handleClick = () => {
    if (likeStatus.isLiking) {
      mutate({ snippetId, taskType: REMOVE });

      return;
    }

    mutate({ snippetId, taskType: ADD });
  };

  return (
    <StyledInfoWrapper>
      <Button
        variant={ICON}
        onClick={isLogin && isLike ? handleClick : undefined}
        children={<Icon type={type} src={isLike ? likeStatus.likeIcon : image} />}
      />
      <Count>{likeStatus.showingNumber}</Count>
    </StyledInfoWrapper>
  );
}

Info.propTypes = {
  type: PropTypes.string.isRequired,
  image: PropTypes.string,
  count: PropTypes.number.isRequired,
  isLiked: PropTypes.bool,
  snippetId: PropTypes.string,
};

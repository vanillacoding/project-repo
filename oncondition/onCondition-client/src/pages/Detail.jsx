import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";

import Modal from "../components/ModalComponent";
import ModalWrapper from "../components/ModalWrapper";
import DetailWrapper from "../components/DetailWrapper";
import ButtonsWrapper from "../components/ButtonsWrapper";

import ContentViewer from "../components/ContentViewer";
import ContentBoard from "../components/ContentBoard";
import ContentForm from "../components/ContentForm";
import RateForm from "../components/RateForm";
import CommentContainer from "../components/CommentContainer";
import HeartCounter from "../components/HeartCounter";

import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import theme from "../theme";

import getApi from "../api/category";
import { getKoreanTimeString } from "../utils/time";
import { ERROR } from "../constants/messages";
import {
  CANCEL, EDIT, DELETE, SAVE,
} from "../constants/buttons";

function Detail() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { creatorId, category, ratingId } = useParams();
  const { getById, editById, deleteById } = getApi(category);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [hasModal, setHasModal] = useState(false);
  const [hasPicture, setHasPicture] = useState(false);

  async function loadById() {
    const loadedData = await getById(creatorId, ratingId);

    if (!loadedData) {
      return;
    }

    setData({
      category: loadedData.category,
      date: loadedData.date,
      heartCount: loadedData.rating?.heartCount || 0,
      text: loadedData.rating?.text || "",
      url: loadedData.url,
      type: loadedData.type,
      duration: loadedData.duration,
    });
    setHasPicture(!!loadedData.url);
    setComments(loadedData.comments);
  }

  useEffect(() => {
    loadById();
  }, [creatorId, ratingId]);

  const handleFormSubmit = async function (values) {
    const { date, heartCount, text } = values;

    const result = await editById(creatorId, ratingId, {
      date,
      heartCount,
      text,
    });

    if (result) {
      setIsEditing(false);
      setData(result.data);
    }
  };

  const handleRedirect = function () {
    history.push(`/${creatorId}/${category}`);
  };

  const handleDeleteButtonClick = async function () {
    const result = await deleteById(creatorId, ratingId);

    if (result) {
      handleRedirect();
    }
  };

  const handleCloseButtonClick = function () {
    handleRedirect();
  };

  const handleDeletePreConfirm = function () {
    setHasModal(true);
  };

  const handleCommentUpdate = function () {
    loadById();
  };

  const cancelButton = (
    <Button
      onClick={() => setIsEditing(false)}
      text={CANCEL}
    />
  );

  const editButton = (
    <Button
      onClick={() => setIsEditing(true)}
      text={EDIT}
    />
  );

  const deleteButton = (
    <Button
      onClick={handleDeletePreConfirm}
      text={DELETE}
    />
  );

  if (!data) {
    return null;
  }

  const type = data.category !== "Activity" ? data.category : data.type || "";
  const snippet = data.duration ? `(${data.duration})` : "";

  data.snippet = snippet;

  const heading = !hasPicture
    ? <>
      <p>{getKoreanTimeString(data.date)}</p>
      <span>{`${type} ${snippet} `}</span>
      <HeartCounter count={data?.heartCount || 0} />
    </> : null;

  return (
    <ModalWrapper>
      {hasModal && <Modal
        innerText="정말로 삭제하시겠어요?"
        onConfirm={handleDeleteButtonClick}
        onCancel={() => setHasModal(false)}
      />}
      <CircleButton
        color={theme.background.main}
        onClick={handleCloseButtonClick}
      >x</CircleButton>
      <DetailWrapper>
        <div className="viewer">
          {hasPicture
            ? isEditing
              ? <ContentForm
                isEditForm
                onSubmit={handleFormSubmit}
                submitButtonText={SAVE}
                additionalButton={cancelButton}
                defaultValues={data}
              />
              : <>
                <ContentViewer
                  {...data}
                />
                <ButtonsWrapper isShrink={!hasPicture}>
                  {editButton}
                  {deleteButton}
                </ButtonsWrapper>
              </>
            : isEditing
              ? <RateForm
                onSubmit={handleFormSubmit}
                submitButtonText={SAVE}
                additionalButton={cancelButton}
                defaultValues={data}
              />
              : <div>
                <ContentBoard
                  heading={heading}
                  text={data?.text || ERROR.RATING_TEXT_NOT_EXIST}
                  width={400}
                  height={260}
                />
                {creatorId === user.id && (
                  <ButtonsWrapper isShrink>
                    {editButton}
                    {deleteButton}
                  </ButtonsWrapper>
                )}
              </div>
          }
        </div>
        <div className="comment">
          <CommentContainer
            creatorId={creatorId}
            comments={comments}
            category={category}
            ratingId={ratingId}
            onUpdate={handleCommentUpdate}
          />
        </div>
      </DetailWrapper>
    </ModalWrapper>
  );
}

export default Detail;

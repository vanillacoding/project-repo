import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Modal from "../components/ModalComponent";
import PreferenceBar from "../components/PreferenceBar";
import CustomCategoryStatus from "../components/CustomCategoryStatus";
import CreateCategoryForm from "../components/CreateCategoryForm";
import { postGoogleToken } from "../api/auth";
import { addCustomCategory, deleteCustomCategory } from "../api/customCategory";
import { useGapi } from "../helpers/useGapi";
import { COPY } from "../constants/buttons";
import { setCustomCategories } from "../features/userSlice";

const PreferenceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.3fr 0.7fr;
  grid-template-areas:
  "my-user-code refresh"
  "create-category category-status";
  grid-gap: 3%;
  justify-content: center;
  overflow: hidden;

  @media screen and (max-width: 1800px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "my-user-code"
      "refresh"
      "create-category"
      "category-status";
    width: 100%;
  }
`;

function Preference() {
  const { creatorId } = useParams();
  const { id, customCategories } = useSelector((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasModal, setHasModal] = useState(false);
  const [deletedCategory, setDeletedCategory] = useState("");
  const [gapi, isGapiLoaded] = useGapi();

  const dispatch = useDispatch();

  const handleCopy = function ( ) {
    navigator.clipboard.writeText(id);
    alert("나의 유저코드가 클립보드에 복사되었습니다!");
  };

  const getGoogleFitData = async function () {
    setIsUpdating(true);

    const auth2 = gapi.auth2?.getAuthInstance();

    if (!auth2) {
      setIsUpdating(false);

      return;
    }

    const {
      access_token: googleAccessToken,
    } = await auth2.currentUser.get().reloadAuthResponse();
    const res = await postGoogleToken(creatorId, googleAccessToken);

    if (!res) {
      return;
    }

    setIsUpdating(false);
  };

  const handleDeleteButtonClick = async function () {
    const modifiedCategories = await deleteCustomCategory(
      { creatorId, deletedCategory },
    );

    if (modifiedCategories) {
      dispatch(setCustomCategories(modifiedCategories));
    }

    setHasModal(false);
    setDeletedCategory("");
  };

  const handleDeletePreConfirm = function (category) {
    setHasModal(true);
    setDeletedCategory(category);
  };

  const customCategoryStatuses = customCategories.map(({ category }) => (
    <CustomCategoryStatus
      key={category}
      category={category}
      onDeleteButtonClick={handleDeletePreConfirm}
    />
  ));

  const handleCreateCategory = async function ({ categoryType, category }) {
    const modifiedCategories = await addCustomCategory(
      { creatorId, category, categoryType },
    );

    if (modifiedCategories) {
      dispatch(setCustomCategories(modifiedCategories));
    }
  };

  return (
    <div>
      {hasModal && <Modal
        innerText="정말로 삭제하시겠어요?"
        onConfirm={handleDeleteButtonClick}
        onCancel={() => setHasModal(false)}
      />}
      <h1>설정</h1>
      <PreferenceWrapper>
        <div className="my-user-code">
          <h2>나의 유저 코드</h2>
          <PreferenceBar
            value="userCode"
            buttonText={COPY}
            onButtonClick={handleCopy}
          />
        </div>
        <div className="refresh">
          <h2>Google Fit 수동 동기화</h2>
          {isGapiLoaded && <PreferenceBar
            value={isUpdating ? "동기화중입니다" : "동기화 완료"}
            buttonText="동기화"
            onButtonClick={getGoogleFitData}
          />}
        </div>
        <div className="create-category">
          <h2>커스텀 카테고리 추가</h2>
          <CreateCategoryForm onSubmit={handleCreateCategory}/>
        </div>
        <div className="category-status">
          <h2>내 커스텀 카테고리</h2>
          {customCategoryStatuses}
        </div>
      </PreferenceWrapper>
    </div>
  );
}

export default Preference;

import React from "react";

import Picker from "../../../components/Picker/Picker";

import {
  PAIN,
  LOVE,
  COURSE,
  FRIEND,
  EMPLOYMENT
} from "../../../constants/category";
import {
  PUBLIC,
  PRIVATE,
  NICKNAME,
  ANONYMOUNS
} from "../../../constants/postInfo";

const WorryInfoPickers = ({
  postType,
  category,
  anonymousType,
  handlePostPickerChange,
  handleCategoryPickerChange,
  handleAnonymousePickerChange
}) => {
  const postTypes = [
    { label: PUBLIC, value: PUBLIC },
    { label: PRIVATE, value: PRIVATE }
  ];
  const anonymousTypes = [
    { label: NICKNAME, value: NICKNAME },
    { label: ANONYMOUNS, value: ANONYMOUNS }
  ];
  const categoryTypes = [
    { label: PAIN, value: PAIN },
    { label: LOVE, value: LOVE },
    { label: COURSE, value: COURSE },
    { label: FRIEND, value: FRIEND },
    { label: EMPLOYMENT, value: EMPLOYMENT }
  ];

  return (
    <>
      <Picker
        label="공개 여부"
        value={postType}
        itemList={postTypes}
        handleChange={handlePostPickerChange}
      />
      <Picker
        label="익명 여부"
        value={anonymousType}
        itemList={anonymousTypes}
        handleChange={handleAnonymousePickerChange}
      />
      <Picker
        label="고민 카테고리"
        value={category}
        itemList={categoryTypes}
        handleChange={handleCategoryPickerChange}
      />
    </>
  );
};

export default React.memo(WorryInfoPickers);

import React from "react";

import TextInput from "../../../components/TextInput/TextInput";

import styles from "./styles";

const WorryInputs = ({
  postTitle,
  worryContents,
  handleTitleChange,
  handleContentsChange
}) => {
  return (
    <>
      <TextInput
        value={postTitle}
        style={styles.postTitle}
        placeholder="고민의 제목을 적어주세요"
        handleInputChange={handleTitleChange}
      />
      <TextInput
        isMultiline={true}
        value={worryContents}
        style={styles.contents}
        placeholder="고민 거리를 작성해보세요"
        handleInputChange={handleContentsChange}
      />
    </>
  );
};

export default React.memo(WorryInputs);

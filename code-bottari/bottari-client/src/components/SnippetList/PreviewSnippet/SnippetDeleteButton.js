import { useState } from "react";
import { useHistory } from "react-router";

import Button from "../../common/Button";
import ConfirmingDropdown from "./ConfirmingDropdown";

import { deleteSnippet } from "../../../api/service";

import { OK } from "../../../constants/messages";

export default function SnippetDeleteButton() {
  const [isClicked, setClickStatus] = useState(false);

  const history = useHistory();

  const handleClickStatus = (boolean) => setClickStatus(boolean);

  const deletionHandler = async () => {
    try {
      const data = await deleteSnippet("/snippets");

      if (data.result === OK) {
        history.push("/");
      }
    } catch (error) {
      alert(error.message); // 에러 처리
    }
  };

  return (
    <>
      <Button variant="tool" onClick={handleClickStatus}>삭제</Button>
      {isClicked && (
        <ConfirmingDropdown onCancelButtonClick={setClickStatus} onDeleteButtonClick={deletionHandler} />
      )}
    </>
  );
}

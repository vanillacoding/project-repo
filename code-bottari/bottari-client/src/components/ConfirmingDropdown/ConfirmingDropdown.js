import PropTypes from "prop-types";

import Dropdown from "../common/Dropdown";
import Button from "../common/Button";

import {
  CONFIRM,
  UTILITY,
} from "../../constants/variants";

import {
  CANCEL,
  DELETE,
} from "../../constants/names";

const buttonNames = [CANCEL, DELETE];

export default function ConfirmingDropdown({ onCancelButtonClick, onDeleteButtonClick }) {
  const clickHandler = ({ target }) => {
    if (target.textContent === CANCEL) {
      onCancelButtonClick(false);

      return;
    }

    onDeleteButtonClick();
  };

  return (
    <Dropdown variant={CONFIRM}>
      <p>정말로 삭제하시겠습니까?</p>
      <div onClick={clickHandler}>
        {buttonNames.map((name) => <Button variant={UTILITY} key={name}>{name}</Button>)}
      </div>
    </Dropdown>
  );
}

ConfirmingDropdown.propTypes = {
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

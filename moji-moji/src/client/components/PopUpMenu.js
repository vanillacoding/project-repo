import React from 'react';
import PropTypes from 'prop-types';
import './PopUpMenu.scss';
import Button from './Button';

const PopUpMenu = ({
  emoji,
  text,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="PopUpMenu">
      <span className="emoji" role="img" aria-label="meaning">
        {emoji}
      </span>
      <span className="text">{text}</span>
      <Button className="PopUpMenu__btn" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
};

PopUpMenu.propTypes = {
  emoji: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

PopUpMenu.defaultProps = {
  emoji: '',
  text: '',
  buttonText: '',
  onButtonClick: () => {}
};

export default PopUpMenu;

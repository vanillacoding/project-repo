import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

export const Popup = ({
  className,
  content,
  resultMessage,
  children
}) => {
  return (
    <div className={styles[className]}>
      <div className={styles.popupContents}>
        <p>{content}</p>
        <p>{resultMessage}</p>
      </div>
      <div className={styles.popupChildren}>
        {children}
      </div>
    </div>
  );
};

const Card = ({
  gamePhase,
  title,
  buttonText,
  onClick,
  children
}) => {
  return (
    <div className={styles.container}>
      <h4>{gamePhase}</h4>
      <h3>{title}</h3>
      {children}
      {
        buttonText &&
        <Button text={buttonText} onClick={() => onClick()} />
      }
    </div>
  );
};

Popup.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  resultMessage: PropTypes.string,
  children: PropTypes.node,
};

Card.propTypes = {
  gamePhase: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Card;

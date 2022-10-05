import React from 'react';
import PropTypes from 'prop-types';

import style from './Dropdown.module.css';

const Dropdown = ({ isMobile, items, handleOnClick }) => {
  return (
    <ul className={isMobile ? style.DropdownMobile : style.Dropdown}>
      {items.map((item, idx) => (
        <li className={style.DropdownItem} key={idx}>
          <button
            className={style.DropdownButton}
            type="button"
            onClick={handleOnClick}
            name={item}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

Dropdown.defaultProps = {
  isMobile: false,
  handleOnClick: () => {},
};

Dropdown.propTypes = {
  isMobile: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnClick: PropTypes.func,
};

export default Dropdown;

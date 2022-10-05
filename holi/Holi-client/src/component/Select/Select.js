import React from 'react';
import PropTypes from 'prop-types';

import './Select.scss';

function Select({ onSelect, list }) {
  return (
    <select onChange={(event) => onSelect(event.target.value)}>
      {Array.isArray(list)
        ? list.map((option, index) => {
            return index ? (
              <option vlaue={option} key={`option-${index}`}>{option}</option>
            ) : (
              <option vlaue='ALL' key={`option-${index}`}>{option}</option>
            );
          })
        : Object.keys(list).map((option, index) => {
            return (
              <option value={option} key={`option-${index}`}>{list[option]}</option>
            );
          })}
    </select>
  );
}

Select.propTypes = {
  onSelect: PropTypes.func.isRequired,
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Select;

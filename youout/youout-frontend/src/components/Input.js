import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({
  type,
  id,
  labelName,
  value,
  name,
  placeholder,
  onChange,
  ...attrs
}) => {
  return (
    <div className={styles.container}>
      {
        labelName &&
        <label htmlFor={id}>{labelName}</label>
      }
      {
        type === 'text' &&
        <input
          type='text'
          value={value}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required
          {...attrs}
        />
      }
      {
        type === 'select' &&
        <select
          name={name}
          id={id}
          onChange={onChange}
        >
          <option>--선택--</option>
          <option value={Number(1000 * 60 * 10)}>10분</option>
          <option value={Number(1000 * 60 * 20)}>20분</option>
          <option value={Number(1000 * 60 * 30)}>30분</option>
          <option value={Number(1000 * 60 * 40)}>40분</option>
          <option value={Number(1000 * 60 * 50)}>50분</option>
          <option value={Number(1000 * 60 * 60)}>1시간</option>
        </select>
      }
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(Input);

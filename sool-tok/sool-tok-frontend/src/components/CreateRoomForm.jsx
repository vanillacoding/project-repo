import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CreateRoomForm({ onSubmit }) {
  const [inputs, setInputs] = useState({
    title: '',
    maxNum: '2',
  });

  const submitRoomData = ev => {
    ev.preventDefault();
    const { title, maxNum } = inputs;
    onSubmit({ title, maxNum: Number(maxNum) });
  };

  const handleInputChange = ev => {
    const { name, value } = ev.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>어서 자리 잡자!</h2>
      <h3>좌석의 최대 인원은 4명입니다.</h3>
      <form onSubmit={submitRoomData}>
        <input
          type='text'
          name='title'
          minLength='2'
          maxLength='12'
          value={inputs.title}
          onChange={handleInputChange}
          required
        />
        <input
          type='number'
          name='maxNum'
          min='2'
          max='4'
          value={inputs.maxNum}
          onChange={handleInputChange}
          required
        />
        <input type='submit' value='좌석 잡기' />
      </form>
    </div>
  );
}

export default CreateRoomForm;

CreateRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

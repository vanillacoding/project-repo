import React, { useState } from 'react';
import PropTypes from 'prop-types';

function JoinRoomForm({ onSubmit }) {
  const [input, setInput] = useState('');

  const submitRoomData = ev => {
    ev.preventDefault();
    onSubmit(input.split('/rooms/')[1]);
  };

  const handleInputChange = ev => {
    const { value } = ev.target;
    setInput(value);
  };

  return (
    <div>
      <h2>친구한테 가자!</h2>
      <h3>공유 받은 URL 을 입력하세요</h3>
      <form onSubmit={submitRoomData}>
        <input
          type='url'
          required
          placeholder='https://www.sool-tok.live'
          pattern='https://www.sool-tok.live/rooms/.*'
          title='The URL must be in a Sool-tok domain.'
          value={input}
          onChange={handleInputChange}
        />
        <input type='submit' value='합석하기' />
      </form>
    </div>
  );
}

export default JoinRoomForm;

JoinRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

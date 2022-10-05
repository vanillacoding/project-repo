import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

function MyChannels(props) {
  const {
    isLoggedIn,
    dictionary,
    history,
    updateMyWords,
    onAddWordClick,
    myWords,
  } = props;

  function handleAddButtonClick() {}

  return (
    <div>
      <form
        className="search-form"
        onSubmit={ev => {
          onSearchSubmit(ev);
          history.push('/videos');
        }}
      >
        <div className="input-search-wrapper">
          <input
            onChange={ev => {
              onTextChange(ev);
            }}
            className="input-search"
            placeholder="Start Typing"
            type="text"
          />
        </div>
      </form>
    </div>
  );
}

export default MyChannels;

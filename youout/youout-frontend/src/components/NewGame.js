import React from 'react';
import Header from '../components/Header';
import NewGameForm from '../components/NewGameForm';
import PropTypes from 'prop-types';

const NewGame = ({ onCreateNewGame }) => {
  return (
    <Header title='게임 만들기'>
      <NewGameForm onCreateNewGame={onCreateNewGame} />
    </Header>
  );
};

NewGame.propTypes = {
  onCreateNewGame: PropTypes.func.isRequired,
};

export default NewGame;

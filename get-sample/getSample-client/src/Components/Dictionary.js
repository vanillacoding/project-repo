import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import './Dictionary.scss';

function Dictionary(props) {
  const {
    isLoggedIn,
    dictionary,
    history,
    updateMyWords,
    onAddWordClick,
    myWords,
  } = props;

  function handleAddButtonClick() {
    if (!isLoggedIn) {
      history.replace('login', 'videos');
    } else {
      updateMyWords(dictionary, 'add');
      onAddWordClick(dictionary.word, myWords);
    }
  }

  return (
    <div className="Dictionary">
      <div className="dictionary-contents">
        <Tooltip
          title="Add"
          size="small"
          aria-label="add"
          onClick={() => {
            handleAddButtonClick(dictionary.word);
          }}
        >
          <Fab color="secondary">
            <AddIcon color="disabled" />
          </Fab>
        </Tooltip>
        <div className="dictionary-text">
          {'partOfSpeech' in dictionary.results[0] &&
            'word' in dictionary &&
            'definition' in dictionary.results[0] && (
              <>
                <span className="partOfSpeech">
                  {dictionary.results[0].partOfSpeech}
                </span>
                <span className="word">{dictionary.word}</span>
                <div className="definition">
                  {dictionary.results[0].definition}
                </div>
              </>
            )}
          {dictionary.results[0].synonyms && (
            <div className="synonyms">
              = {dictionary.results[0].synonyms.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dictionary;

import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Modal from './Modal';
import './Common.scss';
import './MyWords.scss';

function MyWords(props) {
  const {
    myWords,
    updateMyWords,
    onDeleteWordClick,
    onReadyModal,
    UpdateModalMessage,
    getVideoData,
    history,
  } = props;
  console.log(props);

  let myWordsKeys = Object.keys(myWords);
  let myWordList;
  let resultsList;

  if (myWordsKeys.indexOf('undefined') !== -1) {
    myWordsKeys = myWordsKeys.filter(key => {
      return key !== 'undefined';
    });
  }
  if (myWordsKeys.length) {
    myWordList = myWordsKeys.map(key => {
      resultsList = myWords[key]['results'].map((result, index) => {
        // const partOfSpeech = result['partOfSpeech'];
        return (
          <div key={index} className="results-List">
            <div className="definition">- {result['definition']}</div>
          </div>
        );
      });
      return (
        <div
          className="word-wrapper"
          onClick={() => {
            const word = myWords[key]['word'];
            const videosInfo = myWords[key]['videosInfo'];
            console.log('history', history);
            if (videosInfo) {
              getVideoData({ foundWord: word, info: videosInfo });
              history.push('/videos');
            }
          }}
        >
          <div className="word-headline">
            <RemoveCircleIcon
              className="remove-circle-icon"
              onClick={ev => {
                onReadyModal();
                handleRemoveButtonClick(ev, key);
                UpdateModalMessage('Successfully deleted');
              }}
            />
            <span className="partOfSpeech">
              {myWords[key]['results'][0]['partOfSpeech']}
            </span>
            <span className="word">{myWords[key]['word']}</span>
            <span className="pronunciation">
              [{myWords[key]['pronunciation']['all']}]
            </span>
          </div>
          {resultsList}
        </div>
      );
    });
  }

  function handleRemoveButtonClick(ev, key) {
    console.log(key);
    console.log('wordInfo:', myWords[key]);
    updateMyWords(key, 'remove');
    onDeleteWordClick(key, myWords);
  }

  return (
    <>
      {<Modal {...props} />}
      {myWordList && (
        <div className="MyWords">
          <h1>MY WORDS</h1>
          <div>{myWordList}</div>
        </div>
      )}
      {!myWordList && (
        <div className="MyWords">
          <div className="noWords">There is no my word list yet.</div>
        </div>
      )}
    </>
  );
}

export default MyWords;

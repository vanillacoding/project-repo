import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserPage.module.scss';

const ImageBox = ({ name, image, email }) => {
  return (
    <div className={styles.imageBox}>
      <img src={image} alt='user-image' />
      <p className={styles.userInfo}>
        <span>{name}</span>
        <span>{email}</span>
      </p>
    </div>
  );
};

const ContentsBox = ({
  boxTitle,
  contents,
  loadMore,
  showDetail
}) => {
  return (
    <div className={styles.contentsBox}>
      <p className={styles.text}>{boxTitle}</p>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <button onClick={() => showDetail(content.id)}>
              {content.text}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.moreButton}
        onClick={() => loadMore()}
      >
      more
      </button>
    </div>
  );
};

const UserPage = ({
  image,
  name,
  email,
  histories,
  games,
  navigation: {
    moreHistories,
    moreGames,
    showDetailGame,
    showDetailHistory
  },
}) => {
  const nomalizedHistories = histories.map((history) => {
    const { _id: id, game: { name }  } = history;
    return { id, text: name };
  });

  const nomalizedGames = games.map((game) => {
    const { _id: id, name } = game;
    return { id, text: name };
  });

  return (
    <div className={styles.container}>
      <ImageBox
        name={name}
        image={image}
        email={email}
      />
      <ContentsBox
        boxTitle='내가 플레이한 방'
        contents={nomalizedHistories}
        loadMore={moreHistories}
        showDetail={showDetailHistory}
      />
      <ContentsBox
        boxTitle='내가 만든 방'
        contents={nomalizedGames}
        loadMore={moreGames}
        showDetail={showDetailGame}
      />
    </div>
  );
};

ImageBox.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

ContentsBox.propTypes = {
  boxTitle: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
};

UserPage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  histories: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  navigation: PropTypes.shape({
    moreHistories: PropTypes.func.isRequired,
    moreGames: PropTypes.func.isRequired,
    showDetailGame: PropTypes.func.isRequired,
    showDetailHistory: PropTypes.func.isRequired,
  }),
};

export default UserPage;

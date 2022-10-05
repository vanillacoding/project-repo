import React from 'react';
import PropTypes from 'prop-types';
import styles from './DetailPage.module.scss';

const DetailPage = ({ list, onClick, title }) => {
  return (
    <div className={styles.detailContainer}>
      <p className={styles.text}>{title}</p>
      <ul className={styles.list}>
        {
          list.map((item) => (
            <li
              key={item._id}
              id={item._id}
              name={item.name}
              onClick={() => onClick(item._id)}
            >
              {item.name || item.game.name}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

DetailPage.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    game: PropTypes.shape({
      name: PropTypes.string,
    }),
  })),
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DetailPage;

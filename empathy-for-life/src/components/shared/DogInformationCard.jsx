import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGE_URLS } from "../../constants/constants";

import styles from "../styles/dogsInformationCard.module.css";
import InputButton from "./InputButton";

const DogInformationCard = ({
  id,
  name,
  breed,
  gender,
  age,
  character,
  isAdmin,
}) => {
  const { pathname, state } = useLocation();
  const { modal } = state;
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img
          className={styles[character]}
          src={IMAGE_URLS.DOGS_SPRITE}
          alt="A dog character"
        />
      </div>
      <ul className={styles.descriptions}>
        <li>
          이름: {name}
        </li>
        <li>
          견종: {breed}
        </li>
        <li>
          성별: {gender === "male" ? "수컷" : "암컷"}
        </li>
        <li>
          나이: {`${age}살`}
        </li>
      </ul>
      <div className={styles.buttonContainer}>
        {isAdmin
          ? <Link
              className={styles.anchor}
              to={{
                pathname: `${pathname}/edit/${id}`,
                state: { modal },
              }}
            >
              <InputButton
                className={styles.button}
                text="편집"
              />
            </Link>
          : null
        }
        <Link
          className={styles.anchor}
          to={{
            pathname: `${pathname}/${id}`,
            state: { modal },
          }}
        >
          <InputButton
            className={styles.button}
            text="세부정보"
          />
        </Link>
      </div>
    </div>
  );
};

export default DogInformationCard;

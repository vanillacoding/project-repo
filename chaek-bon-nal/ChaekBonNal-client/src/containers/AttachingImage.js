import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { receiveImageData, draftsImage } from '../action/index';
import { saveBookImage } from '../api/bookAPI';
import styles from './css/AttachingImage.module.css';

const AttachingImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ imageSrc, setImageSrc ] = useState('');
  const [ imageFile, setImageFile ] = useState(null);

  const userToken = localStorage.token;
  let resultUrl = null;

  const onChangeImageFile = useCallback((e) => {
    setImageFile(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
      dispatch(draftsImage(reader.result));
    };
  });

  const onClickAddButton = useCallback(async () => {
    if (!resultUrl) {
      resultUrl = await saveBookImage(userToken, imageFile);
    }
    setImageSrc(resultUrl);
    dispatch(receiveImageData(resultUrl));
    history.goBack(1);
  });

  const startTextDetection = useCallback(async () => {
    resultUrl = await saveBookImage(userToken, imageFile);
    dispatch(receiveImageData(resultUrl));
    history.push(`/writing/attaching-image/text-detection`);
  });

  return (
    <div className={styles.container}>
    {
      imageSrc
      && <div className={styles.imageContainer}>
        <img className={styles.image} src={imageSrc} />
      </div>
    }
    <label for='fileBtn' className={styles.fileContainer}>
      <p>파일 선택</p>
      <input
        type='file'
        name='photo'
        onChange={onChangeImageFile}
        id='fileBtn'
        className={styles.fileButton}
        accept='image/*;capture=camera'
      />
    </label>
    <button
      className={styles.detectionButton}
      onClick={startTextDetection}
    >인용구 추출</button>
    <button
      className={styles.addButton}
      onClick={onClickAddButton}
    >첨부하기</button>
  </div>
  );
}

export default AttachingImage

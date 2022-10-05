import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { OkButton } from '../StyledButton';
import uploadImageToS3 from '../../../apis/S3';

export default function ImgUploader({ handleUpload }) {
  const [imgFiles, setImgFiles] = useState([]);
  const [imgs, setImgs] = useState([]);

  async function onClick() {
    try {
      // TODO: usePromise / async 사용으로 바꾸기
      const url = await uploadImageToS3(imgFiles[0]);

      handleUpload({ src: url });
    } catch (error) {
      // TODO: error component
      console.log(error);
    }
  }

  async function onFileChange(e) {
    const { files } = e.target;

    setImgFiles(files);

    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      // TODO: event말고 콜백이나 다른 방법은 없는지 찾아보기
      reader.readAsDataURL(file);

      reader.addEventListener('load', () => {
        const img = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        };

        setImgs((prev) => prev.concat(img));
      });
    });
  }

  function onDragEnterCapture(e) {
    e.stopPropagation();
  }

  return (
    <ImgUploaderContainer>
      <DropZone>
        <PlaceHolder>DRAG & DROP IMAGE HERE</PlaceHolder>
        <input
          type='file'
          onChangeCapture={onFileChange}
          onDragEnterCapture={onDragEnterCapture}
          accept='image/x-png, image/jpeg, image/gif'
        />
      </DropZone>
      <PreviewImgContainer>
        {imgs && (
          imgs.map((img) => (
            <PreviewImg src={img.src} alt={img.name} />
          ))
        )}
      </PreviewImgContainer>
      <OkButton onClick={onClick}>
        Ok
      </OkButton>
    </ImgUploaderContainer>
  );
}

ImgUploader.propTypes = {
  handleUpload: PropTypes.func,
};

const PlaceHolder = styled.p`
  margin: 0;
  position: absolute;
  width: 100%;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  color: #bfbdbd;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
`;

const ImgUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: rgba(255,255,255,1);
  padding: 12px 12px;
  border: 1px solid rgb(243, 243, 243);
  box-shadow: 4px 17px 20px 0px rgb(0 0 0 / 8%);
  box-sizing: border-box;
`;

const DropZone = styled.label`
  display: block;
  position: relative;
  width: 100%;
  height: 200px;
  border: 0.3rem dashed #bfbdbd;

  & input {
    width: 100%;
    height: 100%;
  }

  & ::-webkit-file-upload-button {
    display: none;
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// TODO: grid
const PreviewImgContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  margin-top: 1rem;
  gap: 10px;
  overflow-x: scroll;
`;

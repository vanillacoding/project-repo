import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import * as actions from "../../reducers/user";
import { profileType } from "../../constants";

const Wrapper = styled.div`
  .img-container {
    color: ${({ theme }) => theme.colors.indigo};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 2rem;
  }

  .img-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 15rem;

    span {
      width: 100%;
      text-align: center;
    }
  }

  .hidden-span {
    color: ${({ theme }) => theme.colors.white};
  }

  img {
    width: 10rem;
    border-radius: 50%;
  }

  form {
    input {
      color: ${({ theme }) => theme.colors.indigo};
    }

    button {
      font-size: ${({ theme }) => theme.fontSizes.small};
      border: 1px solid black;
    }
  }
`;

const UserPhotoEditForm = ({ _id, photoUrl }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const photoInputRef = useRef(null);

  const resetProfilePhoto = () => {
    setPhoto(null);
    setPreviewUrl(null);
    photoInputRef.current.value = null;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (photo) {
      const file = new FormData();
      file.append("photo", photo);

      dispatch(actions.editProfileRequest({ type: profileType.photo, file, _id }));
    }

    resetProfilePhoto();
  };

  const handleFileOnChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      reader.onloadend = () => {
        setPhoto(file);
        setPreviewUrl(imageUrl);
      };

      reader.readAsDataURL(file);

      return;
    }

    setPhoto(null);
    setPreviewUrl(photoUrl);
  };

  return (
    <Wrapper>
      <div className="img-container" >
        <div className="img-box" >
          <img src={photoUrl} />
          <span className="hidden-span">Current IMG</span>
        </div>
        {previewUrl && <div className="img-box" >
          <img src={previewUrl} />
          <span>Preview IMG</span>
        </div>}
      </div>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          ref={photoInputRef}
          onChange={handleFileOnChange}
        />
        <button type="submit" >Edit Photo</button>
      </form>
    </Wrapper>
  );
};

UserPhotoEditForm.propTypes = {
  _id: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
};

export default UserPhotoEditForm;

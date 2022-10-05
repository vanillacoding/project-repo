import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import ImageWrapper from "./ImageWrapper";
import ButtonsWrapper from "./ButtonsWrapper";
import HeartInput from "./HeartInput";
import Button from "./Button";
import resizeImage from "../helpers/resizeImage";
import { getKoreanTimeString } from "../utils/time";
import theme from "../theme";

const FormWrapper = styled.div`
  margin: 0 auto;
  padding: 0 20px;

  .header {
    padding: 0 20px;
  }
`;

const Input = styled.input`
  width: 205px;
  border-radius: 5px;
  border: solid 1px transparent;

  :focus {
    outline: none;
  }

  @media screen and (max-width: 400px) {
    width: 100px;
  }
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  width: calc(100% - 70px);
  margin: 5px 20px 20px 20px;
  padding: 5px 15px;
  line-height: 2rem;
  border-radius: 7px;
  border-style: hidden;
  background: ${({ theme }) => theme.background.input};
  color: ${({ theme }) => theme.text.input};
  text-align: left;
  resize: none;

  :focus {
    outline: none;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function ContentForm({
  color,
  isEditForm,
  onSubmit,
  submitButtonText,
  additionalButton,
  defaultValues,
}) {
  const imageInput = useRef(null);
  const [date, setDate] = useState(defaultValues.date || "");
  const [heartCount, setHeartCount] = useState(defaultValues.heartCount);
  const [text, setText] = useState(defaultValues.text);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultValues.url);

  const handleCountChange = function (value) {
    setHeartCount(value);
  };

  const handleDateChange = function ({ target }) {
    setDate(target.value);
  };

  const addImage = function () {
    if (image) {
      setImage(null);
    }

    imageInput.current.click();
  };

  const handleTextChange = function ({ target }) {
    setText(target.value);
  };

  const handleSubmitButton = async function () {
    let resizedImage = "";

    if (image) {
      resizedImage = resizeImage(imageUrl);
    }

    await onSubmit({
      date, heartCount, text, image: resizedImage,
    });

    setDate("");
    setHeartCount(0);
    setText("");
    setImageUrl("/img/add-picture.png");
    setImage(null);
  };

  const onImageChange = function ({ target }) {
    if (!target.files.length) {
      return;
    }

    const urlReader = new FileReader();
    const uploadedImage = [...target.files].pop();

    if (uploadedImage) {
      setImage(uploadedImage);

      urlReader.onload = function ({ target }) {
        setImageUrl(target.result);
      };

      urlReader.readAsDataURL(uploadedImage);
    }
  };

  return (
    <FormWrapper>
      <Wrapper color={color}>
        <div className="header">
          {!date ? <Input
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
          /> : <span>{getKoreanTimeString(date)}</span>}
          <HeartInput count={heartCount} onChange={handleCountChange}/>
        </div>
        <HiddenInput ref={imageInput} type="file"
          className="imageInput" accept="image/*"
          name="file" onChange={onImageChange}
          disabled={isEditForm}
        />
        <ImageWrapper onClick={addImage}>
          <img src={imageUrl} />
        </ImageWrapper>
        <Textarea
          placeholder="내용을 입력해주세요"
          value={text}
          onChange={handleTextChange}
        />
      </Wrapper>
      <ButtonsWrapper>
        <Button text={submitButtonText} onClick={handleSubmitButton} />
        {additionalButton}
      </ButtonsWrapper>
    </FormWrapper>
  );
}

ContentForm.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  isEditForm: PropTypes.bool,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  additionalButton: PropTypes.element,
  defaultValues: PropTypes.shape({
    heartCount: PropTypes.number,
    url: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
  }),
};

ContentForm.defaultProps = {
  color: theme.background.main,
  isEditForm: false,
  defaultValues: {
    heartCount: 0,
    url: "/img/add-picture.png",
    text: "",
  },
};

export default ContentForm;

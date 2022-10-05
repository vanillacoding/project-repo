import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.form`
  padding-top: 1em;
`;

const FormGroup = styled.div`
  width: 100%;
`;

const Label = styled.label`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: 0.8em;
  line-height: 1.5;
`;

// TODO: 변수화해서 빼기, 현재 Input / Textarea 같은속성있음
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  margin-bottom: 1em;
  font-size: 0.8em;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  resize: none;
  min-height: calc(1.5em + 1rem + 2px);
  padding: 0.375rem 0.75rem;
  margin-bottom: 1em;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
`;

const ValidationText = styled.span`
  color: tomato;
  font-size: 0.6rem;
`;

function ProfileForm({
  name,
  photoURL,
  description,
  musicURL,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <Form
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <Label htmlFor="name">
          이름
        </Label>
        <ValidationText>
          {"\u00A0"}
          {"\u00A0"}
          * 영어 및 숫자만 입력 가능합니다.
        </ValidationText>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete
          value={name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">
          자기소개
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="musicURL">
          배경음악
        </Label>
        <Input
          id="musicURL"
          name="musicURL"
          type="text"
          autoComplete
          value={musicURL}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="photoURL">
          이미지
        </Label>
        <Input
          id="photoURL"
          name="photoURL"
          type="text"
          autoComplete
          value={photoURL}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Buttons>
        <button type="submit">변경</button>
      </Buttons>
    </Form>
  );
}

ProfileForm.propTypes = {
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  musicURL: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;

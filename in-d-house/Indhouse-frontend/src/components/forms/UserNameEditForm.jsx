import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import * as actions from "../../reducers/user";
import { profileType } from "../../constants";

const Wrapper = styled.div`
  margin-top: 1rem;

  input {
    font-size: ${({ theme }) => theme.fontSizes.small};
    border: 1px solid black;
  }

  button {
    font-size: ${({ theme }) => theme.fontSizes.small};
    border: 1px solid black;
  }
`;

const UserNameEditForm = ({ _id, currentName }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (currentName === name) return;

    dispatch(actions.editProfileRequest({ type: profileType.name, name, _id }));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          name="name"
          id="name"
          onChange={({ target }) => setName(target.value)}
        />
        <button type="submit" >Edit Name</button>
      </form>
    </Wrapper>
  );
};

UserNameEditForm.propTypes = {
  _id: PropTypes.string.isRequired,
  currentName: PropTypes.string.isRequired,
};

export default UserNameEditForm;

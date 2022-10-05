import React from "react";
import styled from "styled-components";

import useGenreChoose from "../hooks/useGenreChoose";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;

  .choose-container {
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60vw;
    min-width: 30rem;
    height: 70vh;
    padding: 2rem 3rem;
    border-radius: 0.2rem;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.miniTitleSize};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.blue};
    text-align: left;
  }

  form {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
  }

  label {
    background-color: ${({ theme }) => theme.colors.blue};
    display: block;
    position: relative;
    width: 12vw;
    min-width: 6rem;
    height: 5rem;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    span {
      color: ${({ theme }) => theme.colors.white};
      font-size: ${({ theme }) => theme.fontSizes.medium};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.2s ease-in-out;
    }

    input {
      display: none;
    }

    input[type=checkbox]:checked + span {
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      color: black;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.blue};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.white};
    width: 14vw;
    height: 3rem;
    border-radius: 10rem;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  .notice {
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.yellow};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
  }
`;

const GenreChoose = () => {
  const { refs, genre, handleSubmit } = useGenreChoose();

  return (
    <Wrapper>
      <div className="choose-container">
        <div className="title">
          <h1>Choose</h1>
          <h1>Your taste</h1>
        </div>
        <form
          id="genre-form"
          onSubmit={handleSubmit}
        >
          {genre.map((item, idx) => {
            return (
              <label key={item._id} >
                <input
                  key={item._id}
                  name={item._id}
                  type="checkbox"
                  ref={refs[idx]}
                />
                <span>{item.name}</span>
              </label>
            );
          })}
        </form>
        <button type="submit" form="genre-form" >Done</button>
      </div>
      <span className="notice">We will find your taste in music. Just check.</span>
    </Wrapper>
  );
};

export default GenreChoose;

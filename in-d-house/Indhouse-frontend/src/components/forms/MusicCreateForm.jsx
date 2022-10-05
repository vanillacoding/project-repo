import React, { useState } from "react";
import styled from "styled-components";

import MusicCoverForm from "./MusicCoverForm";

import api from "../../api";

const Wrapper = styled.div`
  width: 20rem;
  margin-left: 3rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      font-size: 1.5rem;
    }

    button {
      margin-top: 1rem;
    }
  }
`;

const MusicCreateForm = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    if (!photo) return;

    const file = new FormData();
    file.append("photo", photo);

    const { location } = await api.uploadMusicCoverPhoto({ file });

    const music = {
      title,
      artist,
      genre,
      youtubeUrl,
      coverPhotoUrl: location,
    };

    api.createMusic(music);
  };

  return (
    <Wrapper>
      <h1>Music Create</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" >Title</label>
        <input
          type="text"
          name="title"

          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="artist" >Artist</label>
        <input
          type="text"
          name="artist"

          onChange={({ target }) => setArtist(target.value)}
        />
        <label htmlFor="genre" >Genre</label>
        <input
          type="text"
          name="genre"

          onChange={({ target }) => setGenre(target.value)}
        />
        <label htmlFor="youtubeUrl" >youtubeUrl</label>
        <input
          type="text"
          name="youtubeUrl"

          onChange={({ target }) => setYoutubeUrl(target.value)}
        />
        <button type="submit" >Create Musics</button>
      </form>
      <MusicCoverForm setPhoto={setPhoto} />
    </Wrapper>
  );
};

export default MusicCreateForm;

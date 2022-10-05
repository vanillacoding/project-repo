import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Setting from "./Setting";
import HomeNav from "./HomeNav";
import HomeMain from "./HomeMain";
import UserPhoto from "./UserPhoto";
import TasteFind from "./TasteFind";
import TasteMusic from "./TasteMusic";
import FavoriteMusic from "./LikeMusic";
import FavoriteArtist from "./LikeArtist";
import MusicCreateForm from "./forms/MusicCreateForm";

const Page = styled.div`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightIndigo};
  min-width: 100vw;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  .contents {
    width: 85vw;
    margin-top: 5vh;
  }
`;

const Home = () => {
  const {
    _id,
    name,
    photoUrl,
    likeMusic,
    likeGenre,
    createdAt,
  } = useSelector(state => state.user.profile);

  return (
    <Page>
      <HomeNav userId={_id} />
      <UserPhoto photo={photoUrl} />

      <div className="contents">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomeMain name={name} likeGenre={likeGenre} likeMusic={likeMusic} />}
          />
          <Route
            path="/users/setting/:user_id"
            component={Setting}
          />
          <Route
            path="/users/taste_music/:user_id"
            render={() => <TasteMusic createdAt={createdAt} likeMusic={likeMusic} />}
          />
          <Route
            path="/users/favorite_music/:user_id"
            render={() => <FavoriteMusic likeMusic={likeMusic} />}
          />
          <Route
            path="/users/favorite_artist/:user_id"
            render={() => <FavoriteArtist likeMusic={likeMusic} />}
          />
          <Route
            path="/users/find_taste/:user_id"
            render={() => <TasteFind likeGenre={likeGenre} likeMusic={likeMusic} />}
          />
          <Route
            path="/create_music"
            component={MusicCreateForm}
          />
        </Switch>
      </div>
    </Page>
  );
};

export default Home;

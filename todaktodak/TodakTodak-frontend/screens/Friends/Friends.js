import React, { useCallback, useState } from "react";
import {
  View,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import FriendList from "./FriendList/FriendList";
import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import AlertModal from "../../components/AlertModal/AlertModal";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  userSlice,
  fetchMyFriends,
  fetchWaitingFriends
} from "../../redux/userSlice";

import styles from "./styles";

import {
  MY_FRIENDS,
  WAITING_FRIENDS
} from "../../constants/friendStatus";

import backgroundImage from "../../assets/pngs/background.png";

const Friends = () => {
  const [activeCategory, setActiveCategory] = useState(MY_FRIENDS);

  const dispatch = useDispatch();
  const {
    isLoading,
    friendList,
    accessToken,
    errorMessage,
    waitingFriendList
  } = useSelector((state) => state.user);

  useFocusEffect(useCallback(() => {
    dispatch(userSlice.actions.resetFriendFetchedStatus());

    if (activeCategory === MY_FRIENDS) {
      dispatch(fetchMyFriends(accessToken));
    }

    if (activeCategory === WAITING_FRIENDS) {
      dispatch(fetchWaitingFriends(accessToken));
    }
  }, [
    userSlice,
    accessToken,
    activeCategory,
    fetchMyFriends,
    fetchWaitingFriends
  ]));

  const clearMessage = useCallback(() => {
    dispatch(userSlice.actions.clearMessage());
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text={MY_FRIENDS} />
        <View style={styles.categoryWrapper}>
          <CategoryButton
            title={MY_FRIENDS}
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title={WAITING_FRIENDS}
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
        </View>
        {isLoading
          ? <View style={styles.loadingWrapper}>
              <Loading style={styles.loading} />
            </View>
          : <FriendList
              friendList={activeCategory === MY_FRIENDS
                ? friendList
                : waitingFriendList
              }
            />
        }
      </View>
      {errorMessage &&
        <AlertModal
          message={errorMessage}
          handleModalClose={clearMessage}
        />
      }
    </ImageBackground>
  );
}

export default React.memo(Friends);

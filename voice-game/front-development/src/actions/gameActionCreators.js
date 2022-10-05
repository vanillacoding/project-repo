import getActionTypes from "./actionTypes.js";

export const fetchRoomsAction = (gameTitle) => async (dispatch) => {
  dispatch({ type: getActionTypes().FETCH_ROOMS });

  try {
    const response = await fetch(`${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}`);
    const result = await response.json();

    dispatch({
      type: getActionTypes().FETCH_ROOMS_SUCCESS,
      payload: {
        gameTitle,
        rooms: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().FETCH_ROOMS_FAIL, payload: err });
  }
};

export const createRoomAction = (gameTitle, newRoomId, createdBy) => async (
  dispatch
) => {
  dispatch({ type: getActionTypes().CREATE_ROOM });

  try {
    const response = await fetch(`${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameTitle, newRoomId, createdBy }),
    });

    const result = await response.json();

    dispatch({
      type: getActionTypes().CREATE_ROOM_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().CREATE_ROOM_FAIL, payload: err });
  }
};

export const joinRoomAction = (gameTitle, roomId, playerData) => async (
  dispatch
) => {
  dispatch({ type: getActionTypes().JOIN_ROOM });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameTitle, roomId, playerData, type: "JOIN" }),
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().JOIN_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().JOIN_ROOM_FAIL, payload: err });
  }
};

export const leaveRoomAction = (gameTitle, roomId, playerData) => async (
  dispatch
) => {
  dispatch({ type: getActionTypes().LEAVE_ROOM });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameTitle, roomId, playerData, type: "LEAVE" }),
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().LEAVE_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().LEAVE_ROOM_FAIL, payload: err });
  }
};

export const deleteRoomAction = (gameTitle, roomId) => async (dispatch) => {
  dispatch({ type: getActionTypes().DELETE_ROOM });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameTitle, roomId }),
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().DELETE_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().DELETE_ROOM_FAIL, payload: err });
  }
};

export const changeRoomStatus = (gameTitle, roomId, status) => async (
  dispatch
) => {
  dispatch({ type: getActionTypes().CHANGE_ROOM_STATUS });

  try {
    const response = await fetch(`${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameTitle, roomId, status }),
    });

    const result = await response.json();

    dispatch({
      type: getActionTypes().CHANGE_ROOM_STATUS_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().CHANGE_ROOM_STATUS_FAIL, payload: err });
  }
};

export const gameResultAction = (
  type,
  gameTitle,
  roomId,
  player,
  gameResult
) => async (dispatch) => {
  dispatch({ type: getActionTypes().PATCH_RESULT });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          gameTitle,
          playerData: player,
          gameResult,
        }),
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().PATCH_RESULT_SUCCESS,
      payload: {
        title: gameTitle,
        player: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().PATCH_RESULT_FAIL, payload: err });
  }
};

export const loadImages = (imageName, imageSrc) => async (dispatch) => {
  const loadImage = async (imageSrc) => {
    const loadedImage = Array.isArray(imageSrc) ? [] : {};

    for (const key in imageSrc) {
      if (typeof imageSrc[key] === "object") {
        loadedImage[key] = await loadImage(imageSrc[key]);
        continue;
      }

      if (typeof imageSrc[key] === "number") {
        loadedImage[key] = imageSrc[key];
        continue;
      }

      if (typeof imageSrc[key] === "string") {
        loadedImage[key] = await (async (url) => {
          return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = url;
          });
        })(imageSrc[key]);
      }
    }

    return loadedImage;
  };

  const loadedImage = await loadImage(imageSrc);
  dispatch({
    type: getActionTypes().STORE_IMAGE,
    payload: {
      name: imageName,
      image: loadedImage,
    },
  });
};

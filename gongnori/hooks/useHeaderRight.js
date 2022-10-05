/**
 * @function it makes header right button and send request to API server
 * @params {Object} config - header right's configuration
 * @params {Object} req - http request information
 */

import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { updateMyData } from "../actions/userActionCreators";
import {
  viewInputAlert,
  hideHeaderRightLoading,
  viewHeaderRightLoading,
  viewCompletion,
} from "../actions/loadingActionCreators";

import fetchServer from "../utils/fetchServer";

import * as colors from "../constants/colors";
import * as params from "../constants/params";
import * as sizes from "../constants/sizes";
import * as fonts from "../constants/fonts";

const useHeaderRight = (config, req) => {
  const { navigation, title, disabled } = config;
  const { method, path, data, socket } = req;

  const dispatch = useDispatch();
  const handlePressHeaderRight = _.throttle(async () => {
    if (data) {
      for (const input in data) {
        if (data[input] === null) {
          dispatch(viewInputAlert());

          return;
        }
      }
    }

    dispatch(viewHeaderRightLoading());

    const res = await fetchServer(
      method,
      path,
      data
    );

    dispatch(hideHeaderRightLoading());
    dispatch(updateMyData());

    if (socket) {
      socket.emit("fix-match");

      return;
    }

    dispatch(viewCompletion());
  }, params.THROTTLE_TIME);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          !disabled && (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 0.2 * sizes.DEVICE_WIDTH,
                height: 0.1 * sizes.DEVICE_HEIGHT,
                right: 20,
              }}
              onPress={handlePressHeaderRight}
            >
              <Text style={{
                width: 0.2 * sizes.DEVICE_WIDTH,
                color: colors.SECONDARY_WHITE,
                fontSize: sizes.TERTIARY_FONT_SIZE,
                fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
                textAlign: "center",
                textAlignVertical: "center",
                includeFontPadding: false,
              }}
              >
                {title}
              </Text>
            </TouchableOpacity>
          )
        );
      },
    });
  });
};

export default useHeaderRight;

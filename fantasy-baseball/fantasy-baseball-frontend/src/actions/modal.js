import {
  SHOW_MODAL,
  HIDE_MODAL,
} from "../constants/actionTypes";

export const showModal = (content) => ({ type: SHOW_MODAL, content });

export const hideModal = () => ({ type: HIDE_MODAL });

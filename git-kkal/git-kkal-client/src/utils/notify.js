import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import ERROR from '../constants/error';

if (typeof window !== 'undefined') {
  injectStyle();
}

export const notifySuccess = () => {
  toast.success(ERROR.CLONE_SUCCESS_MESSAGE, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export const notifyErr = (err) => {
  const errorMessage =
    err === 500 ? ERROR.INTERNAL_SERVER_ERROR : ERROR.INVALID_URL_INPUT_MESSAGE;

  toast.error(errorMessage, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

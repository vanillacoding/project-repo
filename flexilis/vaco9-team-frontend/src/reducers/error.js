const ERROR_OCCURED = 'ERROR_OCCURED';
const ERROR_SETTLED = 'ERROR_SETTLED';

export const errorOccured = (message, link) => ({
  type: ERROR_OCCURED,
  payload: {
    message,
    link,
  },
});

export const errorSettled = () => ({
  type: ERROR_SETTLED,
});

const initialState = {
  display: false,
  message: '',
  link: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_OCCURED: {
      return {
        ...state,
        display: true,
        message: action.payload.message,
        link: action.payload.link,
      };
    }
    case ERROR_SETTLED: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}

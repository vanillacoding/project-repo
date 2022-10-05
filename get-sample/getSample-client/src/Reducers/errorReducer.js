import actionTypes from '../Constants/actionTypes';

const initialState = {
  type: null,
  message: '',
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case NO_VIDEOS:
      return {
        ...action.data,
      };
  }
}

export default errorReducer;

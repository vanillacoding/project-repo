import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unexpected action type: ${action.type}`);
  }
}

function useAsync(callback, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const data = await callback();

      dispatch({ type: 'SUCCESS', data });
    } catch (err) {
      dispatch({ type: 'ERROR', error: err });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  const { loading, data, error } = state;

  return { loading, data, error };
}

export default useAsync;

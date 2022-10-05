import { useCallback } from "react";
import { useDispatch } from "react-redux";

import actionCreator from "../actions/actionCreator";

/**
 *
 *
 * @returns update handler
 */
const useUpdateMetaData = () => {
  const dispatch = useDispatch();

  const handleUpdateMetaData = useCallback(() => {
    dispatch(actionCreator.updateMetaDataAction());
  }, [dispatch]);

  return handleUpdateMetaData;
};

export default useUpdateMetaData;

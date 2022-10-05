import { useCallback } from "react";
import { useDispatch } from "react-redux";

import actionCreator from "../actions/actionCreator";

/**
 *
 *
 * @returns login handler
 */
const useUpdateMetaData = () => {
  const dispatch = useDispatch();

  const handleUpdatePrice = useCallback(() => {
    dispatch(actionCreator.updatePriceAction());
  }, [dispatch]);

  return handleUpdatePrice;
};

export default useUpdateMetaData;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStreamings } from "../actions/streamingActionCreators";

const useFetchStreamings = () => {
  const dispatch = useDispatch();
  const { streamings } = useSelector((state) => state.streaming);

  useEffect(() => {
    dispatch(fetchStreamings());
  }, [dispatch]);

  return streamings;
};

export default useFetchStreamings;

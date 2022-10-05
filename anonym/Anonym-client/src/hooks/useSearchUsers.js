import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchUsers } from "../actions/userActionCreator";

const useSearchUsers = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { searchList } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(searchUsers(search));
  }, [search, dispatch]);

  return searchList;
};

export default useSearchUsers;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { set } from "../../features/preloadSlice";
import { save } from "../../features/userSlice";
import { getAuthCheck } from "../../api";

import Header from "./Header";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuth = async () => {
      const { data } = await getAuthCheck();

      dispatch(save(data));
    };

    getAuth();
    dispatch(set());
  }, [dispatch]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};

export default Layout;

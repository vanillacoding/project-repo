import React from "react";
import Header from "./Header";

function index(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default index;

import React from "react";

import Calendar from "../components/Calendar";
import Background from "../components/Shared/Background";
import PageTitle from "../components/Shared/PageTitle";

const Main = () => {
  return (
    <div>
      <PageTitle className="sr-only">Main</PageTitle>
      <Calendar />
      <Background />
    </div>
  );
};

export default Main;

import React from "react";

const Loading = ({className}) => {
  return (
      <img
        className={className}
        src="/assets/images/running-shiba.gif"
        alt="running shiba"
      />
  );
};

export default Loading;

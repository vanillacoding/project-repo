import React from "react";

import { EMPTY_ROASTER } from "../../../constants";
import Roaster from "../../Roaster";

function LoadingRoaster() {
  return (
    <Roaster
      roaster={EMPTY_ROASTER}
      isSkeleton={true}
    />
  );
}

export default LoadingRoaster;

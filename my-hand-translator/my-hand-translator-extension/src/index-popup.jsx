import React from "react";
import { render } from "react-dom";

import Popup from "./components/Popup";
import { globalCss } from "./config/stitches.config";
import reset from "./config/reset";

globalCss(reset)();

render(<Popup />, document.getElementById("popup"));

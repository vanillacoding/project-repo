"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 0:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MyApp)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(7381);
// EXTERNAL MODULE: ./src/styles/theme.js
var theme = __webpack_require__(9254);
// EXTERNAL MODULE: external "firebase/app"
var app_ = __webpack_require__(9421);
var app_default = /*#__PURE__*/__webpack_require__.n(app_);
// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__(5942);
;// CONCATENATED MODULE: external "firebase/firestore"
const firestore_namespaceObject = require("firebase/firestore");
;// CONCATENATED MODULE: ./src/config/firebase-config.js



const firebaseConfig = {
  apiKey: "AIzaSyCVKarF8r3q2b2wYAX1DWgBcDeJLCm-Poc",
  authDomain: "voicelive-project.firebaseapp.com",
  projectId: "voicelive-project",
  storageBucket: "voicelive-project.appspot.com",
  messagingSenderId: "308677755258",
  appId: "1:308677755258:web:a70187043f385c7a2656c3",
  databaseURL: "https://voicelive-project.firebaseio.com"
};

if (!(app_default()).apps.length) {
  app_default().initializeApp(firebaseConfig);
} else {
  app_default().app();
}
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./pages/_app.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(react_.ThemeProvider, {
    theme: theme/* default */.Z,
    children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
  });
}

/***/ }),

/***/ 9254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const theme = {
  pink: '#F12152',
  navy: '#1D2E3C',
  darkNavy: '#00070c',
  blue: '#4378f7',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#c5c0c2',
  waitingBg: '#2d4b6560',
  onAirBg: '#65061c26',
  whiteShadow: '0px 1px 5px 3px #72727290',
  blueShadow: '0px 1px 3px 3px #668dea90',
  pinkShadow: '0px 1px 3px 3px #F1215290',
  blackShadow: '0px 1px 5px 3px rgba(0, 0, 0, 0.1)',
  textWhiteShadow: '0 0 5px #ffffffb7, 0 0 5px #ffffff8b, 0 0 10px #ffffffc7'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);

/***/ }),

/***/ 7381:
/***/ ((module) => {

module.exports = require("@emotion/react");

/***/ }),

/***/ 9421:
/***/ ((module) => {

module.exports = require("firebase/app");

/***/ }),

/***/ 5942:
/***/ ((module) => {

module.exports = require("firebase/auth");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(0));
module.exports = __webpack_exports__;

})();
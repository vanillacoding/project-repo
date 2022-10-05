exports.id = 330;
exports.ids = [330];
exports.modules = {

/***/ 9389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A_": () => (/* binding */ getRequest),
/* harmony export */   "GH": () => (/* binding */ putRequest),
/* harmony export */   "j0": () => (/* binding */ postRequest)
/* harmony export */ });
async function request(method, url, user, body) {
  let response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        authorization: user && `bearer ${user === null || user === void 0 ? void 0 : user.token}`
      },
      body
    });
  } catch (err) {
    throw new Error(err);
  }

  return response;
}

function getRequest(url, user, body) {
  return request('GET', url, user, body);
}
function putRequest(url, user, body) {
  return request('PUT', url, user, body);
}
function postRequest(url, user, body) {
  return request('POST', url, user, body);
}

/***/ }),

/***/ 694:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6177);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
const _excluded = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




function Button(_ref) {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(StyledButton, _objectSpread(_objectSpread({}, props), {}, {
    children: children
  }));
}
Button.defaultProps = {
  type: 'button'
};
const StyledButton = (_emotion_styled__WEBPACK_IMPORTED_MODULE_1___default().button)`
  all: unset;
  width: ${({
  width
}) => width || '130px'};
  height: ${({
  height
}) => height || '20px'};
  padding: 15px 20px;
  font-size: ${({
  fontSize
}) => fontSize || '15px'};
  line-height: ${({
  fontSize
}) => fontSize || '14px'};
  font-weight: ${({
  fontWeight
}) => fontWeight || '500'};
  text-align: center;
  cursor: pointer;
  border-radius: ${({
  borderRadius
}) => borderRadius || '20px'};
  background-color: ${({
  bgColor,
  theme
}) => bgColor || theme.gray};
  transition-property: scale, translateY;
  transition: scale 300ms ease-in;
  color: ${({
  color,
  theme
}) => color || theme.black};

  &:hover {
    transform: scale(0.97);
    opacity: 80%;
    background-color: ${({
  hoverBgColor,
  theme
}) => hoverBgColor || theme.white};
    color: ${({
  hoverColor,
  theme
}) => hoverColor || theme.darkNavy};
  }
`;

/***/ }),

/***/ 3172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ErrorBox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(694);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);






function ErrorBox({
  message
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
      children: message
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__.default, {
      href: "/",
      passHref: true,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_Button__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, {
          color: "red",
          children: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"
        })
      })
    })]
  });
}

/***/ }),

/***/ 4461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6177);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function Modal({
  children,
  onClose
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Wrapper, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(Dimmed, {
      "data-testid": "dimmed",
      onClick: onClose
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(StyledModal, {
      children: children
    })]
  });
}
const Wrapper = (_emotion_styled__WEBPACK_IMPORTED_MODULE_0___default().div)`
  width: 100%;
  height: 100%;
`;
const Dimmed = (_emotion_styled__WEBPACK_IMPORTED_MODULE_0___default().div)`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({
  theme
}) => theme.darkNavy}85;
`;
const StyledModal = (_emotion_styled__WEBPACK_IMPORTED_MODULE_0___default().div)`
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 450px;
  text-align: center;
  transform: translate(-50%, -50%);
  box-shadow: ${({
  theme
}) => theme.whiteShadow};
`;

/***/ }),

/***/ 3486:
/***/ ((module) => {

module.exports.b = {
  URL: "https://api.vlive.live"
};

/***/ }),

/***/ 7144:
/***/ ((module) => {

module.exports.EVENTS = {
  ENTER_CHANNEL: 'enter channel',
  LISTEN_ENTER_CHANNEL: 'listen enter channel',
  CREATE_CHANNEL: 'create channel',
  LISTEN_CREATE_CHANNEL: 'listen create channel',
  EXIT_CHANNEL: 'exit channel',
  LISTEN_EXIT_CHANNEL: 'listen exit channel',
  END_CHANNEL: 'end channel',
  LISTEN_END_CHANNEL: 'listen end channel',
  NEW_CHAT: 'new chat',
  LISTEN_NEW_CHAT: 'listen new chat',
  PLAYER_READY: 'player ready',
  LISTEN_PLAYER_READY: 'listen player ready',
  LISTEN_SEND_SIGNAL: 'listen send signal',
  ALL_USER: 'all user',
  SENDING_SIGNAL: 'sending signal',
  RETURNING_SIGNAL: 'returning signal',
  USER_JOINED: 'user joined',
  RECEIVING_RETURNED_SIGNAL: 'receiving returned signal',
  LISTEN_GAME_START: 'listen game start',
  READY_TO_START: 'start game',
  LISTEN_READY_TO_START: 'listen start game'
};

/***/ }),

/***/ 6388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cH": () => (/* binding */ getMySocketId),
/* harmony export */   "sV": () => (/* binding */ useSocket),
/* harmony export */   "UX": () => (/* binding */ socketClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7069);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);


const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1___default()();
const getMySocketId = () => socket.id;
function useSocket(eventName, cb) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    socket.on(eventName, cb);
    return function useSocketCleanup() {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);
  return socket;
}
const socketClient = socket;

/***/ }),

/***/ 9254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 2431:
/***/ (() => {

/* (ignored) */

/***/ })

};
;
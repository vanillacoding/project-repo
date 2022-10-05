"use strict";
exports.id = 511;
exports.ids = [511];
exports.modules = {

/***/ 2511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Header)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(6177);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);
// EXTERNAL MODULE: ./node_modules/next/dist/client/router.js
var client_router = __webpack_require__(4651);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./src/styles/theme.js
var theme = __webpack_require__(9254);
// EXTERNAL MODULE: ./src/hooks/socket/useSocket.js
var useSocket = __webpack_require__(6388);
// EXTERNAL MODULE: ./src/constants/api.js
var api = __webpack_require__(3486);
// EXTERNAL MODULE: ./src/constants/socketEvent.js
var socketEvent = __webpack_require__(7144);
// EXTERNAL MODULE: ./remote/remotes.js
var remotes = __webpack_require__(9389);
// EXTERNAL MODULE: ./src/components/ErrorBox.jsx
var ErrorBox = __webpack_require__(3172);
// EXTERNAL MODULE: ./src/components/Button.jsx
var Button = __webpack_require__(694);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/components/Main/CreateChannel.jsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














function CreateChannel({
  isModalOpen,
  onClose
}) {
  const {
    0: episodes,
    1: setEpisodes
  } = (0,external_react_.useState)([]);
  const {
    0: inputValue,
    1: setInputValue
  } = (0,external_react_.useState)({
    name: '',
    episodeId: ''
  });
  const router = (0,client_router.useRouter)();
  (0,external_react_.useEffect)(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const response = await (0,remotes/* getRequest */.A_)(`${api/* API.URL */.b.URL}/episode`, user);
        const {
          result,
          data,
          message
        } = await response.json();

        if (result === 'error') {
          return alert(message);
        }

        setEpisodes(data);
      } catch (err) {
        return /*#__PURE__*/jsx_runtime_.jsx(ErrorBox/* default */.Z, {
          message: err.message
        });
      }
    }

    fetchData();
  }, [isModalOpen]);

  async function submitData(ev) {
    ev.preventDefault();
    const {
      name,
      episodeId
    } = inputValue;

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await (0,remotes/* postRequest */.j0)(`${api/* API.URL */.b.URL}/channel`, user, JSON.stringify({
        name,
        episodeId,
        host: user._id
      }));
      const {
        result,
        data,
        message
      } = await response.json();
      const channelId = data._id;

      if (result === 'error') {
        throw new Error(message);
      }

      const res = await (0,remotes/* putRequest */.GH)(`${api/* API.URL */.b.URL}/channel/${channelId}`, user, JSON.stringify({
        state: 'enter',
        userId: user._id
      }));
      const {
        result: putResult,
        message: pusMessage
      } = await res.json();

      if (putResult === 'error') {
        throw new Error(pusMessage);
      }

      useSocket/* socketClient.emit */.UX.emit(socketEvent.EVENTS.CREATE_CHANNEL, data);
      router.push(`/channel/${channelId}`);
    } catch (err) {
      return /*#__PURE__*/jsx_runtime_.jsx(ErrorBox/* default */.Z, {
        message: err.message
      });
    }
  }

  function handleClick({
    currentTarget
  }) {
    const {
      id
    } = currentTarget;
    setInputValue(_objectSpread(_objectSpread({}, inputValue), {}, {
      episodeId: id
    }));
  }

  function handleChange({
    target
  }) {
    const {
      name,
      value
    } = target;
    setInputValue(_objectSpread(_objectSpread({}, inputValue), {}, {
      [name]: value
    }));
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "header",
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "title",
        children: "\uCC44\uB110\uAC1C\uC124 \uD558\uAE30"
      }), /*#__PURE__*/jsx_runtime_.jsx(Button/* default */.Z, {
        className: "exit-button",
        onClick: onClose,
        children: "\uB098\uAC00\uAE30"
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(CreatingForm, {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(ChannelName, {
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "channel-name",
          children: "\uCC44\uB110 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694"
        }), /*#__PURE__*/jsx_runtime_.jsx("input", {
          type: "text",
          name: "name",
          placeholder: "ex) \uC800\uB791 \uC5F0\uAE30\uBC30\uD2C0 \uD558\uC2E4 \uBD84 \uB4E4\uC5B4\uC624\uC138\uC694",
          value: inputValue.name,
          onChange: handleChange
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(EpisodeOptions, {
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "episode-select",
          children: "\uC5F0\uAE30\uD560 \uC791\uD488\uC744 \uC120\uD0DD\uD558\uC138\uC694"
        }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
          className: "episode-list",
          children: episodes.map(episode => /*#__PURE__*/(0,jsx_runtime_.jsxs)(EpisodeOption, {
            id: episode._id,
            onClick: handleClick,
            children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
              className: `episode-title ${inputValue.episodeId === episode._id && 'color'}`,
              children: episode.title
            }), /*#__PURE__*/jsx_runtime_.jsx(next_image.default, {
              src: episode.thumbnail,
              alt: "episode-thumbnail",
              id: episode._id,
              width: 180,
              height: 200
            })]
          }, episode._id))
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "button",
        children: /*#__PURE__*/jsx_runtime_.jsx(Button/* default */.Z, {
          type: "submit",
          onClick: submitData,
          bgColor: theme/* default.blue */.Z.blue,
          color: theme/* default.white */.Z.white,
          children: "\uCC44\uB110 \uAC1C\uC124"
        })
      })]
    })]
  });
}
const Container = (styled_default()).div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: ${({
  theme
}) => theme.darkNavy}90;
  color: ${({
  theme
}) => theme.white};

  .exit-button {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid white;
    color: ${({
  theme
}) => theme.white};
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    margin-top: 25px;
    padding: 0 50px;

    .title {
      font-size: 24px;
      line-height: 24px;
      color: ${({
  theme
}) => theme.blue};
    }
  }
`;
const CreatingForm = (styled_default()).form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 90%;
  padding: 30px 50px;
  box-sizing: border-box;
  text-align: left;

  .channel-name {
    display: block;
    font-size: 1.1em;
    color: ${({
  theme
}) => theme.white};
  }

  .button {
    margin: 10px auto 0 auto;
  }
`;
const ChannelName = (styled_default()).div`
  height: 80px;

  .channel-name {
    font-size: 16px;
  }

  input {
    width: 300px;
    margin-top: 10px;
    padding: 5px 10px;
  }
`;
const EpisodeOptions = (styled_default()).div`
  margin-top: 10px;
  height: 180px;

  .episode-select {
    font-size: 1.1em;
    color: ${({
  theme
}) => theme.white};
  }

  .episode-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;
const EpisodeOption = (styled_default()).li`
  display: flex;
  flex-direction: column;
  height: 110px;
  margin: 0 60px 0 0;
  font-size: 12px;
  list-style: none;
  cursor: pointer;

  .episode-title {
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  .color {
    color: ${({
  theme
}) => theme.pink};
  }
`;
// EXTERNAL MODULE: ./src/components/Modal.jsx
var Modal = __webpack_require__(4461);
;// CONCATENATED MODULE: ./src/components/Header.jsx







function Header() {
  const {
    0: isModalOpen,
    1: setIsModalOpen
  } = (0,external_react_.useState)(false);
  const {
    0: isLogin,
    1: setIsLogin
  } = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    setIsLogin(!!sessionStorage.getItem('user'));
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(HeaderWrapper, {
    loginStatus: isLogin,
    children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
      href: "/main",
      passHref: true,
      children: /*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "nav",
        children: "CHANNEL"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
      href: "/",
      passHref: true,
      children: /*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "nav logo",
        children: "VLIVE"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
      className: "nav create-channel",
      onClick: openModal,
      children: "CREATE CHANNEL"
    }), isModalOpen && /*#__PURE__*/jsx_runtime_.jsx(Modal/* default */.Z, {
      onClose: closeModal,
      children: /*#__PURE__*/jsx_runtime_.jsx(CreateChannel, {
        onClose: closeModal,
        isModalOpen: isModalOpen
      })
    })]
  });
}
const HeaderWrapper = (styled_default()).header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  text-align: center;
  background-color: ${({
  theme
}) => theme.darkNavy};
  box-shadow: ${({
  theme
}) => theme.blueShadow};

  .nav {
    width: 33.3vh;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: 600;
    font-size: 1.1em;
    color: ${({
  theme
}) => theme.white};

    &:hover {
      color: ${({
  theme
}) => theme.blue};
      transform: scale(1.05);
    }
  }

  .logo {
    font-weight: 800;
    font-size: 2em;
    color: ${({
  theme
}) => theme.blue};
  }

  .nav.create-channel {
    cursor: ${({
  loginStatus
}) => !loginStatus ? 'not-allowed' : 'pointer'};
    pointer-events: ${({
  loginStatus
}) => !loginStatus ? 'none' : 'auto'};
  }
`;

/***/ })

};
;
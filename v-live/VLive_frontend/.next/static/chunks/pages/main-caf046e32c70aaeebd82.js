(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671],{58:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return hn}});var r,i,o,a=t(168),s=t(7294),c=t(4524),u=t(2511),l=t(5675),d=t(4942),p=t(5861),h=t(7757),f=t.n(h),g=t(5503),m=(t(7397),t(9254)),x=t(3486),v=t(9389),b=t(694),w=t(3172),y=t(5893);function j(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function N(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?j(Object(t),!0).forEach((function(e){(0,d.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function S(n){var e=n.onLogin,t=(0,s.useState)(null),r=t[0],i=t[1];if(r)return(0,y.jsx)(w.Z,{message:r.message});function o(){return(o=(0,p.Z)(f().mark((function n(){var t,r,o,a,s,c,u,l;return f().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,g.Z.auth().signInWithPopup(new g.Z.auth.GoogleAuthProvider);case 2:return t=n.sent,r=t.user,o={email:r.email,name:r.displayName,photoUrl:r.photoURL},n.prev=5,n.next=8,(0,v.j0)("".concat(x.b.URL,"/login"),null,JSON.stringify(o));case 8:return a=n.sent,n.next=11,a.json();case 11:if(s=n.sent,c=s.result,u=s.data,l=s.message,"error"!==c){n.next=17;break}return n.abrupt("return",i(l));case 17:window.sessionStorage.setItem("user",JSON.stringify(N(N({},u.user),{},{token:u.token}))),e(),n.next=24;break;case 21:n.prev=21,n.t0=n.catch(5),i(n.t0.message);case 24:case"end":return n.stop()}}),n,null,[[5,21]])})))).apply(this,arguments)}return(0,y.jsx)(b.Z,{onClick:function(){return o.apply(this,arguments)},bgColor:m.Z.blue,width:"60%",fontSize:"1.2em",children:"Google"})}function Z(n){var e=n.setLogoutError,t=n.onLogout;function r(){return(r=(0,p.Z)(f().mark((function n(){return f().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,g.Z.auth().signOut();case 3:n.next=8;break;case 5:n.prev=5,n.t0=n.catch(0),e(n.t0.message);case 8:window.sessionStorage.removeItem("user"),t();case 10:case"end":return n.stop()}}),n,null,[[0,5]])})))).apply(this,arguments)}return(0,y.jsx)(b.Z,{onClick:function(){return r.apply(this,arguments)},width:"60%",bgColor:m.Z.pink,hoverBgColor:m.Z.blue,children:"\ub85c\uadf8\uc544\uc6c3"})}function O(n){var e=n.onLogin,t=n.onLogout,r=n.loginStatus,i=(0,s.useState)(null),o=i[0],a=i[1],c=(0,s.useState)(null),u=c[0],d=c[1];return u?(0,y.jsx)(w.Z,{message:u.message}):((0,s.useEffect)((function(){a(JSON.parse(sessionStorage.getItem("user")))}),[r]),(0,y.jsxs)(E,{children:[(0,y.jsxs)(_,{loginStatus:!0,children:[(0,y.jsx)("div",{className:"user-image",children:(0,y.jsx)(l.default,{className:"img",src:o?null===o||void 0===o?void 0:o.photoUrl:"/images/profile.png",alt:"profile-img",width:80,height:80})}),(0,y.jsxs)("div",{className:"profile",children:[(0,y.jsx)("div",{className:"user-email",children:o?null===o||void 0===o?void 0:o.email:"\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4"}),(0,y.jsx)("div",{className:"user-name",children:o?null===o||void 0===o?void 0:o.name:"\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4"})]})]}),(0,y.jsx)(A,{children:null===o?(0,y.jsx)(S,{onLogin:e}):(0,y.jsx)(Z,{setLogoutError:d,onLogout:t})})]}))}var k,E=c.Z.div(r||(r=(0,a.default)(["\n  padding: 0 20px;\n  text-align: center;\n  height: 35%;\n"]))),_=c.Z.div(i||(i=(0,a.default)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70%;\n\n  .img {\n    border-radius: 50%;\n  }\n\n  .profile {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 60%;\n\n    .user-email,\n    .user-name {\n      width: 80%;\n      padding: 15px 0;\n      font-size: 0.8em;\n      color: ",";\n      border-bottom: 1px solid ",";\n    }\n  }\n"])),(function(n){var e=n.loginStatus,t=n.theme;return e?t.white:t.gray}),(function(n){return n.theme.blue})),A=c.Z.div(o||(o=(0,a.default)(["\n  width: 100%;\n  height: 30%;\n  margin: auto;\n"]))),P=t(2503);function I(){return L.apply(this,arguments)}function L(){return(L=(0,p.Z)(f().mark((function n(){var e,t,r,i;return f().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e=JSON.parse(sessionStorage.getItem("user")),n.next=4,(0,v.A_)("".concat(x.b.URL,"/episode"),e);case 4:return t=n.sent,n.next=7,t.json();case 7:return r=n.sent,i=r.data,n.abrupt("return",i);case 12:return n.prev=12,n.t0=n.catch(0),n.abrupt("return",n.t0);case 15:case"end":return n.stop()}}),n,null,[[0,12]])})))).apply(this,arguments)}function C(n){var e=n.onClose,t=n.episode;return(0,y.jsxs)(z,{children:[(0,y.jsxs)("div",{className:"header",children:[(0,y.jsx)("span",{className:"title",children:t.title}),(0,y.jsx)(b.Z,{className:"exit-button",onClick:e,children:"\ub098\uac00\uae30"})]}),(0,y.jsx)("video",{autoPlay:!0,children:(0,y.jsx)("source",{src:t.videoUrl})})]})}var T,R,z=c.Z.div(k||(k=(0,a.default)(["\n  width: 100%;\n  height: 100%;\n  border: 1px solid white;\n  background-color: ","90;\n  color: ",";\n\n  .exit-button {\n    padding: 5px 10px;\n    border-radius: 10px;\n    background-color: transparent;\n    border: 1px solid white;\n    color: ",";\n    cursor: pointer;\n\n    :hover {\n      opacity: 0.7;\n    }\n  }\n\n  video {\n    width: 90%;\n    height: 80%;\n  }\n\n  .header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 10%;\n    margin-top: 25px;\n    padding: 0 50px;\n\n    .title {\n      font-size: 24px;\n      line-height: 24px;\n    }\n  }\n"])),(function(n){return n.theme.darkNavy}),(function(n){return n.theme.white}),(function(n){return n.theme.white})),D=t(4461);function U(){var n=(0,s.useState)(!1),e=n[0],t=n[1],r=(0,s.useState)(null),i=r[0],o=r[1],a=function(){var n=(0,P.ZP)("/episode",I);return{episodes:n.data,error:n.error}}(),c=a.episodes,u=a.error;if(u)return(0,y.jsx)(w.Z,{message:u.message});function d(){t(!1)}return(0,y.jsxs)(V,{children:[(0,y.jsx)("h2",{className:"preview-title",children:"Episode preview"}),(0,y.jsx)(H,{children:null===c||void 0===c?void 0:c.map((function(n){return(0,y.jsxs)("div",{className:"episode",onClick:function(){return function(n){o(n),t(!0)}(n)},children:[(0,y.jsx)("h3",{className:"episode-title",children:n.title}),(0,y.jsx)("div",{className:"episode-thumbnail",children:(0,y.jsx)(l.default,{src:n.thumbnail,alt:"Episode thumbnail",width:200,height:100})})]},n._id)}))}),e&&(0,y.jsx)(D.Z,{onClose:d,children:(0,y.jsx)(C,{onClose:d,episode:i})})]})}var J,V=c.Z.div(T||(T=(0,a.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  height: 65%;\n\n  .preview-title {\n    margin: 2px;\n    color: white;\n    font-weight: 500;\n    font-size: 1.2em;\n  }\n"]))),H=c.Z.div(R||(R=(0,a.default)(["\n  .episode-title {\n    font-weight: 300;\n    font-size: 1em;\n    color: white;\n  }\n\n  .episode {\n    padding-bottom: 10px;\n  }\n\n  .episode-thumbnail {\n    margin: 0px auto 10px 0;\n  }\n"]))),B=t(5785),G=t(6388),W=t(3239),X=t(1664),Y=t(1657),F=t(3942),M=t(7144);function $(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function q(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?$(Object(t),!0).forEach((function(e){(0,d.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):$(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function K(n){var e=n.channelId,t=n.isActive,r=(0,s.useState)(!0),i=r[0],o=r[1],a=(0,F.Z)(e),c=a.channel,u=a.error,l=(0,Y.Z)(e),d=l.players,h=l.mutate;if((0,s.useEffect)((function(){if(null==c)return null;var n=c.episode;o(n.characters.length>d.length)}),[d]),(0,G.sV)(M.EVENTS.LISTEN_ENTER_CHANNEL,(function(n){n.channelId===e&&h((function(e){return q(q({},e),{},{players:[].concat((0,B.Z)(e.players),[{user:n}])})}))})),(0,G.sV)(M.EVENTS.LISTEN_EXIT_CHANNEL,(function(n){var t=n.userId;if(n.channelId===e){var r=d.filter((function(n){return n.user._id!==t}));h((function(n){return q(q({},n),{},{players:r})}))}})),u)return(0,y.jsx)(w.Z,{message:u.message});if(null==e||null==c)return null;function g(){return(g=(0,p.Z)(f().mark((function n(e){var t,r,i,o,a;return f().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t=JSON.parse(sessionStorage.getItem("user")),n.next=4,(0,v.GH)("".concat(x.b.URL,"/channel/").concat(e),t,JSON.stringify({state:"enter",userId:null===t||void 0===t?void 0:t._id}));case 4:return r=n.sent,n.next=7,r.json();case 7:if(i=n.sent,o=i.result,a=i.message,"error"!==o){n.next=12;break}throw new Error(a);case 12:n.next=17;break;case 14:return n.prev=14,n.t0=n.catch(0),n.abrupt("return",(0,y.jsx)(w.Z,{message:n.t0.message}));case 17:case"end":return n.stop()}}),n,null,[[0,14]])})))).apply(this,arguments)}return(0,y.jsx)(nn,{isActive:t,children:(0,y.jsx)(X.default,{href:t&&i?"/channel/".concat(e):"#",passHref:!0,children:(0,y.jsx)("a",{className:t&&i?null:"disable",children:(0,y.jsxs)(b.Z,{className:"entry-button",onClick:function(){return function(n){return g.apply(this,arguments)}(e)},bgColor:t?m.Z.blue:"gray",hoverBgColor:m.Z.pink,width:"100px",height:"50px",children:[(0,y.jsx)("span",{className:"entry-text",children:"PLAY"}),(0,y.jsxs)("span",{className:"entry-count",children:[d.length," / ",c.episode.characters.length]})]})})},e)})}var Q,nn=c.Z.div(J||(J=(0,a.default)(["\n  line-height: 2px;\n\n  a {\n    text-decoration: none;\n  }\n\n  .entry-button {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    .entry-text {\n      padding: 5%;\n      font-size: 1.6em;\n      font-weight: 800;\n      color: ",";\n    }\n\n    .entry-count {\n      padding: 3%;\n      font-size: 1.1em;\n      font-weight: 700;\n      color: ",";\n    }\n  }\n\n  .disable {\n    cursor: not-allowed;\n    pointer-events: none;\n  }\n"])),(function(n){var e=n.isActive,t=n.theme;return e?t.white:t.darkNavy}),(function(n){var e=n.isActive,t=n.theme;return e?t.navy:t.darkNavy}));function en(n){var e=n.channel,t=e._id,r=e.name,i=e.episode,o=e.isPlaying,a=n.loginStatus;return(0,y.jsxs)(rn,{isPlaying:o,children:[(0,y.jsx)("div",{className:"state ".concat(o?"onAir":"waiting"),children:o?"ONAIR":"WAITING"}),(0,y.jsxs)("div",{className:"title-box",children:[(0,y.jsx)("h3",{className:"title",children:r}),(0,y.jsx)("p",{className:"episode-title",children:i.title})]}),(0,y.jsx)(K,{channelId:t,isActive:a,children:"\ud50c\ub808\uc774\uc5b4 \uc785\uc7a5"})]})}var tn,rn=c.Z.div(Q||(Q=(0,a.default)(["\n  position: relative;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  margin: 60px auto 0;\n  padding: 0 30px;\n  text-align: center;\n  width: 90%;\n  min-width: 400px;\n  height: 150px;\n  border: 2px solid\n    ",";\n  box-shadow: ",";\n  background-color: ",";\n\n  .title-box {\n    text-align: left;\n    width: 450px;\n  }\n\n  .state.onAir,\n  .state.waiting {\n    position: absolute;\n    top: -30px;\n    left: -10px;\n    width: 110px;\n    height: 40px;\n    line-height: 50px;\n    color: gray;\n    font: italic bold 28px/28px godic;\n  }\n\n  .state.onAir {\n    color: ",";\n    text-shadow: ",";\n    font-weight: 900;\n    font: italic bold 32px/32px godic;\n  }\n\n  .title {\n    font-size: 1.3em;\n    font-weight: 700;\n    text-overflow: ellipsis;\n    color: white;\n  }\n\n  .episode-title {\n    margin-top: -12px;\n    font-size: 1.1em;\n    font-weight: 400;\n    text-overflow: ellipsis;\n    color: #bbbbbb;\n  }\n"])),(function(n){var e=n.isPlaying,t=n.theme;return e?t.pink:t.blue}),(function(n){var e=n.isPlaying,t=n.theme;return e?t.pinkShadow:t.blueShadow}),(function(n){var e=n.isPlaying,t=n.theme;return e?t.onAirBg:t.waitingBg}),(function(n){return n.theme.pink}),(function(n){return n.theme.textWhiteShadow})),on=t(7144).EVENTS;function an(n){var e=n.loginStatus,t=(0,W.Z)(),r=t.activeChannels,i=t.error,o=t.mutate;return i?(0,y.jsx)(w.Z,{message:i.message}):((0,G.sV)(on.LISTEN_CREATE_CHANNEL,(function(n){var e=Object.assign(n,{isNew:!0});o((function(n){return[].concat((0,B.Z)(n),[e])}))})),(0,G.sV)(on.LISTEN_END_CHANNEL,(function(n){var e=r.filter((function(e){return e._id!==n}));o(e)})),(0,G.sV)(on.LISTEN_READY_TO_START,(function(n){var e=r.map((function(e){return e._id===n&&(e.isPlaying=!0),e}));o(e)})),(0,y.jsx)(un,{children:null===r||void 0===r?void 0:r.map((function(n){return(0,y.jsx)(en,{channel:n,loginStatus:e},n._id)}))}))}var sn,cn,un=c.Z.div(tn||(tn=(0,a.default)(["\n  display: inline-block;\n  width: 75%;\n  min-width: 500px;\n  height: 100%;\n  margin: auto;\n  padding: 20px 60px;\n  overflow-y: scroll;\n  background-image: linear-gradient(\n      rgba(5, 3, 19, 0.801),\n      rgba(5, 3, 19, 0.788),\n      rgba(5, 3, 19, 0.568),\n      rgba(5, 3, 19, 0.788),\n      rgba(5, 3, 19, 0.801)\n    ),\n    url(/images/background.jpg);\n\n  &::-webkit-scrollbar {\n    width: 13px;\n    background-color: ",";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 30px;\n    background-color: ",";\n\n    &:hover {\n      background-color: ",";\n      border: none;\n    }\n  }\n"])),(function(n){return n.theme.darkNavy}),(function(n){return n.theme.blue}),(function(n){return n.theme.white}));function ln(){var n=(0,s.useState)(!1),e=n[0],t=n[1];return(0,s.useEffect)((function(){t(!!sessionStorage.getItem("user"))}),[]),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(u.Z,{}),(0,y.jsxs)(dn,{children:[(0,y.jsx)(an,{loginStatus:e}),(0,y.jsxs)(pn,{children:[(0,y.jsx)(O,{onLogin:function(){return t(!0)},onLogout:function(){return t(!1)},loginStatus:e}),(0,y.jsx)(U,{})]})]})]})}var dn=c.Z.div(sn||(sn=(0,a.default)(["\n  height: 90vh;\n  display: flex;\n  width: 100%;\n"]))),pn=c.Z.div(cn||(cn=(0,a.default)(["\n  position: relative;\n  display: inline-block;\n  width: 30%;\n  min-width: 300px;\n  text-align: center;\n  background-size: cover;\n  background-image: linear-gradient(\n      rgba(5, 3, 19, 0.801),\n      rgba(5, 3, 19, 0.788),\n      rgba(5, 3, 19, 0.568),\n      rgba(5, 3, 19, 0.788),\n      rgba(5, 3, 19, 0.801)\n    ),\n    url('/images/11.jpg');\n\n  .disable {\n    cursor: not-allowed;\n    pointer-events: none;\n  }\n"])));function hn(){return(0,y.jsx)(ln,{})}},3942:function(n,e,t){"use strict";t.d(e,{Z:function(){return l}});var r=t(5861),i=t(7757),o=t.n(i),a=t(2503),s=t(3486),c=t(9389);function u(){return(u=(0,r.Z)(o().mark((function n(e){var t,r,i,a;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t=JSON.parse(sessionStorage.getItem("user")),n.next=4,(0,c.A_)("".concat(s.b.URL,"/channel/").concat(e),t);case 4:return r=n.sent,n.next=7,r.json();case 7:return i=n.sent,a=i.data,n.abrupt("return",a);case 12:n.prev=12,n.t0=n.catch(0),alert(n.t0.message);case 15:case"end":return n.stop()}}),n,null,[[0,12]])})))).apply(this,arguments)}function l(n){var e=(0,a.ZP)(n?"/channel/".concat(n):null,(function(){return function(n){return u.apply(this,arguments)}(n)}));return{channel:e.data,error:e.error,mutate:e.mutate}}},3239:function(n,e,t){"use strict";t.d(e,{Z:function(){return d}});var r=t(5861),i=t(7757),o=t.n(i),a=t(2503),s=t(3486),c=t(9389);function u(){return l.apply(this,arguments)}function l(){return(l=(0,r.Z)(o().mark((function n(){var e,t,r,i;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e=JSON.parse(sessionStorage.getItem("user")),n.next=4,(0,c.A_)("".concat(s.b.URL,"/channel"),e);case 4:return t=n.sent,n.next=7,t.json();case 7:return r=n.sent,i=r.data,n.abrupt("return",i);case 12:return n.prev=12,n.t0=n.catch(0),n.abrupt("return",n.t0);case 15:case"end":return n.stop()}}),n,null,[[0,12]])})))).apply(this,arguments)}function d(){var n=(0,a.ZP)("/channel",u),e=n.data,t=n.error,r=n.mutate,i=[],o=[];return null===e||void 0===e||e.forEach((function(n){n.isActive?o.push(n):i.push(n)})),{historyChannels:i,activeChannels:o,error:t,mutate:r}}},1657:function(n,e,t){"use strict";t.d(e,{Z:function(){return i}});var r=t(3942);function i(n){var e=(0,r.Z)(n),t=e.channel,i=e.error,o=e.mutate;return{players:t?t.players:[],error:i,mutate:o}}},9334:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/main",function(){return t(58)}])},5785:function(n,e,t){"use strict";function r(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function i(n){return function(n){if(Array.isArray(n))return r(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(n){if("string"===typeof n)return r(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(n,e):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.d(e,{Z:function(){return i}})}},function(n){n.O(0,[160,511,774,888,179],(function(){return e=9334,n(n.s=e);var e}));var e=n.O();_N_E=e}]);
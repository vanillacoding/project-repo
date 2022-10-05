/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/constants/messageName.js
const INIT = "init";
const CHANGE_TAB = "changeTab";
const CHANGE_WINDOW = "changeWindow";
const REMOVE_TAB = "removeTab";
const REMOVE_WINDOW = "removeWindow";
const SAVE_GROUP = "saveGroup";
const REMOVE_GROUP = "removeGroup";
const OPEN_GROUP = "openGroup";
const CLEAR_GROUPS = "clearGroups";
const CHANGE_GROUP_NAME = "changeGroupName";
const REMOVE_GROUP_TAB = "removeGroupTab";
const OPEN_TAB = "openTab";
const STORAGE_UPDATED = "storageUpdated";

/* harmony default export */ const messageName = ({
  INIT,
  CHANGE_TAB,
  CHANGE_WINDOW,
  REMOVE_TAB,
  REMOVE_WINDOW,
  SAVE_GROUP,
  REMOVE_GROUP,
  OPEN_GROUP,
  CLEAR_GROUPS,
  CHANGE_GROUP_NAME,
  REMOVE_GROUP_TAB,
  OPEN_TAB,
  STORAGE_UPDATED,
});

;// CONCATENATED MODULE: ./src/background.js


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.name) {
    case messageName.INIT:
      getInitialState().then((initalState) => sendResponse(initalState));
      break;
    case messageName.CHANGE_TAB:
      chrome.tabs.update(request.payload.tabId, { active: true });
      break;
    case messageName.CHANGE_WINDOW:
      chrome.windows.update(request.payload.windowId, { focused: true });
      break;
    case messageName.REMOVE_TAB:
      chrome.tabs.remove(Number(request.payload.tabId));
      break;
    case messageName.REMOVE_WINDOW:
      chrome.windows.remove(request.payload.windowId);
      break;
    case messageName.SAVE_GROUP:
      setStorageSyncData(request.payload).then(() =>
        sendResponse({ name: "groupSaved", payload: { text: "Group Saved" } })
      );
      break;
    case messageName.REMOVE_GROUP:
      chrome.storage.sync.remove(request.payload.groupName);
      break;
    case messageName.OPEN_GROUP:
      chrome.windows.create({ url: request.payload.url });
      break;
    case messageName.CLEAR_GROUPS:
      chrome.storage.sync.clear();
      break;
    case messageName.CHANGE_GROUP_NAME: {
      const { prevName, newName } = request.payload;

      changeGroupName(prevName, newName).then(() =>
        sendResponse({
          name: messageName.CHANGE_GROUP_NAME,
          payload: { text: "Groupname Changed" },
        })
      );
      break;
    }
    case messageName.REMOVE_GROUP_TAB: {
      const { groupName, tabUrl } = request.payload;

      removeGroupTab(groupName, tabUrl);
      break;
    }
    case messageName.OPEN_TAB:
      chrome.windows.create({ url: request.payload.url });
      break;
  }

  return true;
});

chrome.storage.onChanged.addListener((changes) => {
  chrome.runtime.sendMessage({
    name: messageName.STORAGE_UPDATED,
    payload: { changes },
  });
});

const getInitialState = async () => {
  const currentWindow = await chrome.windows.getCurrent({
    populate: true,
  });
  const windows = await chrome.windows.getAll({ populate: true });
  const tabGroups = await getStorageSyncData();

  return {
    name: "initRes",
    payload: {
      currentWindowId: currentWindow.id,
      windows,
      tabGroups,
    },
  };
};

const removeGroupTab = async (groupName, tabUrl) => {
  const options = {};
  const data = await getStorageSyncData(groupName);
  options[groupName] = data[groupName].filter((el) => el.url !== tabUrl);

  chrome.storage.sync.remove(groupName);

  if (options[groupName].length === 0) {
    return;
  }

  chrome.storage.sync.set(options);
};

const changeGroupName = async (prevName, newName) => {
  const options = {};
  const data = await getStorageSyncData(prevName);
  options[newName] = data[prevName];

  chrome.storage.sync.remove(prevName);
  chrome.storage.sync.set(options);
};

const getStorageSyncData = (key = null) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      resolve(items);
    });
  });
};

const setStorageSyncData = (options) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(options, () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      resolve();
    });
  });
};

/******/ })()
;
//# sourceMappingURL=background.js.map
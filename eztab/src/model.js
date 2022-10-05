import messageName from "./constants/messageName";

class Model {
  constructor() {
    this._windows = null;
    this._currentWindowId = null;
    this._tabGroups = {};

    chrome.runtime.onMessage.addListener((request) => {
      switch (request.name) {
        case messageName.STORAGE_UPDATED:
          for (let [key, { newValue }] of Object.entries(
            request.payload.changes
          )) {
            if (!newValue) {
              delete this._tabGroups[key];
              continue;
            }

            this._tabGroups[key] = newValue;
          }

          break;
      }
    });
  }

  get currentWindowId() {
    return this._currentWindowId;
  }

  get windows() {
    return this._windows;
  }

  get tabGroups() {
    const groups = [];

    for (const [key, value] of Object.entries(this._tabGroups)) {
      groups.push({ groupName: key, tabs: value });
    }

    return { payload: { groups } };
  }

  async setCurrentWindowId() {
    const currentWindow = await chrome.windows.getCurrent({ populate: true });
    this._currentWindowId = currentWindow.id;
  }

  setInitialState(callback) {
    chrome.runtime.sendMessage(
      {
        name: messageName.INIT,
        payload: null,
      },
      (res) => {
        this._windows = res.payload.windows;
        this._tabGroups = res.payload.tabGroups;

        callback(this.sortWindows(this._windows));
      }
    );
  }

  sortWindows(windows) {
    if (!windows) {
      return null;
    }

    let currentWindow;
    let sortedWindows = windows.filter((window) => {
      if (window.id === this._currentWindowId) {
        currentWindow = window;
      }

      return window.id !== this._currentWindowId;
    });
    sortedWindows = [currentWindow].concat(sortedWindows);
    sortedWindows = sortedWindows.map((window) => ({
      id: window?.id,
      isCurrent: this._currentWindowId === window?.id,
      tabs: window?.tabs,
    }));

    return {
      payload: { windows: sortedWindows },
    };
  }

  search(value, callback) {
    const searchedWindows = this.windows.map((window) => {
      const tabs = window.tabs.filter(
        (tab) => tab.title.includes(value) || tab.url.includes(value)
      );

      return { ...window, tabs };
    });

    callback(this.sortWindows(searchedWindows));
  }

  removeWindow(windowId) {
    chrome.runtime.sendMessage({
      name: messageName.REMOVE_WINDOW,
      payload: { windowId },
    });
  }

  changeWindow(windowId) {
    chrome.runtime.sendMessage({
      name: messageName.CHANGE_WINDOW,
      payload: { windowId },
    });
  }

  removeTab(tabId) {
    chrome.runtime.sendMessage({
      name: messageName.REMOVE_TAB,
      payload: { tabId },
    });
  }

  changeTab(tabId) {
    chrome.runtime.sendMessage({
      name: messageName.CHANGE_TAB,
      payload: { tabId },
    });
  }

  clearAllStorageSyncData() {
    chrome.runtime.sendMessage({
      name: messageName.CLEAR_GROUPS,
      payload: null,
    });
  }

  saveTabsOfWindow(windowId, callback) {
    const key = new Date().toISOString();
    const options = {};
    const tabs = this._windows
      .find((window) => window.id === windowId)
      .tabs.map((tab) => ({ title: tab.title, url: tab.url }));
    options[key] = tabs;

    chrome.runtime.sendMessage(
      {
        name: messageName.SAVE_GROUP,
        payload: options,
      },
      (res) => {
        callback(res.payload.text);
      }
    );
  }

  removeGroup(groupName) {
    chrome.runtime.sendMessage({
      name: messageName.REMOVE_GROUP,
      payload: { groupName },
    });
  }

  openGroup(groupName) {
    const url = this._tabGroups[groupName].map((tabGroup) => tabGroup.url);
    chrome.runtime.sendMessage({
      name: messageName.OPEN_GROUP,
      payload: { url },
    });
  }

  changeGroupName(prevName, newName, callback) {
    chrome.runtime.sendMessage(
      {
        name: messageName.CHANGE_GROUP_NAME,
        payload: { prevName, newName },
      },
      (res) => {
        callback(res.payload.text);
      }
    );
  }

  removeGroupTab(groupName, tabUrl) {
    chrome.runtime.sendMessage({
      name: messageName.REMOVE_GROUP_TAB,
      payload: { groupName, tabUrl },
    });
  }

  openTab(url) {
    chrome.runtime.sendMessage({
      name: messageName.OPEN_TAB,
      payload: { url },
    });
  }

  _swap(fromIndex, toIndex, array) {
    const temp = array[fromIndex];
    array[fromIndex] = array[toIndex];
    array[toIndex] = temp;
  }
}

export default Model;

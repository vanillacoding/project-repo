import generateTabGroupTemplate from "./templates/tabGroup";
import generateTabListTemplate from "./templates/tabList";
import getClosestTargetBySelector from "./utils/getClosestTargetBySelector";
import fadeOut from "./utils/fadeOut";
import parseHTML from "./utils/parseHTML";

class View {
  constructor() {
    this.$carousel = document.querySelector(".carousel");
    this.$navigation = document.querySelector(".navigation");
    this.$marker = document.querySelector(".marker");
    this.$currentTabs = document.querySelector(".current-tabs");
    this.$tabGroups = document.querySelector(".tab-groups");
    this.$tabUsage = document.querySelector(".tab-usage");
    this.$toastContainer = document.querySelector(".toast-container");
    this.$search = document.querySelector(".search");
  }

  render(name, data) {
    switch (name) {
      case "Current Tabs": {
        const template = data.payload.windows.reduce((acc, curr) => {
          return acc + generateTabListTemplate(curr);
        }, "");

        this.$currentTabs.appendChild(parseHTML(template));
        this.$currentTabListSaveButtons = this.$currentTabs.querySelectorAll(
          ".tabs-save-button"
        );
        this.$currentTabListCloseButtons = this.$currentTabs.querySelectorAll(
          ".tabs-close-button"
        );
        this.$currentTabCopyButtons = this.$currentTabs.querySelectorAll(
          ".tab-copy-button"
        );
        this.$currentTabCloseButtons = this.$currentTabs.querySelectorAll(
          ".tab-close-button"
        );
        this.$currentTabTitleButtons = this.$currentTabs.querySelectorAll(
          ".tab-title-button"
        );
        break;
      }
      case "Tab Groups": {
        if (data.payload.groups.length === 0) {
          this.$tabGroups.textContent = "NO GROUP EXIST";
          break;
        }

        const template = data.payload.groups.reduce((acc, curr) => {
          return acc + generateTabGroupTemplate(curr.tabs, curr.groupName);
        }, "");

        this.$tabGroups.textContent = "";
        this.$tabGroups.appendChild(parseHTML(template));
        this.$groupTitleForms = this.$tabGroups.querySelectorAll(
          ".group-title-form"
        );
        this.$groupCollapsibleButtons = this.$tabGroups.querySelectorAll(
          ".collapsible"
        );
        this.$groupDeleteButtons = this.$tabGroups.querySelectorAll(
          ".delete-group"
        );
        this.$groupOpenButtons = this.$tabGroups.querySelectorAll(
          ".open-group"
        );
        this.$groupTabCopyButtons = this.$tabGroups.querySelectorAll(
          ".tab-copy-button"
        );
        this.$groupTabDeleteButtons = this.$tabGroups.querySelectorAll(
          ".tab-delete-button"
        );
        this.$groupTabTitleButtons = this.$tabGroups.querySelectorAll(
          ".tab-title-button"
        );

        break;
      }
      default:
        throw new Error("wrong render name");
    }
  }

  resetCurrentTabs() {
    const $children = this.$currentTabs.children;

    for (let i = $children.length - 1; i >= 0; i--) {
      if (!$children[i].classList.contains("search-container")) {
        $children[i].remove();
      }
    }
  }

  getWindowId($elem) {
    return Number(
      getClosestTargetBySelector($elem, ".window").dataset.windowId
    );
  }

  removeTab($elem, callback) {
    const tabId = $elem.dataset.tabId;

    getClosestTargetBySelector($elem, ".tab-entry").remove();
    callback(tabId);
  }

  removeGroupTab($elem, callback) {
    const $tabList = getClosestTargetBySelector($elem, ".tab-list").children;
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const tabUrl = $elem.previousElementSibling.dataset.tabUrl;
    const groupName = decodeURIComponent($tabGroup.dataset.groupName);

    getClosestTargetBySelector($elem, ".tab-entry").remove();

    if ($tabList.length === 0) {
      $tabGroup.remove();
    }

    callback(groupName, tabUrl);
  }

  openTab($elem, callback) {
    const tabUrl = $elem.nextElementSibling.dataset.tabUrl;

    callback(tabUrl);
  }

  changeGroupName($elem, callback) {
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const prevName = decodeURIComponent($tabGroup.dataset.groupName);
    const newName = $elem.querySelector(".group-title").value;
    $tabGroup.dataset.groupName = newName;

    callback(prevName, newName, this.createToast.bind(this));
  }

  expandGroup($elem) {
    $elem.classList.toggle("active");
    const $expansion = $elem.parentNode.nextElementSibling;
    const $expandIcon = $elem.querySelector(".expand-icon");
    $expandIcon.classList.toggle("rotate");

    if ($expansion.style.maxHeight) {
      $expansion.style.maxHeight = null;
    } else {
      $expansion.style.maxHeight = $expansion.scrollHeight + "px";
    }
  }

  removeGroup($elem, callback) {
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const groupName = decodeURIComponent($tabGroup.dataset.groupName);

    $tabGroup.remove();
    callback(groupName);
  }

  openGroup($elem, callback) {
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const groupName = decodeURIComponent($tabGroup.dataset.groupName);

    callback(groupName);
  }

  createToast(text) {
    const $toast = document.createElement("div");
    $toast.classList.add("toast");
    $toast.textContent = text;
    this.$toastContainer.appendChild($toast);

    setTimeout(() => fadeOut($toast), 500);
  }
}

export default View;

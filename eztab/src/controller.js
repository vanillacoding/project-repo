import _ from "lodash";
import getClosestTargetBySelector from "./utils/getClosestTargetBySelector.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    await this.model.setCurrentWindowId();
    this.model.setInitialState(this.renderCurrentTabs.bind(this));
    this.addSearchEvent();
    this.view.$navigation.addEventListener("click", ({ target }) => {
      const $navLink = getClosestTargetBySelector(target, ".nav-link");
      this.view.$marker.style.transform = `translateX(${$navLink.dataset.distance}px)`;
      setTimeout(() => window.scroll({ top: 0, behavior: "smooth" }), 300);

      const tabName =
        target.tagName !== "SPAN"
          ? target.querySelector("span").textContent
          : target.textContent;
      let data;

      switch (tabName) {
        case "Current Tabs":
          data = this.model.sortWindows(this.model.windows);
          this.view.$carousel.style.left = "0px";
          this.renderCurrentTabs(data);
          break;
        case "Tab Groups":
          data = this.model.tabGroups;
          this.view.$carousel.style.left = "-400px";
          this.renderTabGroups(data);
          break;
        default:
          throw new Error("Invalid tab name");
      }
    });
  }

  renderCurrentTabs(data) {
    this.view.resetCurrentTabs();
    this.view.render("Current Tabs", data);
    this.addTabListEvent();
    this.addTabEntryEvent();
  }

  renderTabGroups(data) {
    this.view.render("Tab Groups", data);
    this.addTabGroupEvent();
    this.addTabGroupEntryEvent();
  }

  addTabGroupEvent() {
    this.view.$groupTitleForms?.forEach(($groupTitleForm) => {
      $groupTitleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.view.changeGroupName(event.target, this.model.changeGroupName);
      });
    });
    this.view.$groupCollapsibleButtons?.forEach(($groupCollapsibleButton) => {
      $groupCollapsibleButton.addEventListener("click", ({ currentTarget }) => {
        this.view.expandGroup(currentTarget);
      });
    });
    this.view.$groupDeleteButtons?.forEach(($groupDeleteButton) => {
      $groupDeleteButton.addEventListener("click", ({ currentTarget }) => {
        this.view.removeGroup(currentTarget, this.model.removeGroup);
      });
    });
    this.view.$groupOpenButtons?.forEach(($groupOpenButton) => {
      $groupOpenButton.addEventListener("click", ({ currentTarget }) => {
        this.view.openGroup(
          currentTarget,
          this.model.openGroup.bind(this.model)
        );
      });
    });
  }

  addTabGroupEntryEvent() {
    this.view.$groupTabCopyButtons?.forEach(($groupTabCopyButton) => {
      $groupTabCopyButton.addEventListener(
        "click",
        async ({ currentTarget }) => {
          await navigator.clipboard.writeText(currentTarget.dataset.tabUrl);
        }
      );
    });
    this.view.$groupTabDeleteButtons?.forEach(($groupTabDeleteButton) => {
      $groupTabDeleteButton.addEventListener("click", ({ currentTarget }) => {
        this.view.removeGroupTab(currentTarget, this.model.removeGroupTab);
      });
    });
    this.view.$groupTabTitleButtons?.forEach(($groupTabTitleButton) => {
      $groupTabTitleButton.addEventListener("click", ({ currentTarget }) => {
        this.view.openTab(currentTarget, this.model.openTab);
      });
    });
  }

  addSearchEvent() {
    this.view.$search.addEventListener(
      "input",
      _.debounce(({ target }) => {
        this.model.search(target.value, this.renderCurrentTabs.bind(this));
      }, 300)
    );
  }

  addTabListEvent() {
    this.view.$currentTabListSaveButtons.forEach(
      ($currentTabListSaveButton) => {
        $currentTabListSaveButton.addEventListener("click", ({ target }) => {
          const windowId = this.view.getWindowId(target);

          this.model.saveTabsOfWindow(
            windowId,
            this.view.createToast.bind(this.view)
          );
        });
      }
    );
    this.view.$currentTabListCloseButtons.forEach(
      ($currentTabListCloseButton) => {
        $currentTabListCloseButton.addEventListener("click", ({ target }) => {
          const windowId = this.view.getWindowId(target);

          this.model.removeWindow(windowId);
        });
      }
    );
  }

  addTabEntryEvent() {
    this.view.$currentTabCopyButtons.forEach(($currentTabCopyButton) => {
      $currentTabCopyButton.addEventListener(
        "click",
        async ({ currentTarget }) => {
          await navigator.clipboard.writeText(currentTarget.dataset.tabUrl);
        }
      );
    });
    this.view.$currentTabCloseButtons.forEach(($currentTabCloseButton) => {
      $currentTabCloseButton.addEventListener("click", ({ currentTarget }) => {
        this.view.removeTab(currentTarget, this.model.removeTab);
      });
    });
    this.view.$currentTabTitleButtons.forEach(($currentTabTitleButton) => {
      $currentTabTitleButton.addEventListener("click", ({ currentTarget }) => {
        const windowId = this.view.getWindowId(currentTarget);
        const tabId = Number(currentTarget.dataset.tabId);

        if (this.model.currentWindowId !== windowId) {
          this.model.changeWindow(windowId);
        }

        this.model.changeTab(tabId);
      });
    });
  }
}

export default Controller;

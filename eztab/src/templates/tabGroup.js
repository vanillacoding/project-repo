import generateGroupTabEntryTemplate from "./groupTabEntry";

const generateTabGroupTemplate = (tabs, groupName) => {
  return `
  <div class="tab-group" data-group-name=${encodeURIComponent(groupName)}>
    <div class="group-header">
      <button class="collapsible group-button">
        <img class="icon expand-icon" src="./assets/images/expand-icon.png" />
      </button>
      <form class="group-title-form">
        <input class="group-title" type="text" value="${groupName}">
      </form>
      <button class="open-group group-button">
        <img class="icon open-group-icon" src="./assets/images/open-group-icon.png" />
      </button>
      <button class="delete-group group-button">
        <img class="icon delete-icon" src="./assets/images/delete-icon.png" />
      </button>
    </div>
    <div class="expansion">
      <div class="tab-list">
        ${tabs.map((tab) => generateGroupTabEntryTemplate(tab)).join("")}
      </div>
    </div>
  </div>
  `;
};

export default generateTabGroupTemplate;

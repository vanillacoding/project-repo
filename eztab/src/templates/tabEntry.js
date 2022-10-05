import convertHTMLSpecialCharacters from "../utils/convertHTMLSpecialCharacters";

const generateTabEntryTemplate = (tab) => {
  return `
  <div class="tab-entry ${tab.active ? "current" : ""}" data-tab=${tab}>
    <button class="tab-title-button" data-tab-id=${tab.id}>
      <h3 class="tab-title">${convertHTMLSpecialCharacters(tab.title)}</h3>
    </button>
    <button class="tab-icon-button tab-copy-button" data-tab-url=${tab.url}>
      <img class="icon copy-icon" src="./assets/images/copy-icon.png" />
    </button>
    <button class="tab-icon-button tab-close-button" data-tab-id=${tab.id}>
      <img class="icon close-icon" src="./assets/images/close-icon.png" />
    </button>
  </div>
  `;
};

export default generateTabEntryTemplate;

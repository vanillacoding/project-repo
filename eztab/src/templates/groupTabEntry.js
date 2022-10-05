import convertHTMLSpecialCharacters from "../utils/convertHTMLSpecialCharacters";

const generateGroupTabEntryTemplate = (tab) => {
  return `
  <div class="tab-entry">
    <button class="tab-title-button">
      <h3 class="tab-title">${convertHTMLSpecialCharacters(tab.title)}</h3>
    </button>
    <button class="tab-icon-button tab-copy-button" data-tab-url=${tab.url}>
      <img class="icon copy-icon" src="./assets/images/copy-icon.png" />
    </button>
    <button class="tab-icon-button tab-delete-button">
      <img class="icon delete-icon" src="./assets/images/delete-icon.png" />
    </button>
  </div>
  `;
};

export default generateGroupTabEntryTemplate;

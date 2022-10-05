import chromeIdentity from "./utils/chromeIdentity";
import chromeStore from "./utils/chromeStore";

const injectTextSelectionComponent = () => {
  const div = document.createElement("div");
  div.id = "textSelection";
  document.body.appendChild(div);
};

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension is successfully installed!");
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        function: injectTextSelectionComponent,
      });
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["./textSelection.bundle.js"],
      });

      const { url: currentUrl } = await getCurrentTab();

      await chromeStore.set("currentUrl", currentUrl);
    } catch (error) {
      console.log(error);
    }
  }
});

chrome.tabs.onActivated.addListener(async () => {
  const { url: currentUrl } = await getCurrentTab();

  chrome.storage.sync.set({ currentUrl });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (chrome.runtime.lastError) {
    sendResponse({ result: "error" });
  }

  if (message === "getAccessToken") {
    (async () => {
      try {
        sendResponse({
          result: "ok",
          data: await chromeIdentity.getAccessToken(),
        });
      } catch (error) {
        sendResponse({ result: "error" });
      }
    })();
  }

  return true;
});

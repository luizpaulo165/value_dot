chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ checkStatus: false }, () => {
    //
  });
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.storage.local.get("checkStatus", (data) => {
    let check = !data.checkStatus;

    chrome.storage.local.set({ checkStatus: check }, () => {
      handleToggle();
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url != currentUrl) {
      handleToggle();
    }
  });
});

function handleToggle() {
  chrome.tabs
    .query({ active: true, currentWindow: true })
    .then(function (tabs) {
      chrome.storage.local.get("checkStatus", (data) => {
        if (data.checkStatus) {
          chrome.action.setIcon({ path: "icons/grayfy_active_32.png" });
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
              document.documentElement.style.filter =
                "saturate(100%) grayscale(100%) contrast(100%) brightness(1)";
              document.documentElement.style.transition =
                "0.2s all ease-in-out";
            },
          });
        } else {
          chrome.action.setIcon({ path: "icons/grayfy_32.png" });
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
              document.documentElement.style.filter = "";
              document.documentElement.style.transition =
                "0.2s all ease-in-out";
            },
          });
        }
      });
    });
}

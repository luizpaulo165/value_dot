chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ checkStatus: false }, () => {
    // console.log("checkStatus set to false");
  });
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.storage.session.get("checkStatus", (data) => {
    let ckeck = !data.checkStatus;

    chrome.storage.session.set({ checkStatus: ckeck }, () => {
      // console.log("checkStatus set to " + data.checkStatus);
      handleTogglet();
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url != currentUrl) {
      handleTogglet();
    } else {
      console.log("bronken 2");
    }
  });
});

function handleTogglet() {
  chrome.tabs
    .query({ active: true, currentWindow: true })
    .then(function (tabs) {
      chrome.storage.session.get("checkStatus", (data) => {
        // console.log(data.checkStatus);
        if (data.checkStatus) {
          chrome.action.setIcon({ path: "images/grayfy_active_32.png" });
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
              // setTimeout(function () {
              //   var imgs = document.querySelectorAll("img");
              //   for (var i = 0; i < imgs.length; i++) {
              //     imgs[i].style.filter =
              //       "saturate(100%) grayscale(100%) contrast(100%) brightness(1)";
              //     imgs[i].style.transition = "0.2s all ease-in-out";
              //   }
              // }, 500);
              document.getElementsByTagName("html")[0].style.filter =
                "saturate(100%) grayscale(100%) contrast(100%) brightness(1)";
              document.getElementsByTagName("html")[0].style.transition =
                "0.2s all ease-in-out";
            },
          });
        } else {
          // console.log(data.checkStatus);
          chrome.action.setIcon({ path: "images/grayfy_32.png" });
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
              // var imgs = document.querySelectorAll("img");

              // for (var i = 0; i < imgs.length; i++) {
              //   console.log(imgs[i].length);
              //   imgs[i].style.filter = "";
              //   imgs[i].style.transition = "0.1s all linear";
              // }
              document.getElementsByTagName("html")[0].style.filter = "";
              document.getElementsByTagName("html")[0].style.transition =
                "0.2s all ease-in-out";
            },
          });
        }
      });
    });
}

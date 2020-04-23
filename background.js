const gVar = {
  checkStatus: false
};

chrome.tabs.onCreated.addListener(function(tab) {        
  gVar.checkStatus = false; 
  testeEventThis();
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  gVar.checkStatus = false;
  testeEventThis();
});

// chrome.tabs.onUpdated.addListener(function(activeInfo) {
//   gVar.checkStatus = false;
//   testeEventThis();
// });

chrome.browserAction.onClicked.addListener(function(tab) {
  gVar.checkStatus = !gVar.checkStatus;
  testeEventThis();
});

function testeEventThis() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (gVar.checkStatus) {
        chrome.browserAction.setIcon({path: 'images/valuedot_active_32.png'});
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: `
                document.body.style.filter = "saturate(100%) grayscale(100%) contrast(100%) brightness(1.1)";
                document.body.style.transition = "0.3s all ease-in-out";
            `});
    } else {
        chrome.browserAction.setIcon({path: 'images/valuedot_32.png'});
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: `
                document.body.style.filter = "";
                document.body.style.transition = "0.05s all linear";
            `});
    }
  });
}
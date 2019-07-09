// Whenever a new tab is created, try and add the Quick Links accordion
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url.startsWith("https://my.wgu.edu/courses/course/")) {
    browser.tabs.sendMessage(tabId, {type: 'getQuickLinks'});
  }
});

function openPage() {
  browser.tabs.create({
    url: "https://github.com/bamhm182/WGU-Plus"
  });
}


browser.browserAction.onClicked.addListener(openPage);
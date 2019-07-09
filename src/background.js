// Whenever a new tab is created, try and add the Quick Links accordion
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url.startsWith("https://my.wgu.edu/courses/course/")) {
    browser.tabs.sendMessage(tabId, {type: 'getQuickLinks'});
  }
});

// If the Extension Icon is clicked, bring the user to the GitHub page.
browser.browserAction.onClicked.addListener(function(tab) {
  var win = window.open("https://github.com/bamhm182/WGU-Plus", "_blank");
  win.focus();
});

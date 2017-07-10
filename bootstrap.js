chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {    
	if (tab.url.indexOf("ui/common/data/Lookup") == -1) {
      		
      		chrome.tabs.executeScript(null, {"file": "connector.js"});
    }	
  }
});

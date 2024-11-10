let extractedData = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if(message.action === 'updateHref') {
		extractedData = message.data
		chrome.storage.local.set({ extractedData });
	}
});


chrome.tabs.onActivated.addListener((activeInfo) => {
 chrome.tabs.sendMessage(activeInfo.tabId, { action: 'updateData' }); 
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
 if (changeInfo.status === 'complete') {
 chrome.tabs.sendMessage(tabId, { action: 'updateData' });    
  }
});

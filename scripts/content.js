console.log(1111)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('content', request, sender);
    sendResponse(111)

});
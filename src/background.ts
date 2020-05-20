
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason.search(/install/g) === -1) {
        return
    }
    chrome.tabs.create({
        url: chrome.extension.getURL("welcome.html"),
        active: true
    })
})
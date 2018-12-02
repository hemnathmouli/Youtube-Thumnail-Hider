chrome.runtime.onInstalled.addListener(function() {

    // Sets default value when the extension loads
    chrome.storage.sync.set({display: 1}, function() {
        console.log("Options are added.");
    });
});


// Shows option only on 'youtube.com'
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.youtube.com'},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['display'], function(result) {
        // Invert and updated 'display' option
        chrome.tabs.sendMessage(tabId, {action: result.display}, function(output){
            console.log(output);
        });
    });
});
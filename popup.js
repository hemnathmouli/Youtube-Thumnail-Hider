let changeColor = document.getElementById('hideIcons');

// Change event listener
changeColor.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.storage.sync.get(['display'], function(result) {
            var invert  =   result.display ? 0 : 1;
            changeColor.innerHTML = result.display ? "Hide": "Show";
            // Invert and updated 'display' option
            chrome.storage.sync.set({display: invert}, function(output) {
                chrome.tabs.sendMessage(tabs[0].id, {action: invert}, function(output){
                    console.log(output);
                });
            });
        });
    });
};


chrome.storage.sync.get(['display'], function(result) {
    changeColor.innerHTML = result.display ? "Hide": "Show";
});
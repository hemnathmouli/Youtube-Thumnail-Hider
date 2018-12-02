// Updated on changed
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    updateThumbnail( req.action );
});

// Check 'display' option onload
chrome.storage.sync.get(['display'], function(result) {
    updateThumbnail( result.display );
});

// On user scroll and loads more
document.getElementById('contents').addEventListener('DOMSubtreeModified', function(){
    chrome.storage.sync.get(['display'], function(result) {
        updateThumbnail( result.display );
    });
});

document.getElementById('items').addEventListener('DOMSubtreeModified', function(){
    chrome.storage.sync.get(['display'], function(result) {
        updateThumbnail( result.display );
    });
});

function updateThumbnail( action ) {
    let thumbs  =   document.getElementsByTagName('ytd-thumbnail');

    for ( var i = 0; i < thumbs.length; i++ ) {
        thumbs[i].style.display =   !action ? "none": "block";
    }
}
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.error) {
        console.log('Receive error = ' + msg.error);
    }

    if (msg.url && msg.oldUrl) {
        console.log('Receive old url = ' + msg.oldUrl);
        console.log('Receive url = ' + msg.url);
    }
    
    if (msg.segment) {
        var segment = msg.segment;
        console.log('Received new segment from the API:', segment.intent, segment.entities, segment.words, segment.isFinal)
    }
    sendResponse({status: true})
});


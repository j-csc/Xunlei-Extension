document.addEventListener("DOMContentLoaded", function(event) {
                          safari.extension.dispatchMessage("pageSet");
                          });

// Listens for messages sent from the app extension's Swift code.
safari.self.addEventListener("message", messageHandler);

function messageHandler(event)
{
    if (event.name === "findLink") {
        // The userInfo of the call to -[SFSafariPage dispatchMessageToScriptWithName:userInfo:].
        var a = document.getElementsByTagName('a');
        var urlRegex = /(\b(http[s]?|ftp|file|magnet|ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var passDict = [];
        for (item in a) {
            var test = urlRegex.test(item.href)
            if (test){
                
                passDict.push(item.href)
            }
        }
        console.log(passDict);
    }
}

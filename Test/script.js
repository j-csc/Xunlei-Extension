document.addEventListener("DOMContentLoaded", function(event) {
                          safari.extension.dispatchMessage("pageSet");
                          });

// Listens for messages sent from the app extension's Swift code.

safari.self.addEventListener("message", messageHandler);

// Regexes

// Group 1:
// Group 2: /(\b(thunder|magnet|ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

function messageHandler(event)
{
    if (event.name === "findLink" || event.name === "toolbarItemClicked") {
        
        var arr = sortURL(); // Fetches all links that have http/ https / ftp in it
        console.log(arr)
    }
}

function sortURL() {
    var links = document.links
    var urlRegex = /(\b(http[s]?|ftp|file|magnet|ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var passDict = [];
    
    for(var i=0; i< links.length; i++){
        var test = urlRegex.test(links[i].href)
        if (test) {
            passDict.push(links[i].href);
        }
    }
    
    console.log("Sorted");
    return passDict;
}

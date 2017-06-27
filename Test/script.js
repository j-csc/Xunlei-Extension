document.addEventListener("DOMContentLoaded", function(event) {
                          safari.extension.dispatchMessage("pageSet");
                          });

// Listens for messages sent from the app extension's Swift code.

safari.self.addEventListener("message", messageHandler);

// Regexes

// Others: /(\b(thunder|magnet|ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

function messageHandler(event)
{
    if (event.name === "findLink" || event.name === "toolbarItemClicked") {
        console.log("Received message")
        var arr = sortURL(); // Fetches all links that have http/ https / ftp in it
        console.log(arr);
        var passDict = secondarySort(arr);
        console.log(passDict);
    }
}

function sortURL() {
    // Regex for basic links
    var urlRegex = /(\b(http[s]?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var source = document.body.innerHTML.split('\n');
    
   var passDict = [];
    // no work need modify
    for(var i=0; i< source.length; i++){
        var test = urlRegex.test(source[i])
        if (test) {
            passDict.push(source[i]);
        }
    }
    
    console.log("Sorted");
    return passDict;
}

function secondarySort(arr) {
    var array = []
    
    var vidReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:mp4|swf|avi|rm|rmvb|3gp|flv|wmv|mkv|mpg))/ig;
    var musReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:mp3|wav|ram|wma|amr|aac))/ig;
    var appReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:ipa|ipsw|dmg|exe|apk))/ig;
    var fileReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:txt|rtf|doc|docx|ppt|pptx|xls|xlsx|pdf|torrent))/ig;
    var otherReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:rar|zip|7z|iso|tar|gz))/ig;
    
    for(var i=0; i<arr.length; i++) {
        if (vidReg.test(arr[i])) {
            array.push({type:"video", link: arr[i]})
        } else if (musReg.test(arr[i])) {
            array.push({type:"music", link: arr[i]})
        }else if (appReg.test(arr[i])) {
            array.push({type:"app", link: arr[i]})
        }else if (fileReg.test(arr[i])) {
            array.push({type:"file", link: arr[i]})
        }else if (otherReg.test(arr[i])) {
            array.push({type:"other", link: arr[i]})
        }
    }
    
    return array
}

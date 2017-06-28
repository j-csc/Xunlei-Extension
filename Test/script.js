//
//  script.js
//  Xunlei Safari Extension js script
//
//  Created by Jason Chen on 26/6/2017.
//  Copyright © 2017 Jason Chen & Co All rights reserved.
//

document.addEventListener("DOMContentLoaded", function(event) {
                          safari.extension.dispatchMessage("pageSet");
                          });

// Listens for messages sent from the app extension's Swift code.

safari.self.addEventListener("message", messageHandler);


function messageHandler(event)
{
    if (event.name === "findLink") {
        console.log("Received message")
        var arr = sortURL(); // Fetches all links that have http/ https / ftp in it
        console.log(arr);
        var passDict = secondarySort(arr);
        console.log(passDict);
    }
}

function sortURL() {
    
    var passDict = [];
    
    // Regex for basic links
    var urlRegex = /(\b(http[s]?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    // Regex for Thunder and ED2k
    var thunderRegex = /(\b(thunder|ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    // Regex for Magnet links
    var magnet = /(\b(magnet:\?xt=urn):[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    var source = document.body.innerHTML;
    var arrLinks = document.links;
    var concatArr = [];
    
    for(var i=0; i<arrLinks.length; i++) {
        if (urlRegex.test(arrLinks[i].href)){
            concatArr.push(arrLinks[i].href)
        }
    }
    var dict = source.match(urlRegex);
    var thunderEdDict = source.match(thunderRegex);
    
    if (dict === null && thunderEdDict === null) {
        passDict = concatArr;
    } else if (dict === null && thunderEdDict != null) {
        passDict = thunderEdDict.concat(concatArr);
    } else if (dict != null && thunderEdDict === null) {
        passDict = dict.concat(concatArr);
    } else {
        var combineDict = dict.concat(thunderEdDict);
        passDict = combineDict.concat(combineDict);
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
    
    // Magnet
    var magnetRegex =
    // Regex for Thunder and ED2k
    var thunderRegex = /(\b(thunder):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var ed2kRegex = /(\b(ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
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
        }else if (thunderRegex.test(arr[i])){
            // handleThunder
        }else if(ed2kRegex.test(arr[i])){
            // handleED2k
        }else if(magnetRegex.test(arr[i])){
            // handleMagnet
        }
    }
    
    return array
}

function handleThunder() {
    
}
function handleED2K() {
    
}
function handleMagnet() {
    
}

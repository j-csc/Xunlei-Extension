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
    
    var dict = [];
    var thunderEdDict = [];
    var magnetDict = [];
    
    // Regex for basic links
    var urlRegex = /(\b(http[s]?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    // Regex for Thunder and ED2k
    var thunderRegex = /(\b(thunder|ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    // Regex for Magnet links
    var magnetRegex = /(\b(magnet:\?xt=urn):[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    var source = document.body.innerHTML;
    var arrLinks = document.links;
    var concatArr = [];
    
    for(var i=0; i<arrLinks.length; i++) {
        if (urlRegex.test(arrLinks[i].href)){
            concatArr.push(arrLinks[i].href)
        }
    }
    
    if (source.match(urlRegex) != null) {
        dict = source.match(urlRegex);
    }
    if (source.match(thunderRegex) != null) {
        thunderEdDict = source.match(thunderRegex);
    }
    if (source.match(magnetRegex) != null) {
        magnetDict = source.match(magnetRegex);
    }
    
    var final = [].concat(dict,thunderEdDict,magnetDict,concatArr);
    
    console.log("Sorted");
    return final;
}

function secondarySort(arr) {
    var array = []
    
    var vidReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:mp4|swf|avi|rm|rmvb|3gp|flv|wmv|mkv|mpg))/ig;
    var musReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:mp3|wav|ram|wma|amr|aac))/ig;
    var appReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:ipa|ipsw|dmg|exe|apk))/ig;
    var fileReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:txt|rtf|doc|docx|ppt|pptx|xls|xlsx|pdf|torrent))/ig;
    var otherReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:rar|zip|7z|iso|tar|gz))/ig;
    
    // Magnet
    var magnetRegex = /(\b(magnet:\?xt=urn):[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // Thunder
    var thunderRegex = /(\b(thunder):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // ED2k
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
            console.log("Found thunder");
        }else if(ed2kRegex.test(arr[i])){
            // handleED2k
            console.log("Found thunder");
        }else if(magnetRegex.test(arr[i])){
            // handleMagnet
            console.log("Found thunder");
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

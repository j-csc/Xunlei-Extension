//
//  script.js
//  Xunlei Safari Extension js script
//
//  Created by Jason Chen on 26/6/2017.
//  Copyright © 2017 Jason Chen & Co All rights reserved.
//
var vidReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:mp4|avi|rm|rmvb|3gp|flv|wmv|mkv|mpg))/ig;
var musReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:mp3|wav|ram|wma|amr|aac))/ig;
var appReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:ipa|ipsw|dmg|exe|apk))/ig;
var fileReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:txt|rtf|doc|docx|ppt|pptx|xls|xlsx|pdf|torrent))/ig;
var otherReg = /(\b(http[s]?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:rar|zip|7z|iso|tar|gz))/ig;

window.addEventListener("DOMContentLoaded", function (event) {
                        if (window === window.top) {
                        console.log("Received message")
                        var arr = sortURL(); // Fetches all links that have http/ https / ftp in it
                        var passDict = secondarySort(arr);
                        console.log(passDict);
                        console.log("Passing to tableView");
                        safari.extension.dispatchMessage("dataProcessed", {
                                                         key: passDict,
                                                         href: location.href
                                                         });  }
                        });


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
    
    for (var i = 0; i < arrLinks.length; i++) {
        if (urlRegex.test(arrLinks[i].href)) {
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
    
    var final = [].concat(dict, thunderEdDict, magnetDict, concatArr);
    
    console.log("Sorted");
    return final;
}

function secondarySort(arr) {
    var array = []
    
    // Magnet
    var magnetRegex = /(\b(magnet:\?xt=urn):[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // Thunder
    var thunderRegex = /(\b(thunder):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // ED2k
    var ed2kRegex = /(\b(ed2k):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    for (var i = 0; i < arr.length; i++) {
        
        if (vidReg.test(arr[i])) {
            array.push({
                       type: "video",
                       link: arr[i],
                       name: processName(arr[i]),
                       href: location.href
                       });
        } else if (musReg.test(arr[i])) {
            array.push({
                       type: "music",
                       link: arr[i],
                       name: processName(arr[i]),
                       href: location.href
                       });
        } else if (appReg.test(arr[i])) {
            array.push({
                       type: "app",
                       link: arr[i],
                       name: processName(arr[i]),
                       href: location.href
                       });
        } else if (fileReg.test(arr[i])) {
            array.push({
                       type: "file",
                       link: arr[i],
                       name: processName(arr[i]),
                       href: location.href
                       });
        } else if (otherReg.test(arr[i])) {
            array.push({
                       type: "other",
                       link: arr[i],
                       name: processName(arr[i]),
                       href: location.href
                       });
        } else if (thunderRegex.test(arr[i])) {
            array.push(handleThunder(arr[i]))
        } else if (ed2kRegex.test(arr[i])) {
            array.push(handleED2K(arr[i]))
        } else if (magnetRegex.test(arr[i])) {
            array.push(handleMagnet(arr[i]))
        }
    }
    
    return array
}

function processName(s) {
    var nameArr = s.split("/")
    var nameRevArr = nameArr.reverse()
    return nameRevArr[0]
}

function handleThunder(thunderURL) {
    
    var encode = Base64.decode(thunderURL.substr(10))
    var newURI = (encode.substr(2, encode.length - 4))
    var result = {
    type: "thunder",
    link: thunderURL,
    name: decode(newURI),
    href: location.href
    };
    return result
}

function handleED2K(ed2kURL) {
    
    var arrED = (ed2kURL).substr(8).split('|')
    
    function formatBytes(a, b) {
        if (0 == a) return "0 Bytes";
        var c = 1e3,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    }
    
    function decode(s) {
        var result = decodeURIComponent(s.replace(/\+/g, " "));
        return result;
    }
    var result = {
    type: "ed2k",
    link: ed2kURL,
    name: decode(arrED[1]),
    href: location.href
    };
    return result
}

function handleMagnet(magnetURL) {
    var result;
    
    if (magnetURL.indexOf("&") !== -1) {
        var str = magnetURL.substr(20).split('&')
        
        function decode(s) {
            var result = decodeURIComponent(s.replace(/\+/g, " "));
            return result;
        }
        if (str[1].substr(0, 3) === "dn=") {
            result = {
            type: "magnet",
            link: magnetURL,
            name: decode((str[1]).substr(3)),
            href: location.href
            }
        } else {
            result = {
            type: "magnet",
            link: magnetURL,
            name: "torrent",
            href: location.href
            }
        }
    } else {
        var str = magnetURL.substr(20)
        result = {
        type: "magnet",
        link: magnetURL,
        name: "torrent",
        href: location.href
        }
    }
    
    return result;
}

//function reformatLinks(s) {
//
//    var a;
//
//    if (vidReg.test(s)) {
//        a = ({type:"thunder-video", link: s})
//    } else if (musReg.test(s)) {
//        a = ({type:"thunder-music", link: s})
//    }else if (appReg.test(s)) {
//        a = ({type:"thunder-app", link: s})
//    }else if (fileReg.test(s)) {
//        a = ({type:"thunder-file", link: s})
//    }else if (otherReg.test(s)) {
//        a = ({type:"thunder-other", link: s})
//    }
//
//    return a
//}

var Base64 = {
_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
            u = a = 64
        } else if (isNaN(i)) {
            a = 64
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
},
decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
            t = t + String.fromCharCode(r)
        }
        if (a != 64) {
            t = t + String.fromCharCode(i)
        }
    }
    t = Base64._utf8_decode(t);
    return t
},
_utf8_encode: function (e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128)
        } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128)
        }
    }
    return t
},
_utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r = c1 = c2 = 0;
    while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
            n++
        } else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2
        } else {
            c2 = e.charCodeAt(n + 1);
            c3 = e.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3
        }
    }
    return t
}
}

function decode(s) {
    var result = decodeURIComponent(s.replace(/\+/g, " "));
    return result;
}

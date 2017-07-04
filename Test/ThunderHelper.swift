//
//  ThunderHelper.swift
//  Safari extension
//
//  Created by jifu on 02/07/2017.
//  Copyright © 2017 Jason Chen. All rights reserved.
//

import Cocoa

class ThunderHelper: NSObject {
    
    static let shared = ThunderHelper()
    
    @discardableResult func download(url: String) -> Bool {
        
        var urlToPost = url

        let lowercased = url.lowercased()
        let componets = lowercased.components(separatedBy: ":")
        let scheme = componets[0]
        
        if  scheme != "thunder", scheme != "magnet", scheme != "ed2k" {
            
            let data = "AA\(url)ZZ".data(using: .utf8)
            
            guard let base64Str = data?.base64EncodedString() else {
                return false
            }
            
            urlToPost = "thunder://\(base64Str)"
        }
        
        if let link = URL(string: urlToPost) {
            NSWorkspace.shared().open(link)
        }else{
            return false
        }
        
        return true
    }
}

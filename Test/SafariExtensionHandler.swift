//
//  SafariExtensionHandler.swift
//  Test
//
//  Created by Jason Chen on 26/6/2017.
//  Copyright © 2017 Jason Chen. All rights reserved.
//

import SafariServices


class SafariExtensionHandler: SFSafariExtensionHandler {
    
    
    var numberOfLinks = 0
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]? = nil) {
//        if messageName == "pageSet" {
//            page.dispatchMessageToScript(withName: "findLink", userInfo: nil);
//        } else 
        if messageName == "dataProcessed" {
            // Table view handle
            SafariExtensionViewController.shared.update(data: userInfo!)
        }
    }
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
        window.getActiveTab { (activeTab) in
            activeTab?.getActivePage { (activePage) in
                activePage?.dispatchMessageToScript(withName: "DoSomethingInteresting", userInfo: nil)
            }
        }

    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        NSLog("Popover will show")
        
//        ThunderHelper.shared.download(url: "ftp://k:k@d3.dl1234.com:7322/终结者BD国英双语双字[电影天堂www.dy2018.com].mkv")
//        ThunderHelper.shared.download(url: "magnet:?xt=urn:btih:DDAF5D35102781ADEE4A4F7AF027C7693C837217")

        
        return SafariExtensionViewController.shared
    }

}

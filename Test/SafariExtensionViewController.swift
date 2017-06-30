//
//  SafariExtensionViewController.swift
//  Test
//
//  Created by Jason Chen on 26/6/2017.
//  Copyright © 2017 Jason Chen. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController, NSTableViewDelegate, NSTableViewDataSource {
    
    @IBOutlet weak var tableView: NSTableView!
    
    var tableContents: [[String: Any]]?
    var lastLocation: String?
    var haveData: Bool?
    
    static let shared = SafariExtensionViewController()
    // After receiving data, make sure there are no duplicates before passing onto table view
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    func update(data: [String: Any]) {
        if let userInfo = data["key"] as? [[String: Any]], let href = data["href"] as? String {
            print(href)
            print(userInfo)
            if (lastLocation != href) {
                tableContents = userInfo
                lastLocation = href
                haveData = true
            }else if (lastLocation == href) {
                haveData = false
            }
        }
        //dict.key[0].link
    }

}

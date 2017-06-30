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
    
    var tableContents: [[String: Any]] = [[:]] // keys: link, href, type, name
    var lastLocation: String?
    var haveData: Bool?
    
    static let shared = SafariExtensionViewController()
    // After receiving data, make sure there are no duplicates before passing onto table view
    override func viewDidLoad() {
        super.viewDidLoad()
        //  make sure tableContents is unique for all items, and sorted for last date
    }
    override func viewDidDisappear() {
        super.viewDidDisappear()
        // clear tableContents
    }
    
    func update(data: [String: Any]) {
        if let userInfo = data["key"] as? [[String: Any]], let href = data["href"] as? String {
            tableContents = userInfo
            //update table view data
        }
    }

}

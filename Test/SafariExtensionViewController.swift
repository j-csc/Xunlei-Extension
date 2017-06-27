//
//  SafariExtensionViewController.swift
//  Test
//
//  Created by Jason Chen on 26/6/2017.
//  Copyright © 2017 Jason Chen. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    @IBOutlet weak var tableView: NSTableView!
    
    static let shared = SafariExtensionViewController()
    
}

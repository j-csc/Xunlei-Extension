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
    @IBOutlet weak var textField: NSTextField!
    @IBOutlet weak var segmentControl: NSSegmentedControl!
    
    var tableContents: [[String: String]]? // keys: link, href, type, name
    {
        didSet {
            tableView?.reloadData()
        }
    }
    var lastLocation: String?
    var haveData: Bool?

    static let shared = SafariExtensionViewController()
    // After receiving data, make sure there are no duplicates before passing onto table view
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //  make sure tableContents is unique for all items, and sorted for last date
        tableView.delegate = self
        tableView.dataSource = self

        self.tableView.sizeToFit()
        self.tableView.reloadData()

    }
    @IBAction func segmentValChanged(_ sender: Any) {
        if segmentControl.selectedSegment == 0 {
            if (tableContents?.count)! > 1 {
                let sortedArray = tableContents?.sorted {$0["name"]! < $1["name"]!}
                tableContents = sortedArray
            }
        }else if segmentControl.selectedSegment == 1 {
            if (tableContents?.count)! > 1 {
                let sortedArray = tableContents?.sorted {$0["name"]! > $1["name"]!}
                tableContents = sortedArray
            }
        }
        
    }
    override func viewDidDisappear() {
        super.viewDidDisappear()
        // clear tableContents
    }
    
    override func viewWillAppear() {
        super.viewWillAppear()
    }
    
    override func viewDidAppear() {
        super.viewDidAppear()
        tableView?.reloadData()
        
    }
    
    func update(data: [String: Any]) {
        if let userInfo = data["key"] as? [[String: String]] {
            tableContents = userInfo
            //update table view data
        }
    }
    
    
    func numberOfRows(in tableView: NSTableView) -> Int {
        return tableContents?.count ?? 0
    }
    
    fileprivate enum CellIdentifiers {
        static let NameCell = "NameCellID"
        static let TypeCell = "TypeCellID"
    }
    
    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
        
        let cellIdentifier: String = "cellIdentifier"
        
        // change back to row, if start at 0 just row, if 1, row-1
        
        guard let item = tableContents?[0] else {
            return nil
        }
        
        // 2
        /*
        if tableColumn == tableView.tableColumns[0] {
            
            text = item["name"] as! String
            cellIdentifier = CellIdentifiers.NameCell
        } else if tableColumn == tableView.tableColumns[1] {
            text = item["type"] as! String
            cellIdentifier = CellIdentifiers.TypeCell
        }
        */
        // 3
        if let cell = tableView.make(withIdentifier: cellIdentifier, owner: nil) as? CustomTableViewCell {
            cell.name?.stringValue = item["name"]!
            cell.fileName?.stringValue = item["link"]!
            cell.websiteLink?.stringValue = item["href"]!
            return cell
        }
        
        // 4
          textField.integerValue = (tableContents?.count)!
        return nil
    }
}



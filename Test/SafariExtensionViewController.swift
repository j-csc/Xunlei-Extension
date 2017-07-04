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
    @IBOutlet weak var textField: NSTextField!
    @IBOutlet weak var segmentControl: NSSegmentedControl!
    
    var tableContents: [[String: String]]? // keys: link, href, type, name
   
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
        
        tableView?.reloadData()
        
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
    
    

}

// MARK: -
extension SafariExtensionViewController: NSTableViewDataSource, NSTableViewDelegate {
    
    func numberOfRows(in tableView: NSTableView) -> Int {
        return tableContents?.count ?? 0
    }
    
    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
        
        guard tableContents != nil, tableContents!.count > row else {
            return nil
        }
        
        let cellIdentifier: String = "cellIdentifier"
        
        // change back to row, if start at 0 just row, if 1, row-1
        
        guard let item = tableContents?[row] else {
            return nil
        }
        
        if let cell = tableView.make(withIdentifier: cellIdentifier, owner: self) as? CustomTableViewCell {
            
            if let name = item["name"] {
                cell.name?.stringValue = name
                cell.image.image = (name.lowercased() as NSString).pathExtension.icon
            }else {
                cell.name?.stringValue = "文件名未知"
                cell.image.image = nil
            }
            
            cell.fileName?.stringValue = item["link"] ?? ""
            
            if let href = item["href"], let url = URL(string: href) {
                cell.websiteLink?.stringValue = url.host ?? ""
            }else {
                cell.websiteLink?.stringValue = ""
            }
            cell.size.stringValue = item["fileSize"] ?? "未知大小"
            
            return cell
        }
        
        textField.integerValue = (tableContents?.count)!
        return nil
    }
    
    func tableView(_ tableView: NSTableView, shouldSelectRow row: Int) -> Bool {
        
        guard tableContents != nil, tableContents!.count > row, let item = tableContents?[row] else {
            return false
        }
        
        if let link = item["link"]  {
            ThunderHelper.shared.download(url: link)
        }
        
        return true
    }
}

// MARK: -
extension String {
    
    var  icon: NSImage? {
        let img = Bundle.main.image(forResource: self)
        return img
    }

    
}



//
//  CustomTableViewCell.swift
//  Safari extension
//
//  Created by user on 04/07/2017.
//  Copyright © 2017 Jason Chen. All rights reserved.
//

import Cocoa

class CustomTableViewCell: NSTableCellView {
    
    @IBOutlet weak var image: NSImageView?
    @IBOutlet weak var name: NSTextField?
    @IBOutlet weak var fileName: NSTextField?
    @IBOutlet weak var size: NSTextField?
    @IBOutlet weak var websiteLink: NSTextField?
    @IBOutlet weak var downloadImage: NSImageView?

    
    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)
        // Drawing code here.
    }
    override func awakeFromNib() {
        self.image?.image = NSImage(named: "vid-1_32.png")!
        self.downloadImage?.image = NSImage(named: "sniffer_download.png")!
    }
    
}

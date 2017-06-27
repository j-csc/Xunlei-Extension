# Safari应用拓展程序开发

> 目标：嗅探Safari浏览器页面的下载资源，并将结果展示在工具栏的Popover的列表里面。点击`类型`菜单可以进行视频、音乐、应用、文档、其他分类。点击`排序`菜单可以进行文件名、文件大小排序。

## 实现方式
![实现方式](images/workflow.png)

## 设计效果

![preview](images/preview.png)

PS: 搜索动画不需要做，顶部只需展示结果的数量。


## 文件名后缀分类

### 1. 视频

```
"mp4","swf","avi","rm","rmvb","3gp","flv","wmv","mkv","mpg"

```

### 2. 音乐

```
"mp3","wav","ram","wma","amr","aac"

```

### 3. 应用程序

```
"ipa","ipsw","dmg","exe","apk"

```

### 4. 文档

```
"txt","rtf","doc","docx","ppt","pptx","xls","xlsx","pdf"
,"torrent"
```

### 5. 其他
```
"rar","zip","7z", "iso","tar","gz"
```


## 下载资源分类
下载资源分6类：`http:` `https:` `ftp:` `ed2k:` `magnet:`  `thunder:`

1. 根据链接的文件名后缀进行筛选：`http://` `https://` `ftp://` 
2. 根据协议名称筛选：`ed2k://`  `magnet:?xt:urn:btih:`  `thunder://` (按协议类型进行嗅探)
 
 
## 下载链接解析说明 

1. `http` `https` `ftp`链接可以直接从url中解析出文件名
2. `thunder`链接格式为`thunder://` + `base64encode(AAurlencode(originalURL)ZZ)` .解析出的链接是`http` `https` `ftp` `ed2k` `magent`
3. `magnet`链接的匹配格式为 固定位 `magnet:?xt=urn:btih:` + 40位HashInfo`[A-F|0-9]` 或者 32位HashInfo`[A-Z|2-7]` ，如果链接后面跟`&dn=`则解析文件名，否则文件名使用默认值`种子文件`
4. `ed2k`链接的格式:`ed2k://` + `file` + `<文件名称>` + `<文件大小>` + `<文件哈希值>` + `其他`

 



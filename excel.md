首先读取excel文件的base64文本，在网页浏览器中借助sheetjs，将base64转为内容文本。支持xls文件和xlsx文件。

<!--more-->

## 准备工作

1. 下载xlsx.full.min.js, [相关文档在这里](https://docs.sheetjs.com/docs/)

2. 构造转换函数,保存为sheetReader.html。
   
   ```HTML
   <!DOCTYPE html>
   <html lang="en">
       <head>
           <meta charset="UTF-8">
           <title>sheetjs</title>
           <script src="xlsx.full.min.js"></script>
       </head>
       <body>
           <div id = "data"></div>
           <script>
   
                   function read(base64str,sheetIndex) {
                       let basestr = base64str.substring(base64str.indexOf(',')+1);
                       const wb = XLSX.read(basestr,{type:'base64'});
                       let csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[sheetIndex-1]]);
                       window.AppInventor.setWebViewString(csv);
                       }
   
           </script>
       </body>
   </html>
   ```

3. 将以上两个文件和你的xls文件上传到素材。要读取的文件不是必须是素材，可以放在ASD中或者其他有读取权限的地方都可以。本示例是读取ASD.
   ![20250303_111124.png](https://gitee.com/wangsk789/images/raw/master/20250303_111124.png)

4. 我们还需要一个[Base64扩展](https://community.appinventor.mit.edu/t/save-image-sound-clip-video-canvas-in-tinydb-extension-base-64-download-file-from-the-web-and-convert-it-to-string/40425)，可以把xls文件转为base64.

5. 相关代码
   ![20250303_111139.png](https://gitee.com/wangsk789/images/raw/master/20250303_111139.png)
- 首先让网页浏览器访问转换的网页

- FileToStringDirect方法可以把文件转为base64文本

- 将base64文本用read函数读取出来。read函数需要两个参数，一个是base64文本，二是工作表在工作簿中的序号。示例中是第一个工作表。

- 在网页交换字符串改变事件接收读取的xls内容，应该是个csv表
6. 运行结果如图：
   ![20250303_111153.png](https://gitee.com/wangsk789/images/raw/master/20250303_111153.png)

## 示例文件

[demo.aia](https://gitee.com/wangsk789/images/raw/master/20250303_120437.aia)
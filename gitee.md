# 使用Gitee作为图床

很多同学在制作app过程中，需要有很多的素材如图像啊、视频啊。如果都放入素材库，APP会超过服务器限制（一般是10m）。如果你没有自己的文件存储服务器，可以将文件存储在gitee上。

<!--more-->

# 准备工作

1. 注册Gitee账号[点我](https://www.gitee.com)，建议用邮箱号注册。
2. 登录gitee，点右上角的加号，新建仓库。
3. 仓库名称随便写，比如repo，或者store，这个随意。
4. 是否开源选 公开
5. 选中 使用Readme 文件初始化仓库
6. 点 创建，完成创建仓库。
7. 网页拉到最底下 打开OpenAPI这个链接，或者[点这里](https://gitee.com/api/v5/swagger)进入api文档。
8. 依次打开左侧的 api文档–-> 仓库 –> 新建文件，这里有新建文件（也就是上传文件到这个库）的接口文档。
9. 点右上角 申请授权，同意授权，记下在access_token的值。
10. 其他参数有：owner是注册时的用户名，repo就是仓库名，path就是你要上传的文件名，content就是要上传的文件的base64编码，message就是git中的commit，这里可以随便写。
11. 在owner、repo、path、content、message中随便写上a/b/c/d/e ，点测试，下面会出现这个：

![20250303_120754.png](https://gitee.com/wangsk789/images/raw/master/20250303_120754.png)

12. 根据这个curl命令，就可以写出我们的http客户端请求了

# 逻辑设计

主要代码有：

### 向服务器发送请求

![20250303_120804.png](https://gitee.com/wangsk789/images/raw/master/20250303_120804.png)

![20250303_120811.png](https://gitee.com/wangsk789/images/raw/master/20250303_120811.png)

1. 使用图像选择器选择文件，取得文件路径名，和文件名。

2. 拼接http客户端网址

3. 设置请求头

4. 执行post文本。文本是json格式，可以用字典创建。

### 从服务器返回响应：

![20250303_120830.png](https://gitee.com/wangsk789/images/raw/master/20250303_120830.png)

1. 将响应文件转为字典

2. 如果响应代码=201，标明是成功上传了。

3. 提取字典中的download_url的值，这个就是上传的文件的连接了。（其实返回值中还有其他几个网址，经试验，只有这个download_url是文件的直接连接。）

有了文件url，就可以图像框显示出来，或者保存到数据库。

# 其他

以上方法，只适用于图片。如果是其他格式，可以通过开启Gitee Pages来获取资源网址。
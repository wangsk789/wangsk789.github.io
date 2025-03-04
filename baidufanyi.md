# 百度翻译扩展

使用百度云的接口进行翻译。

<!--more-->

## 方法

![](./images/2025-03-04-15-52-42-image.png)

textToTranslate：待翻译的文字，语言种类自动识别。

languageToTranslateTo：需要翻译到的语言，可以是zh,en,jp,fra,it等等，具体参看[这里](https://api.fanyi.baidu.com/product/113)



## 事件

![](./images/2025-03-04-15-53-14-image.png)

- 成功事件：返回1个参数 translation文本
- 失败事件：返回1个参数error文本型

## 属性

* 属性描述：设置appid
  
  ![](./images/2025-03-04-15-54-57-image.png)

* 属性描述：设置appkey
  
  ![](./images/2025-03-04-15-55-13-image.png)

## 下载

[cn.kevinkun.KevinkunBaiduFanyi.aix](./images/cn.kevinkun.baidufanyi.aix)

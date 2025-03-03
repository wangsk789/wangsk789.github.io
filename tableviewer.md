# 表格视图扩展

表格视图扩展,可以用来直接在ai中显示表格，并可以设置表格样式

<!--more-->

# 更新记录

v9
as request of @TIMAI2, **SetJavascript** function added.It will inject javascript to end of body element before show the table. No script tag needed.

v8
add event **OnShowTable**, fired after ShowTable is called.

v7
add property **TransparentBackground**, designer only.

V6

1. SetStyleSheet now can accept url to an external css file.
2. add SetClass block, which can set class to a tag or id selector
3. add ClearStyle block, which can clear all styles, including the native basic style(table border)
4. bring back ShowTable. since this will greatly enhance the performance of the extension.
5. add RunJs function and AfterRunJs event.
6. add SetStyleWithJs function

v5 

1. 增加了OnScroll事件

v4

1. 增加ScrollTo方法。
2. 废弃ShowTable方法。

v3

1. 增加了ClearTable块。清除以前设置的数据、所有样式。
2. 其他修改，每行数据可以长度不同

v2  

1. 增加SetStyleSheet块，可以直接写样式表了。
2. 增加ShowTable块，所有的数据和样式设置好以后，需要调用此块，否则表格不显示了。
3. 增加了一个SourceCode属性块，调试时可能有用。
4. 增加了HasHead和HasFoot属性，用来将第一行和最后一行数据设为表头或者表尾。默认是不包含的。

# 前言

本来有个教程，教大家[如何显示表格](/table)，但是有网友反映还是不够简洁，现在我把这个方法进一步打包成了扩展，真正做到开箱即用。

先上图看看效果如何：
![20250303_125549.png](https://gitee.com/wangsk789/images/raw/master/20250303_125549.png)

# 相关代码块

## 初始化

![20250303_125628.png](https://gitee.com/wangsk789/images/raw/master/20250303_125628.png)

指定表格要显示在哪个布局之中（可以是垂直布局或者水平布局均可）

## 设置数据

![20250303_125657.png](https://gitee.com/wangsk789/images/raw/master/20250303_125657.png)

data需要是一个列表的列表

每次设置数据，会覆盖前面的数据。

## 设置单个样式

![20250303_125731.png](https://gitee.com/wangsk789/images/raw/master/20250303_125731.png)

样式设置完全是css的标准，具体请搜索如何写css的样式。

这个可以使用多次，每次设置一个选择器的一个属性。

selector 选择器

attribute 属性名

value 属性值

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |

### 常用的selector：

| --  | --              | --                                                      |     |
| --- | --------------- | ------------------------------------------------------- | --- |
| 1.  | table           | 表格                                                      |     |
| 2.  | th              | 表头                                                      |     |
| 3.  | tr              | 行                                                       |     |
| 4.  | td              | 单元格                                                     |     |
| 5.  | tr:nth-child(1) | 第n行 （所有偶数行可以写为tr:nth-child(2n)，奇数行就是tr:nth-child(2n+1)） |     |
| 6.  | td:nth-child(1) | 第n列 （奇数偶数列原理同上）                                         |     |
| 7.  | #r1c1           | 第n行第n列的单元格 （注意别漏掉#，因为我已经将每个单元格的id设置为了r1c1格式）            |     |

### 常用的attribute：

|--|--|--|
|1. |background-color |背景色|
|2. |color |文本颜色|
|3. |padding |内边距|
|4. |margin |外边距|
|5. |width |宽度|
|6. |height |高度|
|7. |font-size |字号|
|8. |border-width |边框宽度|
|9. |border-color |边框颜色|

## 批量设置样式

![20250303_130043.png](https://gitee.com/wangsk789/images/raw/master/20250303_130043.png)

如果你有很多样式要写，用上面的SetStyle就需要多个，比较麻烦，可以使用这个块，直接把样式表写在文本中。

这个块只能使用一次，后面调用会把前面的覆盖。所以把需要写的样式一次性都写在这里面。

## 清除样式

原来设置的所有数据和样式都被清空。
![20250303_130222.png](https://gitee.com/wangsk789/images/raw/master/20250303_130222.png)

## 滚动表格

将表格滑动到某行某列（让该单元格可见）

![2023-05-10T05:33:22.png](https://gitee.com/wangsk789/images/raw/master/20250303_130107.png)

## 内置常用的样式

返回网页源码
![20250303_130253.png](https://gitee.com/wangsk789/images/raw/master/20250303_130253.png)

是否包含表头
![20250303_130325.png](https://gitee.com/wangsk789/images/raw/master/20250303_130325.png)

是否包含表尾
![20250303_130343.png](https://gitee.com/wangsk789/images/raw/master/20250303_130343.png)

**以下块都可以通过SetStyle块来实现，只是为了方便写成内置块。**

设置单元格内边距
![20250303_130401.png](https://gitee.com/wangsk789/images/raw/master/20250303_130401.png)

设置表头（第一行）背景色

目前只支持例如red、green这样，或者#abcdef这种16进制，不支持AppInventer中的颜色。（下同）
![20250303_130454.png](https://gitee.com/wangsk789/images/raw/master/20250303_130454.png)

设置边框颜色
![20250303_130517.png](https://gitee.com/wangsk789/images/raw/master/20250303_130517.png)

设置边框宽度
![20250303_130544.png](https://gitee.com/wangsk789/images/raw/master/20250303_130544.png)

设置所有文本字号
![20250303_130610.png](https://gitee.com/wangsk789/images/raw/master/20250303_130610.png)

## 表格显示完成事件

![20250303_130636.png](https://gitee.com/wangsk789/images/raw/master/20250303_130636.png)

## js执行完成事件

![20250303_130648.png](https://gitee.com/wangsk789/images/raw/master/20250303_130648.png)

## 表格被点击事件

表格被点击时，返回点击位置的行、列、内容
![20250303_130702.png](https://gitee.com/wangsk789/images/raw/master/20250303_130702.png)

## 表格滚动事件

表格滚动时（手动或通过代码）引发
![20250303_130725.png](https://gitee.com/wangsk789/images/raw/master/20250303_130725.png)

# 示例

例子1：基本用法
![20250303_130748.png](https://gitee.com/wangsk789/images/raw/master/20250303_130748.png)
![20250303_130804.png](https://gitee.com/wangsk789/images/raw/master/20250303_130804.png)

例子2：高亮当前选中单元格
![20250303_130817.png](https://gitee.com/wangsk789/images/raw/master/20250303_130817.png)

例子3：固定表格第一行。这样在上下滚动时，表头固定在屏幕上方。
![20250303_130835.png](https://gitee.com/wangsk789/images/raw/master/20250303_130835.png)

![20250303_131046.png](https://gitee.com/wangsk789/images/raw/master/20250303_131046.png)

例子4：合并单元格
![20250303_130835.png](https://gitee.com/wangsk789/images/raw/master/20250303_130835.png)

# 下载链接

[cn.kevinkun.TableViewer.v8.aix](https://gitee.com/wangsk789/images/raw/master/20250303_130912.aix)

[cn.kevinkun.TableViewer.v9.aix](https://gitee.com/wangsk789/images/raw/master/20250303_130930.aix)

# RegEx正则表达式扩展

正则表达式(regular expression)描述了一种字符串匹配的模式（pattern），可以用来检查一个串是否含有某种子串、将匹配的子串替换或者从某个串中取出符合某个条件的子串等。（摘自 菜鸟教程）

<!--more-->

# 方法 All Methods

![2023-05-10T05:01:22.png][1]![20250303_124016.png](https://gitee.com/wangsk789/images/raw/master/20250303_124016.png)

GetMatches方法可以返回符合条件的字符串列表

SplitWith方法可以使用规则表达式对字符串进行分割，并返回列表

![20250303_124025.png](https://gitee.com/wangsk789/images/raw/master/20250303_124025.png)

GetMatchesWithPosition方法

GetMatchesWithGroup方法

GetMatchesWithGroupAndPosition方法

示例文件解释了他们的作用.
![20250303_124035.png](https://gitee.com/wangsk789/images/raw/master/20250303_124035.png)

ReplaceFirst方法和ReplaceAll方法可以返回替换第一个或所有符合条件的子字符串后的新字符串
![20250303_124042.png](https://gitee.com/wangsk789/images/raw/master/20250303_124042.png)

IndexOf方法可以返回符合条件的第一个字串的位置
![20250303_124050.png](https://gitee.com/wangsk789/images/raw/master/20250303_124050.png)

IsMatch方法可以判断字符串是否符合规则表达式，返回真或假

IsNumber方法可以判断字符串是否为数字格式

IsEmail方法可以判断字符串是否为邮箱格式

IsStrongPassword方法可以判断字符串是否为强密码（至少8位，只好有1位大写和1位小写和1为数字）

IsEmail和IsStrongPassword可以用在用户注册、登录等情况

## 下载地址 Download Links:

[cn.kevinkun.KevinkunRegEx-v3.aix](https://gitee.com/wangsk789/images/raw/master/20250303_124122.aix)
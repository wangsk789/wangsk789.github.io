# 使用MongoDB作为后端数据库

MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

--选自菜鸟教程

## 宝塔安装mongodb

1. 点击软件商店，搜索mongodb进行安装

2. 找到安装好的mongodb进行设置，将配置文件bindIp改为0.0.0.0

3. 安全 防火墙打开端口27017

4. 云服务器安全组入方向开放端口27017

5. 浏览器输入http://公网ip:27017
   出现“It looks like you are trying to access MongoDB over HTTP on the native driver port.”说明配置成功

6. 终端连接服务器
   
   ```
   cd /www/server/mongodb
   mongo
   use admin
   db.createUser({user:'root',pwd:'root',roles:['root']}) //这里可以使用自己的用户名和密码。
   db.auth('root','root') //返回1成功
   ```

7. 电脑可以安装mongodbCompass，可以在本地查看、操作mongodb的数据

## 宝塔安装php7并开启网站

1. 具体安装步骤略过
2. 服务器要支持php，本例中需要是php7以上。
3. 将[这个php文件](/other/mongodb7.php)下载后上传到服务器，并配置好php中的连接字符串。
4. 在浏览器中输入http://你的网址/mongodb7.php,如果显示{"error":"'collection' is missing"}说明配置成功。

## 使用Web组件操作数据

![20250303_122428.png](./images/20250303_122428.png)
![20250303_122440.png](./images/20250303_122440.png)
![20250303_122453.png](./images/20250303_122453.png)
![20250303_122504.png](./images/20250303_122504.png)

## 请求方式：

GET或者POST，推荐POST

## 参数列表：

1. 插入数据
   
   | 参数名        | 必填  | 类型        | 用途   | 举例                                              |
   | ---------- | --- | --------- | ---- | ----------------------------------------------- |
   | action     | yes | String    | 请求类型 | 必须是insert                                       |
   | collection | yes | String    | 表名   | collection                                      |
   | document   | yes | jsonArray | 数据   | [{"id":1,"x":25,"y":34},{"id":2,"x":52,"y":37}] |

2. 查询数据
   
   | 参数名        | 必填  | 类型         | 用途     | 举例                      |
   | ---------- | --- | ---------- | ------ | ----------------------- |
   | action     | yes | String     | 请求类型   | 必须是query                |
   | collection | yes | String     | 表名     |                         |
   | filter     | no  | jsonObject | 符合的条件  | {"x":{"$gt":5}}，详细见下方说明 |
   | sort       | no  | String     | 排序字段   | -x (负号表示逆序，正序不用加符号)     |
   | key        | no  | String     | 返回字段   | -id 或者x,y 正号负号不能同时使用    |
   | limit      | no  | number     | 限制数据个数 | 10                      |
   | skip       | no  | number     | 跳过数据个数 | 10                      |

3. 更新数据
   
   | 参数名        | 必填  | 类型         | 用途       | 举例                       |
   | ---------- | --- | ---------- | -------- | ------------------------ |
   | action     | yes | String     | 请求类型     | 必须是update                |
   | collection | yes | String     | 表名       |                          |
   | filter     | yes | jsonObject | 符合的条件    | {"x":{"$gt":5}} 详细见下方说明  |
   | newobj     | yes | jsonObject | 新的数据     | {"$set":{"x":2}} 详细见下方说明 |
   | upsert     | no  | boolean    | 是否自动添加数据 | 若为真，且没有符合条件的记录时，会自动添加    |

4. 删除数据
   
   | 参数名        | 必填  | 类型         | 用途    | 举例                      |
   | ---------- | --- | ---------- | ----- | ----------------------- |
   | action     | yes | String     | 请求类型  | 必须是delete               |
   | collection | yes | String     | 表名    |                         |
   | filter     | yes | jsonObject | 符合的条件 | {"x":{"$gt":5}} 详细见下方说明 |

## 常用查询条件filter

| 示例                                          | 表示意义     |
| ------------------------------------------- | -------- |
| {"x":2}                                     | 等于       |
| {"x":{"$lt":10}}                            | 小于       |
| {"x":{"$lte":10}}                           | 小于等于     |
| {"x":{"$gt":10}}                            | 大于       |
| {"x":{"$gte":10}}                           | 大于等于     |
| {"x":{"$ne":10}}                            | 不等于      |
| {"x":{"$gt":5, "$lt":10}}                   | 并且       |
| {"$or":[{"id":{"$lt":5}},{"id":{"$gt":8}}]} | 或者       |
| {"id":{"$in":[1,3,5]}}                      | 在数组中     |
| {"id":{"$nin":[1,3,5]}}                     | 不在数组中    |
| {"name":{"$regex":"wang"}}                  | 文本包含     |
| {"name":{"$regex":"^wang"}}                 | 文本以xxx开始 |
| {"name":{"$exists":true}}                   | 是否有某个字段  |

## 常用更新数据newobj

| 示例                    | 意义                |
| --------------------- | ----------------- |
| {"$set":{"x":2}}      | 将x的值设为2,若不存在就创建   |
| {"$unset":{"x":1}}    | 删除某个字段            |
| {"$inc":{"x":2}}      | 将x增加2， 只能是数字类型    |
| {"$push":{"x":5}}     | 向x中追加一个数。x必须是数组类型 |
| {"$pull":{"x":5}}     | 将x中等于5的值删除。       |
| {"$rename":{"x":"y"}} | 将字段x名称修改为y        |

## 返回数据

返回数据为json格式。

1. 若出错，会有error字段

2. 若没有出错，总有count字段和action字段

3. 若是query操作，还有个records字段。

## 附上php的内容

```php
<?php

/*
 * Writen by: Kevinkun
 * Date: 26/10/2022
 * Contact: wangsk789@qq.com
 */

//error_reporting(0);

$connectString = "mongodb://root:root@localhost:27017";//change this to your connectString

try{
    $manager = new MongoDB\Driver\Manager($connectString);  

    $result = [];


    // collection
    if(!isset($_REQUEST["collection"])){
        $result["error"]="'collection' is missing";
        die(json_encode($result));
    }
    $col = $_REQUEST["collection"];
    if(strpos($col,".")==false){
        $col = "db." . $col;
    }

    //action
    $action =strtolower(isset($_REQUEST["action"])?$_REQUEST["action"]:"");

    if ($action == "query") {
        //filter
        $filter = isset($_REQUEST["filter"])?$_REQUEST["filter"]:"{}";
        $filter = json_decode($filter);
        if(!$filter){
            $result["error"]="'filter' is not a well-formated json";
            die(json_encode($result));
        }
        $filter = (array)$filter;
        if(array_key_exists("_id", $filter)){
            $id = $filter["_id"];
            $filter["_id"] = new \MongoDB\BSON\ObjectId($id);
        }

        //sort
        $sort = array();    
        $order = isset($_REQUEST["sort"])?$_REQUEST["sort"]:"_id";
        $order = explode(",",$order);
        foreach($order as $k){
            if(substr($k,0,1)=="-"){
                 $sort[substr($k,1)] = -1;
            }else if(substr($k,0,1)=="+"){
                 $sort[substr($k,1)] = 1;
            }else{
                 $sort[$k] = 1;
            }
        }

        //keys
        $projection = array("_id"=>0);
        $keys = isset($_REQUEST["key"])?$_REQUEST["key"]:"-_id";
        $keys = explode(",",$keys);
        foreach($keys as $k){
            if(substr($k,0,1)=="-"){
             $projection[substr($k,1)] = 0;
            }else if(substr($k,0,1)=="+"){
                 $projection[substr($k,1)] = 1;
            }else{
                 $projection[$k] = 1;
            }
        }

        //limit and skip
        $limit = isset($_REQUEST["limit"])?$_REQUEST["limit"]:"0";
        $skip = isset($_REQUEST["skip"])?$_REQUEST["skip"]:"0";


        $options = [
            'projection' => $projection,
            'sort' => $sort,
            'limit' => $limit,
            'skip' => $skip,
        ];

        $query = new MongoDB\Driver\Query($filter, $options);
        $cursor = $manager->executeQuery("$col", $query);
        $records = $cursor->toArray();

        $result["records"] =  $records;
        $result["count"] = count($records);
        $result["action"]= "query";
        echo json_encode($result);

    }else if ($action == "insert") {
        $bulk = new MongoDB\Driver\BulkWrite;
        $body = isset($_REQUEST["document"])?$_REQUEST["document"]:"[]";
        if(strpos($body, "[") !== 0){
            $body = "[".$body."]";
        }
        $body = json_decode($body);
        if(!$body){
            $result["error"]="'document' is not a well-formated jsonArray";
            die(json_encode($result));
        }
        foreach ($body as $b){
            if(is_object($b)){
                $bulk->insert($b);
            }
        }

        $postresult = $manager->executeBulkWrite("$col", $bulk);
        $result["count"]= $postresult->getInsertedCount();
        $result["action"]= "insert";
        echo json_encode($result);

    }else if ($action == "delete") {
        //filter
        $filter = isset($_REQUEST["filter"])?$_REQUEST["filter"]:"";
        $filter = json_decode($filter);
        if(!$filter){
            $result["error"]="'filter' is not a well-formated json";
            die(json_encode($result));
        }
        $filter = (array)$filter;
        if(array_key_exists("_id", $filter)){
            $id = $filter["_id"];
            $filter["_id"] = new \MongoDB\BSON\ObjectId($id);
        }

        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->delete($filter, ['limit' => 0]); 
        $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $delresult = $manager->executeBulkWrite("$col", $bulk, $writeConcern);
        $result["count"]= $delresult->getDeletedCount();
        $result["action"]= "delete";
        echo json_encode($result);

    }else if ($action == "update") {
        //filter
        $filter = isset($_REQUEST["filter"])?$_REQUEST["filter"]:"";
        $filter = json_decode($filter);
        if(!$filter){
            $result["error"]="'filter' is not a well-formated json";
            die(json_encode($result));
        }
        $filter = (array)$filter;
        if(array_key_exists("_id", $filter)){
            $id = $filter["_id"];
            $filter["_id"] = new \MongoDB\BSON\ObjectId($id);
        }

        //newobj
        $newobj = isset($_REQUEST["newobj"])?$_REQUEST["newobj"]:"[]";
        $newobj = json_decode($newobj);
        if(!$newobj){
                $result["error"]="'newobj' is not a well-formated json";
                die(json_encode($result));
        }

        $upsert = isset($_REQUEST["upsert"])?$_REQUEST["upsert"]:"";
        $upsert = strtolower($upsert)=="true"?true:false;

        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->update($filter, $newobj, ['multi'=>true, 'upsert'=>$upsert]);
        $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
        $updateresult = $manager->executeBulkWrite("$col", $bulk, $writeConcern);
        $result["count"]= $updateresult->getModifiedCount() + $updateresult->getUpsertedCount();
        $result["action"]= "update";
        echo json_encode($result);


    }else{
        $result["error"]="'action' is not recoginzed";
        die(json_encode($result));
    }

}catch (MongoDB\Driver\Exception\Exception $e) {
    $result["error"]= $e->getMessage();
    die(json_encode($result));
}
?>
```
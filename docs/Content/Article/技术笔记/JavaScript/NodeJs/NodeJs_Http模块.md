# nodeJs http模块示例
```js
// 导入http模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response)=>{
    response.end('hello HTTP Server');  // 设置相应体 & 结束响应
});

// 监听端口，启动服务（两个参数，第一个是端口号，第二个是启动成功时的回调函数）
server.listen(9000, () => {
    console.log('服务已经启动......')
});
```
* 启动脚本成功后，会调用函数`console.log('服务已经启动......')`；当浏览器访问`127.0.0.1:9000`时，会调用`response.end('hello HTTP Server')`

# http注意事项
## 停止服务
* `ctrl + c` 停止服务

## 当返回体为中文时，设置utf-8
```js
// 导入http模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response)=>{
    response.setHeader('content-type', 'text/html;charset=utf-8');  // 不设置charset，返回中文为乱码
    response.end('您好');  // 返回为乱码
});
```

## 端口占用
* 当端口被占用时，会有如下报错
  ```cmd
  Error: listen EADDRINUSE: address already in use :::9000
  ``` 
* 方法：
  * 修改程序的端口
  * 通过任务管理器找到占用端口的PID -> 关闭对应的程序

# request 操作

|含义|语法|返回值|返回类型|
|--|--|--|--|
|请求方法|`request.method`|GET POST 等大写操作名|字符串|
|请求版本|`request.httpVersion`|1.1|字符串|
|请求路径|`request.url`|二级子路径+get参数|字符串|
|URL路径|`require('url').parse(request.url).pathname`|二级子路径|字符串|
|URL查询字符串|`require('url').parse(request.url).query` </br> `require('url').parse(request.url, false).query`|get参数|字符串|
|URL查询字符串|`require('url').parse(request.url, true).query`|get参数|对象|
|请求头|`request.headers`|请求头生成的对象，且属性名称都是请求头中属性名的小写|对象|
|请求体|`request.on('data', function(chunk){})` </br> `request.on('end', function(){});`|

## request.method

```js
// 导入http模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response)=>{
    // 获取请求方法
    console.log(request.method);  // GET
    response.end('http');
});
```

## request.httpVersion
```js
// 导入http模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response)=>{
    // 获取http协议版本号
    console.log(request.httpVersion);  // 1.1
    response.end('http'); 
});
```

## request.url
### 返回值
* 返回值为**二级子路径** + **get参数**，如
  |url|返回值|说明|
  |--|--|--|
  |`127.0.0.1`|`/`|无二级路径，且无GET方法传递查询词|
  |`127.0.0.1/index`|`index`|有二级路径（`index`），但无GET方法传递查询词|
  |`127.0.0.1/search?keyword=hahaha&num=1`|`search?keyword=hahaha&num=1` |有二级路径(`search`)，且有GET方法传递查询词（`keyword=hahaha` & `num=1`）|

### 用法示例
```js
// 导入http模块
const http = require('http')
// 创建服务对象
const server = http.createServer((request, response)=>{
    console.log(request.url);
    response.end('http'); 
});
```

### url.parse(request.url, bool)
* request.url 仅返回部分url信息，若需要更详细信息，通过nodejs的`url`模块对url进行解析
* 所需参数
  |参数|说明|是否必填|
  |--|--|--|
  |request.url|请求体url|是|
  |bool|`url.parse(request.url, false).query`返回类型为string </br> `url.parse(request.url, true).query`则返回object</br>默认为false|否|
* 返回值为object

### url.parse(request.url, false)
  ```js
  const url = require('url');
  const server = http.createServer((request, response)=>{
    let res = url.parse(request.url);
    // res结果如下
    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?keyword=h5',
    //     query: 'keyword=h5',
    //     pathname: '/search',
    //     path: '/search?keyword=h5',
    //     href: '/search?keyword=h5'
    //   }

    // 获取路径
    let path_name = res.pathname

    // 获取查询字符串（返回string）
    let query_word = res.query  // keyword=h5 字符串

    response.end('http'); 
  });
  ```

### url.parse(request.url, true)
  ```js
  const url = require('url');
  const server = http.createServer((request, response)=>{
    let res = url.parse(request.url, true);

    // 获取查询字符串（返回object）
    let query_word = res.query  // {keyword: 'h5'}

    // 提取keyword
    let kw = res.query.keyword;  // 'h5'

    response.end('http'); 
  });
  ```


## request.headers

```js
// 导入http模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response)=>{
    // 获取请求头（返回的是一个对象，且属性名是请求头属性的小写名称）
    console.log(request.headers);
    // request.headers 返回结果如下：
    // {
    //     host: '127.0.0.1:9000',
    //     connection: 'keep-alive',
    //     'sec-ch-ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
    //     'sec-ch-ua-mobile': '?0',
    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188',
    //     'sec-ch-ua-platform': '"Windows"',
    //     accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    //     'sec-fetch-site': 'same-origin',
    //     'sec-fetch-mode': 'no-cors',
    //     'sec-fetch-dest': 'image',
    //     referer: 'http://127.0.0.1:9000/',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
    //   }
    response.end('http'); 
});
```

# response 操作
## 响应头设置
```js
const server = http.createServer((request, response)=>{

    // 响应状态
    response.statusCode = 200;
    response.statusMessage = 'I LOVE YOU';  // 用到很少，一般直接与状态码对应

    // 响应头
    // response.setHeader(key, value)
    response.setHeader('content/type', 'text/html;charset:utf-8');  

    // 除了设置响应头已有的键值对，还可自定义新的键值对
    response.setHeader('myname', 'FIFA'); 

    // 响应头多个键值对同名，value用数组代替
    response.setHeader('myname', ['a', 'b', 'c']); 
    response.end('http'); 
});
```
## 响应体设置
```js

```


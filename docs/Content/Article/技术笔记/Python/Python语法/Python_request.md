# request
## request不同请求类型的参数

|参数名称|说明|类型|是否必填|请求类型|
|--|--|--|--|--|
|headers|请求头|kv键值对，kv皆为字符串类型|选填，建议添加`User-Agent`来模拟浏览器|get post|
|url|请求路径|字符串|必填|get post|
|params|get方法携带的参数|kv键值对，kv皆为字符串类型|选填|get|
|data|post方法携带的参数|kv键值对，kv皆为字符串类型|选填|post|
|proxies|设置代理ip|kv键值对，kv皆为字符串类型：如`{'https': '127.0.0.1:8080'}`，key是`http`还是`https`以网站协议为主|选填|get post|

## 参数使用
* UA检测:
  * UA定义：`User-Agent`,request头部信息，包含浏览器信息、操作系统信息等
  * 目标网站会检查`User-Agent`是否合法，若合法则会返回请求的数据；反之则无法得到任何信息,所以需要在请求头中插入一个`User-Agent`，“伪装”成浏览器发出的请求
  * `User-Agent`获取：任意浏览器访问网站，在request数据头获取该数值
  * 可准备多个`User-Agent`，在请求时，随机使用任意一个进行访问，防止因同一`User-Agent`访问频次过高而被认定为爬虫
* 防盗链 
  * 访问网站某些功能时，是有页面的打开顺序的：炒股网站上查看我买的股票价格，一定是`登录 -> 【我的股票】界面 -> 点击【我购买的某只股票】`，如果`登陆`后直接请求查看`我购买的某只股票`，则可能是爬虫。
  * 请求头的`Referer`存储前一个url，系统根据该字段判断当前请求是否合法（即你是`登陆`后直接`请求查看某只股票`，还是进入`我的股票`后再`查看某只股票`）
  * 如何获取`Referer`: 通过抓包工具获取爬取信息的请求，其头部有`Referer`

## Get

* 例子
    ```python
    import requests
    url = 'https://www.baidu.com/s'
    params = {
        'wd': '传奇'
    }

    # 和params一样，kv结构
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    }

    # get方法中，通过headers参数传入
    response = requests.get(headers=headers, url=url, params=params)
    ```

## POST
* `data`进行参数携带

```python
import requests
url = 'https://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=keyword'

# DevTool中，在payload中获取 request参数
data = {
    'cname': '',
    'pid': '',
    'keyword': '北京',
    'pageIndex': '1',
    'pageSize': '10'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
}

# post 请求 使用data作为参数输入
response = requests.post(headers=headers, url=url, data=data, proxies = {'https': '106.115.37.11'})

response.encoding = 'utf-8'

```

## Session&Cookie操作
* 很多网站，在用户访问首页时，除了返回网页内容还会有一个cookie
* 用户再次发送请求时，会携带该cookie，网站会判断cookie是否是合法，以及是否过期，若验证通过，则返回response

```python
import requests
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
}
base_url = 'https://www.xueqiu.com'

# 创建session对象
sess = requests.Session()
# 获取cookies
sess.get(url=base_url, headers=headers)

url = 'https://xueqiu.com/statuses/hot/listV2.json?since_id=-1&max_id=536214&size=15'
# 获取数据，通过session进行第二次请求发送（此时session携带了第一次的cookies）
res = sess.get(url=url, headers=headers).json()
```
* 注意：使用session时 至少请求两次（第一次获取cookie，第二次携带cookie获取数据）

# response
## text
* 返回html标签下的全部内容
```python
res = response.text()
```
## json
* 将json格式数据进行反序列化解析
```python
res_json = response.json()
```

## content
* 音频、视频、压缩包等文件进行解析
* `requests`爬取图片 & 保存为`1.png`
    ```python
    import requests
    response = requests.get(url)
    with open('1.png', 'wb') as fp:
        fp.write(response.content)
    ```

* `request`爬取图片 & 保存为`2.png`
    ```python
    import urllib from request
    request.urlretrieve(url, '2.png')
    ```
* `request`方案简单，但无法设置headers，若网站设置UA检测，则无法爬取，推荐**requests**


# 动态请求
* 不能通过地址栏url直接访问到的数据，叫做动态加载数据
* 如何确定动态数据的数据包：
  * Chrome浏览器的DevTools -> Network -> 选中一个数据包的`Name` -> ctrl + f 进入全局搜索 -> 输入动态数据的部分内容 -> 获取对应的request
  * headers关注的要素：url、user-agent
  * payload关注要素：传入的参数（key & value类型皆为string）


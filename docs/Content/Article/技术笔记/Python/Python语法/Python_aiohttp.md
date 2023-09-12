# aiohttp
* 可协程异步执行的[`request`](./Python_request.md)包
* 都协程啦~ [`asyncio`](./Python_asyncio.md)和`aiohttp`都是一起出现的啦~

# 参数
|参数|说明|类型|请求方法|
|--|--|--|--|
|url|请求的url链接|字符串|所有请求方法（必填）|
|headers|请求头信息|字典，键值都是字符串|所有请求方法（选填）|
|data|`data` & `json`不得同时传入||POST|
|json|`data` & `json`不得同时传入||POST|
|params|Get方法参数||GET|
|proxy|用于代理，防止自身IP被系统知晓|字符串：`http://ip:port`|POST & GET|

# 示例
```python
import aiohttp
import asyncio

urls = ['https://www.baidu.com']

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
}

body = {
    'username': 'FIFA',
    'password': 'FIFA97'
}

async def aiohttp_get(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url=url, headers=headers) as response:
            print(await response.text())

async def aiohttp_post(url):
    async  with aiohttp.ClientSession() as session:
        async with session.post(url=url, headers=headers, json=body) as response:
            print(await response.text())

if __name__ == '__main__':
    tasks = [aiohttp_post(_) for _ in urls]
    asyncio.run(asyncio.wait(tasks))
```
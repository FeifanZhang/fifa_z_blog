# Django的会话保持
## cookies
* 添加/修改
  ```python
  HttpResponse.set_cookie(key, value, max_age=None, expires=None)
  ```
  * 参数解释
    * key: cookie的名字
    * value：cookie的值
    * max_age:cookies存活时间，以秒为单位，默认为浏览器关闭时时效
    * expires：具体过期时间，默认为浏览器关闭时时效
* 删除
  ```python
  request.delete_cookie(key)
  ```
* 获取
  ```python
  request.COOKIES.get(key, default)
  ```
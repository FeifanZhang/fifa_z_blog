当我们不知到类里有没有需要的属性以及方法时，通过反射来判断是否存在。
# 反射举例
django处理`HTTPresponse`时，一般的写法如下所示:
```python
def view(request):
    if request.method == 'POST':
        ret = {'msg':'this is post method'}
    elif request.method == 'GET':
	ret = {'msg':'this is post method'}
    elif request.method == 'PUT':
        ret = {'msg':'this is post method'}
    return JsonResponse(ret)
```
首先通过`request.method()`判断请求方法，再根据不同的方法执行相应的语句。
但是 REST framework中的APIView提供了一种机制：接收到request时，调用类中名称为`request.method()`的函数来执行：
```python
class WordView(APIView):
    # add word
    def post(self, request, *args, **kwargs):
        try:
            ret = {"words": "post"}
        except Exception as e:
            ret = {"error": e.args}
        return JsonResponse(ret)

    # get word
    def get(self, request, *args, **kwargs):
        try:
            ret = {"words": "get"}
        except Exception as e:
            ret = {"error": e.args}
        return JsonResponse(ret)

    # delete word
    def delete(self, request, *args, **kwargs):
         try:
            ret = {"words": "del"}
        except Exception as e:
            ret = {"error": e.args}
        return JsonResponse(ret)

    def put(self, request, *args, **kwargs):
         try:
            ret = {"words": "put"}
        except Exception as e:
            ret = {"error": e.args}
        return JsonResponse(ret)
```

# APIView实现上述机制的原理（反射）:
`APIView`会执行`self.dispatch()`（dispatch部分源码）:
```python 
try:
    self.initial(request, *args, **kwargs)

    # Get the appropriate handler method
    # 判断request请求方法是否为HTTP规定的单词
    # http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']
    if request.method.lower() in self.http_method_names: 
        handler = getattr(self, request.method.lower(), # handler拿到函数名与请求方法名称一致的函数
                        self.http_method_not_allowed) # 如果没拿到，返回http_method_not_allowed 状态码为405
    else:
        handler = self.http_method_not_allowed

    response = handler(request, *args, **kwargs)

except Exception as exc:
    response = self.handle_exception(exc)

self.response = self.finalize_response(request, response, *args, **kwargs)
return self.response
```

从中也可以看出，APIView所支持的请求方法。


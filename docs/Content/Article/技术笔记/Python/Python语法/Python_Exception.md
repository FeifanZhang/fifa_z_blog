# 异常示例

```python
a = [1, 2, 3]
try:
    a[4] = 100           # IndexError
    print(1 / 0)         # ZeroDivisionError

except IndexError as e:  # except [异常种类] as 异常命名
    print(e)

except ZeroDivisionError as ex:
    print(ex)

except (ValueError, OSError) as spec_ex:  # 捕获多个异常
    return 'error !'  

finally:
    print('必执行代码finally')

# 异常处理后续代码（捕获的异常未进行return、continue、break操作时，会执行）
print('continue') 
```

* 注意：`finally`内的代码执行优先级高于`except`内代码，【`ValueError` & `OSError`】虽然需要`return`，也是先执行`finally`，再执行`return`；此时最后的`print('continue')` 不会被执行
* 优先级：`try` > `finally` > `except` > 异常处理后续代码

# 几种基础异常
|异常类型|异常说明|
|--|--|
|BaseException | 所有异常的基类|
|Exception | 常见错误的基类|
|ArithmeticError | 所有数值计算错误的基类|
|Warning | 警告的基类|
|AssertError | 断言语句（assert）失败|
|AttributeError | 尝试访问未知的对象属性|
|DeprecattionWarning | 关于被弃用的特征的警告|
|EOFError | 用户输入文件末尾标志EOF（Ctrl+d）|
|FloattingPointError | 浮点计算错误|
|FutureWarning | 关于构造将来语义会有改变的警告|
|GeneratorExit | generator.close()方法被调用的时候|
|ImportError | 导入模块失败的时候|
|IndexError | 索引超出序列的范围|
|KeyError | 字典中查找一个不存在的关键字|
|KeyboardInterrupt | 用户输入中断键（Ctrl+c）|
|MemoryError | 内存溢出（可通过删除对象释放内存）|
|NamerError | 尝试访问一个不存在的变量|
|NotImplementedError | 尚未实现的方法|
|OSError | 操作系统产生的异常（例如打开一个不存在的文件）|
|OverflowError | 数值运算超出最大限制|
|OverflowWarning | 旧的关于自动提升为长整型（long）的警告

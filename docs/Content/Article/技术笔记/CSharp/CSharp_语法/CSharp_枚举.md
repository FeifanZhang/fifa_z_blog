# Enumerable
* `System.Linq`下的程序集包含了Linq的扩展方法

# IEnumerable
* 任一类型继承`IEnumerable` 可枚举类型接口，并实现该接口的`GetEnumerator`方法后，都可进行迭代
    ```csharp
    // 继承并实现了IEnumerable 接口的类可以通过foreach遍历
    public class Student: IEnumerable
    {
        // 实现 IEnumerable 接口的方法
        public IEnumerator GenEnumerator()
        {
            yield return "1";  // 返回值一定有yield关键字
            yield return "2";
            yield return "3";
        }
        /*
        yield作用：
        返回值 IEnumerator 类型为接口，并有如下方法：current，moveNext，Reset
        这些方法、属性的实现和赋值通过yield关键字直接实现
        yield相当于迭代器，封装了枚举器
        */
    }
    ```
# IEnumerable<TSource>
* 继承了`IEnumerable`的接口，且只有一个`GenEnumerator`方法

# IQueryable
* 继承了`IEnumerable`的接口，且只有一个`GenEnumerator`方法
```csharp
var list1 = stuList.AsQueryable().Where(s => s.Age > 10);
```

## IQueryable 与 IEnumerable的区别
* IQueryable会将操作构建成表达式树，等到真正使用时在数据库中进行操作（延时加载）
* IEnumerable会直接将数据存至内存中，并在内存中进行过滤等操作

# 几者之间的转化
* List因为已经继承了`IEnumerable<TSource>`借口，所以可以直接使用Linq的方法（如 `select`, `where`等）
* 但`DataTable.Rows`只继承了`IEnumerable`接口，需要通过 `Cast<>`方法转换成`IEnumerable<TSource>`后，才可以使用Linq方法
    ```csharp
    var list1 = table.Rows.Cast<DataRow>().Where(row => row["Name"].ToString().Equals("zhangsan"))
    ```

---
# 参考
* [C# Linq Enumerable和 IEnumerable以及 IEnumerable＜TSource＞的转化](https://blog.csdn.net/wcc27857285/article/details/93318318)
# 整数类型
* byte：范围`0-255`
* short：短整型，范围`-32768 ~ 32768`
* int：范围 $-2*10^9$ ~ $2*10^9$
* long：范围 $-9*10^{18}$ ~ $9*10^{18}$
  ```cs
  private void Form1_Load()
  {
      byte a = 0;
      short b = 9999;
      int c = 255455;
      long d = 3232323;
  }
  ```

# 浮点型
* 浮点数包含小数和整数类型
* float：范围 $-3.4 * 10^{38}$ ~ $3.4 * 10^{38}$
* double：双精度类型，比float更加精确，范围$-5.0 * 10^{-324}$ ~ $1.7*10^{308}$
  ```cs
  private void Form1_Load(object sender, EventArgs e)
  {
      int b = 0;
      float a = 1.1f; // 小数后面不加f 默认为double
      a = b;  // 此时 a = 0 因为a 是float 赋值小数整数都可以
      double c = 1.1;
      c = b; // 此时 c = 0 因为c 是float 赋值小数整数都可以
      // float -> double可以，反过来不行

  }
  ```

# 十进制
* 精度高于float，范围($-7.9*10^{28}$ ~ $7.9*10^{28}$) / ($10^0$ ~ $10^{28}$)
* decimal包含了高精度小数和整数，但decimal不能和浮点型互换
  ```cs
  int a = 1;
  double b = 1.3;
  float c = 1.4f;
  decimal de = 1.1M;  //必须是1.1M 不然1.1默认为double了
  de = a; //ok

  // 浮点型与decimal不得相互转化 以下为错误示范
  de = b; //NO! double与decimal不能互换
  de = c; //NO! float与decimal不能互换
  ```

# 布尔类型
* SAME AS PYTHON !

# 字符串类型
* string：一串字符，用`""`
* char：一个字符，用`''`
## 举例
  ```cs
  string a = "hello world";
  char b = 'A';
  MessageBox.Show(a); // a不用ToString，因为本身就是String
  MessageBox.Show(b.ToString());  // char不是String 需要转化

  // 任何数都可以转换为string
  int a = 1;
  double b = 1.9;
  float c = 1.1f;
  decimal d = 1.1M;
  string e = ""+a; //a直接转换成字符串
  string f = "hello c#!"+b  //直接拼接成字符串
  ```
## 字符串拼接
  ```cs
  string s1 = "hello", string s2 = "world", res;
  var res = s1 + s2; // "helloworlds"
  var res1 = $"{s1}, {s2}"; // "hello,worlds"
  ```

## 字符串换行
```csharp
var str = @"aaaaaaaaaa
aaaaaaaa
aaaaaa
aaaaaaaa";
```

*  `@` 和 `$` 可以叠加使用
  ```csharp
  var s = 3
  var str = $@"aaaaaaaaaaaa
  aaaa
  aaaaa{s}";
  ```

## Trim & TrimStart & TrimEnd
  ```cs
  private void useTrim()
  {
      string s = " from dual union all ";
      s = s.Trim(); // " from dual union all "

      s = " from dual union all ";
      s = s.TrimEnd();  // " from dual union all"
      s = s.TrimStart();  // "from dual union all"

      s = s.Trim("fl".ToCharArray()); // 输入的参数是char array，里面所有的字符只要字符串的头尾中出现，就直接删除
      MessageBox.Show(s);  // "rom dua unionl a"，删除头部的f 以及尾部的ll
  }
  ```

# 空类型
* STILL SAME AS PYTHON !
* null instead of None
* 当某个变量未进行初始化时等于null

# 数组
* 优势；在内存中是一个连续空间，索引、赋值、修改数值速度快
* 劣势：在两个元素之间插入数值很麻烦；且数组长度固定，若声明数组时太长造成浪费，太短又会不够用
  ```cs
  // 无默认值声明
  int [] ints = new int[6];

  //有默认值声明
  int [] intList = new int[]{0,1,2,3,4,5};

  //同时声明长度 & 默认值也可以
  string[] strings = new string[3]{ "d", "a", "a" };

  // 赋值
  intList[0] = 9;
  int a = intList[1]; 
  ```

# 数组列表
* 与数组类似，但解决了数组的劣势
* 在`System.Collections`下的`ArrayList`
* 劣势：
  * 存储数据时使用`object`类进行存储
  * 存储时存在`装箱 & 拆箱`(即存储时都要变成object类，取出时再转换为相应的类)操作，导致性能低下
    ```cs
    ArrayList al = new ArrayList();
    // Add将新元素添加至末尾
    al.Add("abc");
    al.Add(1);
    
    // 修改数据
    al[0] = 3;

    // 移除指定索引处的数据
    al.RemoveAt(0);

    // 移除指定内容的数据
    al.Remove("abc");

    // 在索引处插入某一元素,如果该索引有值，则该索引及其后面的值依次往后错位
    al.Insert(0, "hello world!"); // 将 0 ~ 最后一个元素 依次往后一个索引让出0号位置，在0放入 "hello world!"
    ```

* length与count()区别
  * length是属性，count是方法
  * length速度稍快

# List
  ```cs
  List <object> list= new List<object>();

  // 查找
  int res = list.IndexOf(object); // 返回整数索引
  int res = list.FindIndex(obj =>obj[0] == 'i' );  // 根据规则进行查找，返回查找到的第一个值的索引

  // 添加元素
  list.Add(object); // 结尾添加
  list.Append(object); // 结尾添加 不会在原List上添加，而是新生成一个添加
  list.Insert(index, object);

  // 移除元素
  list.Remove(object);
  list.RemoveAt(index);

  //合并两list
  listA.AddRange(listB);

  // 去重
  List<object> Result = listA.Distinct().ToList(); 

  // 并集
  List<object> Result = listA.Union(listB).ToList();    

  // 交集
  List<object> Result = listA.Intersect(listB).ToList();

  ```
## IList
* IList是泛型接口，是 ICollection 泛型接口的子代，并且是所有泛型列表的基接口。
* IList仅定义了十分基础的接口，可以作为List数据载体，如果要对数据进行排序，筛选等处理，IList无法胜任
  ```cs
  IList<int> intIList = new List(); // 通过List中的方法实现了IList接口，并将这个实现的实例赋值给intLIst
  ```

# 字典
* 添加 `System.Collection.Generic`
```cs
  Dictionary<object, object> openWith = new Dictionary<object, object>();
  //添加key value的方法
  openWith.Add(key, value);  // 使用该方法时，若key存在则报错
  openWith["key"] = value;  // 该方法既是添加也是修改

  // 获取value
  object value = openWith[key];

  // 判断key是否存在
  bool res = openWith.containsKey(key);

  //遍历 key
  foreach (object key in openWith.Keys)
  {
      Console.WriteLine("value = {0}", key);
  }

  // 遍历value
  foreach (object value in openWith.Values)
  {
      Console.WriteLine("value = {0}", value);
  }

  //遍历字典
  foreach (KeyValuePair<object, object> pair in openWith)
  {
      Console.WriteLine("value = {0}", pair.key, pair.value);
  }
  ```

# 参考
* [c#数组的count()和length的区别](https://www.cnblogs.com/lip-blog/p/7560458.html)
* [C#中的Dictionary字典类介绍](https://www.cnblogs.com/txw1958/archive/2012/11/07/csharp-dictionary.html)


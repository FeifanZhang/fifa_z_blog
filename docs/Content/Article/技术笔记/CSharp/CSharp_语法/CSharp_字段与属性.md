# 字段 & 属性简介
* 字段：
  * 意义：用于存储数据
  * 权限：允许自由读写
  * 写入限制：只对写入数据有类型限制
  * 写入的作用域：仅字段本身有变化，而对其他字段或状态无法产生影响
* 属性：
  * 意义：不用于存储，而是对字段存储的过程，做规定 & 限制
  * 权限：可限制字段进行**读（get 方法）** 或 **写（set 方法）** 或 **读写（get & set 方法）**，
  * 写入限制：可对数据类型、范围、格式等提出要求 & 检查
  * 写入的作用域：不仅对写入的字段起变化，还可以对其他字段 or 状态做联动变化

# 例子

```cs

public class Person 
{
    private string name;  // 字段
    private DateTime birthday;  // 字段

    public string Name  // 属性
    {
        get{ return name; }
        set  // set进行赋值操作时，可以添加检查机制阻止非法输入
        { 
            if(value.Length >=15)  // 名字输入过长时 进行提示
            {
                throw new Exception($" name 【{value}】 is too long")
            }
            else
            {
                name = value;
            }
        }
    }

    public int Age  // 属性
    {
        get {DateTime.Now.Year - birthday;}  // 当某个数值需要事实计算得出时，通过属性语法可以像调用字段一样获取该数值
    }
}
```
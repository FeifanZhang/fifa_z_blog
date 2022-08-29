# 创建项目
* 项目类型
  * 黑窗口
  * 类库
  * GUI
* `项目`与`解决方案`之间的关系：**解决方案**中存放多个**项目**

# 文件结构以及关键字
  ```cs
  // 引用命名空间，一般是namespace
  using Microsoft.AspNetCore;
  using Microsoft.AspNetCore.Hosting;

  namespace WebApplication1{ // 项目的命名空间，多数时候是项目本身的名称

    public class Program{ // 类名称

      public static void Main(string[] args){ //主函数，程序的入口，即最开始执行的方法

      }
    }
  }
  ```
* namespace下有多个class，class下有多个method，method中Main是C#的入口点

# 注释
* 单行注释：`//`
* 多行注释:
  ```cs
  /*
  好多注释
  好多好多注释
  */
  public static void Main(string[] args){
    ...
  }
  ```
* 文档注释：`///`在调用时，会显示注释内容，在**方法**以及**类**中都适用
  ```cs
  /// <summary>
  /// 清理所有正在使用的资源。
  /// </summary>
  /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
  protected override void Dispose(bool disposing)
  {
      if (disposing && (components != null))
      {
          components.Dispose();
      }
      base.Dispose(disposing);
  }
  ```

# C# 特点
* C# 大小写敏感
* `using`末尾以及每句代码的末尾要加`;`
* c#文件名与类名可以不一样




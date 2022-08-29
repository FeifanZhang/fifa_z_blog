# 表达式简介
* 由操作数 & 运算符组成，运算符包括 `+` `-` `*` `/` `%`(求余数) `new`
* 根据操作数的数量分为一元表达式，二元表达式以及三元表达式
* 优先级：默认先乘除，后加减

## 赋值

```cs
int a = 10;

int b, c, b;  // `,` 可以是同类型变量的声明，可以赋值也可以不用赋值
b = 1;
c = 2;
d = 3;

int e = 8, y = 9, z; // 不用赋值的同类型声明
z = e + y;
```

## 四则运算
* 两个整数运算结果为整数，即使结果为小数（如除法），仍取整数位

## 一元表达式
* `+x`
* `-x`
* `~x`
* `T(x)`
* 自增 & 自减
  * --x：先自减，再执行完表达式
  * x--：先执行表达式，再自减
  * ++x：先自增，再执行表达式
  * x++：先执行表达式，再自增

## 二元表达式
* `x & y`: and运算
* `x && y`: and运算，x为True时 才会对y求值
* `x||y`：或运算
* `x ?? y`: x为null时，求y；否则为x
* `x is t`
* `x as t`

## 三元表达式
* `x ? y : z`: x 为 true 执行y 否则执行z
    ```cs
    string a = "a", b= "b", c = "c", m;
    m = a == "a" ? b : c; // m = "c"
    ```

## 匿名函数
* `(Tx)=>y`：lamdba 函数
* `x = x+y`

# 条件分支
* if

    ```cs
    int a = 0;
    if (a == 1){
        MessageBox.Show("a == 1");
    }
    else if (a > 1 && a < 2){
        MessageBox.Show("1 < a < 2");
    }
    else{
        MessageBox.Show("a > 2");
    }
    ```
* switch
    * switch的每个case的末尾必须为break，所以不能从一个case跳转至另一个case
        ```cs
        int a = 1;
        switch(a){
            case 1:
                MessageBox.Show("1");
                break;
            case 2:
                MessageBox.Show("2");
                break;
            default:
                MessageBox.Show("ERROR!");
                break;
        }

        int b = "1";
        switch(b){
            case "1":
                MessageBox.Show("1");
                break;
            case "2":
                MessageBox.Show("2");
                break;
            default:
                MessageBox.Show("ERROR!");
                break;
        }
        ```

# 循环
* for
  ```cs
  for (int i = 0; i<10, i++){
      MessageBox.Show(""+i);  // 0 ~ 9
  }
  ```
* while
  ```cs
  int a = 0;
  while (a < 10){
      MessageBox.Show(""+a);  // 0 ~ 9
  }

  //如果变量不符合while条件，则直接跳过
  int a = 99;
  while (a < 10){
      MessageBox.Show(""+a);  // 不会进入 直接跳过
  }
  ```
* do while
  * 无论是否满足while条件 都会先执行一次循环体
    ```cs
    int a = 90;
    do
    {
        MessageBox.Show("" + a);
        a++;

    } while (a < 10);
    ```



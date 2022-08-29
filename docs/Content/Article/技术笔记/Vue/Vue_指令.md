# 内容渲染
## v-text
```html
<template>
  <div class="hello"></div>
  <p v-text="msg"></p>
  <p :id="'list-' + id"></p> <!--字符串拼接 list-2 -->
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
      return {
          id=2,
      }
  }
}
</script>
```

## 插值表达式（Mustache）
```html
<template>
  <p>{{msg}}</p>
  <!--插值表达式可以进行拼接，而v-text不能-->
  <p>msg：{{msg}}</p>
  <!--插值表达式仅用于元素内容，以下写法不正确-->
  <input type="text" placeholder="{{msg}}">
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```
* 除了基础应用法，插值表达式还可以进行简单运算
```html
<template>
  <p>{{num+1}}</p> <!--4-->
  <p>{{OK ? num : 'not ok'}}</p> <!--not ok-->
  <p>{{message.split('').reverse().join('')}}</p>  <!--CBA--> 
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      num: 3,
      message: "ABC",
      OK: false

    }
  }
}
</script>
```
* 插值表达式比`v-text`更加常用，因为更加灵活

## v-html
* 插值表达式与`v-text`只能渲染文本，该指令可以将文本渲染成标签
```html
<template>
    <!--
        v-html会将变量内字符串渲染成html元素后进行插入
        最后渲染出的dom结构如下所示
        <p>
            <i style="color:red">abc</i>
        </p>
    -->
  <p v-html='desc'></p>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      desc: '<i style="color:red">abc</i>'
    }
  }
}
</script>
```

# 属性绑定
## v-bind
* 给DOM元素的属性绑定data内变量
```html
<templete>
    <!--语法糖，DOM属性前面加`:` 代替v-bind关键字 -->
    <img :src="this.img" alt="">
</templete>
<script>
export default{
    data(){
        return {
            img: 'www.XX.com'
        }
    }
}
</script>
```

## v-cloak
在script解析时，如果速度过慢，会导致DOM元素显示的是mustache占位符，比如`{{this.msg}}`,而不是`this.msg`的值，直到script加载渲染完成，才会显示`this.msg`的值，为了避免这种情况，在标签内加入`v-cloak`,使得DOM元素不显示任何字符，直到`this.msg`加载完成。
```html
<templete>
    <h2 v-cloak>{{this.msg}}</h2>
</templete>
```

# 事件绑定
## v-on
绑定一个监听事件，简写为@
### click（鼠标点击事件）
```html
<template>
    <!--代码仅有一行时，直接在html中写明即可-->
        <!--counter -= 1 -->
        <button @click="counter--">-</button>
        <!-- counter + 1 -->
        <button @click="counter += 1">-</button>
    <!--执行this.setcounter方法-->
        <!--调用增强型函数且无参数输入时，不写()-->
        <button @click="this.setcounter">setcounter</button>
        <!--调用的函数需要传入参数时-->
        <button @click="this.setcounter1(2)">setcounter</button>
</template>
<script>
export default{
    data(){
        return{
            counter = 1,
        }
    },
    methods:{
        //函数增强写法，调用函数时，和调用属性一样不加（）
        setcounter(){
            this.counter = 2 * counter
        }
        setcounter1(c){
        this.counter = c * 2
        }
    }
}
</script>
```

## 修饰符
修饰符就是对监听事件的触发进行限制
### prevent
阻止默认事件（如a链接跳转。form表单提交），执行新定义的事件
```html
<!--阻止默认form提交，去执行login方法-->
<form class="Login" v-show="!showPop" @submit.prevent="login">
    <h1>login</h1>
    <input type="yourbirth" v-model="yourbirth" name="" placeholder="username">
    <input type="mybirth" v-model="mybirth" name="" placeholder="password">
    <input type="submit" name="" value="Login">
</form>

<!--阻止a标签默认的herf跳转，执行onClick函数-->
<a herf="https://www.baidu.com" @click.prevent="onClick">百度首页</a>
```

### stop
阻止冒泡事件，**冒泡事件的产生**如下所示：
```html
<template>
    <div @click="divevent">
        <button @click="butevent">按钮</button>
    </div>
</template>
```
如果点击button 会先执行button的`butevent`，再执行外层的`divevent`，这就是**冒泡事件**。希望点击button时，只执行`butevent`，添加stop关键字：
```html
<template>
    <div @click="divevent">
        <button @click.stop="butevent">按钮</button>
    </div>
</template>
```

### capture
```html
<template>
    <div @click.capture="divevent">
        <button @click="butevent">按钮</button>
    </div>
</template>
```
* 点击div时,先执行`divevent`,再执行`butevent`

### self
* 对冒泡场景进行修饰
```html
<template>
    <p @click="pevent">
        <div @click="divevent">
            <button @click="butevent">按钮</button>
        </div>
    </p>
</template>
```
* 点击button时，事件执行顺序: `butevent` -> `divevent` -> `pevent`
* 希望点击button时，冒泡种不包含`divevent`（即执行顺序为：`butevent` -> `pevent`），div中添加.self:
  ```html
  <!--
    这种情况下，点击div标签的冒泡顺序仍为divevent -> pevent
  -->
  <template>
    <p @click="pevent">
        <div @click.self="divevent">
            <button @click="butevent">按钮</button>
        </div>
    </p>
  </template>
  ```

### once
```html
<!--once：和v-once一样,绑定事件仅触发一次-->
<input type="text" @once="submit">
```

### keyup & keydown（键盘点击事件）
```html
<!--keyup：键冒按下去不会触发，放松手键帽反弹时，触发submit方法，对应的还有keydown方法-->
<input type="text" @keyup="submit">
<!--keyup.enter：enter键松手反弹时，触发submit方法-->
<input type="text" @keyup.enter="submit">
```
`keyup`和`keydown`支持监控所有键盘，键盘的编码可以百度查找

## 双向绑定
### v-model
* 既能将变量值渲染进DOM，通过DOM改变值时，也可回传给变量
    ```html
    <template>
        <!--默认显示username的数值，当input内容改变时会更新进username-->
        <input type="text" v-model="username" >
    </template>
    <script>
    export default{
        data(){
            return {
                username: "fifa",
            }
        }
    }
    </script>
    ```
#### v-model的修饰符
|修饰符|作用|示例|
|--|--|--|
|.number|将输入的内容转换为数字|`<input type="text" v-model.number="age" >`|
|.trim|将输入内容首尾空格去掉|`<input type="text" v-model.trim="username" >`|
|.lazy|文本框失去焦点后才会更新，而非实时更新|`<input type="text" v-model.lazy="username" >`|

# 条件渲染
## v-if
### v-if & v-else
当满足`v-if`的条件时，进行渲染，否则不渲染 `v-if` 和`v-else`和计算机语言中的`if else`一样
```html
<!--当 this.isShow==true 时，才会渲染-->
<h2 v-if="this.isShow">哈哈</h2>
<!--除了if以外的所有情况，渲染下面的DOM-->
<h2 v-else>嘿嘿</h2>
```

### v-if & v-else-if
和python的`if elif`使用一样
```html
<h2 v-if="score=90">=优秀</h2>
<h2 v-else-if="score>=80">不错</h2>
<h2 v-else-if="score>=70">还可以</h2>
<h2 v-else-if="score>=60">一般般</h2>
<h2 v-else="score>=50">不好呀</h2>
```

## v-show
作用和`v-if`一样！
``` html
<!--看this.showPop的值是否为true true则显示-->
<form class="Login" v-show="!showPop" @submit.prevent="login">
    <h1>没奖竞猜</h1>
    <input type="yourbirth" v-model="yourbirth" name="" placeholder="你的生日是什么时候?">
    <input type="mybirth" v-model="mybirth" name="" placeholder="我的生日是什么时候?">
    <input type="submit" name="" value="Login">
</form>
```

## `v-if`和`v-show`的区别：
* `v-if`条件为false，模板中不会有对应的DOM；当条件变为true时，直接新建一个DOM；false时再删除
* `v-show`则是在DOM中添加了`display`属性：false时添加`display: none`；true则直接移除该属性
* 若DOM的切换频率较高，使用`v-show`，否则使用`v-if`
* v-if 有较大的切换开销；v-show有较高的渲染开销（因为DOM无论显示与否都会被创建 & 渲染）

# 列表渲染
## v-for
`v-for` ? 字面意思，就是循环遍历
### 遍历数组
* 建议在使用v-for的元素下，绑定一个key的值，使得每个DOM都有固定的ID，可以更好地维护列表状态
* key只能绑定string or number 不可以是这两个以外的类型
* key值作为id，不可以重复
* 在遍历过程中，获取索引，array对应的索引不具备唯一性，因为当列表更新时，元素对应的索引可能会改变，所以索引不能与key绑定
    ```html
    <template>
        <!--在遍历过程中，获取每一个item的值-->
        <li v-for= "item in names" :key="item">{{item}}</li>

        <!--遍历列表的同时，获取索引-->
        <li v-for= "(item, index) in names" :key="item">{{index}}, {{item}}</li>

        <!--对象的遍历,in 前面一个占位参数时，仅遍历value 不会遍历key-->
        <li v-for= "item in info" :key="item">{{item}}</li>

        <!--如果要同时获取value和key，则如下操作-->
        <li v-for= "(value, key) in info">{{value}}, {{key}}</li>
        
        <!--遍历对象数组-->
        <li v-for= "item in info" :key="item">name: {{item.name}}, sex: {{item.sex}}</li>
    </template>
    <script>
    export default{
        data(){
            return{
                names:['a', 'b', 'c', 'd'],
                info:{
                    fname: 'a',
                    lname: 'b',
                    sex: 'f'
                }
                infos:[{
                    name: 'a',
                    sex: 'f'
                },{
                    name: 'b',
                    sex: 'f'
                }]
            }
        }
    }
    </script>
    ```
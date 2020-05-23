---
title: Vue笔记：v系列关键词
date: 2020-03-24 03:49:21
toc: true
tags:
- v-templete
categories:
- [vue, templete]
---
## 简介
v系列关键词即模板关键词，负责HTML元素和Vue框架内的变量进行互动
<!-- more -->
## mustache
将组件内定义的变量显示在模板里
```html 在组件 script 标签内声明变量
<script>
    data(){
        return {
            msg: 'hello',
            counter: 100,
        }
    },
</script>

<!--在templete标签内可以调用msg变量-->
<templete>
    <h2>{{this.msg}}</h2>
    <!--mustache可以进行简单的运算 -->
    <h2>{{counter * 2}}</h2>
</templete>
```
仅能在DOM的内容处使用:`<h2>{{this.msg}}</h2>`, 不能在DOM的其他部分使用比如`<img src="{{this.msg}}" alt="">`，src渲染出来的就是纯字符串{{this.msg}}，在DOM属性内添加data内的变量，移步至`v-bind`

## v-once
一直数据初始化的值，即使后期数据改变，也不会改变其显示
```html 在组件 script 标签内声明变量
<script>
    data(){
        return {
            msg: 'hello',
            counter: 100,
        }
    },
</script>

<!--在templete标签内可以调用msg变量-->
<templete>
<!--即使后面this.msg的值改变了，仍然显示hello-->
    <h2 v-once>{{this.msg}}</h2>
</templete>
```

## v-cloak
在script解析时，如果速度过慢，会导致DOM元素显示的是mustache占位符，比如`{{this.msg}}`,而不是`this.msg`的值，直到script加载渲染完成，才会显示`this.msg`的值，为了避免这种情况，在标签内加入`v-cloak`,使得DOM元素不显示直到`this.msg`加载完成。
```html
<templete>
    <h2 v-cloak>{{this.msg}}</h2>
</templete>
```

## v-bind
给DOM元素的属性绑定data内变量
```html
<templete>
    <!--语法糖，DOM属性前面加: 表示通过v-bind声明要绑定data内元素-->
    <img :src="this.img" alt="">
</templete>
<script>
    data(){
        return {
            img: 'www.XX.com'
        }
    }
</script>
```
v-bind是单向绑定，即data中绑定的变量改变，会引起对应DOM属性改变。而v-model则是双向绑定，且`v-blind`绑定的是data内变量和DOM属性。`v-model`则是DOM内显示的变量和data变量。
## v-model
```html
<input type="yourbirth" v-model="yourbirth" name="" placeholder="你的生日是什么时候?">
```

## v-if和v-else
当满足`v-if`的条件时，进行渲染，否则不渲染 `v-if` 和`v-else`和计算机语言中的`if else`一样
```html
<!--当 this.isShow==true 时，才会渲染-->
<h2 v-if="this.isShow">哈哈</h2>
<!--除了if以外的所有情况，渲染下面的DOM-->
<h2 v-else>嘿嘿</h2>
```

### v-if, v-else结合使用
和python的`if elif`使用一样
```html
<h2 v-if="score=90">=优秀</h2>
<h2 v-else-if="score>=80">不错</h2>
<h2 v-else-if="score>=70">还可以</h2>
<h2 v-else-if="score>=60">一般般</h2>
<h2 v-else="score>=50">不好呀</h2>
```

### `v-if`和·`v-show`的区别：
`v-if`条件为false，模板中不会有对应的DOM，当v-if的条件变为true时，新建一个DOM，false时删除，`v-show`则是在DOM中添加了`display=none`。切换的DOM频率较高，使用`v-show`，否则使用`v-if。`

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
### `v-if`和·`v-show`的区别：
`v-if`条件为false，模板中不会有对应的DOM，当v-if的条件变为true时，新建一个DOM，false时删除，`v-show`则是在DOM中添加了`display=none`。切换的DOM频率较高，使用`v-show`，否则使用`v-if。`

## v-on
绑定一个监听事件，简写为@
1. 基本使用:
```html
<template>
    <!--将counter属性 -1 -->
    <button @click="counter--">-</button>
    <!--执行this.setcounter方法-->
    <!--调用增强型函数且无参数输入时，不写()-->
    <button @click="this.setcounter">setcounter</button>
    <!--调用的函数需要传入参数时-->
    <button @click="this.setcounter1(2)">setcounter</button>
</template>
<script>
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
</script>
```

### 修饰符
修饰符就是对监听事件的触发加一些限定：`@click`就是在点击鼠标时才会触发，`@submit.prevent`就是阻止了默认action的情况下再去触发。
1. prevent
阻止默认事件，执行新定义的事件（通常用来阻止form表单提交）
```html
<!--阻止默认form提交，去执行login方法-->
<form class="Login" v-show="!showPop" @submit.prevent="login">
    <h1>login</h1>
    <input type="yourbirth" v-model="yourbirth" name="" placeholder="usernmae">
    <input type="mybirth" v-model="mybirth" name="" placeholder="password">
    <input type="submit" name="" value="Login">
</form>
```

2. stop
阻止冒泡事件，冒泡事件的产生如下所示：
```html
<template>
    <div @click="divevent">
        <button @click="butevent">按钮</button>
    </div>
</template>
```
如果点击button 则`divevent`和`butevent`都会执行，想在点击button时，只执行`butevent`，添加stop关键字
```html
<template>
    <div @click="divevent">
        <button @click.stop="butevent">按钮</button>
    </div>
</template>
```

3. 键盘
```html
<!--keyup：键冒按下去不会触发，放松手键帽反弹时，触发submit方法，对应的还有keydown方法-->
<input type="text" @keyup="submit">
<!--keyup.enter：enter键松手反弹时，触发submit方法-->
<input type="text" @keyup.enter="submit">
<!--once：和v-once一样-->
<input type="text" @once="submit">
```
`keyup`和`keydown`支持监控所有键盘，键盘的编码可以百度查找

## v-for
`v-for` ? 字面意思，就是循环遍历
### 遍历数组
```html
<template>
<!--建议在使用v-for的元素下，绑定一个:key元素，这个元素是要和后面显示的内容为一一对应的-->
    <!--在遍历过程中，获取每一个item的值-->
    <li v-for= "item in names" :key="item">{{item}}</li>
    <!--在遍历过程中，获取索引-->
    <li v-for= "(item, index) in names" :key="item">{{index}}, {{item}}</li>
    <!--对象的遍历,如果只获取一个值，则item显示出的为value，不显示key-->
    <li v-for= "item in info" :key="item">{{item}}</li>
    <!--如果要同时获取value和key，则如下操作-->
    <li v-for= "(value, key) in info">{{value}}, {{key}}</li>
</template>
<script>
    data(){
        return{
            names:['a', 'b', 'c', 'd'],
            info:{
                fname: 'a',
                lname: 'b',
                sex: 'f'
            }
        }
    }
</script>
```

## 参考


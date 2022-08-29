# vue组件结构
```html
<!--template节点定义html显示的dom元素（或是虚拟dom），是组件中必须有的部分-->
<template>
<h2>{{username}}</h2>
<button @click="addCount">{{cnt}}</button>
</template>

<!--script为组件的可选结构，用于组件内数据处理-->
<script>
// 设置组件相关data methods 方法等
// 定义完之后都需要通过export default进行导出
export default {
  // 设置组件命名
  name: 'Footer',

  // data中return的对象，是vue组件渲染期间用到的数据对象
  // 数值可通过 {{ }} 进行访问
  data(){
      return{
          username:'a',
          cnt: 1,
      }
  },

  props: {
    msg: String
  },

  // 事件处理函数
  // data中的数据可通过 this. 访问
  // 与 template 下的 button通过 @click进行绑定
  methods:{
      addCount(){
          this.cnt++
      }
  }
}
</script>

<!--style为组件的可选结构，用于组件内DOM的样式-->
<!--支持 css less scss-->
<!--npm install less -D 获取less语法支持，添加lang="less"即可支持less语法-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
```

# vue组件注册
* vue组件必须注册后才可引用，注册方式分为**全局注册**以及**局部注册**
* 若一个组件使用频率极高，建议全局注册
* 组件仅在特定情况或某一组件下用到，建议局部注册

## 全局注册组件
* 全局注册后可被项目中任何组件引用
* 例子：将footer.vue进行全局注册，
  * 首先在main.js中导入

## 局部注册组件
* 局部注册后仅能在注册范围内使用
* 在对应的vue组件中直接注册组件
  ```html
  <template>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <self-footer/>
  </template>
  <script>
    import HelloWorld from './components/HelloWorld.vue'

    // 引入Footer组件
    import SelfFooter from './components/Footer/SelfFooter.vue'

    // components注册引入的footer组件
    export default {
      name: 'App',
      components: {
        HelloWorld,
        'self-footer':SelfFooter  // key为引用时的标签名，value为引入的组件名称

      }
    }
  </script>
  ```

## 注册命名时的大小写问题
* 注册组件的名称可遵守两种命名方法：短横线命名法（`self-footer`）以及大驼峰命名法（`SelfFooter`）
* 建议使用大驼峰命名法，因为该命名法注册完组建后，引用时既可以用大驼峰引用，亦可以短横线引用
  ```html
  <template>
    <img alt="Vue logo" src="./assets/logo.png">
    <!--既可以通过SelfFooter引用，也可以self-footer引用-->
    <self-footer/>
    <SelfFooter/>
  </template>
  <script>
  import HelloWorld from './components/HelloWorld.vue'

  // 引入Footer组件
  import SelfFooter from './components/Footer/SelfFooter.vue'

  // components注册引入的foote组件
  export default {
    name: 'App',
    components: {
      'SelfFooter':SelfFooter  // key为引用时的标签名，value为引入的组件名称
    }
  }
  </script>
  ```

# 注册之间的样式冲突 
* 父组件声明的样式会覆盖子组件的样式
* 原因：单页面网站，所DOM结构是基于**唯一的index.html**呈现的，所以组件内的样式也会影响其他DOM

## 防止样式冲突
* css中通过`scoped`防止父组件样式渗透
* `scoped`底层实现是给当前组件的DOM添加属性，使得css样式的作用域限制在该属性值的DOM中
```html
<template>
  <h2>轮播图</h2>
</template>
<style scoped>
  h2{
    color: red;
  }
</style>
```

## 样式穿透
* 如果希望父组件的样式去影响子组件，可通过`deep`深度选择器进行选择
* 该选择器适用于less scss等css预处理器
  
# props简介
* 使用者通过props将参数传递至组件内部，供子组件进行使用（类比于给方法传参）
* props是单向传参：父组件可以给子组件传参，但子组件无法通过props传参给父组件

# 基本使用方法
* main.vue 向 child.vue 传递title article参数
* child.vue
    ```html
    <template>
        <h2>{{title}}</h2>
        <h4 >{{author}}</h4>
    </template>
    <script>
        export default {
            // 设置组件命名
            name: 'Footer',

            props: ['title', 'author'], // 父组件传递来的参数
        }
    </script>
    ```
* main.vue
    ```html
    <template>
        <child title="hello" author="me"></child>
    </template>
    <script>
        import child from './child.vue'
        export default{
            name= 'main',
            components:{
                child,
            }
        }
    </script>
    ```
* 若父组件传入一个子组件内未声明的props 则该props无法被子组件使用

# 动态绑定
* 使用[v-bind进行绑定](./Vue_templete.md)为组件动态赋值
* 还是main.vue 向 child.vue 传递title article参数
* child.vue
    ```html
    <template>
        <h2>{{title}}</h2>
        <h4 >{{author}}</h4>
        <h5>{{postDate}}</h5>
    </template>
    <script>
        export default {
            name: 'Footer',

            /*
            若props中变量遵循驼峰命名（如postDate）
            则父组件传入变量时，既可以写成postDate="2020-11-11",
            也可以写成 post-date="2020-11-11"
            但在组件内部，命名法不得混用
            */
            props: ['title', 'author', 'postDate'], 
        }
    </script>
    ```
* main.vue
    ```html
    <template>
        <!-- : 即可替代bind对数据进行绑定-->
        <!-- author 除了bind绑定外，还进行了字符串拼接-->
        <child :title="info.title" :author="'post by' + info.author" postDate="info.postDate"></child>
        <!--子组件中驼峰命名法的props变量 在父组件中既可以直接调用（postDate），也可以通过短横线法调用(post-date)-->
        <child :title="info.title" :author="'post by' + info.author" post-date="info.postDate"></child>
    </template>
    <script>
        import child from './child.vue'
        export default{
            name= 'main',
            data(){
                return {
                    info :{
                        title: "HELLO",
                        author: "me",
                        postDate: "2020-11-11",
                    } 
                }
            }
            components:{
                child,
            }
        }
    </script>
    ```

# props验证
* 声明props时，可以对变量作如下规定
  
|验证种类|解释|示例|
|--|--|--|
|基础类型检查|规定props属性的类型|`propsA: String,`|
|多个可能类型|规定props属性的多个类型|`propsA: [String, Number],`|
|必填数值校验|是否为可选参数|`propsA: {required: true}`|
|属性默认值|父组件为传入参数时默认的数值|`propsA: {default: 100}`|
|自定义验证函数|

## Props支持的类型
* 规定props变量的类型，防止串入错误类型，以下是支持的类型
    ```html
    <script>
        export default {
            props:{
                propsA: String,
                propsB: Number,
                propsC: Boolean,
                propsD: Array,
                propsE: Object,  //对象类型
                propsF: Date,
                propsG: Function,  // 函数类型
                propsH: Symbol  
            }
        }
    </script>
    ```

## 验证示例
```html
<script>
export default {
    props:{
        // propsA 既可接受string 类型参数 也可接受Number类型参数
        propsA: [String, Number],

        // 通过required将propsB设置成必填项
        propsB: {
            type: Number,  // 类型为String
            requires: true  // 设置成必填项
        }

        /*
        通过default为propsC设置默认值
        当父组件未传递propsC，子组件会将该属性初始化为默认值
        */ 
        propsC: {
            type: Number,  // 类型为String
            default: 100  // 设置默认值为100
        }

        /*
        设置自定义函数
        validator函数返回true表示通过； false表示验证失败
        value表示父组件传递进来的值
        */
        
        propsD:{
            type: String,
            // 通过validator函数对输入的数值进行验证
            validator(value){
                // array.indexOf(value)会返回value在array中的索引，如果value不在array中 则返回-1
                // 该方法则是查看传入的value是否在数组中，若不在返回false
                return ["success", "warning", "danger"].indexOf(value) !== -1
            }
        }
    }
}
</script>
```

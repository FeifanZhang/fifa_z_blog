# 计算属性简介
* 本质上是一个**回调函数**，实时监听data中数据的变化，当data发生改变时，立即return**一个计算后的新值**用于组件渲染DOM使用
* 计算属性会进行缓存，多次调用时，只要**计算属性依赖的参数不变**，计算属性就不会重复计算

# 基本使用
* 计算属性在命名时，用属性的方式命名而不是方法的方式命名(如命名fullname，而不是getfullname)
* 在computed节点下创建计算属性
* 通过 `this.` 访问data中的数据
* 必须有return
* 访问计算属性时，当做普通data变量访问即可
    ```html
    <template>
        <h2>{{this.fullname}}<h2>
    </template>
    <script>
    export default{
        data() {
            return {
                firstname: 'FIFA',
                lastname: 'z'
            }
        },
        computed:{
            //希望将firstname和lastname拼接后输出
            fullname(){
                return this.firstname + ' ' + this.lastname
            }
        }
    }
    </script>
    ```

# getter和setter方法
* 计算属性一般为只读属性，所以几乎不会用到set方法，因此推荐之前的写法
    ```html
    <script>
    exprot default{
        data() {
            return {
                firstname: "fifa",
                lastname: "z"
            }
        },

        computed:{
            fullname:{
                set(){
                    //so sth
                }
                get(){
                    return this.firstname+' '+this.lastname
                }
            }
        }
    }
    </script>
    ```

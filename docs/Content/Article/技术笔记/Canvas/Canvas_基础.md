# 画直线
* 在`body`中声明canvas画布
* `script`中进行绘画
* 绘画步骤：`document.getElementById`获取组件 -> `box.getContext`获取工具箱 -> `moveTo、lineTo`设置直线的起始和终点 -> `stroke`将设置好的直线画出
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            canvas {
                background-color:burlywood;
            }
        </style>
    </head>
    <body>
        <canvas id="box"></canvas>
    </body>
    <script>
        // canvas中画图，需要在js中实现
        // 从页面中获取 canvas 组件
        let box = document.getElementById('box')
        // 从 box 中获取画图工具箱(2d表示平面绘制)
        let toolBox = box.getContext('2d')
        // 设置直线
        // moveTo(x, y) 为起点坐标
        toolBox.moveTo(100, 100)
        // lineTo(x, y) 为终点坐标
        toolBox.lineTo(200, 100)
        // 绘制设置的直线(默认为黑色，宽度为2px)
        toolBox.stroke()
    </script>
    </html>
    ```
* 线段宽度：canvas画线时，默认宽度为2px（设置`lineWidth = 1`也没用）；如果要画1px宽度的直线，将坐标改为 .5 即可
* 绘制1px宽度的线段
    ```js
    // 将上面的设置线段的坐标改为 .5 即可
    // moveTo(x, y) 为起点坐标
    toolBox.moveTo(100, 120.5)
    // lineTo(x, y) 为终点坐标
    toolBox.lineTo(200, 120.5)
    ```

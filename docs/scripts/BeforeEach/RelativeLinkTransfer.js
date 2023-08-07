function transferLink(md){
    // const reg = /\[.+\]\(\(..+)\)/

    // // 打开json文件&读取
    // const fReader = new FileReader();
    // fReader.readAsText('../../temp/all_article_url.json');
    // console.log(fReader.result);
    // // while(reg.test(md)){
    // //     // 获取以当前md文件为base dir的相对路径
    // //     const baseDir = reg.
    // // }
    // fReader.abort();
}
// 导入http模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response)=>{
    // 获取请求方法
    console.log(request.method);  // GET

    // 获取url（只获取端口号后面的路径+get相关参数）
    console.log(request.url);  // 若全路径为 127.0.0.1，则url为/

    // 获取http协议版本号
    console.log(request.httpVersion);  // 1.1

    // 获取请求头（返回的是一个对象，且属性名是请求头属性的小写名称）
    console.log(request.headers);
    // request.headers 返回结果如下：
    // {
    //     host: '127.0.0.1:9000',
    //     connection: 'keep-alive',
    //     'sec-ch-ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
    //     'sec-ch-ua-mobile': '?0',
    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188',
    //     'sec-ch-ua-platform': '"Windows"',
    //     accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    //     'sec-fetch-site': 'same-origin',
    //     'sec-fetch-mode': 'no-cors',
    //     'sec-fetch-dest': 'image',
    //     referer: 'http://127.0.0.1:9000/',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
    //   }
    response.end('http');  // 返回为乱码
});

// 监听端口，启动服务（两个参数，第一个是端口号，第二个是启动成功时的回调函数）
server.listen(9000, () => {
    console.log('服务已经启动......')
});
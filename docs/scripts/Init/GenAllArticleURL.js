const fs = require('fs');
const path = require('path');
let json_res = {};

function getAllDir(curPath){
    fs.readdirSync(curPath).forEach(el => {
        let curNamePath = path.join(curPath, el);

        if(fs.statSync(curNamePath).isFile()){

            if(path.extname(el) == ".md" && el != "README.md" && el.substring(0, 1) != "_"){
                let fileName = el.substring(0, el.lastIndexOf("."))
                let relativePath = `.\\${path.relative(docPath, curNamePath)}`.replace(/\\/g, "/");
                // 若文件名重复
                if(json_res[fileName] != null){

                    throw `文件名重复：${curNamePath} 与 ${json_res[fileName]} 重复！`
                }
                else{

                    json_res[fileName] = relativePath;
                }
            }
        }
        else{

            getAllDir(curNamePath);
        }
    });
}

const docPath = path.dirname(__dirname);
const articlePath = path.join(path.dirname(docPath), "Content", "Article");
console.log(`gen_article_url : ${articlePath}`)
getAllDir(articlePath);
fs.writeFileSync(path.join(path.dirname(docPath), "temp", "all_article_url.js"), `let allURL = ${JSON.stringify(json_res)}`, (err) => {
    if(err){
        console.log(err);
    }
});



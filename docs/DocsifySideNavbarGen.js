const fs = require('fs');
const path = require('path');
// max level for nav bar
const maxLevel = 2;

// generate sidebar in every level
function genSideBar(curPath){
    let resNoPreBlank = [];
    fs.readdirSync(curPath).forEach(el => {
        let curNamePath = path.join(curPath, el);

        if(fs.statSync(curNamePath).isFile())
        {
            if(path.extname(el) == ".md" && el != "README.md" && el.substring(0, 1) != "_"){
                let fileName = el.substring(0, el.lastIndexOf("."))
                let relativePath = path.relative(__dirname, curNamePath)
                resNoPreBlank.push(`* [${fileName}](.\\${relativePath})`.replace(/\\/g, "/"));
            }
        }
        else
        {
            resNoPreBlank.push(`* **${el}**`);
            resNoPreBlank = resNoPreBlank.concat(genSideBar(curNamePath)) 
        }
    });
    fs.writeFileSync(path.join(curPath, "_sidebar.md"), resNoPreBlank.join('\n'), (err) => {
        if (err) console.log(`error when generate _sidebar.md : ${err}`);
    })

    let res = []
    resNoPreBlank.forEach((content) => {
        (curPath == basePath) ? res.push(content) : res.push("\t"+content)
    });
    return res;
}

// generate navbar
function genNavBar(curPath, curLevel = 0){
    let res = [];
    if(curLevel == maxLevel) return res;

    let preBlank = new Array(curLevel+1).join("\t") 
    fs.readdirSync(curPath).forEach(el => {
        let curNamePath = path.join(curPath, el)

        if(fs.statSync(curNamePath).isDirectory())
        {
            let relativePath = path.relative(__dirname, curNamePath)
            res.push(`${preBlank}* [${el}](.\\${relativePath}\\)`.replace(/\\/g, "/"))
            let a = genNavBar(curNamePath, curLevel + 1)
            res = res.concat(a) 
        }
    });
    return res;
}

// generate readme.md file for every level of dir
function genReadme(curPath){
    fs.readdirSync(curPath).forEach(el => {
        let curNamePath = path.join(curPath, el)
        if(fs.statSync(curNamePath).isDirectory())
        {
            let readMePath = path.join(curNamePath, "README.md")
            fs.statSync
            // 该文件夹下不存在 README.md 文件，则直接创建
            try {
                fs.statSync(readMePath)
            } catch (error) {
                fs.writeFileSync(readMePath, `* this is ${el} section!`);
            }

            genReadme(curNamePath)
        }
    });
}



const basePath = path.join(__dirname, "Content", "Article");

fs.writeFileSync(path.join(__dirname, "_navbar.md"), genNavBar(basePath).join('\n'), (err) => {
    if (err) console.log(`error when generate _navbar.md.bak : ${err}`);
})


fs.writeFileSync( path.join(__dirname, "_sidebar.md" ), genSideBar(basePath).join('\n'), (err) => {
    if (err) console.log(`error when generate _sidebar.md : ${err}`);
})

genReadme(basePath);

//import gen from './docs/scripts/Init/gen_sidebar_navbar'
const {exec} = require('child_process');
exec('ls -l', (err, stdout, stderr) => {
    if(err) {
        console.error(`exec error ${err}`)
    }else{
        console.log(stdout)
    }
})
// let cmd = new ActiveXObject("WScript.Shell");
// cmd.run('cd docs')
// cmd.run('docsify serve')
const cron_char_check = [/as/]  // 各时间位置可以写入的字符 & 表达式
/*
    检查表达式是否合法
    输入类型为string的cron表达式
    返回string （如：时/分/秒位 出现问题）
*/
function check_cron(cron){
    // 单独检查各表达式是否合法合规
    let cron_sp = cron.Split(' ')
    if(cron_sp.length < 5){
        return 'cron表达式长度有误'
    }
    for(const pos of cron_sp){

    }

    // 检查各个时间位的联动

}



/*

    检查输入的时间 是否会触发表达式
    输入类型为string的cron表达式
    返回值bool

*/
function if_trig_cron(cron){
    // 
}

// 返回该表达式的解析（汉字说明该表达式的意义）
function parse_cron(cron){

}

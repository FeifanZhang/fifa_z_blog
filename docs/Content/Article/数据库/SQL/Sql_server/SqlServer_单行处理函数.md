* sql_server大部分函数与mysql没有区别，文章仅总结语法不同的语句

|函数名|用途|用法|
|--|--|--|
|isnull|对应字段为`null`,则用`defaultValue`代替|`isnull(字段名, defaultValue)`|
|iif|类比mysql`if`语句|`IIF(exp判断语句, exp为true后执行, exp为false后执行)`|

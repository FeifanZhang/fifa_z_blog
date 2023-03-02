# 显示时间格式化
## 设置显示的时间格式
注意如期格式化字符串的大小写，若错误无法显示时间
```cs
dateEdit1.Properties.DisplayFormat.FormatString = "yyyy-MM-dd";  // 年-月-日

dateEdit1.Properties.DisplayFormat.FormatString = "yyyy-MM-dd HH:mm";  // 年-月-日 时:分

dateEdit1.Properties.DisplayFormat.FormatType = DevExpress.Utils.FormatType.DateTime;
```

## 设置编辑时间的格式
通过组件选择时间时，对应的时间格式（包含时间的显示，以及编辑格式）
```cs
dateEdit1.Properties.EditFormat.FormatString = "yyyy-MM-dd HH:mm";  // 年-月-日

dateEdit1.Properties.EditFormat.FormatString = "yyyy-MM-dd";  // 年-月-日 时:分

dateEdit1.Properties.EditFormat.FormatType = DevExpress.Utils.FormatType.DateTime;
```
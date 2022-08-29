# GridControl
- `GridControl`是一个组件，本身不显示数据，而是作为容器对内部的组件（如`GridView`/`CardView`/`XXXXView`）进行控制
- 添加数据源
```csharp
var dataTable = new DataTable
gridControl.DataSource = dataTable;
```
- 绑定数据源后，对数据源的增删查改操作都会直接反应在GridView和GridControl中,无论是`dataTable`或是`gridView`中的row发生了改变（`add`、`delete`以及`insert`），都会触发"`focusRowChanged`方法"

# GridView
- DevExpress提供的一种表格，用于显示数据
- 除此之外，可以根据用户的操作进来获取对应的数据
- 获取选中的数据（单选）
```csharp
DataRow selectedRow = gvCommit.GetFocusedDataRow();
// 当gridView初始化时，默认获取第一行数据
```
- 获取选中的行（多选）
```csharp
foreach (int handle in gridView.GetSelectedRows())
{
    DataRow dr = gvCommitCandi.GetDataRow(handle);
}
```
- 将选中的行设置为未选中
```csharp
gridView.ClearSelection();
```
- 选中全部行
```csharp
gridView.SelectAll();
```
- cell中数据过多，需要多行显示
```csharp
// 指定哪一列可以多行显示
gridView.Columns["CONTRACTREQUIRE"].ColumnEdit = new DevExpress.XtraEditors.Repository.RepositoryItemMemoEdit();
// 最大宽度
gridView.Columns["CONTRACTREQUIRE"].MaxWidth = 550;
```

# 完整的初始化GridControl + GridView的实例
```csharp
public void InitGrid(ref DevExpress.XtraGrid.Views.Grid.GridView gridView, ref DevExpress.XtraGrid.GridControl gridControl)
{
    if ((gridControl.DataSource as DataTable).Rows.Count > 0)
    {
        gridView.OptionsBehavior.Editable = false;
        gridView.OptionsView.ColumnAutoWidth = false;
        gridView.OptionsView.ShowGroupPanel = false;

        // 设置多选
        gridView.OptionsSelection.MultiSelect = true;
        // 设置多选框样式
        gridView.OptionsSelection.MultiSelectMode = DevExpress.XtraGrid.Views.Grid.GridMultiSelectMode.CheckBoxRowSelect;
        foreach (GridColumn col in gridView.Columns)
        {
            // 当col中包含“时”这个字时，将存储的内容通过时间格式进行显示
            if (col.FieldName.Contains("时"))
            {
                col.ColumnEdit = new DevExpress.XtraEditors.Repository.RepositoryItemTextEdit();
                col.ColumnEdit.EditFormat.FormatType = FormatType.Custom;
                col.ColumnEdit.EditFormat.FormatString = "yyyy-MM-dd HH:mm:ss";
                col.ColumnEdit.DisplayFormat.FormatString = "yyyy-MM-dd HH:mm:ss";
                col.ColumnEdit.DisplayFormat.FormatType = FormatType.Custom;
                // 设置该列不允许修改 & 只读
                col.OptionsColumn.AllowEdit = false;
                col.OptionsColumn.ReadOnly = true;
            }

            // 审批状态中存储的是数字，需要通过文字进行显示
            if (col.FieldName.Equals(审批状态)) 
            { 
                DevExpress.XtraEditors.Repository.RepositoryItemLookUpEdit lookUpEditSymbol = new DevExpress.XtraEditors.Repository.RepositoryItemLookUpEdit();
                DataTable dt = new DataTable();
                dt.Columns.Add("VAL");
                dt.Columns.Add("DISPLAY");
                dt.Rows.Add(0, "审批中");
                dt.Rows.Add(1, "通过");
                dt.Rows.Add(2, "驳回");
                dt.Rows.Add(3, "发起人撤回");
                dt.Rows.Add(4, "未提交");
                lookUpEditSymbol.DataSource = dt;
                // .DisplayMember就是显示给用户的那一列的列名
                lookUpEditSymbol.DisplayMember = "DISPLAY"; // DISPLAY这一列将会展示给用户

                // .ValueMember是表中真实存储的那一列的列名
                lookUpEditSymbol.ValueMember = "VAL";  // 通过VAL这一列与表中的数据进行匹配，当匹配到一行的VAL与表中的数据相等时，将该行的DISPLAY呈现出来

                // 将前面设置的组件加入该列
                col.ColumnEdit = lookUpEditSymbol;
            }
        }
        // 不显示该列
        gridView.Columns["流程ID"].Visible = false;
        // 修饰gridView中每个cell的长度，使得无论信息多长/多短都可以显示出来
        gridView.BestFitColumns();
    }
    
}
```
---
# 参考
- [DevExpress控件之GridControl、GridView](https://blog.csdn.net/weixin_30602505/article/details/95029134)
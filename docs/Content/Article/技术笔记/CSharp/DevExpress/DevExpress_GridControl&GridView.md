# GridControl
- `GridControl`是一个组件，本身不显示数据，而是作为容器对内部的组件（如`GridView`/`CardView`/`XXXXView`）进行控制
- 添加数据源

    ```csharp
    var dataTable = new DataTable();
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
## 获取选中的行（多选）
```csharp
foreach (int handle in gridView.GetSelectedRows())
{
    DataRow dr = gvCommitCandi.GetDataRow(handle);
}
```
## 将选中的行设置为未选中
```csharp
gridView.ClearSelection();
```
## 选中全部行
```csharp
gridView.SelectAll();
```
## cell中数据过多，需要多行显示
```csharp
// 指定哪一列可以多行显示
gridView.Columns["CONTRACTREQUIRE"].ColumnEdit = new DevExpress.XtraEditors.Repository.RepositoryItemMemoEdit();
// 最大宽度
gridView.Columns["CONTRACTREQUIRE"].MaxWidth = 550;
```

## 用户数据保存
用户在`GridView`中输入数据后，数据不会立刻进入表格，在该行失去焦点后，才会更新至表格中；有很多用户喜欢写完数据后，直接点击保存按钮（即未让该行失去焦点），这是表格中的数据仍是修改前的，为了应对这种情况的发生，`GridView`的`UpdateCurrentRow()`、`PostEditor()`、`CloseEditor()`三个方法

|方法名|是否关闭编辑功能|是否将数据保存至gridView|行状态|说明|
|--|--|--|--|--|
|`UpdateCurrentRow`|否|是|更新至`DataRowstate.Modified`状态|使用该方法之前，务必先用`CloseEditor`|
|`PostEditor`|否|是|不更新状态||
|`CloseEditor`|是|否|不更新行状态||

```cs
// 数据保存之前，需执行如下两行代码
gridView.CloseEditor();
gridView.UpdateCurrentRow();
```
# GridView + GridControl 代码案例
## 完整的初始化GridControl + GridView的实例
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
                col.ColumnEdit = new RepositoryItemSearchLookUpEdit();
                col.ColumnEdit.EditFormat.FormatType = FormatType.Custom;
                col.ColumnEdit.EditFormat.FormatString = "yyyy-MM-dd HH:mm:ss";
                col.ColumnEdit.DisplayFormat.FormatString = "yyyy-MM-dd HH:mm:ss";
                col.ColumnEdit.DisplayFormat.FormatType = FormatType.Custom;
                // 设置该列不允许修改 & 只读
                col.OptionsColumn.AllowEdit = false;  // 不管 gridView.OptionsBehavior.Editable 如何设置，单元格是否可编辑仅基于这一条语句
                col.OptionsColumn.ReadOnly = true;
                // 为该列添加背景颜色
                col.AppearanceCell.BackColor = Color.LightGreen;
            }

            // 审批状态中存储的是数字编码，需要通过文字进行显示
            if (col.FieldName.Equals("状态")) 
            { 
                DevExpress.XtraEditors.Repository.RepositoryItemLookUpEdit lookUpEditSymbol = new DevExpress.XtraEditors.Repository.RepositoryItemLookUpEdit();
                // 通过DataTable 建立数字状态码与文字的对应关系
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
                lookUpEditSymbol.DisplayMember = "DISPLAY"; // 将DISPLAY这一列将展示给用户

                // .ValueMember是表中真实存储的那一列的列名
                lookUpEditSymbol.ValueMember = "VAL";  // 通过VAL这一列与表中的数据进行匹配，当匹配到一行的VAL与表中的数据相等时，将该行的DISPLAY呈现出来
                lookUpEditSymbol.EditValueChanging += new ChangingEventHandler(this.lookUpEditSymbo_EditValueChanging); // 当该组件的数值发生变化时，调用 lookUpEditSymbo_EditValueChanged 方法（注意：lookUpEditSymbo_EditValueChanged 方法的参数为 object sender, ChangingEventArgs e）
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

// sender: 调用该方法的控件，e: 包含oldValue（调整前控件的数值）；newValue（调整后控件内新的数值）
private void lookUpEditSymbo_EditValueChanged(object sender, ChangingEventArgs e)
{
    var newVal = e.NewValue;
    return; // gridView中的下拉组件调用的方法
}

```

## GridView 对列进行排序
将表格的列，按照`A、B、C、D、E`排序显示
```cs
var colOrderList = "A;B;C;D;E".Split(';');
for (var i = 0; i < colOrderList.Length; i++)
{
    var colName = colOrderList[i];
    gridView.Columns[colName].VisibleIndex = i;  // 数字越小，越靠前
}
```

## GridView编辑数据时，仅授权编辑部分列
* 编辑数据时，仅授权编辑A、B两列数据
* 当设置了整个GridView`gridView.OptionsBehaviour.Editable = true`后， 再设置列的编辑权限`gridColumns.OptionsColumn.AllowEdit = false`时，该列仍不可编辑
```csharp
private void gridView_EditMode()
{
    var colsCannotEdit = "A;B".Split(';');
    foreach (GridColumn col in gridView.Columns)
    {
        col.OptionsColumn.AllowEdit = !colsCannotEdit.Contains(col.FieldName);
    }
}
```


## 拖拽DataRow时，鼠标悬浮的行高亮显示
遇见行拖拽的需求，通常会要求在拖拽发生时，高亮显示鼠标所到达的行，以表明该行会是鼠标释放后，被拖拽行所放置的位置
* 状态记录：鼠标在某一行悬浮时，有两种状态：鼠标按下和没有按下；仅需要拖拽（鼠标按下）时，进行高亮显示，所以需要一个全局变量对鼠标状态进行记录，鼠标按下时的状态记录为1 抬起时记录为0
* 高亮的配置代码：给`gridControl`添加Paint方法，并在需要`Paint`时调用`gridControl.Refresh()`；该事件在`gridControl`的拖拽事件（`dragOver`）中进行调用

```csharp
public class TestForm : BaseForm
{
    int mouseStatus = 0;  // 记录鼠标状态：0未按下 1按下

    public TestForm()
    {
        InitializeComponent();
        DrawRowLine(gcShow);    
    }
    private void gridControl_DragOver(object sender, DragEventArgs e)  // 重写gridControl的拖拽事件，当拖拽发生时，实时调用refresh方法，让gridControl可以及时刷新
    {
        gcShow.Refresh();
    }

    void DrawRowLine(DevExpress.XtraGrid.GridControl grid)
    {
        grid.Paint += (s, e) =>
        {
            var gridView = grid.FocusedView as GridView;
            GridViewInfo viewInfo = gridView.GetViewInfo() as GridViewInfo;
            GridViewRects gridViewRects = viewInfo.ViewRects;
            // 获取坐标
            Point gvPoint = gcRollPlan.PointToClient(Control.MousePosition);
            var idx = gridView.CalcHitInfo(gvPoint);
            if (idx == null || idx.RowHandle < 0)
            {
                return;
            }
            var focusedRowInfo = gridViewRects.ViewInfo.RowsInfo.GetInfoByHandle(idx.RowHandle);
            if (focusedRowInfo != null)
            {
                // 高亮行的绘制代码，基于GDI+进行绘制，这里的高亮时对鼠标悬浮行的底边进行黑色加粗
                var r = focusedRowInfo.DataBounds;
                Point p1 = new Point(r.X, r.Y + r.Height);
                Point p2 = new Point(r.X + r.Width, r.Y + r.Height);
                // 当mouseStatus == 1(即摁下时)，row的底边绘制一条粗的黑线
                var pen = mouseStatus == 0 ? new Pen(Color.Transparent) : new Pen(Color.Black);
                pen.Width = mouseStatus == 0 ? 0 : 4;
                e.Graphics.DrawLine(pen, p1, p2);
            };
        };

        (grid.FocusedView as GridView).MouseDown += (s, e) => // 鼠标按下时 记录状态
        {
            mouseStatus = 1;
        };
        
        (grid.FocusedView as GridView).MouseUp += (s, e) =>  // 鼠标抬起时 记录状态 并刷新一次gridControl
        {
            mouseStatus = 0;
            grid.Refresh();
        };
    }
}
```

---
# 参考
- [DevExpress控件之GridControl、GridView](https://blog.csdn.net/weixin_30602505/article/details/95029134)
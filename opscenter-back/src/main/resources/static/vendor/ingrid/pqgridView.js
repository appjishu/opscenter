var pqgridView = new Object();
//表格ID
pqgridView.target;
//表单ID
pqgridView.formTarget;
//标题ID
pqgridView.titleTarget;
//表格设置
pqgridView.gridSetting
//表单设置
pqgridView.manifest
//表单标题
pqgridView.title = [];
//操作链接
pqgridView.url = {};
//表单设置
pqgridView.manifest = {};
//当前记录
pqgridView.row = {};
//表格及表单
var $grid,$form;
//编辑状态
var editStatus = 0;
//弹窗
var dialog = window.top.dialog;

//消息提示
pqgridView.message = function(changes){
	var d ;
	var content ;
	if(changes.code == 200){
		content = "操作成功!"
	}else{
		content = "操作失败:"+changes.message;
	}
	var d = dialog({
		content: content
	});
	d.show();
	setTimeout(function () {
		d.close().remove();
	}, 2000);
}

//清除记录
pqgridView.clearRow = function(){
    if(pqgridView.row && typeof pqgridView.row==="object"){
        for(key in pqgridView.row){
        	pqgridView.row[key] = "";
        }
    }
}

//设置记录
pqgridView.setRow = function(obj){
    if(obj && typeof obj==="object"){
        for(key in obj){
        	pqgridView.row[key] = obj[key]
        }
    }
}

//更改标题
pqgridView.changeTitle = function(){
	$(pqgridView.titleTarget).html(pqgridView.title[editStatus]);
}

//提交记录
pqgridView.submitRow = function() {
	that = this;
	switch (editStatus) {
	case 0:
		$.ajax({
			dataType : "json",
			type : "POST",
			async : true,
			url : pqgridView.url.add,
			data : that.row,
			success : function(changes) {
				pqgridView.message(changes);
				pqgridView.searchChanges();
			}
		});
		break;
	case 1:
		$.ajax({
			dataType : "json",
			type : "POST",
			async : true,
			url : pqgridView.url.edit,
			data : that.row,
			success : function(changes) {
				pqgridView.message(changes);
				pqgridView.searchChanges();
			}
		});
		break;
	}
}



//新增
pqgridView.addChanges = function(){
	editStatus = 0;
	$(pqgridView.titleTarget).html(pqgridView.title[editStatus]);
	pqgridView.clearRow();
	$form.my("data",pqgridView.row);
}

//删除
pqgridView.deleteChanges = function(key){
    var selarray = $grid.pqGrid('selection', { type: 'row', method: 'getSelection' }),
	 ids = [];
    for (var i = 0, len = selarray.length; i < len; i++) {
        var rowData = selarray[i].rowData;
        ids.push(rowData[key]);
    }
  	 $.ajax({
       dataType: "json",
       type: "POST",
       async: true,
       url: pqgridView.url.del,
       data : {ids:ids.join(',')},
       success: function (changes) {
       	$grid.pqGrid("refreshDataAndView");
       }
   }); 
}

//刷新
pqgridView.searchChanges = function(){
	 $grid.pqGrid("refreshDataAndView");
}

//双击时间
pqgridView.showForm = function(ui){
	editStatus = 1
	pqgridView.changeTitle();
	pqgridView.setRow(ui.rowData);
	$form.my("data",pqgridView.row);
}
	 
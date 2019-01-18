var row = {};
/**操作页面标题*/
var title;
/**编辑状态*/
var editStatus = 0;
/**弹框*/
var dialog = window.top.dialog;
var $grid,$form;

function message(changes){
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
function clearRow(){
	that = this;
    if(that.row && typeof that.row==="object"){
        for(key in that.row){
        	that.row[key] = "";
        }
    }
}

function setRow(obj){
	that = this;
    if(obj && typeof obj==="object"){
        for(key in obj){
        	that.row[key] = obj[key]
        }
    }
}

function changeTitle(){
	$("#formTile").html(title[editStatus]);
}
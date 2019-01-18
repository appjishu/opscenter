var fileZtree = new Object();
fileZtree.target = "";
fileZtree.treeContent ;
fileZtree.setting ={};
fileZtree.currentParent = {};
fileZtree.url = {}

fileZtree.init = function(data){
	$.fn.zTree.init($("#"+fileZtree.target), fileZtree.setting, data);
};

fileZtree.load = function(){
	$.post(fileZtree.url.load,callback)
	function callback(data){
		fileZtree.init(data);
	}
};

fileZtree.add = function(json){
	$.post(fileZtree.url.save,json,callback)
	function callback(data){
		if(data.status){
			fileZtree.load();
		}
	}
};

fileZtree.select = function(tid){
	let treeObj = $.fn.zTree.getZTreeObj(fileZtree.target );
	let node = treeObj.getNodeByTId(tid);
	treeObj.selectNode(node);
	return node;
};
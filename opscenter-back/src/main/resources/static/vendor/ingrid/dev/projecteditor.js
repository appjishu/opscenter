$(function(){
	var dialog = window.top.dialog;
	fileZtree.treeContent = ".tree_content"
	fileEditor.editPanel = ".edit-panel"
	// 定义ztreeID
	fileZtree.target = "templateList";
	
	// 文件数操作路径
	fileZtree.url = {
		load : "/project/filetree",
		read : "/project/fileread",
		save : "/project/filesave",
		upload : "/project/fileupload",
		renname : "/project/filerename",
		copy : "/project/filecopy",
		move : "/project/filemove",
		paste : "/project/filepaste",
		create : "/project/filecreate"
	}
	
	// 文件树初始设置
	fileZtree.setting = {
		view:{
			showLine:false,
			selectedMulti:false
		},
		edit: {
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: true
        },
		callback:{
			onClick:clickItem,
			onExpand:expResize,
          	beforeRename:beforeRame,
          	onRename: renName
		}
	};
	
	// 选项卡及编辑器
	fileEditor.editorDom = ["#edit-content",".edit-panel"];
	
	// 文件编辑操作
	fileEditor.url = {
		read : "/project/fileread",
		save : "/project/filesave",
	}
	
	// 信息提醒
	function showMessage(changes){
		var d ;
		var content ;
    	if(changes.code == 200){
    		content = '<span style="color:green"><i class="icon icon-check" style="display:inline-block;margin-right:10px;"></i>'+changes.message+'</span>';
    	}else{
    		content = '<span style="color:red"><i class="icon icon-close" style="display:inline-block;margin-right:10px;"></i>'+changes.message+'</span>';
    	}
    	var d = dialog({
    		content: content
    	});
    	d.show();
    	setTimeout(function () {
    		d.close().remove();
    	}, 2000);
	}
	
	//刷新编辑器
	function refreshEditor(content){
		fileEditor.ceditor.setValue(content.trim());
	}
	
	//错误信息显示
	function showError(message){
		var data = {};
		data.code = "500";
		data.message = message;
		showMessage(data);
	}
	
	// 自动加载滚动条
	function expResize(){
		$(fileZtree.treeContent).getNiceScroll().resize();
	}
	
	// 加载文件内容
	function clickItem(event, treeId, treeNode){
		fileEditor.getEditor(fileEditor.url.read,treeNode)
	}
	
	
	
	// 重命名检查
	function beforeRame(treeId, treeNode, newName, isCancel){
		if(!newName){
			showError("文件名不能为空");
			isCancel = true
			return false
		}
		//获取路径
		var index = treeNode.id.lastIndexOf('\\')
		var path =treeNode.id.substring(0,index + 1)
		$.post(fileZtree.url.renname,{fileName:treeNode.id,fileNewName:newName},callback)
					function callback(data){
						showMessage(data);
					}
		+treeNode.name;

		console.info(newName)
	}
	
	//重命名
	function renName(event, treeId, treeNode, isCancel){
		var treeObj = $.fn.zTree.getZTreeObj(fileZtree.target);
		treeNode.name = treeNode.name.replace(/^\s+|\s+$/gm,'')
		var reg = /\./
		var regBlank = /\s+/
		var isParent = reg.test(treeNode.name)
		if(! treeNode.name){ 
			showError("请输入正确名称");
			isCancel = true
		}else{
			if(treeNode.isNewNode){
				treeNode.isNewNode = false
				var fileName = fileZtree.currentParent.id+"\\"+treeNode.name
				treeNode.id = fileName
				treeNode.isParent = !isParent
				$.post(fileZtree.url.create,{fileName:fileName},callback)
				function callback(data){
					showMessage(data);
				}
				if(isParent){
					clickItem(event, treeId, treeNode)
				}
				treeObj.refresh()
				}else{
					var index = treeNode.id.lastIndexOf('\\')
					var  newName =treeNode.id.substring(0,index + 1)+treeNode.name;
					$.post(fileZtree.url.renname,{fileName:treeNode.id,fileNewName:newName},callback)
					function callback(data){
						showMessage(data);
					}
				}
			}
		}
	
	//创建文件
	$('#add').on('click',function(){
		var treeObj = $.fn.zTree.getZTreeObj(fileZtree.target);
	    var nodes = treeObj.getSelectedNodes();
	    if(!nodes || nodes.length !== 1){
	      showError("请选择正确添加位置");
	      return
	    }else if(!nodes[0].isParent){
	      showError("请在文件夹下选择");
	      return 
	    }
	    var newNode =  [{name:'',isNewNode: true}]
	    newNode = treeObj.addNodes(nodes[0], newNode);
	    treeObj.editName(newNode[0]);
	    fileZtree.currentParent = nodes[0];
	});
	
	// 保存
	$('#save').on('click',function(){
		fileEditor.save(showMessage,refreshEditor);
	});
	
	// 拷贝文件
	$('#copy').click(function(){
	    var treeObj = $.fn.zTree.getZTreeObj(fileZtree.target);
	    var nodes = treeObj.getSelectedNodes();
	    var index = nodes[0].id.lastIndexOf('\\')
	    var filePath = nodes[0].id.substring(0,index);
	    var names = [nodes[0].name].toString();
	    $.post(fileZtree.url.copy,{filePath:filePath,names: names},callback);
	    function callback(data){
		    showMessage(data);
	    }
	});
	
	// 剪切文件
	$('#cut').click(function(){
		var treeObj = $.fn.zTree.getZTreeObj(fileZtree.target);
	    var nodes = treeObj.getSelectedNodes();
	    var index = nodes[0].id.lastIndexOf('\\')
	    var filePath = nodes[0].id.substring(0,index);
	    var names = [nodes[0].name].toString();
	    $.post(fileZtree.url.move,{filePath:filePath,names: names},callback);
	    function callback(data){
	    	showMessage(data);    
	    }
	});
	// 粘贴文件
	$('#paste').click(function(){
	    var treeObj = $.fn.zTree.getZTreeObj(fileZtree.target);
	    var nodes = treeObj.getSelectedNodes();
	    var isParentNode = nodes[0].isParent;
	    var insertNode = isParentNode? nodes[0] : nodes[0].getParentNode();
	    $.post(fileZtree.url.paste,{filePath:insertNode.id},callback);
	    function callback(data){
	    	showMessage(data);
	    }
	});
	
	// 刷新文件树
	$('#refresh').click(function(){
		fileZtree.load();
	});
	
	//上传文件
    var btnUpload = $('#upload');
    new AjaxUpload(btnUpload, {
        action: fileZtree.url.upload,               //上传地址
        name: 'file',                     	//文件域名字
        onSubmit: function (file, ext) {        //上传之前的操作
        	var treeObj = $.fn.zTree.getZTreeObj(fileZtree.target);
    	    var nodes = treeObj.getSelectedNodes();
    		if(!nodes || nodes.length !== 1 || !nodes[0].isParent){
    			showError("请选择上传位置");
    			return false;
    		}
    		var filePath = nodes[0].id;
    		this.setData({filePath:filePath});
        },
        onComplete: function (file, response) {  //上传完毕后的操作（response服务器返回的信息）  
           var reg = /<pre.+?>(.+)<\/pre>/g;  
           var result = response.match(reg);  
           var data = $.parseJSON(RegExp.$1);
        	showMessage(data);
        }
    });
	
    //切换当前文件节点
    function changeNode(tid){
    	let node = fileZtree.select(tid);
    	if(node) fileEditor.ceditor = fileEditor.edtor[node.id];
    }
    
	//切换选项卡
	$('.edit-panel').on('click','.panel-item',function(){
		let index = $(this).index();
		// 点击显示左边对应的文件
		let tid = $(this).data('tid')
		changeNode(tid);
		fileEditor.togClass('.edit-panel .panel-item','eq',index,'_select')
		fileEditor.togClass('#edit-content .edit-box','eq',index,'_select')
	})
	
	  //关闭选项卡
	  $('.edit-panel').on('click','.close',function(e){
		  e.stopPropagation();
	    let tid = $(this).parent().data('tid')
	    let treeObj = $.fn.zTree.getZTreeObj(tid.split('_')[0]);
	    let treeNode = treeObj.getNodeByTId(tid);
	    fileEditor.id[treeNode.id] = false;
	    let editBox = $('#edit-content .edit-box')
	    let panelItem = $('.edit-panel .panel-item:not(.hid)')
	    let hasSelect = $(this).parent().hasClass('_select')
	    let currentIndex = $(this).parent().index('.panel-item:not(.hid)')
	    let boxIndex = $(this).parent().index();
	    editBox.eq(boxIndex).remove()
	    $(this).parent().remove()
	    if(hasSelect){
	      if(currentIndex === panelItem.length-1){
	        currentIndex -= 1
	        boxIndex -= 1
	      }
	      let cid = $('.edit-panel .panel-item:not(.hid)').eq(currentIndex).data('tid')
	      let delectBoxIndex = $('.edit-panel .panel-item:not(.hid)').eq(currentIndex).index()
	      changeNode(cid);
	      fileEditor.togClass('.edit-panel .panel-item:not(.hid)','eq',currentIndex,'_select')
	      fileEditor.togClass('#edit-content .edit-box','eq',delectBoxIndex,'_select')
	    }
	    
	    let hasHid = $('.edit-panel .panel-item.hid')
	    if(!hasHid.length){
	      $('.hidden').hide();
	      return
	    }
	    let lastItem = hasHid.eq(hasHid.length-1)
	    let lastTid = lastItem.data('tid')
	    lastItem.removeClass('hid')
	    clearLi(lastTid)
	    let hiddenList = $('.hidden .hidden-list')
	    if(hiddenList.hasClass('show')){
	      hiddenList.removeClass('show')
	    }
	  })
	
   //初始化文件树
   fileZtree.init(map.projectedTree);
   
   //添加文件树滚动条
   $(fileZtree.treeContent).niceScroll({
	    touchbehavior:false,     //是否是触摸式滚动效果
	    cursorcolor:"#000",     //滚动条的颜色值
	    cursoropacitymax:0.2,   //滚动条的透明度值
	    cursorwidth:5,         //滚动条的宽度值
	    autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
	});
   
   //添加选项卡滚动条
   $(fileEditor.editPanel).niceScroll({
	    touchbehavior:false,     //是否是触摸式滚动效果
	    cursorcolor:"#000",     //滚动条的颜色值
	    cursoropacitymax:0.2,   //滚动条的透明度值
	    cursorwidth:5,         //滚动条的宽度值
	    autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
	});
   
})
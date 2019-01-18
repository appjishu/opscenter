var fileEditor = new Object();
fileEditor.editorDom = [];
fileEditor.editPanel ;
//编辑器内容读取和保存
fileEditor.url = {};
fileEditor.id = {};
//当前编辑器
fileEditor.edtor = {};
fileEditor.ceditor = new Object();


//创建编辑器
fileEditor.getEditor = function(url, treeNode){
	var treeId = treeNode.id;
	
	// 判断是否已点击
    if(fileEditor.id[treeId]){
    	fileEditor.getBackEditor(treeNode.tId);
        return 
    }
    fileEditor.id[treeId] = true;
    if(!treeNode.isParent ){
      let li = `<li class="panel-item _select" data-tid="${treeNode.tId}" >
    	  		<span class="cont">${treeNode.name}</span>
    	  		<i class="close">×</i></li>`;
      let codeId=`code_${treeNode.tId}`
      let box =`<div class="edit-box _select">
    	  			<textarea id="${codeId}" name="editor"></textarea>
    	  		</div>`;
      $(fileEditor.editorDom[1]).children().removeClass('_select')
      $(fileEditor.editorDom[1]).append(li)
      $(fileEditor.editorDom[0]).children().removeClass('_select')
      $(fileEditor.editorDom[0]).append(box)
      // 初始化codeMirror
      var filename = treeNode.name;
      var index = filename.lastIndexOf(".");
      var ext = filename.substr(index+1);
      var editor = null;
      editor = CodeMirror.fromTextArea(document.getElementById(codeId), {
			mode:fileEditor.getEditorType(ext),
			selectionPointer: true,
	        lineNumbers: true,
	        matchBrackets: true,
	        continueComments: "Enter",
	        extraKeys: {"Ctrl": "autocomplete"}
      });

      $.post(url,{"fileName":treeNode.id},callback_file)
      editor.fileName = treeNode.id;
      function callback_file(data){
    	  var content = data.content;
    	  editor.setValue(content.trim());
      }
    }
    fileEditor.edtor[treeNode.id] = editor;
	fileEditor.ceditor = fileEditor.edtor[treeNode.id];
	setTimeout("goend()", 1000 );
}

function goend() {
	$(fileEditor.editPanel).getNiceScroll(0).doScrollLeft($(fileEditor.editPanel).width());
}


fileEditor.getEditorType = function (ext){
	 var mode = "";
	 if(ext=="css"){
		 mode = "css";
     }else if(ext=="js"){
    	 mode = "javascript";
     }else{
    	 mode = {
				name: "htmlmixed",
				scriptTypes: [{
				    matches: /\/x-handlebars-template|\/x-mustache/i,
				    mode: null
				},
				{
				    matches: /(text|application)\/(x-)?vb(a|script)/i,
				    mode: "javascript"
				}]
			};
     }
	 return mode;
}

//获取已初始化编辑器
fileEditor.getBackEditor = function beenClick(tid){
	let cItem = $(fileEditor.editorDom[1]+" .panel-item");
	let item = cItem.filter((index,item) => {
		return $(item).data('tid') === tid
	});
	let index = item.index()
	fileEditor.togClass(cItem,'eq',index,'_select')
	fileEditor.togClass(fileEditor.editorDom[0]+" .edit-box",'eq',index,'_select')
	let getItem = cItem.eq(index)
	if(getItem.hasClass('hid')){
		getItem.removeClass('hid')
	}
}

fileEditor.togClass = function(id,kinds,index,className){
  if(kinds === 'eq'){
    $(id).eq(index).addClass(className).siblings().removeClass(className)
  }else if(kinds === 'data'){
    $(id).data(index).addClass(className).siblings().removeClass(className)
  }
}

//保存当前编辑器
fileEditor.save = function (showMessage,refreshEditor){
	if(fileEditor.ceditor === '')	return;
	var editValue = fileEditor.ceditor.getValue();
	editValue = editValue.substring(0,editValue.length);
	$.post(fileEditor.url.save,{"fileName":fileEditor.ceditor.fileName,"content":editValue},callback_edit)
	function callback_edit(data){
		showMessage(data);
		if(data.code == "200") refreshEditor(data.content);
	}
}
fileEditor.togClass = function(id,kinds,index,className){
  if(kinds === 'eq'){
    $(id).eq(index).addClass(className).siblings().removeClass(className)
  }else if(kinds === 'data'){
    $(id).data(index).addClass(className).siblings().removeClass(className)
  }
}

fileEditor.moreTab = function (){
	var tabsTotalWidth = 0
	var pItem = $('.edit-panel .panel-item:not(.hid)')
	if(pItem.length <2){return}
	var panelWidth = $('.edit-panel').outerWidth()
	for(var i= 0; i<pItem.length; i++){
		tabsTotalWidth += pItem.eq(i).outerWidth();
	}
    let itemWidth = 0
    if(tabsTotalWidth > panelWidth){
		for(let i = 0;i < pItem.length;i++){
			i = pItem.eq(i).hasClass('_select')?++i:i
			itemWidth = pItem.eq(i).outerWidth();
			pItem.eq(i).addClass('hid');
			tabsTotalWidth -= itemWidth;
			if((tabsTotalWidth+50) < panelWidth){
				pItem.eq(i).removeClass('hid');
				break;
			}
			addhid(pItem.eq(i))
			}
    }else if(tabsTotalWidth < panelWidth){
		let hideList = $('.hidden .hidden-list li')
		for(let i = 0;i < hideList.length;i++){
			let tid = hideList.eq(i).data('tid')
			let cItem = $('.edit-panel .panel-item')
			let item = cItem.filter((index,item) => {
				return $(item).data('tid') === tid
			});
			let index = item.index()
			cItem.eq(index).removeClass('hid')
			itemWidth = cItem.eq(index).outerWidth()
			tabsTotalWidth += itemWidth
			if(tabsTotalWidth > panelWidth){
				cItem.eq(index).addClass('hid');
				break;
			}
			clearLi(tid);
		}
	}
    $(".edit-panel").getNiceScroll().resize();
  }
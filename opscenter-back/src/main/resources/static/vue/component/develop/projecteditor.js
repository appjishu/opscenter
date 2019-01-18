var projecteditor = {
    template: `
        <div class="projecteditor row">
            <div class="projecteditor-filetree col-4">
                <div class="filetree">
                    <div class="filetree-title">
    					文件资源管理
                        <i v-on:click="optionChange(true);" class="fa fa-chevron-circle-right show-edit" aria-hidden="true"></i>
                    </div>
                    <div class="filetree-option">
                        <button type="button" v-on:click="add" class="btn filetree-btn" title="新建"><i class="fa fa-file-o" aria-hidden="true"></i>新建</button>
                        <button type="button" v-on:click="init" class="btn filetree-btn" title="刷新"><i class="fa fa-rotate-right" aria-hidden="true"></i>刷新</button>
                        <button type="button" id="upload" class="btn filetree-btn" title="上传"><i class="fa fa-cloud-upload" aria-hidden="true"></i>上传</button>
                        <button type="button" v-on:click="copy" class="btn filetree-btn" title="复制"><i class="fa fa-copy" aria-hidden="true"></i>复制</button>
                        <button type="button" v-on:click="move" class="btn filetree-btn" title="剪切"><i class="fa fa-cut" aria-hidden="true"></i>剪切</button>
                        <button type="button" v-on:click="paste" class="btn filetree-btn" title="粘贴"><i class="fa fa-paste" aria-hidden="true"></i>粘贴</button>
                    </div>
                    <div class="filetree-content" v-loading="loadfiletree">
                        <vue-scroll v-bind="{ops:ops}">
                            <ul id="filetree" class="ztree"></ul>
                        </vue-scroll>
                    </div>
                </div>
            </div>
            <div v-bind="{class: optionStatus ?'projecteditor-content col-8':'projecteditor-content col-8 hidden'}" >
                <div class="filetitle">
                    <i v-on:click="optionChange(false);" class="fa fa-chevron-circle-left hidden-option" aria-hidden="true"></i>
                    <span class="fileeditor">文件编辑工作区</span>
                    <i v-on:click="tabChange" class="fa fa-list tablist" aria-hidden="true"></i>
                </div>
                <div class="filecontent" v-loading="loadcodemirror">
                    <ul class="filetab" v-bind="{class: tabStatus ?'filetab':'filetab remove'}">
                        <vue-scroll v-bind="{ops:ops}">
                            <li v-for="fileItem in currentFileList" v-bind = "{class:fileItem.id==currentFile?'active':''}">
                                <span class="filespan" v-on:click="changeFile(fileItem.id)">{{fileItem.name}}</span>
                                <i v-on:click="close(fileItem.id)" class="fa fa-window-close tab-close" aria-hidden="true"></i>
                            </li>
                        </vue-scroll>
                    </ul>
                    <div class="codemirror-option">
                        <button type="button" v-on:click="save" v-bind="{class: changeStatus ? 'btn filetree-btn filechange' : 'btn filetree-btn'}" class="btn filetree-btn" title="保存"><i class="fa fa-floppy-o" aria-hidden="true"></i>保存</button>
                    </div>
                    <codemirror v-if="currentFile!=''" :value="currentCodemirrorList[currentFile].code" @change="change" :options="currentCodemirrorList[currentFile].options"></codemirror>
                </div>
            </div>
        </div>
    `,
    data:function(){
        return {
            visible: false ,
            //改变状态
            changeStatus:false,
            //操作状态
            optionStatus:false,
            //操作文件选项卡状态
            tabStatus:false,
            //对应功能连接
            href: "#/projecteditor",
            //当前操作文件
            currentFile:"",
            currentFileList:[],
            currentCodemirrorList:{},
            currentParent:"",
            //操作REST列表
            fileUrl: {
                load : "/project/filetree",
                read : "/project/fileread",
                save : "/project/filesave",
                upload : "/project/fileupload",
                renname : "/project/filerename",
                copy : "/project/filecopy",
                move : "/project/filemove",
                paste : "/project/filepaste",
                create : "/project/filecreate"
            },
            //文件树配置
            setting: {
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
                    onClick:this.clickItem,
                    beforeRename:this.beforeRame,
                }
            },
            //滚动条设置
            ops:{
                bar: {
                    background: "rgb(0,95,127)",
                    size: "5px"
                }
            },
            loadfiletree:false,
            loadcodemirror:false
        }
    },
    mounted:function(){
        var _this = this;
        //初始化文件列表及上传组件
        _this.init();
        var btnUpload = $('#upload');
        new AjaxUpload(btnUpload, {
            action: _this.fileUrl.upload,               //上传地址
            name: 'file',                     	//文件域名字
            onSubmit: function (file, ext) {        //上传之前的操作
                var fleTree = _this.getFileTree();
                var nodes = fleTree.getSelectedNodes();
                if(!nodes || nodes.length !== 1 || !nodes[0].isParent){
                    _this.message({code:500,message:"请选择上传位置 !"});
                    return false;
                }
                var filePath = nodes[0].id;
                this.setData({filePath:filePath});
            },
            onComplete: function (file, response) {  //上传完毕后的操作（response服务器返回的信息）  
                var reg = /<pre.+?>(.+)<\/pre>/g;  
                var result = response.match(reg);  
                var data = $.parseJSON(RegExp.$1);
                _this.message(data);
                _this.init();
            }
        });
    },
    methods:{
        //点击文件
        clickItem:function(event, treeId, treeNode){
            _this = this;
            _this.openNode(treeNode);
        },
        //更名前
        beforeRame:function(event,treeNode,newName){
            var _this = this;
            var  path = "";
            if(!newName){
                _this.message({code:500,message:"文件名不能为空 !"});
                isCancel = true
                return false
            }
            _this.close(treeNode.id);
            //根据条件进行创建或者更名
            if(treeNode.isNewNode){
                path = _this.currentParent + "\\";
                $.post(_this.fileUrl.create,{fileName:path + newName},callback)
            }else{
                var index = treeNode.id.lastIndexOf('\\')
                path =treeNode.id.substring(0,index + 1);
                $.post(_this.fileUrl.renname,{fileName:treeNode.id,fileNewName:path + newName},callback)
            }
            function callback(data){
                treeNode.id = path + newName;
                _this.openNode(treeNode);
                _this.init();
            }
        },
        //初始化文件树
        init:function(){
            var _this = this;
            _this.loadfiletree=true;
            $.post(_this.fileUrl.load,callback)
            function callback(data){
                $.fn.zTree.init($("#filetree"), _this.setting,data[0]);
                _this.getCurrentNode();
                _this.message({code:201,message:"文件列表加载成功 !"})
                _this.loadfiletree=false;
            }
        },
        //打开节点
        openNode:function(treeNode){
            var _this = this;
             //如果文件夹不操作
            if(treeNode.isParent) return;
            //查看是否已打开文件
            if(_this.getIndex(treeNode.id)!=-1) {
                _this.currentFile = treeNode.id;
            }else{
                _this.currentFileList.push(treeNode);
                _this.currentCodemirrorList[treeNode.id] = _this.createCodemirror(treeNode);
            }
            _this.changeStatus = _this.currentCodemirrorList[treeNode.id].changeStatus
            _this.optionChange(true);
        },
        //获取当前节点
        getCurrentNode:function(){
            var _this = this;
            if(_this.currentFile!=""){
                var fileTree = _this.getFileTree();
                var treeNode =  fileTree.getNodeByParam("id", _this.currentFile);
                fileTree.selectNode(treeNode,true);
                return treeNode;
            }
        },
        //切换操作区
        optionChange:function(optionStatus){
            this.optionStatus = optionStatus;
        },
        //切换当前文件选项卡
        tabChange: function(){
            this.tabStatus = !this.tabStatus;
        },
        //创建编辑器
        createCodemirror: function(treeNode){
            var _this = this;
            var index = treeNode.name.lastIndexOf(".");
            var ext = treeNode.name.substr(index + 1);
            var codeMirror = {};
            _this.loadcodemirror=true;
            codeMirror.id = treeNode.id;
            codeMirror.options =  {
                mode: _this.getMode(ext),
                selectionPointer: true,
                lineNumbers: true,
                matchBrackets: true,
                continueComments: "Enter",
                extraKeys: {"Ctrl": "autocomplete"}
            };
            $.post(_this.fileUrl.read,{"fileName":treeNode.id},callback_file)
            function callback_file(data){
                var content = data.content;
                codeMirror.code = content.trim();
                codeMirror.changeStatus = false;
                _this.currentFile = treeNode.id;
                _this.message({code:201,message:"文件编辑加载成功 !"});
                _this.loadcodemirror=false;
            }
            return codeMirror;
        },
        //获取编辑模式
        getMode: function(ext){
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
        },
        //关闭操作文件
        close:function(id){
            var _this = this;
            var index = _this.getIndex(id);
            if(index==-1) return;
            _this.currentFileList.splice(index,1);
            if(id==_this.currentFile){
                var len = _this.currentFileList.length;
                if(len>0) {
                    _this.currentFile = _this.currentFileList[len-1].id
                    _this.getCurrentNode();
                }else{
                    _this.currentFile = "";
                }
            }
        },
        //改变当前操作文件
        changeFile:function(id){
            var _this = this;
            _this.currentFile = id;
            _this.getCurrentNode();
        },
        //获取文件数
        getFileTree:function(){
            return $.fn.zTree.getZTreeObj("filetree");
        },
        //获取序号
        getIndex:function(id){
            if(id==undefined || id=="") return -1;
            return this.currentFileList.findIndex(function(value, index, arr) {
                if(value.id == id) return true;
            })
        },
        //文件编辑
        change: function(changeObj){
            var _this = this;
            var codeMirror = _this.currentCodemirrorList[_this.currentFile];
            codeMirror.changeStatus = true;
            _this.changeStatus = codeMirror.changeStatus;
            codeMirror.code = changeObj.trim();
        },
        //保存文件
        save: function(){
            var _this = this;
            if(_this.currentFile=="") return;
            var codeMirror = _this.currentCodemirrorList[_this.currentFile];
            $.post(_this.fileUrl.save,{"fileName":codeMirror.id,"content":codeMirror.code.trim()},callback_edit)
            function callback_edit(data){
                if(data.code == "200") {
                    codeMirror.code = data.content.trim();
                }
                _this.message(data);

            }
            codeMirror.changeStatus = false;
            _this.changeStatus = codeMirror.changeStatus;
        },
        //创建文件或文件夹
        add: function(){
            var _this = this;
            var fileTree = _this.getFileTree();
            var nodes = fileTree.getSelectedNodes();
            //判断是否选择文件夹
            if(!nodes || nodes.length !== 1){
                _this.message({code:500,message:"请选择正确添加位置 !"});
                return
            }else if(!nodes[0].isParent){
                _this.message({code:500,message:"请在文件夹下选择 !"});
                return 
            }
            var newNode =  [{name:'',isNewNode: true}]
            newNode = fileTree.addNodes(nodes[0], newNode);
            //进入编辑状态
            fileTree.editName(newNode[0]);
            //设置创建所在ID
            _this.currentParent = nodes[0].id;
        },
        //刷新
        refresh: function(){
            this.init();            
        },
        //复制
        copy: function(){
            var _this = this;
            var fileTree = _this.getFileTree();
            var nodes = fileTree.getSelectedNodes();
            var index = nodes[0].id.lastIndexOf('\\')
            var filePath = nodes[0].id.substring(0,index);
            var names = [nodes[0].name].toString();
            $.post(_this.fileUrl.copy,{filePath:filePath,names: names},callback);
            function callback(data){
                _this.message(data);
            }
        },
        //剪切
        move: function(){
            var _this = this;
            var fileTree = _this.getFileTree();
            var nodes = fileTree.getSelectedNodes();
            var index = nodes[0].id.lastIndexOf('\\')
            var filePath = nodes[0].id.substring(0,index);
            var names = [nodes[0].name].toString();
            $.post(_this.fileUrl.move,{filePath:filePath,names: names},callback);
            function callback(data){
                _this.message(data);   
            }
        },
        //粘贴
        paste: function(){
            var _this = this;
            var fileTree = _this.getFileTree();
            var nodes = fileTree.getSelectedNodes();
            var isParentNode = nodes[0].isParent;
            var insertNode = isParentNode? nodes[0] : nodes[0].getParentNode();
            $.post(_this.fileUrl.paste,{filePath:insertNode.id},callback);
            function callback(data){
                _this.message(data);
            }
            this.init();
        },
        //操作信息提醒
        message:function(data) {
            var type = "error";
            if(data.code==200){
                type = "success";
            }
            if(data.code==201){
                type = "info";
            }
            this.$notify({
              message: data.message,
              type: type,
              position: 'bottom-right'
            });
        }
    }
}

Vue.component('projecteditor', projecteditor);
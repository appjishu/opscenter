var ureport = {
    template: `
        <div class="iframeeditor">
	        <el-row  type="flex">
		        <el-button v-on:click="showMenu" type="success" icon="fa fa-th" circle v-bind="{class:menuStatus ? '' :'goleft'}"></el-button>
				<div v-bind="{class:menuStatus ? 'menu' :'menu hidden'}">
					<div class="edit">
						<el-switch
							  v-model="editStatus"
							  active-color="rgb(0,49,80)"
							  inactive-color="rgb(220,220,220)">
							</el-switch>
						</div>
					<div class="option">
						<button type="button" v-on:click="add" class="btn option-btn" title="新建"><i class="fa fa-file-o" aria-hidden="true"></i>新建</button>
                        <button type="button" v-on:click="loadUreportList" class="btn option-btn" title="刷新"><i class="fa fa-rotate-right" aria-hidden="true"></i>刷新</button>
					</div>
					<div class="search">
						<el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                            <el-button v-on:click="search" class="btn" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
					</div>
					<div v-loading="loadreport" class="list">
	                    <vue-scroll v-bind="{ops:ops}">
	                        <el-card v-bind="{class:reportItem.name==currentReport?'box-card background-l3':'box-card background-l2'}" v-for = "(reportItem,index) in reportList" :key="index" >
	                            <div v-on:click="showReport(reportItem.name)">
	                                <span >{{reportItem.name}}</span>
	                            </div>
	                        </el-card>
	                    </vue-scroll>
	                </div>
	    		</div>
	    		<el-col :span="24">
	    			<div v-bind="{class:menuStatus ? 'grid-content pd' :'grid-content'}">
	    				<iframe v-if="editStatus&&currentReport!=''" :src='"/ureport/designer?_u=ingrid-"+currentReport' class="iframe"></iframe>
	    				<iframe v-if="!editStatus&&currentReport!=''" :src='"/ureport/preview?_u=ingrid-"+currentReport' class="iframe"></iframe>
	    			</div>
	    		</el-col>
			    </el-row>
		</div>
    `,
    data:function(){
        return {
        menuStatus:true,
        editStatus:false,
    	   methodUrl:{
        	   execMethod:"/method/execMethod"
           },
    	   loadreport:false,
    	   currentReport:"",
    	   reportList:[],
    	   reportListAll:[],
    	   ops:{
               bar: {
                   background: "rgb(0,95,127)",
                   size: "5px"
               }
           },
           searchContent:""
        }
    },
    mounted:function(){
    	var _this = this;
    	_this.loadUreportList();
    },
    methods:{
    	add:function(){
    		
    	},
    	search:function(){
    		var _this = this;
    		var result = [];
    		_this.reportListAll.forEach(function (item, index) {
                if (item.name.includes(_this.searchContent)) {
                    result.push(item);
                }
            })
            _this.reportList = result
    	},
    	loadUreportList:function(){
    		var _this = this;
        	var json =  {};
        	_this.loadreport =true;
        	json.poolName = "normal";
        	json.methodName = "reportQuery"; 	
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.reportList = data.list;
                	_this.reportListAll = data.list;
                	console.info(_this.reportList)
                	_this.loadreport =false;
                },
                error: function (message) {
                	_this.loadreport =false
                }
            });
    	},
    	showReport(name){
    		var _this = this;
    		_this.currentReport = name;
    		
    	},
    	showMenu(){
    		var _this = this;
    		_this.menuStatus = !_this.menuStatus;
    	}
    }
}

Vue.component('ureport', ureport);
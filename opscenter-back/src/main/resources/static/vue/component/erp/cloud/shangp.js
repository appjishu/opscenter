var shangp = {
	props: ['row'],
    template: `
    	<el-row>
		  <el-col :span="24" class="order-list-parent">
		  	<div class="grid-content bg-purple order-list">
		  		<div v-bind="{class:searchStatus?'filter':''}">
	    			<div class="order-list-title">
				    	选择商品
			  			<el-button icon="fa fa-filter" class="normal" v-on:click = "searchSwitch" size="small">筛选</el-button>
			  		</div>
			  		<div class="order-list-content sub" v-loading="loading">
			  			<vue-scroll v-bind="{ops:ops}">
	                            <el-card  v-for = "(cloudItem,index) in cloudlist" :key="index" >
	                                <div v-on:click='setCloud(cloudItem)'>
	                                	<span >
		                                    <p>{{cloudItem.pinpName}} {{cloudItem.shangpCode}} {{cloudItem.changjCode}} {{cloudItem.pic}}</p>
		                                </span>
	                                </div>
	                            </el-card>
	                        </vue-scroll>
			  		</div>
			  		<div class="order-form-btn">
						<el-button v-on:click="clearCloud" size="small">清除</el-button>
					    <el-button type="primary" v-on:click="closeCloud"  size="small">关闭</el-button>
					</div>
			  		
		  		</div>
		  		<div v-if="searchStatus" class="search-form">
		  			<div class="search-form-title"><span>筛选</span></div>
		  			<el-form  class="search-form-content" label-width="80px" size="small">
					  <vue-scroll v-bind="{ops:ops}">
					  <el-form-item label="供应商编码">
					    <el-input v-model="cloudfilter.gongysCode"></el-input>
					  </el-form-item>
					  <el-form-item label="供应商名称">
					    <el-input v-model="cloudfilter.gongysName"></el-input>
					  </el-form-item>
					  </vue-scroll>
					</el-form>
					<div class="search-form-btn">
					    <el-button type="primary" v-on:click="loadCloud"  size="small">确定</el-button>
					</div>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
    `,
    data:function(){
        return {
        	cloudfilter:{
        		yonghID: 1,
        		pinpName:"", 
        		shangpCode:"",
        		leibName:"", 
        		changjCode:"",
        		gongysID:0
        	},
        	loading: false,
        	//加载表单动画
        	searchStatus:false,
        	//滚动条样式
			ops:{
				bar: {
					background: "rgba(0,95,127,0.1)",
					size: "5px",
					keepShow: true
				}
			},
        	//数据列表
        	cloudlist:[],
        	//后台执行方法
        	methodUrl:{
        		 execMethod:"/method/execMethod"
        	},
        }
    },
    mounted:function(){
       var _this = this;
       _this.loadCloud();
    },
    methods:{
    	onSubmit() {
	        console.log('submit!');
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
        },
        //日期格式转换
        formatDate(time) {
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        
        //单搜索框搜索
        loadCloud:function(){
        	var _this = this;
        	_this.loading = true;
        	var json =  {};
        	_this.cloudfilter.gongysID = _this.row.gongysID;
        	json = _this.copyParam();
        	json.poolName = "erp";
        	json.methodName = "PROC_SYS_RECORD_SHANGPTOCAIG_LOAD";
        	console.info(json)
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.loading = false;
                	console.info(data)
                	//_this.currentTest.response = JSON.stringify(data);
                	_this.cloudlist = data.rows[0];
                	_this.searchStatus = false;
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        
        setCloud: function(cloudItem){
        	var _this = this;
        	_this.$emit("setCloud",{opt:"add",type:"shangp",row:cloudItem})
        },
        clearCloud: function(cloudItem){
        	var _this = this;
        	_this.$emit("setCloud",{opt:"clear",type:"shangp"})
        },
    	closeCloud: function(cloudItem){
        	var _this = this;
        	_this.$emit("setCloud",{opt:"close",type:"shangp"})
        },
        //筛选框切换
    	searchSwitch:function(){
    		var _this = this;
    		_this.searchStatus = !_this.searchStatus;
    	},
    	copyParam:function(){
    		var _this = this;
    		var cloudfilter = {};
    		var obj = _this.cloudfilter;
    		for (var item in obj){
    		    cloudfilter["in_"+item] = obj[item]
    		}
    		return cloudfilter;
    	}
    }
}

Vue.component('shangp', shangp);
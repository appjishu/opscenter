var caigOrg = {
    template: `
    	<el-row>
		  <el-col :span="24" class="order-list-parent">
		  	<div class="grid-content bg-purple order-list">
		  		<div v-bind="{class:searchStatus?'filter':''}">
	    			<div class="order-list-title">
				    	选择采购部门
			  		</div>
			  		<div class="order-list-content sub" v-loading="loading">
			  			<vue-scroll v-bind="{ops:ops}">
	                            <el-card v-bind="{class:cloudItem.caigNo==currentCaigdd.caigNo?'box-card background-l3':'box-card background-l2'}" v-for = "(cloudItem,index) in cloudlist" :key="index" >
	                                <div v-on:click='setCloud(cloudItem)'>
	                                	<span v-if="cardType==0">
		                                    <p>{{cloudItem.orgCode}} {{cloudItem.orgName}}</p>
		                                </span>
	                                    <span v-if="cardType==1">
	                                    	<p>{{cloudItem.orgCode}} {{cloudItem.orgName}}</p>
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
		  	</div>
		  </el-col>
		</el-row>
    `,
    data:function(){
        return {
        	//卡片显示模式
        	cardType: 0,
        	//表格显示模式
        	tableType: 0,
        	//加载列表动画
        	loading: false,
        	//加载表单动画
        	loadingForm: false,
        	//表单类型(指不同的操作类型可能表单有微小区别)
        	formType: 0,//0-查看 1-开单 2-编辑 3-单号维护 4-发货
        	//搜索文本(统一搜索入口)
        	searchContent:"",
        	//表单状态(当前是否显示表单)
        	formStatus:"列表",
        	//筛选框状态
        	searchStatus:false,
        	//滚动条样式
			ops:{
				bar: {
					background: "rgba(0,95,127,0.1)",
					size: "5px",
					keepShow: true
				}
			},
			
        	//采购订单列表
        	cloudlist:[],
        	//新采购订单
        	newCaigdd:{
        	},
        	//当前采购订单
        	currentCaigdd:{
        	},
        	//当前所有采购单
        	currentcloudlist:[],
        	//后台执行方法
        	methodUrl:{
        		 execMethod:"/method/execMethod"
        	},
        	//时区时间
        	pickerOptions2:{
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
					  const end = new Date();
					  const start = new Date();
					  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					  picker.$emit('pick', [start, end]);
				    }
				  }, {
				    text: '最近一个月',
				    onClick(picker) {
				    	const end = new Date();
				    	const start = new Date();
				    	start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				    	picker.$emit('pick', [start, end]);
				    }
				  }, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				  }]
				},
        }
    },
    mounted:function(){
       var _this = this;
       _this.loadCaigddSimple();
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
        //设置当前流程
        setStep: function(cloudItem){
        	console.info(cloudItem);
        	var _this = this;
        	if(cloudItem.caigStatus==1) _this.currentCaigdd.step = 1;
        	if(cloudItem.caigStatus==3) _this.currentCaigdd.step = 2;
        	if(cloudItem.caigStatus==3&&cloudItem.rukStatus==1) _this.currentCaigdd.step = 3;
        	if(cloudItem.caigStatus==3&&cloudItem.rukStatus==2) _this.currentCaigdd.step = 4;
        	if(cloudItem.caigStatus==3&&cloudItem.rukStatus==3) _this.currentCaigdd.step = 5;
        },
        //单搜索框搜索
        loadCaigddSimple:function(){
        	var _this = this;
        	_this.loading = true;
        	var json =  {};
        	json.poolName = "erp";
        	json.methodName = "PROC_SYS_RECORD_ORGTOCAIGMINI_LOAD";
        	json.in_yonghID = 1;
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.loading = false;
                	//_this.currentTest.response = JSON.stringify(data);
                	_this.cloudlist = data.rows[0];
                	console.info(_this.cloudlist);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        //复制开单
        copyCaigdd: function(){
        	
        },
        setCloud: function(cloudItem){
        	var _this = this;
        	_this.$emit("setCloud",{opt:"add",type:"caigOrg",row:cloudItem})
        },
        clearCloud: function(cloudItem){
        	var _this = this;
        	_this.$emit("setCloud",{opt:"clear",type:"caigOrg"})
        },
    	closeCloud: function(cloudItem){
        	var _this = this;
        	_this.$emit("setCloud",{opt:"close",type:"caigOrg"})
        }
    }
}

Vue.component('caigOrg', caigOrg);
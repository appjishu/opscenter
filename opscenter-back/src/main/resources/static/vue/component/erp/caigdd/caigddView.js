var caigddView = {
	props: ['data'],
    template: `
    	<div class="caigddView">
    	<div class="grid-content bg-purple">
	  	<div v-if="cloudStatus&&cloudType=='caigOrg'" class="cloud-form">
	  		<caigOrg @setCloud="setCloud"></caigOrg>
	  	</div>
	  	<div v-if="cloudStatus&&cloudType=='gongys'" class="cloud-form">
	  		<gongys @setCloud="setCloud" v-bind="{row:org}"></gongys>
	  	</div>
	  	<div v-if="cloudStatus&&cloudType=='shangp'" class="cloud-form">
	  		<shangp @setCloud="setCloud" v-bind="{row:gongys}"></shangp>
	  	</div>
	  	<div class="order-form-title">
			<el-radio-group v-model="formStatus" class="form-status"  size="small">
		     	<el-radio-button label="列表"><i class="fa fa-list" aria-hidden="true"></i></el-radio-button>
			    <el-radio-button label="单据"><i class="fa fa-file" aria-hidden="true"></i></el-radio-button>
		    </el-radio-group>
		  	<span class="order-form-title-content">采购订单{{currentCaigdd.caigNo}}</span>
		  	</span>
	  	</div >
	  	<div class="form-option">
		  	<el-button-group>
			</el-button-group>
	  	</div>
    	<div class="order-form-content-parent">
	  	 	<vue-scroll v-bind="{ops:ops}">
			<el-form  v-if="currentCaigdd!=undefined" class="order-form-content"  label-width="80px" size="small">
			  <el-form-item label="采购进度" class="order-form-step">
			    <el-steps :active="currentCaigdd.step" size="small">
				  <el-step title="未发货" icon="fa fa-circle"></el-step>
				  <el-step title="已发货" icon="fa fa-circle"></el-step>
				  <el-step title="未入库" icon="fa fa-circle"></el-step>
				  <el-step title="部分入库" icon="fa fa-circle"></el-step>
				  <el-step title="已入库" icon="fa fa-circle"></el-step>
				</el-steps>
			  </el-form-item>
			  <el-form-item label="采购单号">
			    <span>{{currentCaigdd.caigNo}}</span>
			  </el-form-item>
			  <el-form-item label="订单时间">
			  	<span>{{Calc.formatDate(currentCaigdd.dinghDate)}}</span>
			  </el-form-item>
			  <el-form-item label="订单备注">
			  	<span>{{currentCaigdd.dingdRemark}}</span>
			  </el-form-item>
			  <el-form-item label="采购部门">
			  	<span>{{currentCaigdd.caigOrgName}}</span>
			  </el-form-item>
			  <el-form-item label="供应商">
			  	<span>{{currentCaigdd.gongysName}}</span>
			  </el-form-item>
			  <el-form-item label="厂家单号">
			  	<span>{{currentCaigdd.changjNo}}</span>
			  </el-form-item>
		   		
			   <el-form-item label="菜鸟单号">
			    <span>{{currentCaigdd.caigDefine1}}</span>
			  </el-form-item>
			  <el-form-item label="运单方式">
			    <span>{{currentCaigdd.caigDefine2}}</span>
			  </el-form-item>
			  <el-form-item label="采购项目">
			    <span>{{currentCaigdd.caigDefine3}}</span>
			  </el-form-item>
			  <el-form-item label="承运物流">
			    <span>{{currentCaigdd.caigDefine4}}</span>
			  </el-form-item>
			  <el-form-item label="发货地点">
			    <span>{{currentCaigdd.caigDefine5}}</span>
			  </el-form-item>
			  <el-card  class="shangp" v-for = "(caigddItem,index) in currentCaigddList" :key="index" >
	                <div >
	                	<span v-if="cardType==0">
	                        <p>{{caigddItem.pinpName}} {{caigddItem.leibName}}</p>
			    			<p><b>{{caigddItem.changjCode}}</b> {{caigddItem.shangpDefine3}}</p>
			    			<p>￥{{Calc.toMoney(caigddItem.biaoPrice)}}</p>
					     	<p >{{caigddItem.pic}} {{caigddItem.guig}}</p>			                    </span>
	                </div>
	            </el-card>
			  <el-card class="money" >
	                <div >
	                	￥{{Calc.toMoney(currentCaigdd.shangpSum)}} ￥{{Calc.toMoney(currentCaigdd.shangphsSum)}} {{currentCaigdd.caigZL}} {{currentCaigdd.zhongls}}
	                </div>
	            </el-card>
			</el-form>
			</vue-scroll>
			</div>
			
			<div  class="order-form-btn">
				<el-button type="primary" v-on:click="copyCaigdd"  size="small">复制开单</el-button>
			</div>
		</div>
		</div>
    `,
    data:function(){
        return {
        	//公共功能
        	Calc:window.Calc,
        	//搜索状态
        	searchStatus:false,
        	//列表表单切换
        	formStatus:"列表",
        	//搜索内容
        	searchContent:"",
        	currentCaigdd:"",
        	//列表样式
        	cardType:0,
        	tableType:0,
        	cloudStatus:"",
        	currentCaigddList:[],
        	//滚动条样式
        	ops:{
				bar: {
					background: "rgba(0,95,127,0.1)",
					size: "5px",
					keepShow: true
				}
			},
			//加载动画
			loading:false,
			//后台执行方法
	    	methodUrl:{
	    		 execMethod:"/method/execMethod"
	    	},
	    	//采购订单列表
	    	caigddlist: [],
	    	caigddfilter:{
	    		yonghID:"1",
        		cangkID:"0",
        		gongysID:"0",
        		pinpName:"",
        		shangpCode:"",
        		caigOrgName:"",
        		changjNo:"",
        		chuangjrName:"",
        		changjCode:"",
        		dinghDateStart:"2019-01-08 00:00",
        		dinghDateEnd:"2019-01-09 23:59",
        		caigNo:"",
        		caigStatus:"255",
        		xiaoyStatus:"0",
        		rukStatus:"1",
        		Flag:"0",
        		caigCancelFlag:"255"
	    	}
        }
    },
    mounted:function(){
    },
    watch:{
    	formStatus:{
    		handler:function(val,oldval){
    			this.opt("formSwitch");
	        },
	        deep:true//对象内部的属性监听，也叫深度监听
    	}
    },
    methods:{
    	loadCaigddSimple: function(){
    		var _this = this;
        	_this.loading = true;
        	_this.searchSwitch(false);
        	var json =  _this.copyParam(_this.caigddfilter);
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_LOAD_ONE"; 	
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.loading = false;
                	//_this.currentTest.response = JSON.stringify(data);
//                	_this.caigddlist = currentCaigdds[0];
                	console.info(data);
                	if(data.message!=undefined){
                		_this.erpMessage(data.message);
                	}
                	_this.caigddlist = currentCaigdds[0];
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
    	},
    	//查看采购订单
        loadCaigddOne:function(caigddItem){
        	var _this = this;
        	_this.loadingForm = true;
        	_this.formType = 0;
        	_this.currentCaigdd = caigddItem;
        	_this.setStep(_this.currentCaigdd);
        	var json =  {};
        	json.in_yonghID = 1;
        	json.in_caigTitleID = caigddItem.caigTitleID;
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_LIST_LOAD_ONE"; 	
        	console.info(json)
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.loadingForm = false;
                	//_this.currentTest.response = JSON.stringify(data);
                	//_this.caigddlist = data.rows[0];
                	_this.currentCaigddList = data.rows[0];
                	_this.countShangp();
                	_this.formStatus = "单据";
                },
                error: function (message) {
                	_this.loadingForm = false;
                }
            });
        },
        //统计采购商品
        countShangp: function(){
        	_this = this;
        	_this.currentCaigdd.zhongls = 0;
        	_this.currentCaigdd.tijs = 0;
        	_this.currentCaigdd.caigZL = 0;
        	_this.currentCaigddList.forEach(getSum);
        	var fixed = 0;
        	function getSum (item, index, array){
        		var zhongl = Calc.Mul(item.zhongl,item.caigNum);
        		var tij = Calc.Mul(item.tij,item.caigNum);
        		if(item.danwxsNum>fixed) fixed = item.danwxsNum;
        		_this.currentCaigdd.zhongls = Calc.Add(_this.currentCaigdd.zhongls,zhongl);
        		_this.currentCaigdd.tijs = Calc.Add(_this.currentCaigdd.tijs,tij);
        		_this.currentCaigdd.caigZL = Calc.Add(_this.currentCaigdd.caigZL,item.caigNum);
            }
        	_this.currentCaigdd.zhongls = Calc.toNum(_this.currentCaigdd.zhongls);
        	_this.currentCaigdd.tijs = Calc.toNum(_this.currentCaigdd.tijs);
        	_this.currentCaigdd.caigZL = Calc.toNum(_this.currentCaigdd.caigZL,fixed);
        },
	  	//筛选框切换
		searchSwitch:function(val){
			var _this = this;
			_this.searchStatus = val;
		},
		//加载采购订单
		copyCaigdd:function(){
			
		},
		erpMessage: function(message){
	   		 var type = "error";
	   		 if(message.sqlExecuteStatus!=undefined&&message.sqlExecuteStatus){
	   			message.out_Flag = 0;
	   			message.out_nszRtn = "数据加载成功 !";
	   		 }
	         if(message.out_Flag==0){
	             type = "success";
	         }
	         this.$notify({
	           message: message.out_nszRtn,
	           type: type,
	           position: 'bottom-right',
	           offset: 65
	         });
		},
		copyParam:function(json){
    		var _this = this;
    		var newJson = {};
    		for (var item in json){
    			newJson["in_"+item] = json[item]
    		}
    		return newJson;
    	},
    	//设置当前流程
        setStep: function(caigddItem){
        	console.info(caigddItem);
        	var _this = this;
        	if(caigddItem.caigStatus==1) _this.currentCaigdd.step = 1;
        	if(caigddItem.caigStatus==3) _this.currentCaigdd.step = 2;
        	if(caigddItem.caigStatus==3&&caigddItem.rukStatus==1) _this.currentCaigdd.step = 3;
        	if(caigddItem.caigStatus==3&&caigddItem.rukStatus==2) _this.currentCaigdd.step = 4;
        	if(caigddItem.caigStatus==3&&caigddItem.rukStatus==3) _this.currentCaigdd.step = 5;
        },
    	opt: function(type,cloudItem){
        	var _this = this;
        	if(type=="formSwitch"){
        		cloudItem = {};
        		cloudItem.formStatus = _this.formStatus;
        	}
        	if(cloudItem!=undefined){
        		_this.$emit("opt",{opt:type,type:"caigddTitle",row:cloudItem})
        	}else{
        		_this.$emit("opt",{opt:type,type:"caigddTitle"})
        	}
        },
        parentHandleclick:function(data){
        	console.info(data);
        	var _this = this;
        	if(data.opt!=undefined&&data.opt=="formSwitch"){
        		_this.formStatus = data.data.formStatus;
        	}
        	if(data.opt!=undefined&&data.opt=="setRow"){
        		_this.currentCaigdd = data.data;
        		_this.setStep(_this.currentCaigdd);
        		_this.loadCaigddOne(_this.currentCaigdd);
        	}
        }
	}
}

Vue.component('caigddView', caigddView);
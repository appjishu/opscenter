var caigddTitle = {
	props: ['data'],
    template: `
    	<div class="caigddTitle">
	    	<div v-bind="{class:searchStatus?'filter':''}">
				<div class="order-list-title">
			    	<el-radio-group v-model="formStatus" class="form-status"  size="small">
				      <el-radio-button label="列表"><i class="fa fa-list" aria-hidden="true"></i></el-radio-button>
				      <el-radio-button label="单据"><i class="fa fa-file" aria-hidden="true"></i></el-radio-button>
				    </el-radio-group>
					<el-input v-model="searchContent" size="small" placeholder="请输入内容"></el-input>
					<el-button v-on:click="loadCaigddSimple" size="small">搜索</el-button>
					<el-button class="toolsbtn" v-on:click="cardTypeSwitch(0)" v-if="cardType==1"><i class="fa fa-minus-square-o"></i></el-button>
					<el-button class="toolsbtn" v-on:click="cardTypeSwitch(1)" v-if="cardType==0"><i class="fa fa-plus-square-o"></i></el-button>
					<el-button icon="fa fa-filter" class="normal" v-on:click = "searchSwitch(true)" size="small">筛选</el-button>
				</div>
				<div class="order-list-content" v-loading="loading">
					<vue-scroll v-bind="{ops:ops}">
			            <el-card v-on:click.native='opt("getRow",caigddItem)' v-bind="{class:caigddItem.caigNo==currentCaigdd.caigNo?'box-card background-l3':'box-card background-l2'}" v-for = "(caigddItem,index) in caigddlist" :key="index" >
			                <div >
			                	<span v-if="cardType==0">
			                        <p><b>单号:</b> {{caigddItem.caigNo}}  {{caigddItem.gongysName}} ({{caigddItem.changjNo}}) <span class="mini-date">{{Calc.formatDate(caigddItem.dinghDate)}}</span></p>
			                        <p><b>备注:</b> {{caigddItem.dingdRemark}}</p>
			                        <p><b>状态:</b> {{caigddItem.shangpSum}} {{caigddItem.caigslRate}} {{caigddItem.shangphSum}} {{caigddItem.caigShenpStatusName}} {{caigddItem.caigStatusName}} {{caigddItem.rukStatusName}}</p>
			                    </span>
			                    <span v-if="cardType==1">
			                        <p><b>单号:</b> {{caigddItem.caigNo}} ({{caigddItem.changjNo}}) <span class="mini-date">{{Calc.formatDate(caigddItem.dinghDate)}}</span></p>
			                        <p><b>备注:</b> {{caigddItem.dingdRemark}}</p>
			                        <p><b>状态:</b> {{caigddItem.caigShenpStatusName}} {{caigddItem.caigStatusName}} {{caigddItem.rukStatusName}}</p>
			                        <p><b>供应商:</b> {{caigddItem.gongysName}} </p>
			                        <p><b>总金额:</b> {{caigddItem.shangpSum}} {{caigddItem.caigslRate}} {{caigddItem.shangphSum}} </p>
			                        <p><b>创建:</b> {{caigddItem.caigDefine4}} {{caigddItem.caigDefine5}} {{caigddItem.chuangjrName}} {{caigddItem.chuangjOrgName}} <span class="mini-date">{{Calc.formatDate(caigddItem.chuangjTime)}}</span></p>
			                        <p><b>审批:</b> {{caigddItem.caigShenprName}} {{caigddItem.caigShenpOrgName}} {{caigddItem.caigShenpRemark}} <span class="mini-date">{{Calc.formatDate(caigddItem.caigShenpTime)}}</span></p>
			                        <p><b>取消:</b> {{caigddItem.caigCancelFlag}} {{caigddItem.caigCancelName}} <span class="mini-date">{{Calc.formatDate(caigddItem.caigCancelTime)}}</span></p>
			                    </span>
			                </div>
			            </el-card>
			        </vue-scroll>
				</div>
			</div>
			<!--总单搜索-->
			<div v-if="searchStatus" class="search-form">
				<div class="search-form-title"><span>筛选</span></div>
				<el-form  class="search-form-content" label-width="80px" size="small">
				  <vue-scroll v-bind="{ops:ops}">
				  <el-form-item label="采购单号">
				    <el-input v-model="caigddfilter.caigNo"></el-input>
				  </el-form-item>
				  <el-form-item label="供应商">
				    <el-input v-model="caigddfilter.gongysName"></el-input>
				  </el-form-item>
				  <el-form-item label="厂家单号">
				    <el-input v-model="caigddfilter.changjCode"></el-input>
				  </el-form-item>
				  <el-form-item label="订单日期">
					    <el-date-picker
					      class="erpdate"
					      v-model="caigddfilter.dinghDateStart"
					      type="datetime"
					      placeholder="开始时间"
					      default-time="12:00:00">
					    </el-date-picker>
				  </el-form-item>
				  <el-form-item label="">
					    <el-date-picker
					      class="erpdate"
					      v-model="caigddfilter.dinghDateEnd"
					      type="datetime"
					      placeholder="结束时间"
					      default-time="12:00:00">
					    </el-date-picker>
				  </el-form-item>
				  <el-form-item label="采购状态">
				    <el-radio v-model="caigddfilter.caigStatus" label="255" border>全部</el-radio>
				    <el-radio v-model="caigddfilter.caigStatus" label="1" border>未发货</el-radio>
				    <el-radio v-model="caigddfilter.caigStatus" label="3" border>已发货</el-radio>
				  </el-form-item>
				  <el-form-item label="入库状态">
				    <el-radio v-model="caigddfilter.rukStatus" label="255" border>全部</el-radio>
				    <el-radio v-model="caigddfilter.rukStatus" label="1" border>未入库</el-radio>
				    <el-radio v-model="caigddfilter.rukStatus" label="2" border>部分入库</el-radio>
				    <el-radio v-model="caigddfilter.rukStatus" label="3" border>已入库</el-radio>
				  </el-form-item>
				  <el-form-item label="关闭状态">
					    <el-radio v-model="caigddfilter.caigCancelFlag" label="255" border>全部</el-radio>
					    <el-radio v-model="caigddfilter.caigCancelFlag" label="1" border>是</el-radio>
					    <el-radio v-model="caigddfilter.caigCancelFlag" label="0" border>否</el-radio>
				  </el-form-item>
				  </vue-scroll>
				</el-form>
				<div class="search-form-btn">
					<el-button  size="small" v-on:click="searchSwitch(false)">关闭</el-button>
				    <el-button type="primary" v-on:click="loadCaigddSimple"  size="small">确定</el-button>
				</div>
			</div>
		</div>
    `,
    data:function(){
        return {
        	//公共功能
        	Calc:window.Calc,
        	currentCaigdd:"",
        	//搜索状态
        	searchStatus:false,
        	//列表表单切换
        	formStatus:"列表",
        	//搜索内容
        	searchContent:"",
        	//列表样式
        	cardType:0,
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
        	_this.caigddfilter.dinghDateStart=_this.Calc.formatDate(_this.caigddfilter.dinghDateStart);
        	_this.caigddfilter.dinghDateEnd=_this.Calc.formatDate(_this.caigddfilter.dinghDateEnd);
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
//                	_this.caigddlist = data.rows[0];
                	console.info(data);
                	if(data.message!=undefined){
                		_this.erpMessage(data.message);
                	}
                	_this.caigddlist = data.rows[0];
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
    	},
	  	//筛选框切换
		searchSwitch:function(val){
			var _this = this;
			_this.searchStatus = val;
		},
	
		//加载采购订单
		loadCaigdd:function(){
			
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
        	var _this = this;
        	if(data.opt!=undefined&&data.opt=="formSwitch"){
        		_this.formStatus = data.data.formStatus;
        	}
        }
	}
}

Vue.component('caigddTitle', caigddTitle);
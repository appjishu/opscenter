var caigdd = {
    template: `
    	<el-row>
		  <el-col :span="12" class="order-list-parent">
		  	<div class="grid-content bg-purple order-list">
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
			  			<el-button icon="fa fa-filter" class="normal" v-on:click = "searchSwitch" size="small">筛选</el-button>
			  		</div>
			  		<div class="order-list-content" v-loading="loading">
			  			<vue-scroll v-bind="{ops:ops}">
                            <el-card v-bind="{class:caigddItem.caigNo==currentCaigdd.caigNo?'box-card background-l3':'box-card background-l2'}" v-for = "(caigddItem,index) in caigddlist" :key="index" >
                                <div v-on:click="loadCaigddOne(caigddItem)">
                                	<span v-if="cardType==0">
	                                    <p><b>单号:</b> {{caigddItem.caigNo}}  {{caigddItem.gongysName}} ({{caigddItem.changjNo}}) <span class="mini-date">{{formatDate(caigddItem.dinghDate)}}</span></p>
	                                    <p><b>备注:</b> {{caigddItem.dingdRemark}}</p>
	                                    <p><b>状态:</b> {{caigddItem.shangpSum}} {{caigddItem.caigslRate}} {{caigddItem.shangphSum}} {{caigddItem.caigShenpStatusName}} {{caigddItem.caigStatusName}} {{caigddItem.rukStatusName}}</p>
                                    </span>
                                    <span v-if="cardType==1">
	                                    <p><b>单号:</b> {{caigddItem.caigNo}} ({{caigddItem.changjNo}}) <span class="mini-date">{{formatDate(caigddItem.dinghDate)}}</span></p>
	                                    <p><b>备注:</b> {{caigddItem.dingdRemark}}</p>
	                                    <p><b>状态:</b> {{caigddItem.caigShenpStatusName}} {{caigddItem.caigStatusName}} {{caigddItem.rukStatusName}}</p>
	                                    <p><b>供应商:</b> {{caigddItem.gongysName}} </p>
	                                    <p><b>总金额:</b> {{caigddItem.shangpSum}} {{caigddItem.caigslRate}} {{caigddItem.shangphSum}} </p>
	                                    <p><b>创建:</b> {{caigddItem.caigDefine4}} {{caigddItem.caigDefine5}} {{caigddItem.chuangjrName}} {{caigddItem.chuangjOrgName}} <span class="mini-date">{{formatDate(caigddItem.chuangjTime)}}</span></p>
	                                    <p><b>审批:</b> {{caigddItem.caigShenprName}} {{caigddItem.caigShenpOrgName}} {{caigddItem.caigShenpRemark}} <span class="mini-date">{{formatDate(caigddItem.caigShenpTime)}}</span></p>
	                                    <p><b>取消:</b> {{caigddItem.caigCancelFlag}} {{caigddItem.caigCancelName}} <span class="mini-date">{{formatDate(caigddItem.caigCancelTime)}}</span></p>
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
					    <el-input v-model="caigddfilter.in_caigNo"></el-input>
					  </el-form-item>
					  <el-form-item label="供应商">
					    <el-input v-model="caigddfilter.gongysName"></el-input>
					  </el-form-item>
					  <el-form-item label="厂家单号">
					    <el-input v-model="caigddfilter.in_changjCode"></el-input>
					  </el-form-item>
					  <el-form-item label="订单日期">
						    <el-date-picker
						      class="erpdate"
						      v-model="caigddfilter.in_dinghDateStart"
						      type="datetime"
						      placeholder="开始时间"
						      default-time="12:00:00">
						    </el-date-picker>
					  </el-form-item>
					  <el-form-item label="">
						    <el-date-picker
						      class="erpdate"
						      v-model="caigddfilter.in_dinghDateEnd"
						      type="datetime"
						      placeholder="结束时间"
						      default-time="12:00:00">
						    </el-date-picker>
					  </el-form-item>
					  <el-form-item label="采购状态">
					    <el-radio v-model="caigddfilter.in_caigStatus" label="255" border>全部</el-radio>
					    <el-radio v-model="caigddfilter.in_caigStatus" label="1" border>未发货</el-radio>
					    <el-radio v-model="caigddfilter.in_caigStatus" label="3" border>已发货</el-radio>
					  </el-form-item>
					  <el-form-item label="入库状态">
					    <el-radio v-model="caigddfilter.in_rukStatus" label="255" border>全部</el-radio>
					    <el-radio v-model="caigddfilter.in_rukStatus" label="1" border>未入库</el-radio>
					    <el-radio v-model="caigddfilter.in_rukStatus" label="2" border>部分入库</el-radio>
					    <el-radio v-model="caigddfilter.in_rukStatus" label="3" border>已入库</el-radio>
					  </el-form-item>
					  <el-form-item label="关闭状态">
						    <el-radio v-model="caigddfilter.in_caigCancelFlag" label="255" border>全部</el-radio>
						    <el-radio v-model="caigddfilter.in_caigCancelFlag" label="1" border>是</el-radio>
						    <el-radio v-model="caigddfilter.in_caigCancelFlag" label="0" border>否</el-radio>
					  </el-form-item>
					  </vue-scroll>
					</el-form>
					<div class="search-form-btn">
						<el-button  size="small" >重置</el-button>
					    <el-button type="primary" v-on:click="loadCaigdd"  size="small">确定</el-button>
					</div>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :span="12" v-bind="{class:'单据'==formStatus?'form-parent':'form-parent hidden'}" v-loading="loadingForm">
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
				  	<span class="order-form-title-content">采购开单</span>
				  	</span>
			  	</div >
			  	<el-steps :active="stepNum" size="small" class="opt-step">
				  <el-step title="采购信息" icon="fa fa-circle"></el-step>
				  <el-step title="添加产品" icon="fa fa-circle"></el-step>
				  <el-step title="采购结算" icon="fa fa-circle"></el-step>
				</el-steps>
			  	<div class="order-form-content-parent">
			  	 	<vue-scroll v-bind="{ops:ops}">
			  	 	<!--开单-->
		  			<el-form  v-if="stepNum==1" class="order-form-content" label-width="80px" size="small">
					  <el-form-item label="采购部门"  v-on:click.native="showCloud('caigOrg')">
					  	<el-card class="box-card select-card" >
					  		<span class="tag" v-if="newCaigdd.caigOrgName!=''">{{newCaigdd.caigOrgName}}</span>
						</el-card>
					  </el-form-item>
					  <el-form-item label="供应商"  v-on:click.native="showCloud('gongys')">
					    <el-card class="box-card select-card">
					  		<span class="tag" v-if="newCaigdd.gongysName!=''">{{newCaigdd.gongysName}}</span>
						</el-card>
					  </el-form-item>
					  <el-form-item label="厂家单号">
					    	<el-input v-model="newCaigdd.changjNo"></el-input>
					  </el-form-item>
					  <el-form-item label="订单备注">
						    <el-input type="textarea" v-model="newCaigdd.dingdRemark"></el-input>
					  </el-form-item>
					   <el-form-item label="承运物流">
					    <el-input v-model="newCaigdd.caigDefine4"></el-input>
					  </el-form-item>
					  <el-form-item label="运单号">
					    <el-input v-model="newCaigdd.caigKuaiddNo"></el-input>
					  </el-form-item>
					  <el-form-item label="预到日期">
					    <el-date-picker
						      class="erpdate"
						      v-model="newCaigdd.yudDate"
						      type="datetime"
						      placeholder="开始时间"
						      default-time="12:00:00">
						    </el-date-picker>
					  </el-form-item>
					</el-form>
					</vue-scroll>
					</div>
					<div class="order-form-btn">
						<el-button  size="small" v-on:click="prev" v-if="stepNum>1">上一步</el-button>
					    <el-button type="primary" v-on:click="next"  size="small" v-if="stepNum<3">下一步</el-button>
					    <el-button type="primary" v-on:click=""  size="small" v-if="stepNum==3">提交</el-button>
					</div>
			  </div>
			</el-col>
		</el-row>
    `,
    data:function(){
        return {
        	Calc:window.Calc,
        	stepNum:1,
        	//云数据显示状态
        	cloudStatus:true,
        	//云数据类型
        	cloudType:"",
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
        	//部门信息传递
        	org:{
        		orgID:0
        	},
        	//供应商信息传递
        	gongys:{
        		gongysID:0
        	},
        	//滚动条样式
			ops:{
				bar: {
					background: "rgba(0,95,127,0.1)",
					size: "5px",
					keepShow: true
				}
			},
			editIndex:-1,
			edit:{
				
			},
			editCopy:{
				
			},
			whCaigdd:{
				changjNo : ""
			},
			//采购订单筛选条件
        	caigddfilter:{
        		in_yonghID:"1",
        		in_cangkID:"0",
        		in_gongysID:"0",
        		in_pinpName:"",
        		in_shangpCode:"",
        		in_caigOrgName:"",
        		in_changjNo:"",
        		in_chuangjrName:"",
        		in_changjCode:"",
        		in_dinghDateStart:"2019-01-08 00:00",
        		in_dinghDateEnd:"2019-01-09 23:59",
        		in_caigNo:"",
        		in_caigStatus:"255",
        		in_xiaoyStatus:"0",
        		in_rukStatus:"1",
        		in_Flag:"0",
        		in_caigCancelFlag:"255"
        	},
        	
        	//采购订单列表
        	caigddlist:[],
        	//新采购订单
        	newCaigdd:{
        		caigOrgName:"",
        		caigOrgID:"",
        		gongysName:"",
        		gongysID:"",
        		listStr:"",
        		orgID:"",
        		busiOrgID:"",
        		changjNo:"",
        		caigDefine4:"",
        		caigKuaiddNo:"",
        		yudDate:"",
        		dingdRemark:"",
        		zhongls : 0,
        		tijs : 0,
        		caigZL : 0,
        		shangpSum : 0,
        		shangphsSum : 0,
        		qitSum: 0
        	},
        	//采购发货单
        	sendCaigdd:{
        		caigOrgName:"",
        		caigOrgID:"",
        		gongysName:"",
        		gongysID:"",
        		listStr:"",
        		orgID:"",
        		busiOrgID:"",
        		changjNo:"",
        		caigDefine4:"",
        		caigKuaiddNo:"",
        		yudDate:"",
        		dingdRemark:"",
        		zhongls : 0,
        		tijs : 0,
        		caigZL : 0,
        		shangpSum : 0,
        		shangphsSum : 0,
        		qitSum: 0
        	},
        	newCaigddList:[],
        	//当前采购订单
        	currentCaigdd:{
        	},
        	//当前所有采购单
        	currentCaigddList:[],
        	sendCaigList:[],
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
    	_this.initNewCaigdd();
    },
    watch:{
    	newCaigddList:{
            handler:function(newValue,oldValue){
            	var _this = this;
                console.log(newValue)
                this.countNew();
            },
            deep:true,
        }
    },
    methods:{
    	initNewCaigdd:function(){
    		var _this = this;
    		_this.newCaigdd.caigOrgName = "";
    		_this.newCaigdd.caigOrgID = "";
    		_this.newCaigdd.gongysName = "";
    		_this.newCaigdd.caigOrgName = "";
    		_this.newCaigdd.gongysID = "";
    		_this.newCaigdd.listStr = "";
    		_this.newCaigdd.orgID = "";
    		_this.newCaigdd.busiOrgID = "";
    		_this.newCaigdd.changjNo = "";
    		_this.newCaigdd.caigDefine4 = "";
    		_this.newCaigdd.caigKuaiddNo = "";
    		_this.newCaigdd.yudDate = "";
    		_this.newCaigdd.dingdRemark = "";
    		_this.newCaigdd.zhongls = 0;
        	_this.newCaigdd.tijs = 0;
        	_this.newCaigdd.tijs = 0;
        	_this.newCaigdd.caigZL = 0;
        	_this.newCaigdd.shangpSum = 0;
        	_this.newCaigdd.shangphsSum = 0;
        	_this.newCaigdd.qitSum = 0;
        	_this.newCaigddList = [];
        	console.info(_this.newCaigdd)
    	},
    	cardTypeSwitch:function(cardType){
    		var _this = this;
    		_this.cardType = cardType;
    	},
    	//表格显示模式
    	tableTypeSwitch:function(tableType){
    		var _this = this;
    		_this.tableType = tableType;
    	},
    	//表单类型切换
    	formTypeSwitch:function(formType){
    		var _this = this;
    		if(formType==3) _this.whCaigdd.changjNo=_this.currentCaigdd.changjNo;
    		_this.formType = formType;
    		
    	},
    	//筛选框切换
    	searchSwitch:function(){
    		var _this = this;
    		_this.searchStatus = !_this.searchStatus;
    	},
    	//表单切换
    	formSwitch:function(){
    		var _this = this;
    		_this.formStatus = !_this.formStatus;
    	},
    	//提交表单
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
        setStep: function(caigddItem){
        	console.info(caigddItem);
        	var _this = this;
        	if(caigddItem.caigStatus==1) _this.currentCaigdd.step = 1;
        	if(caigddItem.caigStatus==3) _this.currentCaigdd.step = 2;
        	if(caigddItem.caigStatus==3&&caigddItem.rukStatus==1) _this.currentCaigdd.step = 3;
        	if(caigddItem.caigStatus==3&&caigddItem.rukStatus==2) _this.currentCaigdd.step = 4;
        	if(caigddItem.caigStatus==3&&caigddItem.rukStatus==3) _this.currentCaigdd.step = 5;
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
        //统计开单数量
        countNew: function(){
        	var _this = this;
        	var len = _this.newCaigddList.length;
        	//重量体积及商品金额
        	_this.newCaigdd.zhongls = 0;
        	_this.newCaigdd.tijs = 0;
        	_this.newCaigdd.caigZL = 0;
        	_this.newCaigdd.shangpSum = 0;
        	_this.newCaigdd.shangphsSum = 0;
        	if(len==0) return;
        	_this.newCaigddList.forEach(getSum);
        	var fixed = 0;
        	function getSum (item, index, array){
        		var zhongl = Calc.Mul(item.zhongl,item.caigNum);
        		var tij = Calc.Mul(item.tij,item.caigNum);
        		if(item.danwxsNum>fixed) fixed = item.danwxsNum;
        		_this.newCaigdd.zhongls = Calc.Add(_this.newCaigdd.zhongls,zhongl);
        		_this.newCaigdd.tijs = Calc.Add(_this.newCaigdd.tijs,tij);
        		_this.newCaigdd.caigZL =Calc.Add(_this.newCaigdd.caigZL,item.caigNum);
        		_this.newCaigdd.shangphsSum = Calc.Add(_this.newCaigdd.shangphsSum,item.caigListhsSum);
        		_this.newCaigdd.shangpSum = Calc.Add(_this.newCaigdd.shangpSum,item.listSum);
            }
        	_this.newCaigdd.zhongls = Calc.toNum(_this.newCaigdd.zhongls);
        	_this.newCaigdd.tijs = Calc.toNum(_this.newCaigdd.tijs);
        	_this.newCaigdd.caigZL = Calc.toNum(_this.newCaigdd.caigZL,fixed);
        	_this.newCaigdd.shangphsSum = Calc.toMoney(_this.newCaigdd.shangphsSum);
        	_this.newCaigdd.shangpSum = Calc.toMoney(_this.newCaigdd.shangpSum);
        	
        },
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
        //单搜索框搜索
        loadCaigddSimple:function(){
        	var _this = this;
        	_this.loading = true;
        	var json =  _this.caigddfilter;
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
                	_this.caigddlist = data.rows[0];
                	console.info(_this.caigddlist);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        createCaigdd:function(){
        	var _this = this;
        	_this.fillNewCaigdd();
        	var json = _this.copyParam(_this.newCaigdd);
        	//纠错
        	json.in_dinghRemark = json.in_dingdRemark;
        	json.in_yudDate = _this.formatDate(json.in_yudDate);
        	json.in_shuiSum = Calc.Sub(json.in_shangphsSum,json.in_shangpSum);
        	json.in_yonghID = 1;
        	json.in_wul = json.in_caigDefine4
        	json.in_changj = '';
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_DINGD_ADD"; 	
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	//_this.currentTest.response = JSON.stringify(data);
                	console.info(data);
                	_this.erpMessage(data.message);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        sendCaigdd:function(){
        	var _this = this;
        	_this.fillSendCaigdd();
        	var json = _this.copyParam(_this.sendCaigdd);
        	//纠错
        	json.in_dinghRemark = json.in_dingdRemark;
        	json.in_yudDate = _this.formatDate(json.in_yudDate);
        	json.in_shuiSum = Calc.Sub(json.in_shangphsSum,json.in_shangpSum);
        	json.in_yonghID = 1;
        	json.in_wul = json.in_caigDefine4
        	json.in_changj = '';
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_FAH_ADD"; 	
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	//_this.currentTest.response = JSON.stringify(data);
                	console.info(data);
                	_this.erpMessage(data.message);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        
        changjNoWH:function(){
        	var _this = this;
        	var json = {};
        	json.in_yonghID = 1;
        	json.in_caigTitleID = _this.currentCaigdd.caigTitleID;
        	json.in_oldChangjNo = _this.currentCaigdd.changjNo;
        	json.in_newChangjNo = _this.whCaigdd.changjNo;
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_CHANGJNO_WEIH"; 	
        	console.info(json);
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	//_this.currentTest.response = JSON.stringify(data);
                	console.info(data);
                	_this.erpMessage(data.message);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        deleteCaigdd:function(){
        	var _this = this;
        	var json = {};
        	json.in_yonghID = 1;
        	json.in_caigTitleID = _this.currentCaigdd.caigTitleID;
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_DINGD_CANCEL"; 	
        	console.info(json);
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	//_this.currentTest.response = JSON.stringify(data);
                	console.info(data);
                	_this.erpMessage(data.message);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        qingh:function(index,row){
        	var _this = this;
        	var json = {};
        	json.in_yonghID = 1;
        	json.in_caigTitleID = _this.currentCaigdd.caigTitleID;
        	json.in_caigListID = row.caigListID;
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_QINGH"; 	
        	console.info(json);
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	//_this.currentTest.response = JSON.stringify(data);
                	console.info(data);
                	if(data.message.out_Flag==0) _this.currentCaigddList.splice(index,1);
                	_this.erpMessage(data.message);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        
        //加载采购订单
        loadCaigdd:function(){
        	var _this = this;
        	_this.loading = true;
        	var json =  _this.caigddfilter;
        	json.poolName = "erp";
        	json.methodName = "PROC_MM_CAIG_LOAD_ONE"; 	
        	json.in_dinghDateStart = _this.formatDate(json.in_dinghDateStart);
        	json.in_dinghDateEnd = _this.formatDate(json.in_dinghDateEnd);
        	console.info(json.in_dinghDateStart);
        	console.info(json);
        	_this.searchSwitch();
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.loading = false;
                	//_this.currentTest.response = JSON.stringify(data);
                	_this.caigddlist = data.rows[0];
                	console.info(_this.caigddlist);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
        },
        //复制开单
        copyCaigdd: function(){
        	var _this = this;
        	_this.newCaigdd = Calc.clone(_this.currentCaigdd)
        	_this.newCaigddList = Calc.clone(_this.currentCaigddList)
        	_this.formTypeSwitch(1);
        },
        showCloud:function(cloudType){
        	var _this = this;
        	_this.cloudType = cloudType;
        	if('gongys'==cloudType){
        		_this.org.orgID = _this.newCaigdd.caigOrgID;
        	}
        	if('shangp'==cloudType){
        		_this.gongys.gongysID = _this.newCaigdd.gongysID;
        	}
        	_this.cloudStatus = true;
        },
        deleteCloud: function(cloudType ){
        	var _this = this;
        	if('caigOrg'==cloudType){
        		_this.newCaigdd.caigOrgID = 0;
        		_this.newCaigdd.caigOrgName = "";
        		_this.deleteCloud('gongys');
        		_this.deleteCloud('shangp');
        		
        	}
        	if('gongys'==cloudType){
        		_this.newCaigdd.gongysID = 0;
        		_this.newCaigdd.gongysName = "";
        		_this.deleteCloud('shangp');
        	}
        	if('shangp'==cloudType){
        		_this.newCaigddList.splice(0,_this.newCaigddList.length);
        	}
        },
        //设置云数据
        setCloud: function(data){
        	var _this = this;
        	_this.cloudStatus = false;
        	if(data.type=="caigOrg"){
        		if(data.opt=="add"){
        			_this.newCaigdd.caigOrgID = data.row.orgID;
            		_this.newCaigdd.caigOrgName = data.row.orgName;
        		}
        		if(data.opt=="clear"){
        			_this.newCaigdd.caigOrgID = 0;
            		_this.newCaigdd.caigOrgName = "";
        		}
        		if(data.opt=="close"){
        			
        		}
        	}
        	if(data.type=="gongys"){
        		
        		if(data.opt=="add"){
        			_this.newCaigdd.gongysName = data.row.gongysName;
            		_this.newCaigdd.gongysID = data.row.gongysID;
        		}
        		if(data.opt=="clear"){
        			_this.newCaigdd.gongysName = "";
            		_this.newCaigdd.gongysID = 0;
        		}
        		if(data.opt=="close"){
        			
        		}
        	}
        	if(data.type=="shangp"){
        		console.info(data.row);
        		data.row.caigPrice = 0;
        		data.row.caighsPrice = 0;
        		data.row.caigslRate = 0.16;
        		data.row.caigNum = 1;
        		data.row.caigListhsSum = 0;
        		data.row.listSum = 0;
        		_this.newCaigddList.push(data.row);
        		
        	}
        },
        editShangp: function(index,row){
        	var _this = this;
        	_this.endEdit();
        	_this.edit = row;
        	_this.editCopy = Calc.clone(_this.edit);
        	_this.editIndex = index;
        },
        deleteShangp: function(index,row){
        	var _this = this;
        	console.info(index)
        	console.info(row)
        	_this.newCaigddList.splice(index,1);
        },
        //结束编辑功能
        endEdit: function(){
        	var _this = this;
        	//检查是否编辑状态
        	if(_this.editIndex==-1) return;
    		//是否通过价格来计算
    		if(_this.edit.caigListhsSum!=0&&_this.edit.caigListhsSum!=_this.editCopy.caigListhsSum){
    			_this.edit.caighsPrice = Calc.toMoney(_this.edit.caigListhsSum / _this.edit.caigNum);
    			_this.edit.caigPrice = Calc.toMoney(_this.edit.caighsPrice / ( 1 + _this.edit.caigslRate));
    			_this.edit.listSum =  Calc.toMoney(_this.edit.caigPrice *  _this.edit.caigNum);
           	}else{
           		_this.edit.caigPrice = Calc.toMoney(_this.edit.caighsPrice / ( 1 + _this.edit.caigslRate));
				_this.edit.caigListhsSum = Calc.toMoney(_this.edit.caighsPrice *  _this.edit.caigNum);
				_this.edit.listSum =  Calc.toMoney(_this.edit.caigPrice *  _this.edit.caigNum);
   	       	}
        	//更新数据关闭编辑
        	_this.newCaigddList[_this.editIndex] = _this.edit;
        	_this.edit = {};
        	_this.editIndex = -1;
        	_this.countNew();
        },
        handleSelectionChange:function(val){
        	var _this = this;
        	_this.sendCaigList = val;
        },
		fillNewCaigdd: function(){
			var _this = this;
			var len = _this.newCaigddList.length;
			var listStr="";
			for(var i = 0;i<len;i++){
				row = _this.newCaigddList[i];
				if(row.pic==undefined) row.pic="";
				if(row.dinghRemark==undefined) row.dinghRemark="";
				if(i==len-1){																						
					 listStr+=row.shangpID+"~"+row.shangpCode+"~"+row.pic+"~"+row.caigNum+"~"+row.caigPrice+"~"+row.caighsPrice+"~"+row.caigslRate+"~"+row.listSum+"~"+row.dinghRemark+"~"+""+"~"+"";
				}else{
					 listStr+=row.shangpID+"~"+row.shangpCode+"~"+row.pic+"~"+row.caigNum+"~"+row.caigPrice+"~"+row.caighsPrice+"~"+row.caigslRate+"~"+row.listSum+"~"+row.dinghRemark+"~"+""+"~"+""+"^";
				}
			}
			_this.newCaigdd.listStr = listStr;
			console.info(_this.newCaigdd.listStr);
		},
		copyParam:function(json){
    		var _this = this;
    		var newJson = {};
    		for (var item in json){
    			newJson["in_"+item] = json[item]
    		}
    		return newJson;
    	},
    	erpMessage: function(message){
	   		 var type = "error";
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
    	prev: function(){
    		var _this = this;
    		_this.stepNum = _this.stepNum - 1;
    	},
    	next: function(){
    		var _this = this;
    		_this.stepNum = _this.stepNum + 1;
    		if(_this.stepNum==2){
    			_this.addCaigdd();
    		}
    	},
    	addCaigdd: function(){
    		var _this = this;
    		var json = _this.newCaigdd;
        	//纠错
        	json.poolName = "erp";
        	json.methodName = "addCaigdd"; 	
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	//_this.currentTest.response = JSON.stringify(data);
                	console.info(data);
                	_this.erpMessage(data.message);
                },
                error: function (message) {
                	_this.loading = false;
                }
            });
    	}
	}
}

Vue.component('caigdd', caigdd);
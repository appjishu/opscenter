//采购单
var caigdd = {
    template: `
		<el-row>
			<el-col :span="12" class="order-list-parent">
				<div class="grid-content bg-purple order-list">
					<caigddTitle data="caigddTitleData" ref="caigddTitle"  @opt="caigddTitleOpt" ></caigddTitle>
				</div>
			</el-col>
			<el-col :span="12" v-bind="{class:'单据'==formStatus?'form-parent':'form-parent hidden'}">
				<caigddView v-if="formType==0" data="caigddViewData" ref="caigddView"  @opt="caigddViewOpt" ></caigddView>
				<caigddTitleForm v-if="formType==1" data="caigddTitleForm" ref="caigddTitleForm"  @opt="caigddTitleFormOpt" ></caigddTitleForm>
			</el-col>
		</el-row>
    `,
    data:function(){
        return {
        	//系统通用功能
        	Calc:window.Calc,
        	//表单状态(列表和表单之间切换使用)
        	formStatus:"列表",
        	//列表初始化数据
        	caigddTitleData:"",
        	//采购订单查看数据
        	caigddViewData:{
        		row:{
        			step:1
        		}
        	},
        	formType:0
        }
    },
    mounted:function(){
    },
    watch:{
    	
    },
    methods:{
    	//列表功能
    	caigddTitleOpt:function(data){
    		var _this = this;
    		if(data.opt=="getRow"){
    			console.info(data);
    			_this.setCaidgddView(data.row);
    		}
    		//切换列表和单据
    		if(data.opt=="formSwitch"){
    			console.info(data);
    			_this.formStatus = data.row.formStatus;
    			this.$refs.caigddView.parentHandleclick({opt:"formSwitch",data:{formStatus:data.row.formStatus}});
    		}
    	},
    	//单据显示操作
    	caigddViewOpt:function(data){
    		var _this = this;
    		if(data.opt=="getRow"){
    			caigddViewData.row.step = 1;
    		}
    		//切换列表和单据
    		if(data.opt=="formSwitch"){
    			console.info(data);
    			_this.formStatus = data.row.formStatus;
    			this.$refs.caigddTitle.parentHandleclick({opt:"formSwitch",data:{formStatus:data.row.formStatus}});
    		}
    	},
	    test: function(opt,data){
	    	this.$refs.caigddTitle.parentHandleclick({opt:opt,data:data});
	    },
	    //设置显示单据数据
    	setCaidgddView: function(data){
    		this.$refs.caigddView.parentHandleclick({opt:"setRow",data:data});
    	}
	}
}

Vue.component('caigdd', caigdd);
var caigddTitleForm = {
    template: `
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
    `,
    data:function(){
        return {
        	Calc:window.Calc,
        }
    },
    mounted:function(){
    	
    },
    watch:{
    	
    },
    methods:{
    	
	}
}
Vue.component('caigddTitleForm', caigddTitleForm);
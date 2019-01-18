var subapp = {
    template:`
    <div class="subapp">
    <div class="dataarea">
        <!-- <div class="top">
            <div class="title">
                <span>销售订单列表</span>
            </div>
            <div class="search">
                
            </div>
        </div>
        <div class="tab">
            s
        </div>
        <div id="list-content">
            s
        </div> -->
        <div class="card clear app-card">
            <div class="card-header clear app-header">
                销售订单列表
                <div class="btn-group clear">
                    <div class="input-group app-search">
                        <input type="text" class="form-control clear app-searchcontent" placeholder="请输入搜索关键字" >
                        <button class="btn clear app-searchbutton" type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                    <button type="button" class="btn clear app-topbutton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-th-large" aria-hidden="true"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right clear app-topmenu">
                        <button class="dropdown-item" type="button">筛选</button>
                        <button class="dropdown-item" type="button">高级查询</button>
                        <button class="dropdown-item" type="button">测试</button>
                    </div>
                </div>
            </div>
            <div  class="card-body clear app-body">                    
                <ul v-if="listData && listData.length > 0 " class="list-group clear">
                   <li class="list-group-item clear">
                        <button v-on:click="optionChange(true);">测试</button></li> 
                    <li v-for="list in listData" class="list-group-item clear">
                        <div class="row clear" >
                            <div class="clear col-1 ">
                                    <i class="app-rowselect fa fa-check-circle selected" aria-hidden="true"></i>
                            </div>
                            <div class="clear col-11">
                                    {{list.xiaosTitleID}}
                                    {{list.cankNo}}
                                    {{list.xiaosNo}}
                                    {{list.kehCode}}
                                    {{list.kehName}}
                                    {{list.dingjSum}}
                                    {{list.chukStatusName}}
                                    {{list.xiaosSum}}
                                    {{list.zongSum}}
                                    {{list.shendSum}}
                                    {{list.qitSum}}
                                    {{list.shelSum}}
                                    {{list.dinghDate}}
                                    {{list.yewOrgName}}
                                    {{list.shouhMan}}
                                    {{list.shouhTel}}
                                    {{list.shouhAddress}}
                                    {{list.province}}
                                    {{list.city}}
                                    {{list.county}}
                                    {{list.yuansdStatus}}
                                    {{list.xiaosStatusName}}
                                    {{list.guaqStatus}}

                                    {{list.dingdRemark}}
                                    {{list.songhfsName}}
                                    {{list.xiaosCancelFlag}}
                                    {{list.guaqStatusName}}
                                    {{list.songhFlag}}
                                    {{list.dingdPrintFlag}}
                                    {{list.tuihTitleID}}
                                    {{list.yiydbSum}}
                                    {{list.xxxxTel}}
                                    {{list.fuwfName}}
                                    {{list.hebFahFlag}}
                                    {{list.jiaoyzt}}
                                            
                            </div>
                        </div>
                    </li> 
                    <li  class="list-group-item clear">
                            <div class="row clear" >
                                <div class="clear col-1">
                                        <i class="app-rowselect fa fa-circle" aria-hidden="true"></i>
                                </div>
                                <div class="clear col-11">
                                        
                                </div>
                            </div>
                    </li>
                    <li class="list-group-item clear">Porta ac consectetur ac</li>
                    <li class="list-group-item clear">Vestibulum at eros</li> 
                </ul> -->
                <ul v-else class="list-group clear">
                        <li class="list-group-item clear">
                        
                            <div class="row clear" >
                                <div class="clear col-1 ">
                                </div>
                                <div class="clear col-11">
                                        没有获取到数据
                                </div>
                            </div>
                        </li>
                    </ul>
            </div>
            <div class="card-footer clear app-footer">
                <button type="button" class="btn clear app-footerbutton" v-on:click="optionChange(true);">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn clear app-footerbutton">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>

        
    </div>
    <div id="optionArea" :class="optionStatus ? 'optionarea':'hidden'"> 
        <div class="card-header clear app-header darkbackground">
                操作界面
            </div>
            <div id="dataAreaBody" class="card-body clear app-body whitebackground">
                <ul class="list-group clear">
                    <li class="list-group-item clear"><button v-on:click="optionChange(false);">测试</button></li>
                    <li class="list-group-item clear">Dapibus ac facilisis in</li>
                    <li class="list-group-item clear">Morbi leo risus</li>
                    <li class="list-group-item clear">Porta ac consectetur ac</li>
                    <li class="list-group-item clear">Vestibulum at eros</li>
                </ul>
            </div>
            <div class="card-footer clear app-footer txtright normalbackground">
                    <button type="button" class="btn clear app-footerbutton darkbackground">
                        <i class="fa fa-plus " aria-hidden="true"></i>
                    </button>
                    <button type="button" class="btn clear app-footerbutton darkbackground">
                        <i class="fa fa-trash "></i>
                    </button>
            </div>
    </div>
</div>
    `,data:function(){
        return {
            href: "#/subapp",
            optionStatus:false,
            content:"",
            //列表数据
            listData:[],
            //参数
            param : {
                methodName: "xiaosddLoad",
                poolName: "erp",
                in_yonghID:1,
                in_xiaosNo:'',
                in_cankNo:'' ,
                in_kehName:'',
                in_yewOrgID:'',
                in_shouhMan:'',
                in_shouhTel:'',
                in_shouhAddress:'',
                in_shangpCode:'',
                in_songhfsName:'',
                in_dinghDateStart:'2018-08-01 10:00:00',
                in_dinghDateEnd:'2018-08-01 13:00:00',
                in_dingdRemark:'',
                in_dingdPrintFlag:255,
                in_xiaosStatus:255,
                in_guaqStatus:255 ,
                in_xiaosCancelFlag:255,
                in_chukStatus:255 ,
                in_jiaoyStatusName:'' ,
                in_buf:''	,
                in_hebFlag:''	
            }
        }
        },
        created:function(){
            //获取数据
            this.queryList();
        },
        mounted:function(){
            $(".app-body").niceScroll({
			    touchbehavior:false,     //是否是触摸式滚动效果
			    cursorcolor:"#000",     //滚动条的颜色值
			    cursoropacitymax:0.2,   //滚动条的透明度值
			    cursorwidth:5,         //滚动条的宽度值
			    autohidemode:true,      //滚动条是否是自动隐藏，默认值为 true
            });
        },
        updated:function(){
            setTimeout(function(){ $(".app-body").getNiceScroll().resize();}, 500);
        },
        activated: function () {
            var _this = this
            function getIndex(href){
                if(href==undefined || href=="") return -1;
                return _this.$parent.processdata.findIndex(function(value, index, arr) {
                    if(value.href == href) return true;
                })
            }
            var index = getIndex(_this.href);
            var processdata = _this.$parent.processdata[index];
            if(processdata!=undefined && processdata.new){
                //检查是否已经缓存
                Object.assign(this.$data, this.$options.data())
                _this.queryList();
                processdata.new = false;
            }
        },
        methods:{
            optionChange:function(optionStatus){
                this.optionStatus = optionStatus;
            },
            fillContent:function(){
            },
            queryList:function(){
                _this = this;
                $.ajax({
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json",
                    url: "/method/execMethod", //for ASP.NET, java                                                
                    data: JSON.stringify(_this.param),
                    success: function (data) {
                        _this.listData = data.rows[0];
                    },
                    complete: function () {
                        
                    }
                });
            }
        }
};
Vue.component('subapp', subapp);

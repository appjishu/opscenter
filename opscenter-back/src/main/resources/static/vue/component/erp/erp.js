//获取应用初始化信息(包含了用户信息,权限数据等)
$.post("/vue/init", vueLoad)
//加载应用
function vueLoad(data){
    var loginStatus = true;
    if(typeof(data)==undefined) loginStatus = false;
    if(data.code!=200) loginStatus = false;
    loginStatus = data.loginStatus;
    //根据登录状态来跳转
    if(!loginStatus){
        window.location = "/app/login.html#";
    }
    //路由组件数据(这部分可以从后台读取菜单权限来设置)
    const routes = [
        {name:'采购订单',path:"/caigdd",component:caigdd,meta:{keepAlive:true}},
    ]
    //路由定义
    const router = new VueRouter({
        routes: routes
    });
    //应用定义
    var ruerpApp = new Vue({
        //APP场景
        el: "#ruerpapp",
        //路由定义
        router:router,
        data: {
        	//当前访问路径
        	currentPath: "",
            //顶部数据,可以根据系统实际进行增减修改
            navdata: {
                logo: {alt:"ruerp",src:"../../imgs/logo.png"},
                navItems:[
                    {class:"fa fa-bell",badge:3},
                    {class:"fa fa-envelope-open",badge:5},
                ],
                userItems:{
                    class:"fa fa-user",
                    username:"Admin"
                }
            },
            //当前页面功能缓存数据
            processdata: [],
            //菜单数据,可以根据权限数据填充
            sidebardata: [{
                name:"系统导航",
                menu:[{
                        name:"ruerp",
                        href:"#",
                        class:"fa fa-dropbox",
                        active:false,
                        hasSubMenu:true,
                        list:[
                            {name:"采购订单",href:"#/caigdd",class:"fa fa-database",active:false},
                        ]
                    }]
            }],
            sidebarops:{
                bar: {
                    background: "rgb(200,200,200)",
                    size: "2px"
                }
            },
            loadapp:true
        },
        watch: {
        	//监视当前访问信息
            $route: {
                handler: function(val, oldVal){
                    _this = this;
                    function getIndex(path){
                        if(path==undefined || path=="") return -1;
                        return _this.processdata.findIndex(function(value, index, arr) {
                            if(value.href == '#'+path) return true;
                        })
                    }
                    _this.currentPath = val.path;
	                var index = getIndex(val.path);
	                if(index==-1){
	                    var processItem = {href:"#"+ val.path,name:val.name,new:true};
	                    _this.processdata.push(processItem);
	                    setTimeout(function(){ $(".sidebar-process").getNiceScroll().resize();}, 100);
	                }
                },
                // 深度观察监听
                deep: true
            }
        },
        beforeMounte: function(){
            var  _this = this
            if(_this.currentPath==""){
            	//可以在此处添加主页入口,也可以根据实际情况进行页面缓存的设定
                //window.location = "#"+_this.homepage;
            }
        },
        mounted: function(){
        	//打开当前选择的菜单
            $('ul.nav').find('a.active').parent().parent().parent().addClass('open');
            this.loadapp = false;
        },
    });

}



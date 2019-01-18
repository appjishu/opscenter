//获取应用初始化信息
$.post("/vue/init", vueLoad)
//加载应用
function vueLoad(data){
    var loginStatus = true;
    if(typeof(data)==undefined) loginStatus = false;
    if(data.code!=200) loginStatus = false;
    loginStatus = data.loginStatus;
    if(!loginStatus){
        window.location = "/app/login.html#";
    }
    //路由组件数据
    const routes = [
        {name:'数据库管理',path:"/databaseeditor",component:databaseeditor,meta:{keepAlive:true}},
        {name:'页面编辑器',path:"/projecteditor",component:projecteditor,meta:{keepAlive:true}},
        {name:'报表编辑器',path:"/ureport",component:ureport,meta:{keepAlive:true}},
        {name:'流程设计器',path:"/activiti",component:activiti,meta:{keepAlive:true}},
        {name:'接口文档',path:"/swagger",component:swagger,meta:{keepAlive:true}},
        
        
        {name:'采购订单',path:"/caigdd",component:caigdd,meta:{keepAlive:true}},

        { name:'数据源管理',path: '/', component: welcome,meta: {
            keepAlive: true 
        }},
    { name:'数据源管理',path: '/subapp', component: subapp,meta: {
        keepAlive: true 
    }},
    { name:'数据表管理',path: '/subapp1', component: subapp1,meta: {
        keepAlive: true 
    }},
    { name:'存储过程设计',path: '/subapp2', component: subapp,meta: {
        keepAlive: false 
    } },
    { name:'测试',path: '/subapp3', component: subapp,meta: {
        keepAlive: false 
    } },
    { name:'欢迎使用',path: '/welcome', component: welcome,meta: {
        keepAlive: false 
    } },
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
            //当前路由
            currentPath:"/welcome",
            homepage:"/welcome",
            navdata: {
                logo: {alt:"ruerp",src:"../../imgs/logo.png"},
                navItems:[
                    {class:"fa fa-bell",badge:3},
                    {class:"fa fa-envelope-open",badge:5}
                ],
                userItems:{
                    class:"fa fa-user",
                    username:"Admin",
                    menu:[{
                        name:"账户",
                        list:[
                            {name:"基本资料",href:"#",class:"fa fa-user"},
                            {name:"邮件信息",href:"#",class:"fa fa-envelope"}
                        ]
                    },{
                        name:"设置",
                        list:[
                            {name:"公告设置",href:"#",class:"fa fa-bell"},
                            {name:"个人设置",href:"#",class:"fa fa-wrench"},
                            {name:"注销登录",href:"#",class:"fa fa-lock"},
                        ]
                    }]
                }
            },
            processdata: [],
            sidebardata: [{
                name:"系统导航",
                menu:[{
                    name:"欢迎使用",
                    href:"#",
                    class:"fa fa-dropbox",
                    active:true,
                    hasSubMenu:false
                    }]
                },{
                    name:"开发管理系统",
                    menu:[{
                        name:"系统基本配置",
                        href:"#",
                        class:"fa fa-cog",
                        active:false,
                        hasSubMenu:false
                    },{
                        name:"数据库开发",
                        href:"#",
                        class:"fa fa-dropbox",
                        active:false,
                        hasSubMenu:true,
                        list:[
                            {name:"欢迎使用",href:"#/welcome",class:"fa fa-database",active:true},
                            {name:"数据源管理",href:"#/subapp",class:"fa fa-database",active:true},
                            {name:"数据表管理",href:"#/subapp1",class:"fa fa-building",active:false},
                            {name:"存储过程设计",href:"#/subapp2",class:"fa fa-product-hunt",active:false}   
                        ]
                    },{
                        name:"功能开发",
                        href:"#",
                        class:"fa fa-dropbox",
                        active:false,
                        hasSubMenu:true,
                        list:[
                            {name:"数据库管理",href:"#/databaseeditor",class:"fa fa-database",active:false},
                            {name:"页面编辑器",href:"#/projecteditor",class:"fa fa-object-group",active:false},
                            {name:"报表设计器",href:"#/ureport",class:"fa fa-pie-chart",active:false},
                            {name:"流程设计器",href:"#/activiti",class:"fa fa-share-alt",active:false},
                            {name:"接口文档",href:"#/swagger",class:"fa fa-plug",active:false},
                            {name:"通行证管理",href:"#/passport",class:"fa fa-user-circle",active:false},
                            {name:"模块管理",href:"#",class:"fa fa-delicious",active:false},
                        ]
                    },{
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
                console.info(index);
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
                window.location = "#"+_this.homepage;
            }
        },
        mounted: function(){
            $('ul.nav').find('a.active').parent().parent().parent().addClass('open');
            this.loadapp = false;
            console.info("aa");
        },
    });

}



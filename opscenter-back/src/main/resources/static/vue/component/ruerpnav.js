var ruerpnav = {
    props: ['navdata'],
    template:`
        <nav class="navbar page-header">
            <a href="#" v-on:click="changeMobile()" class="btn btn-link sidebar-mobile-toggle d-md-none mr-auto">
                <i class="fa fa-bars"></i>
            </a>
            <a class="navbar-brand" href="#">
                <img v-bind="{src:navdata.logo.src,alt:navdata.logo.alt}" class="navbar-logo"/>
            </a>
            <a href="#" v-on:click="change()" class="btn btn-link sidebar-toggle d-md-down-none">
                <i class="fa fa-bars"></i>
            </a>
            <ul class="navbar-nav ml-auto">
                <li v-for = "navItem in navdata.navItems" class="nav-item">
                    <a href="#">
                        <i v-bind="{class:navItem.class}"></i>
                        <span class="badge badge-pill badge-danger">{{navItem.badge}}</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link " href="#" role="button" >
                        <span class="">{{navdata.userItems.username}}</span>
                        <i v-on:click="logout" class="fa fa-sign-out" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    `,
    methods: {
        //切换为电脑
        change: function(){
            $('body').toggleClass('sidebar-hidden');
        },
        //切换为手机
        changeMobile: function(){
            $('body').toggleClass('sidebar-mobile-show');
        },
        //退出登录
        logout: function(){
            _this = this;
            $.post("/vue/logout",callback);
            function callback(data){
                _this.message(data);
                if(data.code==200){
                    window.location = "/app/login.html#";
                }
            }
        },
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
        }
    }
};
Vue.component('ruerpnav', ruerpnav);

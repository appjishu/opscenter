var ruerpsidebar = {
    props: ['sidebardata','processdata','sidebarops',"currentPath"],
    template:`
        <div class="sidebar">
            <nav class="sidebar-nav">
                <vue-scroll v-bind="{ops:sidebarops}">
                    <ul class="nav">
                        <template v-for="sidebarItem in sidebardata">
                            <li class="nav-title">{{sidebarItem.name}}</li>
                            <li v-for="sidebarMenuItem in sidebarItem.menu" class="nav-item nav-dropdown">
                                <a v-on:click="change($event)" v-bind="{href:sidebarMenuItem.href,class:sidebarMenuItem.active?'nav-link nav-dropdown-toggle active':'nav-link nav-dropdown-toggle'}">
                                    <i v-bind="{class:sidebarMenuItem.class}"></i> {{sidebarMenuItem.name}} <i v-bind="{class:sidebarMenuItem.hasSubMenu?'fa fa-caret-left':''}"></i>
                                </a>
                                <ul v-if="sidebarMenuItem.hasSubMenu"  class="nav-dropdown-items">                    
                                    <li v-for="sidebarSubMenuItem in sidebarMenuItem.list" class="nav-item">
                                        <a v-bind="{href:sidebarSubMenuItem.href,class:sidebarSubMenuItem.href=='#'+currentPath?'nav-link active':'nav-link'}">
                                            <i v-bind="{class:sidebarSubMenuItem.class}"></i> {{sidebarSubMenuItem.name}}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </template>
                    </ul>
                </vue-scroll>
            </nav>
            <div class="sidebar-process">
                <vue-scroll v-bind="{ops:sidebarops}">
                    <ul class="nav">
                        <li v-for="processItem in processdata" class="nav-title">
                            <span v-bind="{class:processItem.href=='#'+currentPath?'process-link active':'process-link'}">
                                <i v-on:click="close(processItem.href)" class="fa fa-window-close nav-close" aria-hidden="true"></i> 
                                <a v-bind="{href:processItem.href}" class="process-a">{{processItem.name}}</a>
                            </span>
                        </li>
                    </ul>
                </vue-scroll>
            </div>
        </div>
    `,
    methods: {
        change: function(e){
            $(e.currentTarget).parent().toggleClass('open');
        },
        close: function(href){
            var _this = this;
            function getIndex(href){
                if(href==undefined || href=="") return -1;
                return _this.processdata.findIndex(function(value, index, arr) {
                    if(value.href == href) return true;
                })
            }
            var index = getIndex(href);
            var processdata = _this.processdata[index];
            if(index!=-1) _this.processdata.splice(index,1);
            if(processdata.href == "#"+_this.$parent.currentPath){
                var len = _this.processdata.length;
                var url = "";
                if(len>0){
                    url = _this.processdata[len-1].href;
                }else{
                    url = "#"+_this.$parent.homepage;
                }
                window.location = url;
            }
        }
    }
};
Vue.component('ruerpsidebar', ruerpsidebar);

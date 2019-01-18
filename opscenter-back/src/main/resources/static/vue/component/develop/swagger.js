var swagger = {
    template: `
        <div class="swagger">
		    <iframe src="/swagger-ui.html" class="swagger-iframe"></iframe>
		</div>
    `,
    data:function(){
        return {
           
        }
    },
    mounted:function(){
    },
    methods:{
    }
}

Vue.component('swagger', swagger);
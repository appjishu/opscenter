var activiti = {
    template: `
        <div class="activiti">
		    <iframe src="/modeler?modelId=1" class="activiti-iframe"></iframe>
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

Vue.component('activiti', activiti);
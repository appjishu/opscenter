var databaseeditor = {
    template: `
        <div class="databaseeditor">
            <el-row  type="flex" class="editor">
                <el-col :span="4" class="datasource">
                    <div class="grid-content ">
                        <div class="title">
                            	数据源
                            <el-popover
                            placement="bottom"
                            width="300"
                            trigger="click">
                            <div class="option">
                                <button type="button" v-on:click="saveDatasource" class="btn" title="提交"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                <button type="button" v-on:click="addDatasource" class="btn" title="新增"><i class="fa fa-plus" aria-hidden="true"></i></button>
                            </div>
                            <el-input
                                placeholder="数据源名称"
                                v-model="currentDatasource.poolName">
                            </el-input>
                            <el-select v-model="currentDatasource.driverClassName" placeholder="数据源类型">
                                <el-option
                                v-for="item in serverTypes"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input
                                type="textarea"
                                placeholder="数据源地址"
                                v-model="currentDatasource.jdbcUrl">
                            </el-input>
                            <el-input
                                placeholder="用户名"
                                v-model="currentDatasource.username">
                            </el-input>
                            <el-input
                                placeholder="密码"
                                v-model="currentDatasource.password">
                            </el-input>
                            <el-input
                                placeholder="最小连接数"
                                v-model="currentDatasource.minimumIdle">
                            </el-input>
                            <el-input
                                placeholder="最大连接数"
                                v-model="currentDatasource.maximumPoolSize">
                            </el-input>
                            <el-input
                                placeholder="超时时间"
                                v-model="currentDatasource.idleTimeout">
                            </el-input>
                            <el-input
                                placeholder="连接超时时间"
                                v-model="currentDatasource.connectionTimeout">
                            </el-input>
                            <el-button class="right-btn" type="text" slot="reference"><i class="fa fa-edit" aria-hidden="true"></i></el-button>

                        </el-popover>
                            <el-button class="right-btn" type="text" v-on:click="refreshDatasource"><i class="fa fa-rotate-right" aria-hidden="true"></i></el-button>
                            <el-button class="right-btn" type="text" v-on:click="initDatasource"><i class="fa fa-wrench" aria-hidden="true"></i></el-button>
                        </div>
                        <div v-loading="loaddatasource" class="list">
                            <vue-scroll v-bind="{ops:ops}">
                                <el-card v-bind="{class:datasourceItem==currentPoolName?'box-card background-l3':'box-card background-l2'}" v-for = "(datasourceItem,index) in datasourceList" :key="index" >
                                    <div v-on:click="showDatabase(datasourceItem)">
                                        <span >{{datasourceItem}}</span>
                                    </div>
                                </el-card>
                            </vue-scroll>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" class="table-list">
                    <div class="grid-content">
                        <div class="title">
                            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                                <el-tab-pane label="数据表" name="table"></el-tab-pane>
                                <el-tab-pane label="存储过程" name="procedure"></el-tab-pane>
                                <el-tab-pane label="功能" name="method"></el-tab-pane>
                            </el-tabs>
                            <el-button class="right-btn show-form" type="text" v-on:click="optionChange(true);"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></el-button>
                            <el-button class="right-btn" type="text" v-on:click="addFrom"><i class="fa fa-plus" aria-hidden="true"></i></el-button>
                            <el-button class="right-btn" type="text" v-on:click="refreshTable"><i class="fa fa-rotate-right" aria-hidden="true"></i></el-button>
                        </div>
                        <div>
                            <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                                <el-button v-on:click="search" class="btn" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                        <div v-loading="loadtable" class="list">
                            <vue-scroll v-bind="{ops:ops}">
                                <div v-if="activeName=='table'">
                                    <el-card v-bind="{class:tableItem.name==currentTableEdit.name?'box-card background-l2':'box-card background-l1'}" v-for = "(tableItem,index) in tableList" :key="index" style="font-size:9px;">
                                        <div v-on:click="showTable(tableItem.name)">
                                            <span >{{tableItem.name}}</span>
                                        </div>
                                    </el-card>
                                </div>
                                <div v-if="activeName=='procedure'">
                                    <el-card v-bind="{class:procedureItem.name==currentProcedure.name?'box-card background-l2':'box-card background-l1'}"  class="box-card" v-for = "(procedureItem,index) in procedureList" :key="index" style="font-size:9px;">
                                        <div v-on:click="showProcedure(procedureItem.name)">
                                            <span >{{procedureItem.name}}</span>
                                        </div>
                                    </el-card>
                                </div>
                                <div v-if="activeName=='method'">
                                    <el-card v-bind="{class:methodItem.methodName==currentMethodEdit.methodName?'box-card background-l2':'box-card background-l1'}"  class="box-card" v-for = "(methodItem,index) in methodList" :key="index" style="font-size:9px;">
                                        <div v-on:click="showMethod(methodItem.methodName)">
                                            <span >{{methodItem.methodName}}</span>
                                        </div>
                                    </el-card>
                                </div>
                            </vue-scroll>
                        </div>
                    </div>
                </el-col>
                <el-col :span="14" v-bind="{class: optionStatus ?'form-editor':'form-editor hidden'}">
                    <div class="grid-content ">
                        <div class="title">
                            <el-button class="left-btn show-form" type="text"  v-on:click="optionChange(false);"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></el-button>
                            <span v-if="formStatus==0">
                                	初始化数据库
                            </span>
                            <span v-if="formStatus==1">
                                	数据源编辑
                            </span>
                            <span v-if="formStatus==2">
                                	数据表编辑
                            </span>
                            <span v-if="formStatus==3">
    								存储过程编辑
                            </span>
                            <span v-if="formStatus==4">
    								功能编辑
                            </span>
                        </div>
                        <div v-if="formStatus==0">
                            <div class="option">
                                <button type="button" v-on:click="saveFile" class="btn" title="保存"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                <button type="button" v-on:click="runFile" class="btn" title="执行"><i class="fa fa-play" aria-hidden="true"></i></button>
                            </div>
                            <codemirror v-if="initSql.fileName!=''" :value="initSql.content" @change="changeInit" :options="initSql.options"></codemirror>
                        </div>
                        <div v-if="formStatus==1">
                            <div class="option">
                                <button type="button" v-on:click="runProcedure" class="btn" title="执行"><i class="fa fa-play" aria-hidden="true"></i></button>
                                <el-popover
                                    placement="bottom"
                                    width="300"
                                    trigger="click">
                                    <div class="option">
                                        <button type="button" v-on:click="addMethod" class="btn" title="提交"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                        <button type="button" v-on:click="loadMethod" class="btn" title="获取参考"><i class="fa fa-clone" aria-hidden="true"></i></button>
                                    </div>
                                    <el-input
                                        readonly=readonly
                                        placeholder="功能名称"
                                        v-model="currentMethod.methodName">
                                    </el-input>
                                    <el-input
                                        placeholder="功能描述"
                                        v-model="currentMethod.document">
                                    </el-input>
                                    <el-input
                                        type="textarea"
                                        placeholder="功能内容"
                                        v-model="currentMethod.sql">
                                    </el-input>
                                    <el-input
                                        type="textarea"
                                        placeholder="返回参数"
                                        v-model="currentMethod.outParam">
                                    </el-input>
                                    <el-select v-model="currentMethod.rsStatus" placeholder="是否有结果集">
                                        <el-option
                                        v-for="item in rsStatus"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <button type="button" class="btn" slot="reference"><i class="fa fa-share-alt-square" aria-hidden="true"></i></button>
                                </el-popover>
                            </div>
                            <codemirror  :value="currentProcedure.code" @change="change" :options="currentProcedure.options"></codemirror>
                        </div>
                        <div v-if="formStatus==2" class="tableForm">
                            <div class="option">
                                <el-input v-model="currentColumn" placeholder="请输入添加字段" style="float:left;margin-right:5px;width:140px;display:inline-block;"></el-input> 
                                <button type="button" v-on:click="addColumn" class="btn" title="增加"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                <button type="button" v-on:click="loadCreateTable" class="btn" title="生成"><i class="fa fa-clone" aria-hidden="true"></i></button>
                                <button type="button" v-on:click="runCreateTable" class="btn" title="执行"><i class="fa fa-play" aria-hidden="true"></i></button>
                            	<el-popover
                                    placement="bottom"
                                    width="300"
                                    trigger="click">
                                    <div class="option">
                                        <button type="button" v-on:click="editMethodFromTable" class="btn" title="提交"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                        <button type="button" v-on:click="loadMethodFromTable" class="btn" title="获取参考"><i class="fa fa-clone" aria-hidden="true"></i></button>
                                    </div>
                                    <el-input
                                        placeholder="功能名称"
                                        v-model="currentMethodEdit.methodName">
                                    </el-input>
                                    <el-select  v-model="currentMethodEdit.methodType" placeholder="参照语句类型">
                                        <el-option
                                        v-for="item in methodTypes"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input
                                        placeholder="功能描述"
                                        v-model="currentMethodEdit.document">
                                    </el-input>
                                    <el-input
                                        type="textarea"
                                        placeholder="功能内容"
                                        v-model="currentMethodEdit.sql">
                                    </el-input>
                                    <el-select v-model="currentMethodEdit.sqlType" placeholder="功能SQL类型">
	                                    <el-option
	                                    v-for="item in sqlTypes"
	                                    :key="item.label"
	                                    :label="item.label"
	                                    :value="item.value">
	                                    </el-option>
	                                </el-select>
                                    <el-select v-model="currentMethodEdit.rsStatus" placeholder="是否有结果集">
                                        <el-option
                                        v-for="item in rsStatus"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <button type="button" class="btn" slot="reference"><i class="fa fa-share-alt-square" aria-hidden="true"></i></button>
                                </el-popover>
                            </div>
                            <div style="height:180px;padding:0 5px 5px 5px">
                                <el-table
                                     :data="currentTableEdit.columns"
                                     border
                                    height="175"
                                     style="width: 100%">
                                    <el-table-column
                                      label=""
                                      width="45">
                                      <template scope="scope">
                                           <button type="button" v-on:click="removeColumn(scope.row.field)" class="btn" title="生成"><i class="fa fa-times-rectangle" aria-hidden="true"></i></button>
                                        </template>
                                     </el-table-column>
                                     <el-table-column
                                      label="字段名"
                                      width="130">
                                      <template scope="scope">
                                        <el-input v-model="scope.row.field" placeholder="字段名"></el-input>  
                                        </template>
                                     </el-table-column>
                                    <el-table-column
                                      label="字段类型"
                                      width="110">
                                      <template scope="scope">
                                        <el-input v-model="scope.row.type" placeholder="字段类型"></el-input>  
                                        </template>
                                     </el-table-column>
                                    <el-table-column
                                      label="备注"
                                      width="100">
                                      <template scope="scope">
                                        <el-input v-model="scope.row.comment" placeholder="备注"></el-input>  
                                        </template>
                                     </el-table-column>
                                    <el-table-column
                                      label="为空"
                                      width="90">
                                      <template scope="scope">
	                                    <el-select v-model="scope.row.nullStatus">
		                                    <el-option
		                                    v-for="item in nullStatus"
		                                    :key="item.label"
		                                    :label="item.label"
		                                    :value="item.value">
		                                    </el-option>
		                                </el-select>
                                        </template>
                                     </el-table-column>
                                    <el-table-column
                                      label="键标识"
                                      width="100">
                                      <template scope="scope">
	                                    <el-select v-model="scope.row.keyx">
		                                    <el-option
		                                    v-for="item in keyxs"
		                                    :key="item.label"
		                                    :label="item.label"
		                                    :value="item.value">
		                                    </el-option>
		                                </el-select>
                                        </template>
                                     </el-table-column>
                                    <el-table-column
                                      label="自增"
                                      width="120">
                                      <template scope="scope">
	                                    <el-select v-model="scope.row.extra">
		                                    <el-option
		                                    v-for="item in extras"
		                                    :key="item.label"
		                                    :label="item.label"
		                                    :value="item.value">
	                                    	</el-option>
	                                    	</el-select>
                                        </template>
                                     </el-table-column>
                                    <el-table-column
                                      label="默认值"
                                      width="100">
                                      <template scope="scope">
                                        <el-input v-model="scope.row.defaultx" placeholder="默认值"></el-input>  
                                        </template>
                                     </el-table-column>
                                    
                                </el-table>
                            </div>
                            <codemirror  :value="currentTableEdit.createTable" @change="changeTable" :options="currentTableEdit.options"></codemirror>
                
                        </div>
                        <div v-if="formStatus==3">
                            <div class="option">
                                <button type="button" v-on:click="runProcedure" class="btn" title="执行"><i class="fa fa-play" aria-hidden="true"></i></button>
                                <el-popover
                                    placement="bottom"
                                    width="300"
                                    trigger="click">
                                    <div class="option">
                                        <button type="button" v-on:click="addMethod" class="btn" title="提交"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                        <button type="button" v-on:click="loadMethod" class="btn" title="获取参考"><i class="fa fa-clone" aria-hidden="true"></i></button>
                                    </div>
                                    <el-input
                                        readonly=readonly
                                        placeholder="功能名称"
                                        v-model="currentMethod.methodName">
                                    </el-input>
                                    <el-input
                                        placeholder="功能描述"
                                        v-model="currentMethod.document">
                                    </el-input>
                                    <el-input
                                        type="textarea"
                                        placeholder="功能内容"
                                        v-model="currentMethod.sql">
                                    </el-input>
                                    <el-input
                                        type="textarea"
                                        placeholder="返回参数"
                                        v-model="currentMethod.outParam">
                                    </el-input>
                                    <el-select v-model="currentMethod.rsStatus" placeholder="是否有结果集">
                                        <el-option
                                        v-for="item in rsStatus"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <button type="button" class="btn" slot="reference"><i class="fa fa-share-alt-square" aria-hidden="true"></i></button>
                                </el-popover>
                            </div>
                            <codemirror  :value="currentProcedure.code" @change="change" :options="currentProcedure.options"></codemirror>
                        </div>
                        <div v-if="formStatus==4">
                            <div class="option">
                            <el-popover
                                placement="bottom"
                                width="300"
                                trigger="click">
                                <div class="option">
                                    <button type="button" v-on:click="editMethod" class="btn" title="提交"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                </div>
                                <el-input
                                    placeholder="功能名称"
                                    v-model="currentMethodEdit.methodName">
                                </el-input>
                                <el-input
                                    placeholder="功能描述"
                                    v-model="currentMethodEdit.document">
                                </el-input>
                                <el-input
                                    type="textarea"
                                    placeholder="返回参数"
                                    v-model="currentMethodEdit.outParam">
                                </el-input>
                                <el-select v-model="currentMethodEdit.sqlType" placeholder="功能SQL类型">
                                    <el-option
                                    v-for="item in sqlTypes"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="currentMethodEdit.rsStatus" placeholder="是否有结果集">
                                    <el-option
                                    v-for="item in rsStatus"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <button type="button" class="btn" slot="reference"><i class="fa fa-share-alt-square" aria-hidden="true"></i></button>
                            </el-popover>
                            <el-popover
                                placement="bottom"
                                width="300"
                                trigger="click">
                                <div class="option">
                                    <button type="button" v-on:click="runMethod" class="btn" title="执行"><i class="fa fa fa-play" aria-hidden="true"></i></button>
                                </div>
                                <el-input
                                    placeholder="功能名称"
                                    readonly=readonly
                                    v-model="currentMethodEdit.methodName">
                                </el-input>
                                <el-input
                                    type="textarea"
                                    placeholder="请求参数"
                                    v-model="currentTest.request">
                                </el-input>
                                <el-input
                                type="textarea"
                                placeholder="返回信息"
                                v-model="currentTest.response">
                                </el-input>
                                <button type="button" class="btn" slot="reference"><i class="fa fa-feed" aria-hidden="true"></i></button>
                            </el-popover>
                        </div>
                        <codemirror :value="currentMethodEdit.sql" @change="changeMethod" :options="currentMethodEdit.options"></codemirror>

                        </div>
                        
                    </div>
                </el-col>
            </el-row>
        </div>
    `,
    data:function(){
        return {
            //初始化数据库文件
            initSql:{
                fileName:"",
                content:"",
                options:{
                    mode: "text/x-sql",
                    selectionPointer: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    continueComments: "Enter",
                    extraKeys: {"Ctrl": "autocomplete"}
                }
            },
            //搜索内容
            searchContent:"",
            //操作状态
            optionStatus:false,
            //文件操作链接
            fileUrl: {
                initsqlfile : "/project/initsqlfile",
                save : "/project/filesave",
            },
            //功能操作链接
            methodUrl:{
                sqlRunner:"/method/sqlrunner",
                createMethod:"/method/createmethod",
                loadMethodList:"/method/loadmethodlist",
                loadMethodEdit:"/method/loadmethodedit",
                execMethod:"/method/execMethod"
            },
            //数据库操作链接
            databaseUrl:{
                loadDatasourceList:"/database/querylist",
                loadDatasource:"/database/querydatabase",
                addDatasource:"/database/createdatabase",
                editDatasource:"/database/updatedatabase",
                removeDatasource:"/database/deletedatabase",
                loadTableList:"/database/loadtablelist",
                loadTable:"/database/loadtable",
                loadColumn:"/database/loadcolumn",
                loadCreateTable:"/database/loadcreatetable",
                addTable:"/table/add",
                editTable:"/table/edit",
                removeTable:"/table/remove",
                loadProcedureList:"/database/loadprocedurelist",
                loadProcedure:"/database/loadprocedure",
                queryProcedureMethod:"/database/queryproceduremethod",
                addProcedure:"/table/add",
                editProcedure:"/table/edit",
                removeProcedure:"/table/remove"
            },
            //滚动条设置
            ops:{
                bar: {
                    background: "rgb(0,95,127)",
                    size: "5px"
                }
            },
            //数据源列表
            datasourceList:[],
            //数据表列表
            tableList:[],
            procedureList:[],
            methodList:[],
            //所有数据(前端查询使用的缓存列表)
            tableListAll:[],
            procedureListAll:[],
            methodListAll:[],
            //当前数据源
            currentPoolName:"",
            //当前存储过程
            currentProcedure:{
                name:"",
                code:"",
                options:{
                    mode: "text/x-sql",
                    selectionPointer: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    continueComments: "Enter",
                    extraKeys: {"Ctrl": "autocomplete"}
                }
            },
            //当前编辑表格
            currentTableEdit:{
                columns:[],
                name:"",
                createTable:"",
                options:{
                    mode: "text/x-sql",
                    selectionPointer: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    continueComments: "Enter",
                    extraKeys: {"Ctrl": "autocomplete"}
                }
            },
            //当前编辑功能
            currentMethodEdit:{
                methodName:"",
                sql:"",
                outParam:"",
                rsStatus:"",
                document:"",
                sqlType:"",
                methodType:"",
                options:{
                    mode: "text/x-sql",
                    selectionPointer: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    continueComments: "Enter",
                    extraKeys: {"Ctrl": "autocomplete"}
                }
            },
            //当前数据源
            currentDatasource:{
                poolName:"",
                driverClassName:"",
                driverClassName:"",
                jdbcUrl:"",
                connectionTimeout:"",
                idleTimeout:"",
                maximumPoolSize:"",
                minimumIdle:"",
                username:"",
                password:""
            },

            //当前功能
            currentMethod:{
                methodName:"",
                sql:"",
                outParam:"",
                rsStatus:"",
                document:"",
                sqlType:"PROCEDURE"
            },
            //当前功能
            currentTest:{
                request:"",
                response:""
            },
            //表单状态
            formStatus:0, //0.初始化数据库 1.数据源表单 2.数据表表单 3.存储过程编辑 4.功能编辑
            //加载数据源
            loaddatasource:false,
            //加载数据表
            loadtable:false,
            //加载显示或编辑表单
            loadform:false,
            //当前激活选项
            activeName: 'table',
            //结果集状态
            rsStatus:[{
                value: true,
                label: '有结果集'
              }, {
                value: false,
                label: '无结果集'
              }],
              sqlTypes:[{
                value: 'PROCEDURE',
                label: 'PROCEDURE'
              }, {
                value: 'MAPONLY',
                label: 'MAPONLY'
              }, {
                value: 'LISTONLY',
                label: 'LISTONLY'
              }, {
                value: 'TRANSITION',
                label: 'TRANSITION'
              }],
              serverTypes:[{
                value: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
                label: 'SQLServer'
              }, {
                value: 'com.mysql.jdbc.Driver',
                label: 'MySQL'
              }],
              methodTypes:[{
                  value: 'select',
                  label: '查询'
                },{
                  value: 'insert',
                  label: '新增'
                }, {
                  value: 'update',
                  label: '修改'
                }, {
	                value: 'delete',
	                label: '删除'
	              }],
	          nullStatus:[{
                  value: 'NO',
                  label: 'NO'
                },{
                  value: 'YES',
                  label: 'YES'
                }],
                keyxs:[{
                        value: '',
                        label: '不设置'
                      },{
                    value: 'PRI',
                    label: '主键'
                  },{
                    value: 'UNI',
                    label: '唯一'
                  }],
              extras:[{
                  value: '',
                  label: '不设置'
                },{
                  value: 'auto_increment',
                  label: 'MYSQL自增'
                },{
                  value: 'IDENTITY(1,1)',
                  label: 'MSSQL自增'
                }],   
                  
              currentColumn:""
        }
    },
    mounted:function(){
        var _this = this;
        _this.init();
    },
    methods:{
        //切换操作区
        optionChange:function(optionStatus){
            this.optionStatus = optionStatus;
        },
        //初始化
        init:function(){
            var _this = this;
            _this.refreshDatasource();            
        },
        //刷新数据源
        refreshDatasource: function(){
            var _this = this;
            _this.loaddatasource = true;
            $.get(_this.databaseUrl.loadDatasourceList,callback);
            function callback(data){
                console.info(data);
                _this.datasourceList = data;
                if(data){
                    _this.message({code:201,message: "数据源加载完整 !"});
                }
                _this.loaddatasource = false;
            }
        },
        //刷新数据表
        refreshTable: function(){
            var _this = this;
            _this.loadtable = true;
            if(_this.activeName=="table"){
                $.get(_this.databaseUrl.loadTableList,{poolName:_this.currentPoolName },callbackTableList);
                function callbackTableList(data){
                    _this.tableList = data;
                    _this.tableListAll = data
                    _this.loadtable = false;
                }
            }else if(_this.activeName=="procedure"){
                $.get(_this.databaseUrl.loadProcedureList,{poolName:_this.currentPoolName },callbackProcedureList);
                function callbackProcedureList(data){
                    _this.procedureList = data;
                    _this.procedureListAll = data;
                    _this.loadtable = false;
                }
            }else if(_this.activeName=="method"){
                $.get(_this.methodUrl.loadMethodList,{poolName:_this.currentPoolName },callbackMethodList);
                function callbackMethodList(data){
                    _this.methodList = data;
                    _this.methodListAll = data;
                    _this.loadtable = false;
                }
            }
        },
        add1: function(){

        },
        addDatasource: function(){
            var _this = this;
            _this.currentDatasource.poolName = "",
            _this.currentDatasource.driverClassName = "",
            _this.currentDatasource.jdbcUrl = "",
            _this.currentDatasource.username = "",
            _this.currentDatasource.password = "",
            _this.currentDatasource.minimumIdle = "",
            _this.currentDatasource.idleTimeout = "",
            _this.currentDatasource.maximumPoolSize = "",
            _this.currentDatasource.connectionTimeout = "",
            _this.currentDatasource.poolName = ""
        },
        addFrom: function(){
            var _this = this;
            if(_this.activeName=="table"){
                _this.formStatus = 2;
            }
            if(_this.activeName=="procedure"){
                _this.formStatus = 3;
                _this.currentProcedure.name="";
                _this.currentProcedure.code="";
            }
            if(_this.activeName=="method"){
                _this.formStatus = 4;
                _this.currentMethodEdit.methodName="";
                _this.currentMethodEdit.document="";
                _this.currentMethodEdit.sql="";
                _this.currentMethodEdit.outParam="";
                _this.currentMethodEdit.sqlType="";
                _this.currentMethodEdit.rsStatus="";
            }
        },
        //切换面板
        handleClick(tab) {
            console.log(tab.name,this.activeName);
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
        },
        //显示数据库数据表及存储过程
        showDatabase(poolName){
            var _this = this;
            _this.loadtable = true;
            _this.currentPoolName = poolName;
            if(poolName!="normal"){
                $.get(_this.databaseUrl.loadDatasource,{poolName:poolName},callbackDatasource);
                function callbackDatasource(data){
                    _this.currentDatasource = data;
                }
            }else{
                _this.message({code:500,message:"不允许修改默认数据源"});
            }
            $.get(_this.databaseUrl.loadProcedureList,{poolName:poolName},callbackProcedureList);
            function callbackProcedureList(data){
                _this.procedureList = data;
                _this.procedureListAll = data;
                _this.loadtable = false;
            }
            $.get(_this.databaseUrl.loadTableList,{poolName:poolName},callbackTableList);
            function callbackTableList(data){
                _this.tableList = data;
                _this.tableListAll = data;
                _this.loadtable = false;
            }
            $.get(_this.methodUrl.loadMethodList,{poolName:poolName},callbackMethodList);
            function callbackMethodList(data){
                _this.methodList = data;
                _this.methodListAll = data;
                _this.loadtable = false;
            }
        },
        //显示表格信息
        showTable(name){
            var _this = this;
            _this.loadform = true;
            _this.formStatus = 2;
            $.get(_this.databaseUrl.loadTable,{poolName:_this.currentPoolName,name:name},callbackProcedure);
            function callbackProcedure(data){
                _this.currentTableEdit.createTable = data.createTable;
                _this.currentTableEdit.name=data.name;
                _this.currentTableEdit.columns=data.columns;
                _this.loadform = false;
            }
        },
        //显示存储过程信息
        showProcedure(name){
            var _this = this;
            _this.loadform = true;
            _this.formStatus = 3;
            $.get(_this.databaseUrl.loadProcedure,{poolName:_this.currentPoolName,name:name},callbackProcedure);
            function callbackProcedure(data){
                _this.currentProcedure.name=data.name;
                _this.currentMethod.methodName=data.name;
                _this.currentMethod.sql="";
                _this.currentMethod.outParam="",
                _this.currentMethod.rsStatus="",
                _this.currentMethod.document="",
                _this.currentProcedure.code=data.text;
                _this.loadform = false;
            }
        },
        //显示需要编辑的方法
        showMethod(methodName){
            var _this = this;
            _this.loadform = true;
            _this.formStatus = 4;
            $.get(_this.methodUrl.loadMethodEdit,{poolName:_this.currentPoolName,methodName:methodName},callbackMethodEdit);
            function callbackMethodEdit(data){
                console.info(data);
                if(data==undefined){
                    _this.message({code:500,message:"该功能不存在 !"});
                    _this.loadform = false;
                }else{
                    _this.currentMethodEdit.methodName=data.methodName;
                    _this.currentMethodEdit.document=data.document;
                    _this.currentMethodEdit.sql=data.sql;
                    _this.currentMethodEdit.outParam=data.outParam;
                    _this.currentMethodEdit.sqlType=data.sqlType;
                    _this.currentMethodEdit.rsStatus=data.rsStatus;
                    _this.message({code:200,message:"功能加载成功  !"})
                    _this.loadform = false;
                }
            }
        },
        //编辑改变
        change:function(changeObj){
            var _this = this;
            _this.currentProcedure.code = changeObj.trim();
        },
        //编辑改变
        changeMethod:function(changeObj){
            var _this = this;
            _this.currentMethodEdit.sql = changeObj.trim();
        },
        //编辑改变
        changeTable:function(changeObj){
            var _this = this;
            _this.currentTableEdit.createTable = changeObj.trim();
        },
        //基础信息编辑改变
        changeInit:function(changeObj){
            var _this = this;
            _this.initSql.content = changeObj.trim();
        },
        //保存数据源
        saveDatasource:function(){
            var _this = this;
            $.post(_this.databaseUrl.addDatasource,_this.currentDatasource,callback_datasource)
            function callback_datasource(data){
                _this.message(data);
            }
        },
        //添加存储过程功能
        addMethod:function(){
            var _this = this;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                return;
            }
            if(_this.currentMethod.methodName==""){
                _this.message({code:500,message:"请参照当前存储过程生成 !"});
                return;
            }
            if(_this.currentMethod.sql==""||_this.currentMethod.document==""){
                _this.message({code:500,message:"请完善基本信息 !"});
                return;
            }
            _this.currentMethod.poolName = _this.currentPoolName;
            $.post(_this.methodUrl.createMethod,_this.currentMethod,callback_method)
            function callback_method(data){
                _this.message(data);
            }
        },
        //编辑普通功能
        editMethod:function(){
            var _this = this;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                return;
            }
            if(_this.currentMethodEdit.methodName==""){
                _this.message({code:500,message:"请输入功能名称 !"});
                return;
            }
            if(_this.currentMethodEdit.sql==""||_this.currentMethodEdit.document==""){
                _this.message({code:500,message:"请完善基本信息 !"});
                return;
            }
            _this.currentMethodEdit.poolName = _this.currentPoolName;
            $.post(_this.methodUrl.createMethod,_this.currentMethodEdit,callback_method)
            function callback_method(data){
                _this.message(data);
            }
        },
      //编辑普通功能
        editMethodFromTable:function(){
            var _this = this;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                return;
            }
            if(_this.currentMethodEdit.methodName==""){
                _this.message({code:500,message:"请输入功能名称 !"});
                return;
            }
            if(_this.currentMethodEdit.sql==""||_this.currentMethodEdit.document==""){
                _this.message({code:500,message:"请完善基本信息 !"});
                return;
            }
            _this.currentMethodEdit.poolName = _this.currentPoolName;
            $.post(_this.methodUrl.createMethod,_this.currentMethodEdit,callback_method)
            function callback_method(data){
                _this.message(data);
            }
        },
        //加载默认存储过程方法
        loadMethod:function(){
            var _this=this;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                return;
            }
            if(_this.currentMethod.methodName==""){
                _this.message({code:500,message:"请参照当前存储过程生成 !"});
                return;
            }
            $.get(_this.databaseUrl.queryProcedureMethod,{poolName:_this.currentPoolName,name:_this.currentProcedure.name},callback_method)
            function callback_method(data){
                if(data==undefined){
                    _this.message({code:400,message:"加载存储过程方法信息失败 !"});
                }else{
                    _this.currentMethod.outParam = data.outParam;
                    _this.currentMethod.sql = data.sql;
                    _this.message({code:200,message:"加载存储过程方法信息成功 !"});
                }
                
            }
        },
        //加载表生成语句
        loadMethodFromTable:function(){
        	var _this = this;
        	if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                return;
            }
            if(_this.currentTableEdit.name==""){
                _this.message({code:500,message:"请参照当前数据表生成 !"});
                return;
            }
            if(_this.currentMethodEdit.methodType==""){
                _this.message({code:500,message:"请选择生成语句类型 !"});
                return;
            }
            
            var len = _this.currentTableEdit.columns.length;
            var sql ="";
            var fieldStr = "";
            var fieldValueStr = "";
            var fieldSetStr = "";
            if(_this.currentMethodEdit.methodType=="select"){
            	_this.currentMethodEdit.methodName = _this.currentTableEdit.name+"Query";
            	sql += "select ";
            }
            if(_this.currentMethodEdit.methodType=="insert"){
            	_this.currentMethodEdit.methodName = _this.currentTableEdit.name+"Add";
            	sql += "insert into " + _this.currentTableEdit.name +" ( \r\n"
            }
            if(_this.currentMethodEdit.methodType=="update"){
            	_this.currentMethodEdit.methodName = _this.currentTableEdit.name+"Edit";
            	sql += "update " + _this.currentTableEdit.name +" set \r\n"
            }
            if(_this.currentMethodEdit.methodType=="delete"){
            	_this.currentMethodEdit.methodName = _this.currentTableEdit.name+"Remove";
            	sql += "delete from " + _this.currentTableEdit.name +" where \r\n"
            }
            for(var i=0;i<len;i++){
            	var column = _this.currentTableEdit.columns[i];
            	fieldStr += column.field+" , ";
            	fieldValueStr +=  ":"+column.field+" , ";
            	fieldSetStr +=  column.field+" = "+":"+column.field+" , ";
            }
            fieldStr = fieldStr.substring(0,fieldStr.length-3);
            fieldValueStr = fieldValueStr.substring(0,fieldValueStr.length-3)
            fieldSetStr = fieldSetStr.substring(0,fieldSetStr.length-3)
            if(_this.currentMethodEdit.methodType=="select"){
            	sql += fieldStr ;
            	sql += "\r\n from "+ _this.currentTableEdit.name + " where \r\n";
            	sql += fieldSetStr;
            }
            if(_this.currentMethodEdit.methodType=="insert"){
            	sql += fieldStr ;
            	sql += "\r\n ) values ( \r\n";
            	sql += fieldValueStr;
            	sql += " )";
            }
            if(_this.currentMethodEdit.methodType=="update"){
            	sql += fieldSetStr ;
            	sql += "\r\n where \r\n" ;
            	sql += fieldSetStr ;
            }
            if(_this.currentMethodEdit.methodType=="delete"){
            	sql += fieldSetStr ;
            }
            
            _this.currentMethodEdit.sql = sql;
        },
        runMethod:function(){
        	var _this = this;
        	_this.currentTest.response = "";
        	console.info(_this.currentTest.request)
        	var json =  $.parseJSON(_this.currentTest.request);
        	json.poolName = _this.currentPoolName,name;
        	json.methodName = _this.currentMethodEdit.methodName; 	
        	$.ajax({
                type: "POST",
                url:  _this.methodUrl.execMethod,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                	_this.currentTest.response = JSON.stringify(data);
                },
                error: function (message) {
                }
            });
        },
        //初始化数据源
        initDatasource:function(){
            var _this = this;
            _this.loadform=true;
            _this.formStatus = 0;
            $.post(_this.fileUrl.initsqlfile,callback_file)
            function callback_file(data){
                var content = data.content;
                _this.initSql.fileName = data.fileName;
                _this.initSql.content = content.trim();
                _this.message({code:201,message:"初始化数据库文件加载成功 !"});
                _this.loadform=false;
            }
        },
        //保存初始化文件
        saveFile:function(){
            var _this = this;
            _this.loadform=true;
            $.post(_this.fileUrl.save,{"fileName":_this.initSql.fileName,"content":_this.initSql.content.trim()},callback_edit)
            function callback_edit(data){
                if(data.code == "200") {
                    _this.initSql.content = data.content.trim();
                }
                _this.loadform=false;
                _this.message(data);
            }
        },
        //执行初始化文件
        runFile:function(){
            var _this = this;
            _this.loadform=true;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                _this.loadform=false;
                return;
            }
            $.post(_this.methodUrl.sqlRunner,{"poolName":_this.currentPoolName,"sql":_this.initSql.content.trim()},callback_run)
            function callback_run(data){
                _this.loadform=false;
                _this.message(data);
            }
        },
        //执行存储过程更新
        runProcedure:function(){
            var _this = this;
            _this.loadform=true;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                _this.loadform=false;
                return;
            }
            $.post(_this.methodUrl.sqlRunner,{"poolName":_this.currentPoolName,"sql":_this.currentProcedure.code.trim()},callback_run)
            function callback_run(data){
                _this.loadform=false;
                _this.message(data);
            }
        },
        //执行存储过程更新
        runCreateTable:function(){
            var _this = this;
            _this.loadform=true;
            if(_this.currentPoolName==""){
                _this.message({code:500,message:"请选择数据源 !"});
                _this.loadform=false;
                return;
            }
            $.post(_this.methodUrl.sqlRunner,{"poolName":_this.currentPoolName,"sql":_this.currentTableEdit.createTable.trim()},callback_run)
            function callback_run(data){
                _this.loadform=false;
                _this.message(data);
            }
        },
        //获取字段
        addColumn:function(){
            var _this = this;
            $.get(_this.databaseUrl.loadColumn,{column:_this.currentColumn},callback);
            function callback(data){
                _this.currentTableEdit.columns.push(data);
            }
        },

        removeColumn:function(column){
            var index = this.currentTableEdit.columns.findIndex(function(value, index, arr) {
                if(value.field == column) return true;
            })
            this.currentTableEdit.columns.splice(index,1);
        },
        loadCreateTable: function(){
            var _this= this;
            $.post(_this.databaseUrl.loadCreateTable,{poolName:_this.currentPoolName,name:_this.currentTableEdit.name,columns:JSON.stringify(_this.currentTableEdit.columns)},callback);
            function callback(data){
                _this.currentTableEdit.createTable = data .createTable;
            }
        },
        search:function(){
            var _this = this;
            var result = [];
            if(_this.activeName=="table"){
                _this.tableListAll.forEach(function (item, index) {
                    if (item.name.includes(_this.searchContent)) {
                        result.push(item);
                    }
                })
                _this.tableList = result
            }

            if(_this.activeName=="procedure"){
                _this.procedureListAll.forEach(function (item, index) {
                    if (item.name.includes(_this.searchContent)) {
                        result.push(item);
                    }
                })
                _this.procedureList = result
            }
            
            if(_this.activeName=="method"){
                _this.methodListAll.forEach(function (item, index) {
                    if (item.methodName.includes(_this.searchContent)) {
                        result.push(item);
                    }
                })
                _this.methodList = result
            }
        }
    }
}

Vue.component('databaseeditor', databaseeditor);
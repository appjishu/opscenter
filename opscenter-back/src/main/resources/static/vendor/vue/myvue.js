var Control = {
    props: ['label','type','value','data','placeholder'],
    template:`<div>           
        <div v-if='type=="text"' class="control-group">
            <label class="control-label" for="input01">{{ label }}</label>
            <div class="controls">
                <input type="text" v-bind='{"placeholder": placeholder}' class="clear-outline clear-pm item itemskin ">
            </div>
        </div>

        <div v-if='type=="search"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <input type="text" placeholder="placeholder" class="input-xlarge search-query">
            </div>
        </div>

        <div v-if='type=="preText"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-1 clear-pm text-center">
                        <input type="checkbox" class="clear-pm clear-outline ">
                    </div>
                    <div class="col-11 clear-pm">
                    <input class="clear-pm clear-outline itemskin wdauto" v-bind='{"placeholder":placeholder}' type="text">
                    </div>
                </div>
            </div>
        </div>

        <div v-if='type=="appendText"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
              <div class="input-append">
                <input class="span2" placeholder="placeholder" type="text">
                <span class="add-on">
                  <label class="checkbox" for="appendedCheckbox">
                    <input type="checkbox" class="">
                  </label>
                </span>
              </div>
            </div>
        </div>

        <div v-if='type=="preCheckbox"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <div class="input-prepend">
                    <span class="add-on">
                    <label class="checkbox">
                        <input type="checkbox" class="">
                    </label>
                    </span>
                    <input class="span2" placeholder="placeholder" type="text">
                </div>
            </div>
        </div>

        <div v-if='type=="textarea"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
              <div class="textarea">
                    <textarea type="" class=""> </textarea>
              </div>
            </div>
          </div>
          
        <div v-if='type=="selectBasic"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <select class="input-xlarge">
                <option>Enter</option>
                <option>Your</option>
                <option>Options</option>
                <option>Here!</option>
                </select>
            </div>
        </div>

        <div  v-if='type=="selectMultiple"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <select class="input-xlarge" multiple="multiple">
                <option>Enter</option>
                <option>Your</option>
                <option>Options</option>
                <option>Here!</option>
                </select>
            </div>
        </div>

        <div v-if='type=="checkboxes"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
            <label class="checkbox">
                <input type="checkbox" value="Option one">
                Option one
            </label>
            <label class="checkbox">
                <input type="checkbox" value="Option two">
                Option two
            </label>
            </div>
        </div>

        <div v-if='type=="radioButtons"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
            <label class="radio">
                <input type="radio" value="Option one" name="group" checked="checked">
                Option one
            </label>
            <label class="radio">
                <input type="radio" value="Option two" name="group">
                Option two
            </label>
            </div>
        </div>

        <div v-if='type=="inlineCheckboxes"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
            <label class="checkbox inline">
                <input type="checkbox" value="1"> 1
            </label>
            <label class="checkbox inline">
                <input type="checkbox" value="2"> 2
            </label>
            <label class="checkbox inline">
                <input type="checkbox" value="3"> 3
            </label>
            </div>
        </div>

        <div v-if='type=="inlineRadios"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
            <label class="radio inline">
                <input type="radio" value="1" checked="checked" name="group">
                1
            </label>
            <label class="radio inline">
                <input type="radio" value="2" name="group">
                2
            </label>
            <label class="radio inline">
                <input type="radio" value="3">
                3
            </label>
            </div>
        </div>

        <div v-if='type=="fileButton"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <input class="clear-pm clear-outline item itemskin" id="fileInput" type="file">
            </div>
        </div>

        <div v-if='type=="button"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <button class="btn btn-success">Button</button>
            </div>
        </div>


        <div v-if='type=="find"' class="control-group">
            <label class="control-label" for="input01">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-10 clear-pm">
                        <input  class="clear-pm clear-outline itemskin wdauto" type="text" placeholder="数量"/>
                    </div>
                    <div class="col-2 clear-pm">
                        <input  class="clear-pm clear-outline itemskin wdauto" type="button" value="获取"/>
                    </div>
                </div>
            </div>
        </div>

        <div v-if='type=="customer"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-10 clear-pm">
                        <input type="text" v-bind='{"placeholder": placeholder}' class="clear-outline itemskin wdauto">
                    </div>
                    <div class="col-2 clear-pm">
                        <button type="button" class="clear-pm clear-outline itemskin findskin wdauto" ><i class="fa fa-search"></i></button>
                    </div>
                </div>
                
                <div class="card clear-pm item cardskin">
                    <div class="card-body clear-pm">
                        <h6>王先生</h6>
                        <p class="card-text">
                            客户名称:<br/>
                            客户电话:<br/>
                            客户地址:<br/>
                            信誉额度:<br/>
                        </p>
                        <a href="#" class="card-link">编辑客户</a>
                    </div>
                </div>
            </div>
        </div>
   

        <div v-if='type=="product"' class="control-group">
            <label class="control-label" for="input01">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-10 clear-pm">
                        <input type="text" v-bind='{"placeholder": placeholder}' class="clear-outline itemskin wdauto">
                    </div>
                    <div class="col-2 clear-pm">
                        <button  type="button" class="clear-pm clear-outline itemskin findskin wdauto" ><i class="fa fa-search"></i></button>
                    </div>
                </div>                
                <div class="card clear-pm item cardskin">
                    <div class="card-body clear-pm">
                        <h6>TOTO卫洗丽XXX</h6>
                        <p class="card-text">
                            品牌:<br/>
                            型号:<br/>
                            标价:<br/>
                            描述:<br/>
                            重量:<br/>
                            体积:<br/>
                            件换算:<br/>
                            箱换算:<br/>
                            拆分标识:<br/>
                        </p>
                        <a href="#" class="card-link">编辑商品</a>
                    </div>
                </div>
            </div>
            
        </div>
        <div v-if='type=="store"' class="control-group">
            <label class="control-label" for="input01">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-10 clear-pm">
                        <input type="text" v-bind='{"placeholder": placeholder}' class="clear-outline itemskin wdauto">
                    </div>
                    <div class="col-2 clear-pm">
                        <button  type="button" class="clear-pm clear-outline itemskin findskin wdauto" ><i class="fa fa-search"></i></button>
                    </div>
                </div>                 
                <div class="card clear-pm item cardskin">
                    <div class="card-body clear-pm">
                        <h6>TOTO东洲成品库</h6>
                        <p class="card-text">
                            可售量:<br/>
                        </p>
                        <a href="#" class="card-link">刷新库存</a>
                    </div>
                </div>
            </div>
        </div>
        

        <div v-if='type=="buyenter"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-3 clear-pm">
                        <input  class="clear-pm clear-outline itemskin wdauto" type="text" placeholder="数量"/>
                    </div>
                    <div class="col-1 clear-pm">
                        <span class="spanskin wdauto">*</span>
                    </div>
                    <div class="col-3 clear-pm">
                        <input  class="clear-pm clear-outline itemskin wdauto" type="text" placeholder="销售价"/>
                    </div>
                    <div class="col-1 clear-pm">
                        <span class="spanskin wdauto">=</span>
                    </div>
                    <div class="col-4 clear-pm">
                        <input  class="clear-pm clear-outline itemskin wdauto" type="text" placeholder="销售金额"/>
                    </div>
                </div>
            </div>
        </div>

        <div v-if='type=="region"' class="control-group">
            <label class="control-label">{{ label }}</label>
            <div class="controls">
                <div class="row clear-pm item">
                    <div class="col-4 clear-pm">
                        <select  class="clear-pm clear-outline itemskin wdauto selectskin">
                            <option class="clear-pm optionskin" value="">省</option>
                        </select>
                    </div>
                    <div class="col-4 clear-pm">
                        <select class="clear-pm clear-outline itemskin wdauto selectskin">
                            <option class="clear-pm optionskin" value="">地市</option>
                        </select>
                    </div>
                    <div class="col-4 clear-pm">
                        <select  class="clear-pm clear-outline itemskin wdauto">
                            <option class="clear-pm optionskin" value="">区县</option>
                        </select>
                    </div>
                </div>
                <select  class="clear-outline clear-pm item itemskin block selectskin2">
                    <option class="clear-pm optionskin" value="">街道</option>
                </select>
                <textarea v-bind='{"placeholder": placeholder}' class="clear-outline clear-pm item itemskin textareaskin ">
                </texarea>
            </div>
        </div>

        
        
    </div>
    `,
};

var Option = {
    props: ['label','type','method'],
    template:`
        <span>
            <button v-if='type=="primary"' type="button" class="btn btn-outline-primary clear-outline">{{ label }}</button>
            <button v-if='type=="secondary"' type="button" class="btn btn-outline-secondary clear-outline">{{ label }}</button>
            <button v-if='type=="success"' type="button" class="btn btn-outline-success clear-outline">{{ label }}</button>
            <button v-if='type=="info"' type="button" class="btn btn-outline-info clear-outline">{{ label }}</button>
            <button v-if='type=="warning"' type="button" class="btn btn-outline-warning clear-outline">{{ label }}</button>
            <button v-if='type=="danger"' type="button" class="btn btn-outline-danger clear-outline">{{ label }}</button>
            <button v-if='type=="dark"' type="button" class="btn btn-outline-dark clear-outline">{{ label }}</button>
            <button v-if='type=="light"' type="button" class="btn btn-outline-light text-dark clear-outline">{{ label }}</button>
        </span>
        `,
    
};

Vue.component('control', Control);
Vue.component('myoption', Option);

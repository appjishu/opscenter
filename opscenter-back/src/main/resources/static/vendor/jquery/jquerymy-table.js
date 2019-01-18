$.myTable = {
	data:{
		aa:1
	},
	columns:[[
        {field:'code',title:'Code',width:100},
        {field:'name',title:'Name',width:100},
        {field:'price',title:'Price',width:100,align:'right'}
    ]],
	init:function(param) {
		_this = this;
		var size = _this.columns[0].length;
		var html = "<tr>";
 		for (i = 0 ; i < size ; i++){
 			html += "<td>"+_this.columns[0][i].title+"</td>";
		}
 		html += "</tr>";
 		console.info(html);
		$(param).html(html);   
	}          
};   
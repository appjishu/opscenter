var api = {} ;
//登录页面路径
var loginPagePath = "/loginpage";
//注销登录
api.logout = function(){
    $.getJSON("/logoutpage", function(data){
        if(null != data && data.status == 0){
            localStorage.setItem("accessToken", "");
            window.location.href = loginPagePath;
        }
    });
}
api.xisddLoad = function(listData){
    $.ajax({
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        url: "/method/execMethod", //for ASP.NET, java                                                
        data: JSON.stringify(_this.param),
        success: function (data) {
            listData = data.rows[0];
        },
        complete: function () {
            
        }
    });
}
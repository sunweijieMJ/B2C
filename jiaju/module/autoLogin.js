;
define(function(){

	function AutoLogin(){

	}
	AutoLogin.prototype = {
		constructor:AutoLogin,
		init(){
			this.div = $(".login_regist");
			this.user = getCookie("user");
			this.judge();
		},
		judge(){
			if(this.user){
				this.div.css({
					width:150,
					"padding-left":0
				});
				this.div.html("欢迎你，"+this.user);
			}
		}
	}
	return new AutoLogin();
})
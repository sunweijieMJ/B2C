;
define(function(){

	function Login(){

	}
	Login.prototype =  {
		constructor:Login,
		init(){
			this.navBox = $(".login_nav");
			this.liBox = $(".login_box");
			this.wenhao = $(".wetchat_wenhao");
			this.wenhaoDiv = $(".hide_wenhao");
			this.inps = $(".input_group").children("input");;

			this.pwd_one = $("#password");
			this.eyeBtn = $(".eyeBtn");
			this.loginBtn = $(".login_btn");
			this.tips = $(".tip");
			this.onchange();
		},
		onchange(){
			var that = this;
			//看下是微信 还是 用户名
			$.each(this.navBox.children(),function(index,value){

				$(value).on("click",function(){
					$(this).addClass("current_nav")
					.siblings().removeClass("current_nav");
					that.liBox.children().eq(index).show()
					.siblings().hide();
				});
			});
			this.wenhao.on("mouseover",function(){
				that.wenhaoDiv.css({
					display:"block"
				});
			});
			this.wenhao.on("mouseout",function(){
				that.wenhaoDiv.css({
					display:"none"
				});
			});
			//输入框字体改变
			$.each(this.inps,function(index,value){
				$(value).on("focus",function(){
					$(this).css({
						color:"#000"
					});
				});
			});

			// 密码明文  暗纹
			this.eyeBtn.on("click",function(){
				var name = $(this).attr("name");
				if(name == "0"){
					$(this).attr("name","1")
					.css({
						background:"url(http://localhost/gulp/myProject/images/register/eye2.bmp) no-repeat"
					});
					that.pwd_one.attr("type","text");
				}else if(name == "1"){
					$(this).attr("name","0")
					.css({
						background:"url(http://localhost/gulp/myProject/images/register/eye.bmp) no-repeat"
					});
					that.pwd_one.attr("type","password");
				}
			});

			this.loginBtn.on("click",function(){
				that.loginClick();
			});	
		},
		loginClick(){
			var user = $(this.inps[0]).val();
			var pwd = $(this.inps[1]).val();
			var that = this;
			if(!user){
				$(this.tips[0]).html("账号不能为空")
				.css({
					display:"block"
				});
				return;
			}else{
				$(this.tips[0]).css({
					display:"none"
				});
			}
			if(!pwd){
				$(this.tips[1]).html("密码不能为空")
				.css({
					display:"block"
				});
				return;
			}else{
				$(this.tips[1]).css({
					display:"none"
				});
			}
			$.post("http://localhost/gulp/myProject/php/loginYanzheng.php",{user:user,pwd:pwd})
			.then(function(res){
				if(res == 1){
					$(that.tips[0]).html("用户名或密码不正确")
					.css({
						display:"block"
					});
					return;
				}else if(res == 0){
					$(that.tips[0]).css({
						display:"none"
					});
					//登录 验证通过， 设置cookie  并且转向主页
					setCookie("user",user,7);
					setTimeout(function(){
						location.href = "http://localhost/gulp/myProject/index.html";
					},1000);
					
				}
			});
		}

		
	}

	return new Login();
})
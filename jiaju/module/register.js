;
define(function(){

	function regist(){

	}
	regist.prototype = {
		constructor:regist,
		init(){
			this.phone_number = $("#phone_number");
			this.password = $("#password"); 
			this.checkcode = $("#checkcode"); //input验证码
			this.getCodeBtn = $("#getCode");  //获取验证码
			this.login_btn = $(".login_btn"); //立即注册
			this.tips= $(".tip");
			this.event();
		},
		event(){
			var that = this;
			//手机号码框
			var result = false; //判断当前 注册的 状态
			var pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
			this.phone_number.on("focus",function(){
				$(this).css({
					color:"#333"
				});
			});
			this.phone_number.on("blur",function(){
				var str = $(this).val();
				var res =  pattern.test(str);
				if(!res){
					$(that.tips[0]).html("请输入正确的手机号码");
					$(that.tips[0]).css({
						display:"block"
					});
					result = false;
				}else{
					//符合 手机号码要求后，向服务器发送请求，看下手机号码是否已经注册
					$.post("http://localhost/gulp/myProject/php/phone.php",{number:str},function(res){
					    if(res == 0){
					    	$(that.tips[0]).html("该手机号码已经注册");
							$(that.tips[0]).css({
								display:"block"
							});
					    	result = false;
					    }else if(res == 1){
					    	result = true;
					    	that.user = str; //用户名建立后，保存到user
							$(that.tips[0]).css({
								display:"none"
							});
					    }
					});
				}
			});
			//判断 输入的 是否为 数字，不是的话 撤销输入
			this.phone_number.on("keyup",function(){
				var str = $(this).val();
				if(isNaN(str[str.length-1])){
					that.phone_number.val(str.substring(0,str.length-1));
				}
				
			});
			
			//密码框
			this.password.on("focus",function(){
				$(this).css({
					color:"#333"
				});
			});

			this.password.on("blur",function(){
				var str = $(this).val();
				if(!(str.length >= 6  && str.length <= 15)){
					$(that.tips[1]).html("密码为6-18位的数字、字母和下划线");
					$(that.tips[1]).css({
						display:"block"
					});
					result = false;
				}else{
					$(that.tips[1]).css({
						display:"none"
					});
					result = true;
					that.pwd = str;
				}
			});

			// 获取验证码 按钮
			var code = null;
			this.getCodeBtn.on("click",function(){
				if(!result){
					$(that.tips[2]).css({
						display:"block",
						border:"1px solid red"
					}).animate({
						opacity:"0"
					},2000);
					
					setTimeout(function(){
						$(that.tips[2]).css({
							display:"none",
							opacity:"1"
						});
					},2000);
					return ;
				}else{
					$(that.tips[2]).css({
						opacity:"1",
						display:"block",
						border:"1px solid #ccc"
					})
					//向服务器 要个 验证码
					$.get("http://localhost/gulp/myProject/php/yanzheng_code.php")
					.then(function(codeNum){
						code = codeNum;
						$(that.tips[2]).html("验证码为：" + code+"，输入错了那你太2了");
					});
				
				}
				$(this).next().css({
					display:"block"
				});

				$(this).html("60s后重发");
				var num = 60;
				var timer = setInterval(function(){
				
					num--;
					that.getCodeBtn.html(num+"s后重发");
					if(num == 0){
						clearInterval(timer);
						that.getCodeBtn.html("获取验证码");
						that.getCodeBtn.next().css({
							display:"none"
						});
					}
				},1000);
			});
			//点击注册
			this.login_btn.on("click",function(){
				//输入验证框 验证码对不对
				var res = that.checkcode.val().toUpperCase();
				code = code.toUpperCase();
				if(res != code){
					$(that.tips[2]).html("验证码不符 , 请更换验证码");
					$(that.tips[2]).css({
						opacity:"1",
						display:"block",
						border:"1px solid red"
					})
					result =false;
				}else{
					$(that.tips[2]).css({
						display:"none"
					})
					result = true;
				}

				if(result){
					that.login();
				}
			});
		
		},
		login(){

			this.login_btn.html("恭喜你，注册成功");
			//设置cookie
			setCookie("user",this.user,7);
			//向服务器发送数据 用户名 和密码
			$.post("http://localhost/gulp/myProject/php/phone.php",{user:this.user,pwd:this.pwd})
			.then(function(res){
				//console.log(res);
			})
			setTimeout(function(){
				location.href = "http://localhost/gulp/myProject/index.html";
			},1000);
		}

	}

	return new regist();
});
// 跳转页面
$(function (){

	// 点击注册按钮,跳转到注册页面
	$('#register').click(function (){
		location.href = "http://localhost:8888/two/project/login/register.html";
	})

	// 点击头部的logo区域,跳转到主页
	$('#logo h1 a').click(function (){

		location.href = "http://localhost:8888/two/project/index/index.html";
	});


// 随机生成四位数验证码
	$('.login .login_right .login-content .code span').html(CreateCode())
	$('.login .login_right .login-content .code a').click(function (){
		$('.login .login_right .login-content .code span').html(CreateCode())
	});

	function CreateCode(){
        // 将所有需要随机的字符都一一列出
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var result = "";
        for(var i = 0; i < 4; i++){
            // 生成一个随机的下标
            var ranInt = Math.floor(Math.random()*str.length);
            // 将字符拿到放到结果字符串中
            result += str.charAt(ranInt);
        }
        return result;
    }


// 登录验证
	// 获取提交按钮
	$(':button').click(function (){

		// 获取输入框中的值
		$usn = $('#user').val();
		$pwd = $('#pass').val();
		$code = $('#code').val();
		$codeStr = $('.login .login_right .login-content .code span').html();

		// 初步判断
		if(!$usn || !$pwd){
            alert('用户名不能为空');
            return;
        }

        // 将输入的数据用POST方式发送到服务器进行比对
		$.ajax({
			method : "POST",
			url : "http://localhost:8888/two/project/php/login.php",
			data : {
				username : $usn,
				password : $pwd,
				code : $code,
				codeStr : $codeStr
			}
		})
		.then(function (data){

			// 将服务器数据进行解析
			data = JSON.parse(data);

			// 如果满足用户名是sunweijie,密码zmkm,且验证码输入正确的情况下,登录成功
            if(data.isOk){

            	// 将用户名信息存储进cookie,同时跳转到主页
            	setCookie('loginedUser',$usn,7);
                location.href = "http://localhost:8888/two/project/index/index.html";

            // 输入的不符合条件
            } else {
                alert(data.msg);
            }
		})


	})
});


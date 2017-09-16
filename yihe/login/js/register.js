
// 提示文字动画
$(function (){
	// focus事件 
	$('.register .register_right .register-content form>p>input').focus(function (){
		$(this).siblings('i').css({display:'block'}).animate({
			opacity:1,
			top:-17	
		});
	});
	// blur事件
	$('.register .register_right .register-content form>p>input').blur(function (){
		$(this).siblings('i').css({display:'none'}).animate({
			display:'none',
			opacity:0,
			top:-25
		});
	});


	//多选按钮点击隐藏和显示两个输入框
	// 先将两个输入框默认隐藏
	$('#idcard').parent().css({display:'none'});
	$('#true-name').parent().css({display:'none'});

	// 多选按钮发生改变时触发
	$('.register-content p input[type=checkbox]').change(function (){
		// 如果是选中状态,那么隐藏,同时去除checked属性
		if($(this).attr('checked')){
			$('#idcard').parent().css({display:'none'});
			$('#true-name').parent().css({display:'none'});
			$(this).attr('checked',false);
		// 如果没有checked属性,那么将输入框显示,同时设置checked属性
		} else {
			$('#idcard').parent().css({display:'block'});
			$('#true-name').parent().css({display:'block'});
			$(this).attr('checked',true);
		}
	})
		


// 已注册过账号,点击登录,直接跳转到登录页面
	$('.register .register_left section a').click(function (){
		location.href = "http://localhost:8888/two/project/login/login.html";
	});

// 页面logo区域,点击跳转到index页面
	$('#logo h1 a').click(function (){
		location.href = "http://localhost:8888/two/project/index/index.html";
	});


// 页面刷新和验证码右边标签被点击时生成验证码
	$('.register .register_right .register-content .code span').html(CreateCode())
	$('.register .register_right .register-content .code a').click(function (){
		$('.register .register_right .register-content .code span').html(CreateCode())
	});

	//随机生成验证码函数 
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


// 正则验证
	// 用户名验证
	$('#user').blur(function (){
		var pattern = /[\d\D]{3,15}/;
		var res = pattern.test($(this).val());
		if(res){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});

	// 密码验证
	$('#pass').blur(function (){
		var pattern = /[\d\D]{6,20}/;
		var res = pattern.test($(this).val());
		if(res){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});

	// 确认密码
	$('#re-pass').blur(function (){
		var res = $(this).val();
		if(res == $('#pass').val()){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});
	var pattern = /^\w+@\w+(\.\w+)+$/;

	// 邮箱验证
	$('#email').blur(function (){
		var pattern = /^\w+@\w+(\.\w+)+$/;
		var res = pattern.test($(this).val());
		if(res){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});

	// 手机号验证
	$('#number').blur(function (){
		var pattern = /^(1\d{2})\d{8}$/;
		var res = pattern.test($(this).val());
		if(res){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});

	// 身份证号码验证
	$('#idcard').blur(function (){
		var pattern = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{3}(\d|X)$/;
		var res = pattern.test($(this).val());
		if(res){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});

	// 验证码
	$('#code').blur(function (){
		var res = $(this).val();
		if(res == $(this).siblings('span').html()){
			$(this).siblings('b').fadeOut();
			return;
		} else {
			$(this).siblings('b').fadeIn();
		}
	});


// 注册验证
	// 获取提交按钮
	$('#submit').click(function (){
		// 获取每一个输入框中的value值
		$usn = $('#user').val();
		$pwd = $('#pass').val();
		$cfm = $('#re-pass').val();
		$eml = $('#email').val();
		$num = $('#number').val();
		$true = $('#true-name').val();
		$card = $('#idcard').val();
		$code = $('#code').val();

		// 从cookie中获取已输入的用户名
		var usnStr = getCookie('username');
		var pwdStr = getCookie('password');
		var cPwdStr = getCookie('confPwd');

		// 第一步验证:初步判断输入框输入情况
		if(!$usn || !$pwd || !$cfm){
            alert('填写不能为空');
            return;
        }

        if($pwd !== $cfm){
            alert('两次密码不一致');
            return;
        }

        // 第二部验证:将cookie中的用户名和输入框中的值进行比对
        if($usn == usnStr){
            alert('用户名已存在');
            return;
        }

        // 第三步验证:将输入的用户名发送给服务器进行比对
		$.ajax({
			method : "POST",
			url : "http://localhost:8888/two/project/php/register.php",
			data : {
				username : $usn
			}
		})
		.then(function (data){
			data = JSON.parse(data);
			// 如果返回的数据的isOK属性为true,那么表示注册成功
            if(data.isOk){
            	// 存储已登录的用户名,并进行跳转到登录页面
            	setCookie('username',$usn,7);
                // 跳转到登录页面
                 location.href = "http://localhost:8888/two/project/login/login.html";

            // data.isOk为false,返回data.msg属性,将其打印出
            } else {
                alert(data.msg);
            }
		});

			// setCookie('username', $usn, 7);
	  //       setCookie('password', $pwd, 7);
	  //       setCookie('confPwd', $cfm, 7);

	});

});



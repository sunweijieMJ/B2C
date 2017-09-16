// 头部的导航栏点击有下拉菜单
$(function (){

	// 当鼠标滑过的时候slideUp或slideDown
	$('.top-con .right .nav dl').hover(function (){
		$(this).children('dd').slideDown();
	},function (){
		$(this).children('dd').slideUp();
	})


// 商品分类(banner图上的商品分类)
	$('.wrapper-con .title .category>ul>li').hover(function (){
		$('.wrapper-con .title .category ul li dl dd').eq($(this).index()).css({
			display:'block'
		})
	},function (){
		$('.wrapper-con .title .category ul li dl dd').eq($(this).index()).css({
			display:'none'
		})
	});

// 工具条弹出框

	// 屏幕右下角的工具栏,鼠标划入的时候显示+号
	$('.toolbar-btn').mouseenter(function (){
		$(this).children('span').css({display:'none'}).next().css({display:"block"});
	});

	// 鼠标划出的时候显示头像
	$('.toolbar-btn').mouseleave(function (){
		$(this).children('span').css({display:'block'}).next().css({display:"none"});
	})
	
	// 点击工具栏的+号按钮时
	$('.toolbar-btn ').children('a').click(function (){

		//弹出隐藏在屏幕右侧的工具栏,同时将自己隐藏进右侧屏幕 
		$('.toolbar-con .toolbar-box .return-btn').animate({right:0})
		$(this).parent().next().stop().animate({width:50})
		.end().stop().animate({right:-60})
	});

	// 点击工具栏的×号时,将整体工具栏隐藏,同时将小按钮显示
	$('.toolbar-con .toolbar-box .return-btn').click(function (){
		$(this).animate({right:-30})
		$(this).parent().parent().stop().animate({width:0})
		.end().parent().prev().stop().animate({right:0})

		$('.shopping').animate({right:-260})
	});

	// 给回到顶部的元素添加事件
	$('.returnTop').click(function (){
		// 瞬间回去
		// $(window).scrollTop(0);
		// 运动回去
		$('html,body').animate({scrollTop:0}, 500);
	});


// 首页登录注册跳转

	// 首页登录注册页面跳转
	$('.top-con .right p a').eq(1).click(function (){
		location.href = "http://localhost:8888/two/project/login/login.html";
	})

	// 跳转到注册页面
	$('.top-con .right p a').eq(2).click(function (){
		location.href = "http://localhost:8888/two/project/login/register.html";
	})



// 登录注册跳转
	// 从cookie中获取用户名信息
	$usn = getCookie('loginedUser');
	
	// 如果用户名存在,将页面头部的登录注册按钮移除,同时添加用户名信息
	if($usn){
		$('.top-con .right p').append('<span>[孙伟杰]</span>')
		$('.top-con .right a').eq(1).css({display:'none'});
		$('.top-con .right a').eq(2).css({display:'none'});
	} else{
		$('.top-con .right a').eq(1).css({display:'block'});
		$('.top-con .right a').eq(2).css({display:'block'});
	}


// 购物车
	// 加载数据
	$.ajax("http://localhost:8888/two/project/json/shopCar.json")
	.then(function (res){
		// 数据加载成功 导入页面
		readingPag(res);
	});

	// 页面加载数据渲染
	function readingPag(res){
		// 获取所有li
		var $lis = $('.floor-con .side section .right-side li');
		$lis.each(function (index,value){
			// 导入页面
			$(this).find('.imgSrc').attr('id',res.data[index].id);
			$(this).find('.imgSrc').attr('src',res.data[index].src);
			$(this).find('.introduce').html(res.data[index].introduce);
			$(this).find('.price').html(res.data[index].price);
			$(this).find('.market').html(res.data[index].market);
		});
	}

	// 绑定点击事件
	$('.right-side ul').on('click','.buyImg',function (){
		// 区分商品 => 获取id	
		
		// 
		if(!$.cookie('goodsList')){
			// 没有数据 => 第一次存储数据
			$.cookie("goodsList", '[{"id" : "'+ this.id +'", "num":"1"}]');
		} else {
			// 添加数据
			var cookieArr = JSON.parse($.cookie("goodsList"));

			// 查找是否有相同的

			var isSame = false; // 标志是否存在相同的商品

			for(var i = 0; i < cookieArr.length; i++){
				// 当前添加的商品已经存在
				if(cookieArr[i].id == this.id){
					cookieArr[i].num++;
					isSame = true;
					break;
				}
			}

			// 没有相同的就创建
			if(!isSame){
				// 向数组中添加数据
				var goods = {"id" : this.id, "num":"1"};
				cookieArr.push(goods);
			}
			
			// 更新cookie
			var cookieStr = JSON.stringify(cookieArr);
			$.cookie("goodsList",cookieStr);
		}

		getCarNum();

		$.ajax("http://localhost:8888/two/project/json/shopCar.json")
		.then(function (res){
			var cookieArr = JSON.parse($.cookie("goodsList"));
			var html = "";
	
			$.each(cookieArr,function (index,obj){
			
				html += '<li><img src="' + res.data[obj.id].src + '" /><span>' + obj.num + '</span></li>';
			});
			$(".shopGoods").html(html);
		})

		// 将购物车中的商品进行计数
		function getCarNum(){
			var cookieArr = JSON.parse($.cookie("goodsList"));
			var res = 0; //商品总数之和;
			for(var i = 0 ; i < cookieArr.length; i++){
				res += Number(cookieArr[i].num);
			}
			$(".sc_num").html(res);
		}

	});

	// 清空购物车
	$('.toolbar-con .toolbar-box ul .remove_num').click(function (event){
		$.cookie("goodsList",null);

		// 清空商品列表
		$(this).siblings('span').html("");
		$(this).siblings('ul').children().html("");

		// 阻止冒泡
		event.stopPropagation();
	});


	// 购物车弹出动画
	$('.toolbar-con ul li').eq(1).on("click",function (){
		if($(this).children('.shopping').css('right') == '-260px'){
			$(this).children('.shopping').animate({right:50});
		} else{
			$(this).children('.shopping').animate({right:-260});
		}
	})
});




// 头部区下拉动画
$(function (){
	$('.top-con .right .nav dl').hover(function (){
		$(this).children('dd').stop().slideDown();
	},function (){
		$(this).children('dd').stop().slideUp();
	})


	// banner图上的商品分类
	$('.wrapper-con .title .category>ul>li').hover(function (){
		$('.wrapper-con .title .category ul li dl dd').eq($(this).index()).css({
			display:'block'
		})
	},function (){
		$('.wrapper-con .title .category ul li dl dd').eq($(this).index()).css({
			display:'none'
		})
	});



	// 倒计时设置
	showTime();
	setInterval(showTime,900);
	
    function showTime(){
		// 获取当前时间的时间对象
		var now = new Date();
		// 创建未来一个时间的时间对象
		var later = new Date(2017,6,1);
		
		// 可以使用getTime方法获取每一个时间对象中的时间的毫秒表示
		// 计算出毫秒表示的差
		var delta = later.getTime() - now.getTime();
		
		// 定义几个变量表示几个常数
		var dMs = 24*60*60*1000;
		var hMs = 60*60*1000;
		var mMs = 60*1000;
		var sMs = 1000;
		
		// 计算天数
		var days = Math.floor(delta / dMs);
		// 计算小时数
		var hours = Math.floor((delta - days*dMs) / hMs);
		// 计算分钟数
		var mins = Math.floor((delta - days*dMs - hours*hMs) / mMs);
		// 计算秒数
		var secs = Math.floor((delta - days*dMs - hours*hMs - mins*mMs) / sMs);
		
		// 拼接要显示的字符串
		var str = days + "天" + hours + "小时" + mins + "分钟" + secs + "秒";
		// 将这个时间字符串显示到页面上
		$('.home-sale-con .right-layout .saleDiscount ul li h5 span').html(str);
	}


	// 商品动画-上移
	// 获取两个商品 dd标签
	$('.sale-hot-con .sale-goods ul li dl').hover(function (){
		$(this).children('.goods-name').animate({top:120}),
		$(this).children('.goods-qrcode').fadeIn(),

		$(this).children('div').eq(0).animate({width:220}),
		$(this).children('div').eq(1).animate({height:240}),
		$(this).children('div').eq(2).animate({height:240}),
		$(this).children('div').eq(3).animate({width:220})
	},function (){
		$(this).children('.goods-name').animate({top:180}),
		$(this).children('.goods-qrcode').fadeOut(),

		$(this).children('div').eq(0).animate({width:0}),
		$(this).children('div').eq(1).animate({height:0}),
		$(this).children('div').eq(2).animate({height:0}),
		$(this).children('div').eq(3).animate({width:0})
	});


	// 商品动画-上移
	// 获取两个商品 dd标签

	$('.floor-con .right-side ul li').hover(function (){

		$(this).children('div').eq(0).animate({width:203}),
		$(this).children('div').eq(1).animate({height:252}),
		$(this).children('div').eq(2).animate({height:252}),
		$(this).children('div').eq(3).animate({width:203})
	},function (){

		$(this).children('div').eq(0).animate({width:0}),
		$(this).children('div').eq(1).animate({height:0}),
		$(this).children('div').eq(2).animate({height:0}),
		$(this).children('div').eq(3).animate({width:0})
	});


	// 收起楼层
	// 点击楼层右侧按钮
	$('.floor-con .title .pack').click(function (){
		// 如果文本值是收起楼层,那么展开楼层
		if ($(this).text() == '收起楼层') {
			// 将文本值改为展开楼层
	    	$(this).html('展开楼层');

	    	// 给楼层元素添加layout-off属性
	    	$(this).parent().next().removeClass("layout-open");
	    	$(this).parent().next().addClass("layout-off");
	    	$('.layout-off').slideUp();

	    // 如果文本值是展开楼层,那么收起楼层
	    } else if ($(this).html() == '展开楼层') {
	    	// 将文本值改为收起楼层
	    	$(this).html('收起楼层');

	    	//  给楼层元素添加layout-open属性
	    	$(this).parent().next().removeClass("layout-off");
	    	$(this).parent().next().addClass("layout-open");
	    	$('.layout-open').slideDown();
	    }
		
	});


	// 右边信息名片栏
	// 点击弹出信息栏
	$('.message header a').click(function (){
		$(this).parent().parent().animate({
			width:0,
			height:0
		},function (){
			$('#message>a').animate({
				width:38,
				height:37
			});
		})
	});

	// 点击隐藏信息栏
	$('#message>a').click(function (){
		$(this).css({display:'none'}).next().animate({
			width:222,
			height:250
		}).end().animate({
			width:0,
			height:0
		})
	});


	// sale-hot
	var $li = $('.sale-hot-con ul li');
	$li.hover(function (){
		$(this).children('i').css({
			display:'block'
		})
	},function (){
		$(this).children('i').css({
			display:'none'
		})
	})

});




// banner图上的节目单效果
$(function (){
	$(".banner-con .right-sidebar .proclamation_live h4:first").css({
		'border-bottom':"1px solid #fff",
		background: '#fff url(image/home_bg.png) no-repeat 18px -292px'
	});
	$(".banner-con .right-sidebar .proclamation_live h4:last").css({'border-bottom':"1px solid #e9e9e9"});
	
	$(".banner-con .right-sidebar .proclamation_live h4").mouseover(function (){
		
		var $index = $(this).index();
		$(this).css({
			'border-bottom': '1px solid #fff',
			background: '#fff url(image/home_bg.png) no-repeat 18px -292px'
		})
		if($index == 0){
			$(".banner-con .right-sidebar .proclamation_live img").css({
				display:'block'
			});
			$('.banner-con .right-sidebar .proclamation_live .tabs_panel').css({
				display:'none'
			})
		} else if($index == 1) {
			$(".banner-con .right-sidebar .proclamation_live img").css({
				display:'none'
			}),
			$('.banner-con .right-sidebar .proclamation_live .tabs_panel').css({
				display:'block'
			})
		}
	});

	$(".banner-con .right-sidebar .proclamation_live h4").mouseout(function (){
		var $index = $(this).index();
		$(this).css({
			'border-bottom': '1px solid #e9e9e9',
			background: '#f7f7f7'
		});
		
		var $that = $(this);
		$(".banner-con .right-sidebar .proclamation_live").mouseout(function (){
			// $that.trigger('mouseover');
		});

	});

});



// banner轮播图
$(function (){
	// 获取所有的a标签
	var $allA = $("#banner .carousel_btn a");
	// 用js给这些li做一下定位
	var $img = $('#banner .carousel_img img');
	// 定义一个变量, 用于存放当前播到第几张了
	var index = 0;
	// 写一个主控函数控制每一张播放
	function carousel(){
		index++;
		if(index >= 5){
			index = 0;
		}
		// console.log(index);
		// 1. 让第N张显示
		showLi(index);
		// 2. 下面的导航显示到第N个a
		setNav(index);
	}
	var timer = setInterval(carousel, 3000);

	$allA.on('click',function (){
		clearInterval(timer);

		index = $(this).index();
		showLi(index);
		setNav(index);

		timer = setInterval(carousel, 3000);
	});

	// 写一个函数, 用于显示第N个li
	function showLi(ind){
		$img.stop().fadeOut();
		$img.eq(index).stop().fadeIn();
	}

	// 写一个函数用于给第N个a加背景
	function setNav(ind){	
		$allA.css({background:'#6b6ab6'})
		// 将第N个a的背景加上
		$allA.eq(ind).css({
			background: '#ff3300'
		});
		
	}
})



//discount轮播
$(function (){
	// 获取所有的a标签
	var $allA = $('.home-sale-con .right-layout .saleDiscount>a');
	// 获取一下ul
	var $ul = $('.home-sale-con .right-layout .saleDiscount>ul');
	// 用js给这些li做一下定位
	var $lis = $('.home-sale-con .right-layout .saleDiscount ul li');
	for(var i = 0; i < $lis.size(); i++){
		$lis[i].style.left = 210 * i + "px";
	}
	// 定义一个变量, 用于存放当前播到第几张了
	var index = 0;
	// 写一个主控函数控制每一张播放
	function carousel(){
		index++;
		if(index >= $lis.size()){
			index = 0;
		}
		// 1. 让第N张显示
		showLi(index);
	}
	var timer = setInterval(carousel, 3000);

	// 写一个函数, 用于显示第N个li
	function showLi(ind){
		// 以运动的形式显示
		$ul.animate({left:-210 * ind},1000, function (){
			if(ind == $lis.size() - 1){
				// 当最后一个播完, 将整个ul拉回left为0的位置
				$ul.css({left:0});
				// 更新index
				index = 0;
			}
		});
	}

	// 按钮点击事件
	$allA.on('click',function (){
		clearInterval(timer);

		if($(this).index() == 0){
			if(index <= 0){
				index = 0;
				return;
			}
			index--;
		} else if($(this).index() == 1){
			if(index >= $lis.size() - 1){
				index = $lis.size() - 1;
				return;
			}
			index++;
		}

		showLi(index);
		timer = setInterval(carousel, 3000);
	});

});



//sale-goods 轮播
$(function (){
	// 获取所有的a标签
	var $navs = $('.sale-hot-con>ul>li');
	var $allA = $('#sale-hot>a');
	// 获取一下ul
	var $goods = $('.sale-hot-con .sale-goods');
	// 用js给这些ul做一下定位
	var $uls = $('.sale-hot-con .sale-goods>ul');
	for(var i = 0; i < $uls.size(); i++){
		$uls[i].style.left = 1200 * i + "px";
	}
	// 定义一个变量, 用于存放当前播到第几张了
	var index = 0;
	// 写一个主控函数控制每一张播放
	function carousel(){
		index++;
		if(index >= $uls.size()){
			index = 0;
		}
		// 1. 让第N张显示
		showLi(index);
	}
	var timer;
	timer = setInterval(carousel, 4000);

	// 鼠标划入nav
	$navs.hover(function (){
		clearInterval(timer);
		index = $(this).index();
		// 跳转到指定ul
		$goods.animate({left:-1200 * index})
	},function (){
		// 重新打开定时器
		timer = setInterval(carousel, 4000);
	});

	// 鼠标划入图片停止轮播
	$('.sale-hot-con .sale-goods ul li').hover(function (){
		clearInterval(timer);
	},function (){
		timer = setInterval(carousel, 4000);
	});

	// 按钮点击事件
	$allA.on('click',function (){
		clearInterval(timer);
		console.log(index);
		if($(this).index() == 0){
			if(index <= 0){
				index = 0;
				return;
			}
			index--;
		} else if($(this).index() == 1){
			if(index >= $uls.size() - 1){
				index = $uls.size() - 1;
				return;
			}
			index++;
		}

		showLi(index);

		timer = setInterval(carousel, 4000);
	});

	// 写一个函数, 用于显示第N个li
	function showLi(ind){
		// 以运动的形式显示
		$goods.animate({left:-1200 * ind},1000, function (){
			if(ind == $uls.size() - 1){
				// 当最后一个播完, 将整个ul拉回left为0的位置
				$goods.css({left:0});
				// 更新index
				index = 0;
			}
		});
	}
});






//楼梯
$(function (){
	$(window).scroll(function (){
		// 获取页面滚动距离
		var st = $(this).scrollTop();
		// 滚动距离到1000时将导航栏显示出来
		if(st >= 700){
			$('#LoutiNav').show();
		} else {
			$('#LoutiNav').hide();
		}

		// 循环所有的div色块(.Louti), 去找第一个500高度线比滚动距离大的
		$('.side').each(function (){
			// 计算当前元素500高度线距离页面顶端的top值
			var toTop = $(this).offset().top + 443;
			if(toTop >= st){
				// 获取当前楼层的index
				var index = $(this).index();
				// 将当行设到当前是第几楼
				$('#LoutiNav li').eq(index).find('span').addClass('active')
				.end().siblings().find('span').removeClass('active');
				// 由于是要找第一个, 找到之后, 跳出循环
				return false;
			}
		});
	});

	// 给除了回到顶部的li以外的li添加点击事件
	$('#LoutiNav li').not('.last').click(function (){
		// 看当前li是第几个
		var index = $(this).index();
		// 获得对应的楼层距离页面顶端的距离
		var target = $('.side').eq(index).offset().top;
		// 让滚动条滚动过去
		$('html,body').animate({scrollTop:target}, 500);
	});

	// 给回到顶部的li添加事件
	$('#LoutiNav li.last').click(function (){
		// 瞬间回去
		// $(window).scrollTop(0);
		// 运动回去
		$('html,body').animate({scrollTop:0}, 500);
	});

	// li的移入移出给添加一下hover的class
	$('#LoutiNav li').not('.last').hover(function (){
		// 良性冗余: 以少量代码及性能开销来换取功能不会受到其他代码的影响
		// 移入是将li的class设为hover, 兄弟li取出hover这个class
		$(this).addClass('hover').siblings().removeClass('hover');
	}, function (){
		// 移出时, 去掉自身的hover的class
		$(this).removeClass('hover');
	});

});






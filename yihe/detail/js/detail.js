// 商品分类下拉列表动画
$(function (){

	// 先隐藏元素
	$('.wrapper-con .title .category').css({display:'none'});
	$('.wrapper-con .title>span').css({display:'none'});

	// 鼠标滑过的时候显示和隐藏
	$('.wrapper-con .title').hover(function (){
		$(this).find('.category').stop().slideDown()
		.end().children('span').css({display:'block'});
	},function (){
		$(this).find('.category').stop().slideUp()
		.end().children('span').css({display:'none'});
	});


// 商品放大镜
	// 定义一个变量用于计数
	var $count = 0;

	//showImg左右两个按钮点击时切换图片
	$('.ownshop-con .ownshop-left .showImg h3>a').click(function (){

		//如果点击的是左边那么切换到前一张
		if($(this).index() == 0){
			$count++;

			// 限制边界
			$count = $count >= 0 ? 0 : $count;
			// 图片切换到前一张
			$(this).siblings('div').stop().animate({left: 320 * $count});

			//如果点击的是右边那么切换到后一张
		} else if($(this).index() == 1){
			$count--;
			// 限制边界
			$count = $count <= -3 ? -3 : $count;
			// 图片切换到后一张
			$(this).siblings('div').stop().animate({left: 320 * $count});
		}
	});

	// 鼠标划入时
	$('.ownshop-con .ownshop-left .showImg p img').mouseover(function (){

		// 定义一个变量计数
		var $index = -$(this).index();

		//鼠标划入下面小图的第几张就将上面的大图切换为哪个
		$(this).parent().prev().children('div').stop().animate({left:320*$index});

		// 将上面计数统一
		$count = $index;
	});


	// 获取dom元素
	var move = $(".ownshop-con .ownshop-left .showImg .glass")//移动的块
	var conT = $(".ownshop-con .ownshop-left .showImg h3")//移入的框
	var sCont = $(".ownshop-con .ownshop-left .showImg .magnifying")//放大镜的框

	//鼠标移入框move和outBox显示
	$(conT).mouseover(function(){
		$(move).stop().fadeIn()
		$(sCont).stop().fadeIn()
	})

	//鼠标移出框move和outBox隐藏
	$(conT).mouseout(function(){
		$(move).stop().fadeOut()
		$(sCont).stop().fadeOut()
	})

	//鼠标在框内移动
	$(conT).mousemove(function(e){
		var evt = e || window.event;

		//计算move相对于conT的位置
		var moveL = evt.pageX - $(conT).offset().left
		 - $(move).width()/2
		var moveT = evt.pageY - $(conT).offset().top
		 - $(move).height()/2

		//计算最大位置
		var maxL = $(conT).width() - $(move).width()
		var maxT = $(conT).height() - $(move).height()
		
		// 限制边界
		if(moveL <= 0){
			moveL = 0
		}else if(moveL >= maxL){
			moveL = maxL;
		}
		if(moveT <= 0){
			moveT = 0;
		}else if(moveT >= maxT){
			moveT = maxT;
		}
		
		$(move).css({
			left:moveL,
			top:moveT
		})

		//大图片对应运动
		moveL = -moveL*1.1;
		moveT = -moveT*1.1;
		$(sCont).children().eq(-$count).css({display:'block'}).siblings().css({display:'none'});
		$(sCont).children().eq(-$count).css({
			left:moveL,
			top:moveT
		})
	});


// 购买数量增减
	$('.ownshop-con .ownshop-middle .shop dl dd .a-box a').click(function (){
		// 获取输入框中的value值
		var $value = $(this).parent().prev().val();

		// 如果点击+,递增
		if($(this).index() == 0){
			$value++;
			$(this).parent().prev().val($value);

		// 如果点击-,递减
		} else if($(this).index() == 1){
			$value--;
			if($value != 0){
				$(this).parent().prev().val($value);
			}
		}
	})


// 商品分类项隐藏
	$('.comment-con .sidebar .container .content>ul>li>span').children('.add').click(function (){
		$(this).css({display:'none'})
		.siblings('em').css({display:'inline-block'})
		.parent().siblings('ul').css({display:'block'})
	});

	$('.comment-con .sidebar .container .content>ul>li>span').children('.subtract').click(function (){
		$(this).css({display:'none'})
		.siblings('em').css({display:'inline-block'})
		.parent().siblings('ul').css({display:'none'})
	});


// 商品排行,鼠标划入划出事件
	$('.comment-con .sidebar .rank .content ul>li>a').hover(function (){
		// 鼠标划入时给元素添加active属性
		$(this).addClass('active').siblings().removeClass('active');

		// 同时将兄弟元素移除active属性
		$('.comment-con .sidebar .rank .content .list ol').eq($(this).parent().index()).removeClass('hide')
		.siblings().addClass('hide');
	},function (){

		// 鼠标划出时添加属性,让其显示
		$(this).removeClass('active').siblings().addClass('active');
	});

	// 商品评价栏的点击显示上边框
	$('.comment-con .main .ncs-comment .comment .c-nav ul li a').click(function (){
		$(this).addClass('current').parent().siblings().find('a').removeClass('current')
	})


// 左侧收放按钮
	var $left = 332;
	$(window).scroll(function (){
		// 获取页面滚动距离
		var $st = $(this).scrollTop();
		
		// 当滚动距离大于800时,将元素进行fixed定位
		if($st >= 800){
			$('.comment-con .main .tabbar-box .tabbar').css({
				position : 'fixed',
				left : $left,
				top : 0
			});

			//同时将他的子元素按钮栏显示
			$('.comment-con .main .tabbar-box .tabbar').children('.switch-bar').css({display:'block'});

		// 滚动距离小于800时,恢复原样
		} else {
			$('.comment-con .main .tabbar-box .tabbar').css({
				position : 'absolute',
				left : 0,
				top : 0
			});

			// 同时将按钮栏隐藏
			$('.comment-con .main .tabbar-box .tabbar').children('.switch-bar').css({display:'none'});
		}
	});

	// 子元素的按钮栏点击效果
	$('.comment-con .main .tabbar-box .tabbar').children('.switch-bar').click(function (){

		// 当左侧分类栏显示的时候将其隐藏
		if($('.sidebar').css('display') == 'block'){
			$('.sidebar').css({display:'none'});
			$('.comment-con .main .tabbar-box .tabbar').css({left:112});
			$left = 112;
		// 隐藏的时候将其显示
		} else {
			$('.sidebar').css({display:'block'});
			$('.comment-con .main .tabbar-box .tabbar').css({left:332});
			$left = 332;
		}
	})
});
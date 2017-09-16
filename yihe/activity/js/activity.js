// 商品分类下拉动画
$(function (){
	// 先隐藏元素下拉列表
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

// ajax加载数据
	$.getJSON('http://localhost:8888/two/project/json/activity.json', function (data){
		var $json = data;
        var $lis = $('.goodsList-con ul li');
        // 将数据导入页面中
        $lis.each(function (index,value){
        	$(this).find('img').attr('src',$json.data[index].image);
        	$(this).find('.num').html($json.data[index].num);
        	$(this).find('.introduce a').html($json.data[index].introduce);
        	$(this).find('.price').html($json.data[index].price);
        	$(this).find('.market').html($json.data[index].market);
        })

    });


// 尾部轮播效果
	// 先获取所有的ul,按钮
	var $uls = $('.online-con .rotationli ul');
	var $ulsBox = $('.online-con .rotationli .ulBox');
	var $allA = $('.online-con>a');

	// 将所有的ul进行定位,排开
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
	
	// 开启定时器
	var timer = setInterval(carousel, 3000);

	// 写一个函数, 用于显示第N个li
	function showLi(ind){
		// 以运动的形式显示
		$ulsBox.animate({left:-1200 * ind},1000, function (){
			if(ind == $uls.size() - 1){
				// 当最后一个播完, 将整个ul拉回left为0的位置
				$ulsBox.css({left:0});
				// 更新index
				index = 0;
			}
		});
	}

	// 鼠标划入图片停止轮播,鼠标划出轮播继续
	$('.online-con .rotationli ul li').hover(function (){
		clearInterval(timer);
	},function (){
		timer = setInterval(carousel, 3000);
	});

	// 按钮点击事件,左右两个按钮
	$allA.on('click',function (){
		clearInterval(timer);
		if($(this).index() == 1){
			
			// 当点击的图片超过边界时,return
			if(index <= 0){
				index = 0;
				return;
			}
			index--;
		} else if($(this).index() == 2){

			// 当点击的图片超过边界时,return
			if(index >= $uls.size() - 1){
				index = $uls.size() - 1;
				return;
			}
			index++;
		}
		showLi(index);

		timer = setInterval(carousel, 3000);
	});
});


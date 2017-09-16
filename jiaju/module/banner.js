;
define(function(){

	function Banner(){}

	Banner.prototype = {
		constructor:Banner,
		init(){
			this.box = $(".banner_box");
			this.btns = $(".banner_btn");
			this.imgs = $(".bannerImg");
			this.getData();
		},
		getData(){  //获取数据
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/banner.json")
			.then(function(res){

				that.resolveData(res.data);
			},function(){
				console.log("获取数据失败，请重新尝试...");
			});
		},
		resolveData(dataArr){  // 处理数据[{name:"banner1",src:""},{}]
			var that = this;
			console.log("banner");
			//加载图片 
			var imgIsOk =0;
			$.each(dataArr,function(index,value){
				//注意  要加$
				//动态获取一个未知宽高的 img 
				$(that.imgs[index]).children().attr("src",value.src);
				//等图片加载完后 再获取宽高 设置位置
				$(that.imgs[index]).children().on("load",function(){
					var imgWidth = $(this).width();
					var imgHeight = $(this).height();
					
					var left = (imgWidth - that.box.width())/2;
					var top = (imgHeight - that.box.height())/2;
					
					//先让图片初始化位置 再让图片显示
					$(this).css({
						left:-left,
						top:-top,
						display:"block"
					});
					imgIsOk++;
					
					//以防万一，上面图片未加载完
					if(imgIsOk >= 5 ){
						console.log(6);
						that.carousel();
					}
				});
			});
		},
		carousel(){  //轮播方法
			var that = this;
			var timer;
			var num=0;
			change(num);
			carou();

			$.each(this.btns,function(index, value){
				$(value).on("click",function(){
					num = index;
					clearInterval(timer);  //关闭定时器
					carou();			   //开启定时器

					change(num);
					
					return false;
				});
			});
			//封装一个 轮播的函数
			function carou(){
				clearInterval(timer);
				timer = setInterval(function(){
					num++;

					if(num >= 5){
						num = 0;
					}
					//让 图片一个 显现， 另外4个隐形
					change(num);

				},4000);
			}
			////让 图片一个 显现， 另外4个隐形
			function change(num){
				$(that.imgs[num]).stop().fadeIn(300)
				.children().css({
					transition:"3s",
					transform:"scale(1)"
				}).parent()
				.siblings().stop().fadeOut(300)
				.children().css({
					"transition-delay":"1s",
					transform:"scale(1.04)"
				})
				//按钮的背景色 和 文字颜色 改变
				$(that.btns[num]).addClass("active_btn")
				.siblings().removeClass("active_btn");
			}
		}
	}

	return new Banner();

});



















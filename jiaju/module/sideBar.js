;
define(function(){

	function SideBar(){

	}
	SideBar.prototype = {
		constructor:SideBar,
		init(){
			this.leftWrap = $(".sideBar_left");
			this.rightWrap = $(".sideBar_right");
			this.leftBars = $(".sideBar_left").children();
			this.leftEm = $(".sideBar_left").find("em");
			this.innerWidth = document.documentElement.clientWidth;
			this.innerHeight = document.documentElement.clientHeight;

			this.onchange();
			this.onrightchange();
		},
		onchange(){
		
			var timer = null;
			var that = this;
			var nowBar = null; //判断当前 滚动条所处的位置是在哪个区间
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			
			var wrapTop =(that.innerHeight - that.leftWrap.height())/2;
			// 放到 函数里，暂时未处理，当页面小于 1210 + 80的时候，侧栏消失
			// if((that.innerWidth - 1210)/2 < 80){
			// 	this.leftWrap.css({display:"none"});
			// 	this.rightWrap.css({display:"none"});
			// }
			this.leftWrap.css({
				left:(that.innerWidth - 1210)/2 - 26,
				top:wrapTop -100
			});

			this.rightWrap.css({
				right:(that.innerWidth - 1210)/2 - 58,
				top:wrapTop -100
			});
			//position().top; 相对于父级别
			//offset().top; 相对于document
			
			//该 hide_posi 是 wrap 距离整个页面的最下端 距离
			var hide_posi = this.innerHeight - wrapTop + 100;
			$.each(this.leftBars,function(index,value){
				$(value).css({
					top:hide_posi
				});
			});
			judge(); //初始化每个bar的 位置
			//滚动条事件
			var left = document.body.scrollLeft || document.documentElement.scrollLeft;
			console.log(left);
			window.onscroll = function(){
				timer = setTimeout(function(){	
					judge();					
				},0);
			}

			//鼠标 移动上去  和点击

			$.each(this.leftBars,function(index, value){
				//移动上去
				$(value).on("mouseover",function(){
					$(that.leftEm[index]).css({
						display:"block"
					});
				});
				$(value).on("mouseout",function(){
					if(index != nowBar){
						$(that.leftEm[index]).css({
							display:"none"
						});
					}
				});
				//点击
				$(value).on("click",function(){
					switch(index){
						case 0:
							$("html,body").animate({
								scrollTop:2094 - that.innerHeight
							});
							break;
						case 1:
							$("html,body").animate({
								scrollTop:2675 - that.innerHeight
							});
							break;
						case 2:
							$("html,body").animate({
								scrollTop:3253 - that.innerHeight
							});
							break;
						case 3:
							$("html,body").animate({
								scrollTop:3832 - that.innerHeight
							});
							break;
						case 4:
							$("html,body").animate({
								scrollTop:4413 - that.innerHeight
							});
							break;
						case 5:
							$("html,body").animate({
								scrollTop:"4290"
							});
							break;
						default: break;
					}
	
				});
			});



			//封装个函数 当滚动时候 看下 哪个bar 在移动
			function judge(){
				that.innerHeight = document.documentElement.clientHeight;
				scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				//
				//1楼
				if(scrollTop > 1517 - that.innerHeight && scrollTop < 1517){
					barChange(0,true);
					emChange(0,true);
					nowBar = 0;
				}else if(scrollTop <= 1517 - that.innerHeight){
					barChange(0,false);
					emChange(0,false);
				}else if(scrollTop > 1517){
					emChange(0,false);
				}
				//2楼
				if(scrollTop > 2094 - that.innerHeight && scrollTop < 2094){
					barChange(1,true);
					emChange(1,true);
					nowBar = 1;
				}else if(scrollTop <= 2094 - that.innerHeight){
					barChange(1,false);
					emChange(1,false);
				}else if(scrollTop > 2094){
					emChange(1,false);
				}
				//3楼
				if(scrollTop > 2675 - that.innerHeight && scrollTop < 2675){
					barChange(2,true);
					emChange(2,true);
					nowBar = 2;
				}else if(scrollTop <= 2675 -that.innerHeight){
					barChange(2,false);
					emChange(2,false);
				}else if(scrollTop > 2675){
					emChange(2,false);
				}
				//4楼
				if(scrollTop > 3253 - that.innerHeight && scrollTop < 3253){
					barChange(3,true);
					emChange(3,true);
					nowBar = 3;
				}else if(scrollTop <= 3253 - that.innerHeight){
					barChange(3,false);
					emChange(3,false);
				}else if(scrollTop > 3253){
					emChange(3,false);
				}
				//5楼
				if(scrollTop > 3832 - that.innerHeight && scrollTop < 3832){
					barChange(4,true);
					emChange(4,true);
					nowBar = 4;
				}else if(scrollTop <= 3832 - that.innerHeight){
					barChange(4,false);
					emChange(4,false);
				}else if(scrollTop > 3832){
					emChange(4,false);
				}
				//6楼
				if(scrollTop > 4413 - that.innerHeight && scrollTop < 4413){
					barChange(5,true);
					emChange(5,true);
					nowBar = 5;
				}else if(scrollTop <= 4413 - that.innerHeight){
					barChange(5,false);
					emChange(5,false);
				}


				//左右边栏的 出现 和 消失 

				if(scrollTop > 630 && scrollTop < 5000){
					that.rightWrap.css({
						display:"block"
					});
					that.leftWrap.css({
						display:"block"
					});
				}else{
					that.rightWrap.css({
						display:"none"
					});
					that.leftWrap.css({
						display:"none"
					});
				}
			}

			//这里是barchange
			function barChange(index,res){
				if(res){
					$(that.leftBars[index]).stop().animate({
						top:31*index
					});
				}else{
					$(that.leftBars[index]).stop().animate({
						top:hide_posi
					});
				}
			}
			//这里时 em change
			function emChange(index,res){
				if(res){
					$(that.leftEm[index]).css({
						display:"block"
					});
				}else{
					$(that.leftEm[index]).css({
						display:"none"
					});
				}
			}
			///

		},
		onrightchange(){
			this.weixinBar = $(".weixinBar");
			this.weixinDiv = $(".weixinDiv");

			this.appBar = $(".appBar");
			this.appDiv = $(".appDiv");
			var that = this;
			this.weixinBar.on("mouseover",function(){
				console.log(1);
				that.weixinDiv.css({
					display:"block"
				});
			});
			this.weixinBar.on("mouseout",function(){
				that.weixinDiv.css({
					display:"none"
				});
			});

			this.appBar.on("mouseover",function(){
				that.appDiv.css({
					display:"block"
				});
			});
			this.appBar.on("mouseout",function(){
				that.appDiv.css({
					display:"none"
				});
			});
		}


	}


	return new SideBar();
});
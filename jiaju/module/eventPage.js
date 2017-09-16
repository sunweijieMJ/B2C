;
define(function(){

	function eventJs(){

	}
	eventJs.prototype = {
		constructor:eventJs,
		init(){
			this.publicity = $(".publicity");
			this.publickCon = $(".publickCon");
			this.pubs = $(".pub");
			this.closeBtn = $(".closeBtn");
			this.sexBtns = $(".sexBtns");
			this.codeforIn = $(".codeforIn");
			this.banner_speA = $(".banner_spe a");

			this.onchange();
		},
		onchange(){
			var that = this;
			var timer = null;
			var index= 0;
			timer = setInterval(function(){
				index++;
				if(index%2 == 1){
					$(that.pubs[1]).css({
						"z-index":10
					});
					$(that.pubs[0]).css({
						"z-index":0
					});

					$(that.pubs[1]).animate({
						top:0
					},1000,function(){
						$(that.pubs[0]).css({
							top:that.publicity.height()
						});
						
					});
				}else if(index%2 == 0){
					$(that.pubs[1]).css({
						"z-index":0
					});
					$(that.pubs[0]).css({
						"z-index":10
					});
					$(that.pubs[0]).animate({
						top:0
					},1000,function(){
						
						$(that.pubs[1]).css({
							top:that.publicity.height()
						});
					});
				}

			},2000);
			//点击x 让头上两个div消失
			this.closeBtn.on("click",function(){
				that.publicity.css({
					display:"none"
				});
			});
			//男女
			$.each(this.sexBtns.children(),function(index,value){
				$(value).on("click",function(){
					$(this).addClass("activeSexBtn")
					.siblings().removeClass("activeSexBtn");
				});
			});
			//验证码
			this.codeforIn.on("click",function(){
				$(this).html("切你妹啊");
			});
			//立即活动 变大 变小
			var timer2 = setInterval(function(){
				that.banner_speA.css({
					transition:"0.5s",
					transform:"scale(1.2)"
				});
				setTimeout(function(){
					that.banner_speA.css({
						transition:"0.5s",
						transform:"scale(1)"
					});

				},500);
				
			},1000);
		}
	}



	return new eventJs();
});














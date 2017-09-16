;
define(function(){

	function epCarousel(){

	}
	epCarousel.prototype={
		constructor:epCarousel,
		init(className){
			this.wrap = $(className+" "+".banner_carousel");
			this.box = $(className+" "+".banner_box");
			this.btnbOX = $(className+" "+".banner_btns");
			this.leftBtn = $(className+" "+".leftBtn");
			this.rightBtn = $(className+" "+".rightBtn");

			this.onchange();
		},
		onchange(){
			var index = 0;
			var timer;
			var wrapWidth = this.wrap.width();
			var num  = this.box.children().length;
			
			var that = this;
			autoCarousel();
			this.leftBtn.on("click",function(){
				clearInterval(timer);
				index--;
			
				if(index<0){
					index =0;
				}
				that.box.animate({
					left:-wrapWidth*index
				});
				autoCarousel();
			});
			this.rightBtn.on("click",function(){
				clearInterval(timer);
				index++;
				if(index>=2){
					index =2;
				}
				that.box.animate({
					left:-wrapWidth*index
				});
				autoCarousel();
			});
			this.wrap.on("mouseover",function(){
				clearInterval(timer);
			});
			this.wrap.on("mouseout",function(){
				autoCarousel();
			});

			function autoCarousel(){
				clearInterval(timer);
				timer = setInterval(function(){
					index++;
					if(index == num){
						index = 1;
						that.box.css({
							left:0
						});
					}
					
					that.box.animate({
						left:-wrapWidth*index
					});
				},2000);

			}
		}
	}


	return function(){
		return	new epCarousel();
	};
});
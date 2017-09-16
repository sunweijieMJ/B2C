;
define(function(){

	function StoreBanner(){}

	StoreBanner.prototype= {
		constructor:StoreBanner,
		init(){
			this.wrap = $(".sb_banner");
			this.btns = $(".sb_btns").children();
			this.onchange();
		},
		onchange(){
			var that = this;
			var timer;
			var index = 0;
			start();

			$.each(this.btns,function(indexNum,value){
				$(value).on("click",function(){
					clearInterval(timer);
					index++;
					num = index%2;
					that.wrap.stop().animate({
						left: -num*(that.wrap.width()/2)
					});
					start();
				});
			});
			function start(){
				clearInterval(timer);
				var num = 0;
				timer = setInterval(function(){

					index++;
					num = index%2;
					that.wrap.stop().animate({
						left: -num*(that.wrap.width()/2)
					});


				},3000);
			}
		}
	}

	return new StoreBanner();
});
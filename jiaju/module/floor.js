;
define(function(){
	function Floorlol(){}	
	Floorlol.prototype = {
		constructor:Floorlol,
		init(className){
			this.wrap = $(className+" "+".f1_con_two");
			this.box = $(className+" "+".two_box");
			this.dots = $(className+" "+".f1_con_two_dots");

			this.timer = null;
			this.onchange();
		},
		onchange(){
			var that = this;
			var index = 0;

			start();
			$.each(this.dots.children(),function(indexNum,value){
				$(value).on("mouseover",function(){
					clearInterval(that.timer);
					
					that.box.stop().animate({
						left:-indexNum*that.wrap.width()
					});
					var $dom = $(that.dots.children()[indexNum]);

					$dom.addClass("active_f1_con_two_dot")
					.siblings().removeClass("active_f1_con_two_dot");

					index = indexNum;
					start();
				});
			});

			function start(){

				clearInterval(that.timer);
				var num = 0;
				that.timer = setInterval(function(){
					index++;
					num = index%2;
					that.box.stop().animate({
						left:-num*that.wrap.width()
					});
					var $dom = $(that.dots.children()[num]);
					 $dom.addClass("active_f1_con_two_dot")
					.siblings().removeClass("active_f1_con_two_dot");
				},2000);
			}
		}
	}
	return function(){
		return new Floorlol();
	};
})
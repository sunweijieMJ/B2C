;
define(function(){
	function Floor_img(){}	
	Floor_img.prototype = {
		constructor:Floor_img,
		init(){
			this.imgs = $(".f1_con_three img");
			this.onchange();
		},
		onchange(){
			var that = this;
			$.each(this.imgs,function(index,value){
				$(value).on("mouseover",function(){
					$(this).stop().animate({
						left:"10px"
					});
				});
				$(value).on("mouseout",function(){
					$(this).stop().animate({
						left:"25px"
					});
				});
			})
		}
	}
	return new Floor_img();
})
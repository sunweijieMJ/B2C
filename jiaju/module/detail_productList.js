;
define(function(){

	function Product(){

	}
	Product.prototype = {
		constructor:Product,
		init(){

			this.allBtn = $(".all");
			this.categoryList = $(".category_list");
			this.onchange();
		},
		onchange(){
			var that = this;
			this.allBtn.on("mouseover",function(){
				that.categoryList.css({
					display:"block"
				});
			});
			this.allBtn.on("mouseout",function(){
		
				that.categoryList.css({
					display:"none"
				});
			});
		}
	}

	return new Product();
})
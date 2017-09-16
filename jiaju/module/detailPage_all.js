;
define(function(){

	//先加载 头部样式 ，再加载 头部的 js
	requirejs(["module/index_getHeadCSS"],function(res){
			
		res.init();
		//加载头部的js
		requirejs(["module/autoLogin"],function(res){
				res.init();
		});
		requirejs(["module/address"],function(res){
				res.init();
		});
		requirejs(["module/search"],function(res){
				res.init();
		});
		requirejs(["module/product"],function(res){
				res.init();
		});
		requirejs(["module/detail_productList"],function(res){
			
			res.init();
		});
		requirejs(["module/detail_product_left"],function(res){
			
			res.init();
		});

		requirejs(["module/friendLink"],function(res){	
				res.init();
		});
	});





	return 1;
});
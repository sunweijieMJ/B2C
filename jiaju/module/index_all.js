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
		});

		
		requirejs(["module/banner"],function(res){
				res.init();
		});
		requirejs(["module/activty_cart"],function(res){
				res.init();
		});

		requirejs(["module/index_getProduct"],function(res){
	
				res.init();
		});
		requirejs(["module/floor"],function(res){
				res().init(".f1");
		});
		requirejs(["module/floor"],function(res){
				res().init(".f2");
		});
		requirejs(["module/floor"],function(res){
				res().init(".f3");
		});
		requirejs(["module/floor"],function(res){
				res().init(".f5");
		});

		requirejs(["module/floor_img"],function(res){
				res.init();
		});
		requirejs(["module/news_left"],function(res){
				res.init();
		});
		requirejs(["module/store"],function(res){
				res.init();
		});
		requirejs(["module/friendLink"],function(res){
				
				res.init();
		});
		requirejs(["module/sideBar"],function(res){
				res.init();
		});

		return 1;
});
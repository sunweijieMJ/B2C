;
define(function(){

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

		requirejs(["module/eventPage_address"],function(res){
				res.init();
		});

		requirejs(["module/friendLink"],function(res){	
				res.init();
		});
		requirejs(["module/eventPage_carousel"],function(res){	
				
				res().init(".banner_materials");
		});
		requirejs(["module/eventPage_carousel"],function(res){	
				
				res().init(".electrical");
		});
		requirejs(["module/eventPage_carousel"],function(res){	
				
				res().init(".furniture");
		});
		requirejs(["module/eventPage"],function(res){	
				console.log(res);
				res.init();
		});
	});





	return 1;
});
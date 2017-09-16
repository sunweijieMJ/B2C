;
define(function(){

	function AllProduct(){	}

	AllProduct.prototype={
		constructor:AllProduct,
		init(){
			this.allPart = $(".part");
			this.category_list = $(".category_list");
			this.listDiv = $(".list_div");
			this.spreadlist = $(".spread_list");
			this.getData();
		},
		getData(){ //获取 json 数据
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/productList.json")
			.then(function(res){
				that.resolveData(res.classify);
			});
		},
		resolveData(dataArr){ //处理 json数据
			var that = this;
			//动态创建 对象
			$.each(dataArr,function(index,value){
				
				var data_con = value.things; // [{name:"客厅",product:{}},{}]
				var $div = $("<div class='list_con'></div>");
				that.listDiv.append($div);

				$.each(data_con,function(index,value){
					var $h2 = $("<h2 class='list_h2'></h2>");
					$h2.html(value.name);
					$div.append($h2);

					var $ul = $("<ul class='list_ul'></ul>");
					$div.append($ul);

					$.each(value.products,function(index, value){
						var $a = $("<a href='#'></a>");
						$a.html(value.name);
						$ul.append($a);

					})
				});

			});

			this.onchange();
		},
		onchange(){  //事件的集合 方法
			var all_list_con = $(".list_con");  //右侧 所有的 定位重合再一起的 list_con
			var that = this;
			//1.鼠标划过左侧栏， 让右侧栏出来
			this.category_list.on("mouseover",function(){
				that.spreadlist.css({
					display:"block"
				});
			});
			//2.鼠标划出左侧栏， 让右侧栏消失
			this.category_list.on("mouseout",function(){
				that.spreadlist.css({
					display:"none"
				});
			});
			//3.鼠标划过侧边栏对应区域，让对应的list_con出来
			$.each(this.allPart,function(index,value){
				$(value).on("mouseover",function(){
					// 注意 这里all_list_con 取出来的 是 dom，要变成 $(dom)
					$(all_list_con[index]).css({
						display:"block"
					}).siblings().not(".half_transparent").css({
						display:"none"
					});
					//边框
					$(this).css({
						"border-bottom":"1px solid #bf1733",
						"border-right":"1px solid #fff"
					}).prev().css({
						"border-bottom":"1px solid #bf1733"
					});
					$(this).find(".part_a").css({
						"color":"#bf1733",
						"text-decoration":"underline"
					});
				});

				// 鼠标划出 左侧对应区域
				$(value).on("mouseout",function(){
					$(this).find(".part_a").css({
						"color":"#333",
						"text-decoration":"none"
					});
					$(this).css({
						"border-bottom":"1px solid #ccc",
						"border-right":"1px solid #bf1733"
					}).prev().css({
						"border-bottom":"1px solid #ccc"
					});
				});

			});
			//3.鼠标划出 右边栏， 展开兰消失
			this.spreadlist.on("mouseover",function(){
				that.spreadlist.css({
					display:"block"
				});
			});
			this.spreadlist.on("mouseout",function(){
				that.spreadlist.css({
					display:"none"
				});
			});
		}
	}
	
	return  new AllProduct();
});











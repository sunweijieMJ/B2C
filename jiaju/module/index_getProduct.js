;
define(function(){

	function getProductOne(){

	}
	getProductOne.prototype ={
		constructor:getProductOne,
		init(){
			this.divs = $(".f1_con");
			this.getData();
		},
		getData(){
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/index_getProduct.json")
			.then(function(res){
				that.setData(res.options);
			});
		},
		setData(dataArr){
			var that = this;
			$.each(this.divs,function(index,value){
				var newArr = $(value).find(".f1_con_standard");
				var newDataArr = dataArr[index].con;
				$.each(newArr,function(index,value){
				
					$(value).find("h3 a").html(newDataArr[index].title);
					$(value).find(".f1_price em").html(newDataArr[index].price);
					//console.log(newDataArr[index].src);
					//console.log($(value).find(".f1_con_spe_div a img").attr("src"));
					$(value).find(".f1_con_spe_div a img").attr("src",newDataArr[index].src);
				});
			});
		}

	}




	return new getProductOne();
});
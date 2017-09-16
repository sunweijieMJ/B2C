;
define(function(){

	function News_left(){

	}
	News_left.prototype = {
		constructor:News_left,
		init(){
			this.diff_divs = $(".diff_div");//4个
			this.left_navs = $(".f6_left_notActive");
			this.right_navs = $(".f6_right_nav").children();
			this.right_hides = $(".f6_right_con_hide");

			this.getData();

		},
		getData(){
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/new_top.json")
			.then(function(res){
				that.resolveData(res);
			});
		},
		resolveData(data){
			//将获取的数据 加载到 html中
			var leftData = data.classify;
			var rightData = data.report;
			var that = this;
			//左边的数据
			$.each(leftData,function(index,value){
				var $diff_div = $(that.diff_divs[index]);
				var $diff_div_imgs = $diff_div.find(".diff_a");
				var $diff_div_intros = $diff_div.find(".diff_intro");
				var $diff_div_news = $diff_div.find(".f6_left_news li a");
				//value.options  //[{url:, intro:},{},{}]
				//value.news  //["","","",]
				$.each(value.options,function(index,value){
					$($diff_div_imgs[index]).attr("src",value.url);
					$($diff_div_intros[index]).html(value.intro);
				});
				
				$.each(value.news,function(index,value){
					$($diff_div_news[index]).html(value);
				});
			});	
			//右边的数据
			$.each(rightData,function(index,value){
				//value  {{ } , {} , {} }	
				var rightImgs =  $(that.right_hides[index]).find(".f6_right_img");
				var rightTitles =  $(that.right_hides[index]).find(".f6_right_title");
				var rightIntros =  $(that.right_hides[index]).find(".f6_right_intro");
				var rightFrom =  $(that.right_hides[index]).find(".f6_right_from");
				//console.log(rightImgs);
				$.each(value.options,function(index,value){
					//value { url,title, intro ,from }
					$(rightImgs[index]).attr("src",value.url);
					$(rightTitles[index]).html(value.title);
					$(rightIntros[index]).html(value.intro);
					$(rightFrom[index]).html(value.from);
				});
			});
		
			// 鼠标划过  左边对应的出来
			$.each(this.left_navs,function(index,value){
				$(value).on("mouseover",function(){
					
					$(this).addClass("f6_left_active")
					.siblings().removeClass("f6_left_active");

					$(that.diff_divs[index]).css({
						display:"block"
					}).siblings().css({
						display:"none"
					});
				});
			});

			$.each(this.right_navs,function(index, value){
				$(value).on("mouseover",function(){
					$(that.right_hides[index]).css({
						display:"block"
					}).siblings().css({
						display:"none"
					});
				});
			});
		}
	}





	return new News_left();
});
;
define(function(){

	/*  #search_inp      */
	function Search(){

	}
	Search.prototype = {
		constructor:Search,
		init(){
			this.inp = $("#search_inp");
			this.result= $(".search_result");
			this.box = $(".head");
			this.startSearch();
		},
		startSearch(){
			var timer;
			var that = this;
			this.inp.on("keyup",function(){
				var res = this.value;
				if(!res){
					return;
				}
				$(this).css({
					color:"#333"
				});
				clearTimeout(timer);
				timer = setTimeout(function(){
					$.ajax({
						url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+res
						+"&json=1&p=3&sid=&req=2&pbs=%E7%99%BE%E5%BA%A6&csor=6&pwd=baidu",
						dataType:"jsonp",
						jsonp:"cb"
					})
					.then(function(data){
						that.loadData(data.s);
					},function(){
						console.log("出错了");
					});
				},100);

			});
			this.box.on("click",function(){
				that.result.css({
					display:"none"
				});
			});
		},
		loadData(dataArr){
			var that = this;
			this.result.html("");
			$.each(dataArr,function(index,value){
				var li = document.createElement("li");
				li.innerHTML = value;
				that.result.append(li);
			});
			this.result.show();
			var aLi = this.result.children();
			$.each(aLi,function(index,value){
				$(value).on("mouseover",function(){
					$(this).addClass("active_search")
					.siblings().removeClass("active_search");
				});
				$(value).on("click",function(){
					var str = this.innerHTML;
					that.inp.val(str);
					that.result.hide();
				});
			});

		}
	}

	return new Search();
})
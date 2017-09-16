;
define(function(){

	//ES6 的 class  少用
	// class GetAddress{
	// 	constructor(){
	// 	}
	// 	getData(){
	// 		$.ajax("http://localhost/gulp/myProject/data/allCity.json")
	// 		.then(function(res){
	// 			console.log(res);
	// 			this.allCity = res;
	// 		},function(){
	// 			console.log("加载json出错");
	// 		});
	// 	}
	// }

	function GetAddress(){}
			
	GetAddress.prototype={
		constructor:GetAddress,     //这行代码 有必要写吗
		init(){          //1.初始化 对象
			this.box = $(".h_left_one");     // 大盒子
			this.address = $(".final_address");
			this.hideDiv = $(".selDiv_one");
			this.province = $("#provs");   //最终要显示的省a标签
			this.pro_list = $(".province_ul");
			this.city = $("#cities");		//最终要显示的市a标签
			this.city_list = $(".city_ul");
			this.transparent = $(".transparent");
			this.getData();
		},
		getData(){ // 2.获取 json数据
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/allCity.json")
			.then(function(data){  //获取到数据
				that.data =data.regions;
				that.handleData(data.regions);
				
			},function(){
				console.log("加载json出错");
			});
		},
		handleData(data){ // 3.处理json数据，加载省的信息
			//先加载 省的 数据
			for(var key in data){
				var li = document.createElement("li");
				li.innerHTML = data[key].name;
				this.pro_list.append(li);
			}
			this.onchangePro();
		},
		onchangePro(){  // 4.鼠标 事件 的 方法集合
			//鼠标移入box
			var that = this;
			this.box.on("mouseover",function(){
				$(this).css({
					background:"#fff",
					borderLeft:"1px solid #ccc",
					borderRight:"1px solid #ccc"
				});
				that.hideDiv.show();
				that.transparent.show();
			});
			//鼠标移出box
			this.box.on("mouseout",function(){
				$(this).css({
					background:"#f7f7f7",
					borderLeft:"1px solid #f7f7f7",
					borderRight:"1px solid #f7f7f7"
				});
				that.hideDiv.hide();
				that.transparent.hide();
			});
			//点击省的时候
			this.province.on("click",function(){

				that.pro_list.toggle();
			});
			//点击 市的时候
			this.city.on("click",function(){

				that.city_list.toggle();
			});

			//
			var aLi = this.pro_list.children();
			$.each(aLi,function(index,value){

				$(value).on("click",function(){
					var str = this.innerHTML;
					that.province.html(str);
					that.pro_list.hide();
					that.onchangeCity(index);
				});
				
			});

		},
		onchangeCity(index){
			var that = this;
			this.city_list.html("");
			var cities  = this.data[index].regions;
			console.log(cities);
			$.each(cities,function(index,value){
				var li = document.createElement("li");
				li.innerHTML = value.name;
				that.city_list.append(li);
			});
				
			var aLi = this.city_list.children();
			$.each(aLi,function(index,value){

				$(value).on("click",function(){
					var str = this.innerHTML;
					that.city.html(str);
					that.city_list.hide();
					that.address.html("送至："+str);
				});
				
			});
		}
	}
	return new GetAddress();
	
});
















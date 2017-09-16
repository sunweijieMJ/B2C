;
define(function(){

	function GetAddress2(){}
			
	GetAddress2.prototype={
		constructor:GetAddress2,     //这行代码 有必要写吗
		init(){          //1.初始化 对象
			this.box = $(".h_left_one2");     // 大盒子
			this.hideDiv = $(".selDiv_one2");
			this.province = $("#provs2");   //最终要显示的省a标签
			this.pro_list = $(".province_ul2");
			this.city = $("#cities2");		//最终要显示的市a标签
			this.city_list = $(".city_ul2");
			this.transparent = $(".transparent2");
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
		onchangePro(){  
	
			var that = this;

			//点击省的时候
			this.province.on("click",function(){

				that.pro_list.toggle();
			});
			//点击 市的时候
			this.city.on("click",function(){

				that.city_list.toggle();
			});
			var aLi = this.pro_list.children();
			$.each(aLi,function(index,value){

				$(value).on("click",function(){
					var str = this.innerHTML;
					that.province.html(str+"<span>V</span>");
					that.pro_list.hide();
					that.onchangeCity(index);
				});
			});
		},
		onchangeCity(index){
			var that = this;
			this.city_list.html("");
			var cities  = this.data[index].regions;
		
			$.each(cities,function(index,value){
				var li = document.createElement("li");
				li.innerHTML = value.name;
				that.city_list.append(li);
			});
				
			var aLi = this.city_list.children();
			$.each(aLi,function(index,value){

				$(value).on("click",function(){
					var str = this.innerHTML;
					that.city.html(str+"<span>V</span>");
					that.city_list.hide();
				});
				
			});
		}
	}
	return new GetAddress2();
	
});
















;
define(function(){

	function Activty_cart(){}

	Activty_cart.prototype ={
		constructor:Activty_cart,
		init(){
			this.box = $(".g_center");
			this.showDiv = $(".g_box");
			this.leftBtn = $(".left_btn");
			this.rightBtn = $(".right_btn");
			this.leftDot = $(".left_dot");
			this.rightDot = $(".right_dot");
			this.allDot = $(".g_dots");
			this.allBtn = $(".g_btns");
			
			this.shwoFives = $(".showFive");
		
			this.timer = null;
			this.getData();
			
		},
		getData(){
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/index_part_one.json")
			.then(function(res){
				that.setData(res.options);
			});
			
		},
		setData(dataArr){
			$.each(this.shwoFives,function(index,value){
				var partDataArr = dataArr[index].con;
				$.each($(value).children(".commonpart"),function(index,value){
					
					$(value).find("dl dt a img").attr("src",partDataArr[index].src);
					$(value).find(".introduce").html(partDataArr[index].title);
					$(value).find(".price p").html(partDataArr[index].price);
					$(value).find(".price_discount p").html(partDataArr[index].discount);

				});
			});

			this.show();
			this.activityTime();
		},
		show(){
			
			var index = 0;
			var that = this;
			start();
			//事件  鼠标划过 和 点击两侧按钮
			//1.
			$.each(this.allDot.children(),function(indexNum,value){

				$(value).on("mouseover",function(){

					clearInterval(that.timer);
					index = indexNum;
					that.showDiv.stop().animate({
						left:(-index*(that.showDiv.width()/2))
					},800);

					$(this).addClass("hot_dot")
					.siblings().removeClass("hot_dot");
				});
			});


			//2.
			this.box.on("mouseover",function(){
				clearInterval(that.timer);
				that.allBtn.css({
					display:"block"
				});
			});
			this.box.on("mouseout",function(){
				that.allBtn.css({
					display:"none"
				});
				start();
			});
			//3
			$.each(this.allBtn.children(),function(indexNum,value){

				$(value).on("click",function(){

					clearInterval(that.timer);
					index++;
					var num = index%2;
				
					that.showDiv.stop().animate({
						left:(-num*(that.showDiv.width()/2))
					},800);

					var nowDot = that.allDot.children()[num];
					$(nowDot).addClass("hot_dot")
					.siblings().removeClass("hot_dot");
					start();

				});
			});


			//封装一个 运动的函数
			function start(){
					
				clearInterval(that.timer);
				
				that.timer = setInterval(function(){
					index++;

					var num = index%2;
				
					that.showDiv.stop().animate({
						left:(-num*(that.showDiv.width()/2))
					},800);

					var nowDot = that.allDot.children()[num];
					$(nowDot).addClass("hot_dot")
					.siblings().removeClass("hot_dot");

				},3000);
			}
		},
		activityTime(){
			var that = this;
			this.acTimePs = $(".activeTime p");

			timeCheck();
			var timer = setInterval(timeCheck,1000);
			
			function timeCheck(){
				var div1 = document.getElementById("div1");
				var  d1 = new Date();
				var  d2 = new Date(2017,6,1,00,00,00);
				//console.log(typeof d2);//对象， 不能赋值给新的 变量，只能通过设置毫秒一样来
				var dd1 =d1.getTime();
				var dd2 =d2.getTime();

				var minus = dd2-dd1;
				
				var d = Math.floor(minus/(1000*60*60*24)) ;
				var h = Math.floor(minus/(1000*60*60)) - d*24;
				var min = Math.floor(minus/(1000*60)) - d*24*60 - h*60;
				var sec = Math.floor(minus/1000) - d*24*60*60 - h*60*60 -min*60;

				$(that.acTimePs[0]).html(checkNum(d));
				$(that.acTimePs[4]).html(checkNum(d));
				$(that.acTimePs[1]).html(checkNum(h));
				$(that.acTimePs[5]).html(checkNum(h));
				$(that.acTimePs[2]).html(checkNum(min));
				$(that.acTimePs[6]).html(checkNum(min));
				$(that.acTimePs[3]).html(checkNum(sec));
				$(that.acTimePs[7]).html(checkNum(sec));
			}
			function checkNum(n){
				n= +n;
				if(n<10){
					return "0"+n;
				}
				return ""+n;
			}
		}
	}

	return new Activty_cart();
});





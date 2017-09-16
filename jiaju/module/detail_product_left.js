;
define(function(){

	function ProductImg(){

	}
	ProductImg.prototype = {
		constructor:ProductImg,
		init(){
			this.smallImg = $(".smallImg");
			this.bigDiv = $(".bigDiv");
			this.bigImg = $(".bigImg");
			this.smallBox = $(".smallBox");
			this.imgBtnsBox = $(".imgDivTwo");
			this.Box = $(".imgDivOne");
			this.moreA = $(".moreA");
			this.hide_share = $(".hide_share");
			this.getData();
		},
		getData(){
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/detail_left.json")
			.then(function(res){
				
				that.setDataLeft(res.images);
				that.setDataRight(res.introduce);
				that.setDataOther(res.closely);
				that.getListJson();
				
			});			
		},
		setDataLeft(dataArr){
			var that = this;
			//
			var num = 0;
			$.each(dataArr,function(index,value){
				// value {"small":  , "big" : , "largest" : }
				var $imgbtn = $("<div class='sd'></div>");
				that.imgBtnsBox.append($imgbtn);
				$imgbtn.css({
					background:"url("+ value.small +") no-repeat",
					"background-size":"100% 100%"
				})
				.attr("src_big",value.big)
				.attr("src_largest",value.largest);
				
				
				//等所有div背景小图片初始化完成后，生成第一个div的big图片
				num++;
				if(num >=5){
					$imgbtn.addClass("active_sd");
					that.smallImg.attr("src",value.big);
					that.smallImg.on("load",function(){
						that.onchange();
						that.onchangeOther();

					});
				}
			});
			
			
		},
		setDataRight(dataObj){
			//物品 价格等等初始化
			var that = this;
			this.cTop = $(".cTop");
			this.center = $(".cCenter");
			this.price = $(".cPrice").children("em");
			this.dealNum = $(".cDeals").children("em");
			this.code = $(".proCode").children("span");
			this.structure = $(".choose_one a em");
			this.sizeBox = $(".choose_two");

			this.numberInput = $(".numberBtn");
			this.addBtn = $(".addBtn");
			this.minusBtn = $(".minusBtn");

			this.cTop.children("span").html(dataObj.title.activeName);
			this.cTop.children("em").html(dataObj.title.name);
			this.center.children("a").html(dataObj.content);
			this.price.html(dataObj.price);
			this.code.html(dataObj.code);
			this.structure.html(dataObj.structure)
			.siblings("span").css({
				display:"block"
			})
			//
			var sizeArr = dataObj.size;

			for(var i = 0 ; i < sizeArr.length; i++){
				
				var $a = $('<a href="javascript:;"><em>'+sizeArr[i]+'</em><span></span></a>');
				if(i == 0){
					$a.css({
						border:"2px solid #cc0033"
					}).find("span").css({
						display:"block"
					});
				}
				$a.on("click",function(){
					$(this).css({
						border:"2px solid #cc0033"
					}).find("span").css({
						display:"block"
					}).parent().siblings("a").css({
						border:"2px solid #999"
					}).find("span").css({
						display:"none"
					})
				});
				this.sizeBox.append($a);
			}
			//数量
			this.numberInput.val(1)
			.on("blur",function(){
				if($(this).val() < 1){
					$(this).val(1);
				}
			});
			this.addBtn.on("click",function(){
				that.numberInput.val(+that.numberInput.val()+1);
			});
			this.minusBtn.on("click",function(){
				if(+that.numberInput.val() == 1){
					return;
				}
				that.numberInput.val(+that.numberInput.val()-1);
			});

		},
		setDataOther(dataArr){
			
			var that =this;
			this.closelyUl = $(".closelyUl");
			this.closely = $(".closely");
			for(var i = 0 ; i <dataArr.length; i++){
				var $li = $("<li>"+dataArr[i]+"</li>");
				this.closelyUl.append($li);
			}
			//滚动到一定程度 左边的 相关分类才显现出来
			window.onscroll =function(){
			
				
					var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
					if(scrolltop >100){
						that.closely.animate({
							opacity:"1"
						});
					}else{
						that.closely.animate({
							opacity:"0"
						});
					}
			
			}

		},
		onchange(dataArr){
			var that = this;
			this.Box.on("mouseout",function(){
				that.smallBox.css({
					display:"none"
				});
				that.bigDiv.css({
					display:"none"
				});
			});
			this.Box.on("mouseover",function(){
				that.smallBox.css({
					display:"block"
				});
				that.bigDiv.css({
					display:"block"
				});
			});

			var img_left = this.smallImg.offset().left;
			var img_top = this.smallImg.offset().top;
			//鼠标 在 物体上移动
			this.Box.on("mousemove",function(event){
				var evt = event || window.event;
				var mx = evt.pageX;
				var my = evt.pageY;
				
				var x = mx -img_left;
				var y = my - img_top;

				var minL = that.smallBox.width()/2;
				var maxL = that.smallImg.width() - that.smallBox.width()/2;
				var minT = that.smallBox.height()/2;
				var maxT = that.smallImg.height() - that.smallBox.height()/2;
				if(x <= minL){
					x = minL;
				}else if(x >= maxL){
					x = maxL;
				}
				if(y < minT){
					y = minT;
				}else if(y > maxT){
					y = maxT;
				}
				x = x - that.smallBox.width()/2;
				y = y - that.smallBox.height()/2;
				
				that.smallBox.css({
					left:x,
					top:y
				});
				
				var rateL = that.bigImg.width()/that.smallImg.width();
				var rateT = that.bigImg.height()/that.smallImg.height();
				
				that.bigImg.css({
					left:-rateL*x,
					top:-rateT*y
				});
			});

			//鼠标划过 5张小图，切换大图 和 largest图
			$.each(that.imgBtnsBox.children(),function(index,value){
				$(value).on("mouseover",function(){
					$(this).addClass("active_sd")
					.siblings().removeClass("active_sd");

					that.smallImg.attr("src",$(this).attr("src_big"));
					that.bigImg.attr("src",$(this).attr("src_largest"));
				});
			});

			//鼠标划过 底下 分享 更多
			this.moreA.on("mouseover",function(){
				
				that.hide_share.css({
					display:"block"
				});
			});
			this.moreA.on("mouseout",function(){
				
				that.hide_share.css({
					display:"none"
				});
			});

			
		},
		onchangeOther(){
			//中间后面的  评价 区域
			var that = this;
			this.conTopNavs = $(".conTopNav").children(".fourA");
			this.conCons = $(".conCon>div");

			$(this.conTopNavs[0]).css({background:"#ccc"});
			$(this.conCons[0]).css({display:"block"});
			$.each(this.conTopNavs,function(index,value){
				$(value).on("click",function(){
					$(this).css({
						background:"#ccc"
					}).siblings(".fourA").css({
						background:"#fff"
					});

					$(that.conCons[index]).css({
						display:"block"
					}).siblings().css({
						display:"none"
					});
				});
			});
		},
		getListJson(){
			
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/allProducts_for_shoppingCart.json")
			.then(function(res){
				
				that.setShoppingCart(res.options);
			});
			
		},
		setShoppingCart(listArr){
		
			var that = this;
			this.shoppingCart = $(".shoppingCart");
			this.cartCarBtn = $(".cartCar").find("a");
			this.num = $(".proNum"); //购物车物品的数量
			this.spCartBtn = $(".spCartBtn");//添加到购物车的按钮
			this.cartList = $(".cartList");

			this.minusBtn2 = $(".minusBtn2");
			this.addBtn2 = $(".addBtn2");
			this.numberBtn2 = $(".numberBtn2");
			this.deleteBtn = $(".deleteBtn");
			//让侧栏 出来和消失
			var index = 2;
			this.cartCarBtn.on("click",function(){
				console.log(index);
				if(index % 2 == 0){
					that.shoppingCart.animate({
						right:0
					});
				}else if(index%2 == 1){
				
					that.shoppingCart.animate({
						right:-270
					});
				}
				index++;
			});

			// 先获取cookie ,看下当前是否有 购物车cookie
			
			if(getCookie("shoppingCart")){
				var num = JSON.parse(getCookie("shoppingCart")).length;
				that.num.html(cartNumber());
				loadCart();
			}else{
				that.num.html(0);
			}


			//点击 添加到购物车
			this.spCartBtn.on("click",function(){
				var id = $(this).attr("pro_id");
				
				//？？？？？？？？？？？？？？？？？？？？？？？？？
				var pNum = +that.numberInput.val();
				console.log(pNum);
				//{  "options":[{ id  src  price  intro },{}]   }
				var str = "";
				if(!getCookie("shoppingCart")){
			
					//如果cookie没有数据
					setCookie("shoppingCart",'[{"id":"'+id+'","num":'+pNum+'}]',7);
					//getCookie("shoppingCart")
					that.num.html(pNum); //修改页面购物车的数量
					loadCart();

				}else{
					//存在该购物车cookie
					var isExist = false;
					var cookieArr = JSON.parse(getCookie("shoppingCart"));
			
					$.each(cookieArr,function(index,value){
						if(value.id == id){
							//存在该id
							console.log("存在该id");
							cookieArr[index].num+=pNum;

							isExist = true;
							return false;
						}
					});

					if(!isExist){
						//存在cookie  不存在该商品
						cookieArr.push({"id":id,"num":"1"});
						
						
					}

					var newCookie = JSON.stringify(cookieArr);

					setCookie("shoppingCart",newCookie,7);
					that.num.html(cartNumber());
					loadCart();
 				}

			});
			//购物车 物品数量
			function  cartNumber(){
				var str = getCookie("shoppingCart");
				if(!str){
					return 0;
				}
				var arr = JSON.parse(str);
				var res = 0;
				for(var i = 0 ; i <arr.length; i++){
					res+= +arr[i].num;
				}
				return res;
			}

			//购物车 清单div 的 字符串拼接
			function loadCart(){
				var cookieArr = JSON.parse(getCookie("shoppingCart"));
				//[{id: , num:}]
				var html = "";
				$.each(cookieArr,function(index,value){
					var obj = listArr[value.id];
					html+='<div class="item" pro_id ='+obj.id+'>'+'<h3 class="itemShop">'+(index+1)+". "+
					obj.intro +'</h3><a class="deleteBtn"  href="javascript:;">删除该项</a>'+
					'<div class="itemCon clearfix">'+'<input type="checkbox" name="itemSelect" class="itemSelect">'
					+'<a href="javascript:;"><img src="'+obj.src+'" alt=""></a>'
					+'<div class="numChangeDiv clearfix"><a href="javascript:;" class="minusBtn2">-</a>'
					+'<input type="text" class="numberBtn2" disabled="disabled" value="'+value.num+'"><a href="javascript:;" class="addBtn2">+</a></div>'
					+'<h5><span>￥</span><em price="'+obj.price+'">'+value.num*obj.price+'</em></h5></div>'
					+'</div>';
				});
				that.cartList.html(html);

				var divItems = $(".item");
				$.each(divItems,function(index,value){

					var price = $(value).find(".itemCon h5 em").attr("price");
					//减少
					$(value).find(".minusBtn2").on("click",function(){
						var num= +$(this).siblings(".numberBtn2").val() -1;
						if(num == 0){
							num=1;
						}
						$(this).siblings(".numberBtn2").val(num);
						$(value).find(".itemCon h5 em").html(price*num);
						console.log(num);
						cookieArr[$(value).attr("pro_id")].num = num;
						var newCookie = JSON.stringify(cookieArr);

						setCookie("shoppingCart",newCookie,7);
						that.num.html(cartNumber());
					});
					//增加
					$(value).find(".addBtn2").on("click",function(){
						var num= +$(this).siblings(".numberBtn2").val();
						num++;
						$(this).siblings(".numberBtn2").val(num);
						$(value).find(".itemCon h5 em").html(price*num);

						cookieArr[$(value).attr("pro_id")].num++;
						var newCookie = JSON.stringify(cookieArr);

						setCookie("shoppingCart",newCookie,7);
						that.num.html(cartNumber());
					});
					//删除  删除cookie的东西 并且 移除该div
					$(value).find(".deleteBtn").on("click",function(){
						
						var newArr = [];
						for(var i = 0 ; i < cookieArr.length; i++){
							if(cookieArr[i].id !=$(value).attr("pro_id")){
								newArr.push(cookieArr[i]);
							}
						}
						$(this).parents(".item").remove();
						//console.log(newArr);
						if(newArr.length<= 0){
							// console.log("该移除cookie 了");
							// console.log(newArr);
							setCookie("shoppingCart",newCookie,-1);
							that.num.html(cartNumber());
							return;
						}
						var newCookie = JSON.stringify(newArr);

						setCookie("shoppingCart",newCookie,7);
						that.num.html(cartNumber());

					});
				
				});
			}

		}
	}

	return new ProductImg();
})
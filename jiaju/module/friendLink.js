;
define(function(){
	
	function FriendLink(){

	}
	FriendLink.prototype = {
		constructor:FriendLink,
		init(){
			this.wrap = $(".link_con");
			var that = this;
			$.ajax("http://localhost/gulp/myProject/data/friendLink.json")
			.then(function(res){
				that.resolveData(res.options);
			});
		},
		resolveData(data){
			var that = this;
			console.log(data);
			console.log(that.wrap);
			$.each(data,function(index,value){

				var $a = $('<a href="javascript:;"></a>');
				
				that.wrap.append($a);
				console.log(that.wrap);
				$a.html(value);
			});
		
		}
	}


	return new FriendLink();
});
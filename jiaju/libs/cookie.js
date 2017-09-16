
//cookie的增删改查功能

// 增加 和 修改 cookie
	function setCookie(name,value,expires,path){

		value = window.encodeURIComponent(value);
		// 若没有过期时间，则就是0
		if(!expires){
			expires = 0;
		}
		var date = new Date();
		var res = date.setDate(date.getDate()+expires);
		// 若没有路径，则就是/
		if(!path){
			path = "/";	
		}
		document.cookie = name+"="+value+";expires="+date.toGMTString()+";path="+path;
	
	}
// 删除cookie
	function removeCookie(name){
		setCookie(name,"",-1);
	}
// 查询cookie
	function getCookie(name){
		var cookieStr = document.cookie;
		var pattern = new RegExp("(^| )"+ name + "=" + "([^;]+)" + "(;|$)");
		var res = cookieStr.match(pattern);
	
		if(res){
			return window.decodeURIComponent(res[2]);
		}
		return "";
	}

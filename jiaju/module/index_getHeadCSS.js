;
define(function(){

	function GetHeadCss(){

	}
	GetHeadCss.prototype = {
		constructor:GetHeadCss,
		init(){
			this.wrap = $(".top");
			this.footBottom = $(".footBottom");
			this.get();
		},
		get(){
		
			this.wrap.load("http://localhost/gulp/myProject/common_header.html");
			this.footBottom.load("http://localhost/gulp/myProject/common_footer.html");
		}
	}


	return new GetHeadCss();
})
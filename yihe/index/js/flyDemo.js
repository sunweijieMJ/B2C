
// 点击商品,生成小图片,飞向购物车,使用的是fly插件
 $(function (){
    
    // 点击商品
    $('.buyImg').click(function (e){
        var cloneImg = $(this).clone();
        var $shopCar = $('.shopCar');
        cloneImg.css({
            width : 80,
            height:80
        });
        $('body').append(cloneImg);
        // 点击图片之后, 让其飞到指定位置
        cloneImg.fly({
            start : {
                left : e.clientX,
                top : e.clientY
            },
            end : {
                left : $shopCar.offset().left - $(window).scrollLeft(),
                top : $shopCar.offset().top - $(window).scrollTop(),
                width : 0,
                height : 0

            },
            autoPlay : true,
            onEnd : function (){
                // console.log('运动结束');
                // 移除元素
                cloneImg.remove();
            }
        });
    });
});
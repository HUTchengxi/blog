$(function(){
	
	/**
	 * 页面滚动到一定程度comment进行固定布局
	 */
	$.fn.scrollpos = function(){
		scrolltop = $(window).scrollTop();
		if(scrolltop >= 100){
			$(".comment").css("position","fixed");
		}
		else{
			$(".comment").css("position","absolute");
		}
	};
	$(window).scroll($.fn.scrollpos);
	$(window).trigger("scroll");
});
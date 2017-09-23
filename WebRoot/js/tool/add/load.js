$(function(){
	/**
	 * 页面加载时页面透明度设置为1
	 */
	$.fn.loadfun = function(){
		$.fn.getcode();
		$("body").css("opacity","0").animate({
			opacity: 1
		},300);
	};
	$.fn.loadfun();
});
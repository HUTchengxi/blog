$(function(){
	
	/**
	 * 页面加载时opacity透明度动画
	 */
	$.fn.loadopac = function(){
		$("body").animate({
			opacity: 1
		},200);
	};
	$.fn.loadopac();
});
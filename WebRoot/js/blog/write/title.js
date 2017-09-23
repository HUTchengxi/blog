$(function(){
	/**
	 * 标题输入框获得焦点事件
	 */
	$.fn.titlegetfocus = function(){
		$(this).attr("placeholder","");
	};
	$(".main .main-title .title").focus($.fn.titlegetfocus);
	
	/**
	 * 标题输入框失去焦点事件
	 */
	$.fn.titlelosefocus = function(){
		$(this).attr("placeholder","在此输入你的标题...");
	};
	$(".main .main-title .title").blur($.fn.titlelosefocus);
});
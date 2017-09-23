$(function(){
	/**
	 * 点击返回顶部
	 */
	$.fn.gotopfun = function(){
		$("body").animate({
			scrollTop: 0
		},500);	
		$(".sidebarbox ul li:nth-child(1)").animate({
			opacity: 0
		},500);
		$(".sidebarbox ul li:nth-child(3)").css("visibility","visible").animate({
			opacity: 1
		},500);
		window.setTimeout(function(){
			$(".sidebarbox ul li:nth-child(1)").css("visibiity","hidden");
		},500);
	};
	$(".sidebarbox ul li:nth-child(1) a").click($.fn.gotopfun);
	
	/**
	 * 返回底部
	 */
	$.fn.gobottomfun = function(){
		var height = $(document).height();
		$("body").animate({
			scrollTop: height+"px"
		},500);	
		$(".sidebarbox ul li:nth-child(3)").animate({
			opacity: 0
		},500);
		$(".sidebarbox ul li:nth-child(1)").css("visibility","visible").animate({
			opacity: 1
		},500);
		window.setTimeout(function(){
			$(".sidebarbox ul li:nth-child(3)").css("visibiity","hidden");
		},500);
	};
	$(".sidebarbox ul li:nth-child(3) a").click($.fn.gobottomfun);
	
	/**
	 * window页面滚动事件
	 */
	$.fn.scrollfun = function(){
		var scrolltop = $(this).scrollTop();
		if(scrolltop > 150){
			$(".sidebarbox ul li:nth-child(3)").css("visibility","hidden").css("opacity",0);
			$(".sidebarbox ul li:nth-child(1)").css("visibility","visible").css("opacity",1);
		}
		else{
			$(".sidebarbox ul li:nth-child(1)").css("visibility","hidden").css("opacity",0);
			$(".sidebarbox ul li:nth-child(3)").css("visibility","visible").css("opacity",1);
		}
		
		if(scrolltop >= 880){
			$(".hotbox").css("position","fixed").css("top",0);
			$(".news-guest").css("position","fixed").css("top","285px");
		}
		else{
			$(".news-guest").css("position","relative").css("top",0);
			$(".hotbox").css("position","relative");
		}
	};
	$(window).scroll($.fn.scrollfun);
	$(window).trigger("scroll");
});


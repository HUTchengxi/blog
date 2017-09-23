$(function(){
	/**
	 * 页面滚动到100时main-right固定布局
	 */
	$.fn.scrollpos = function(){
		var scrolltop = $(window).scrollTop();
		if(scrolltop >= 253){
			$(".main-right").css("top",20+scrolltop-253+"px");
			$(".main-hr").css("position","fixed").css("top","3px");
		}
		else{
			$(".main-right").css("top","0");
			$(".main-hr").css("position","relative").css("top","3px");
		}
	};
	$(window).scroll($.fn.scrollpos);
	$(window).trigger("scroll");
	
	/**
	 * 退出登录
	 */
	$.fn.exitlogin = function(){
		if(confirm("确认退出登录?")){
			$.ajax({
				async: true,
				type: "post",
				url: "exitlogin",
				dataType: "json",
				success: function(data){
					alert("退出成功!");
					console.log(data);
					window.location.href = "goguest";
				},
				error: function(xhr){
					alert("服务器环境异常-->"+xhr.status);
				}
			});
		}
	};
	$(document).on("click","header .myinfo .exit",$.fn.exitlogin);
	
	//鼠标移入我的留言登录事件
	$.fn.gomynologinfun = function(){
		$(this).css("background-color",$(this).css("background-color")).css("animation","none");
	};
	$(document).on("mouseover",".main-right .myguest .myguestcontent div.my-nologin",$.fn.gomynologinfun);
	//鼠标移开我的留言登录事件
	$.fn.lemynologinfun = function(){
		$(this).css("animation","nologinani 1s infinite");
	};
	$(document).on("mouseleave",".main-right .myguest .myguestcontent div.my-nologin",$.fn.lemynologinfun);
	
});


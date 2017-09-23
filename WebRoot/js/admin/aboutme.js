$(function(){
	
	/**
	 * 轮播图效果
	 */
	var showpic = 1;
	var bgshowinterval;
	$.fn.pictrans = function(){
		showpic ++;
		var top = parseInt($(".banner-left .content .smallbg .smaborder").css("top")) + 75;
		if(showpic == 5){
			showpic = 1;
			top = 0;
		}
		$(".banner-left .content .smallbg .smaborder").css("top",top+"px");
		$(".banner-left .content ul li.bgshow").removeClass("bgshow");
		$(".banner-left .content ul li:nth-child("+showpic+")").addClass("bgshow");
		
	};
	bgshowinterval = window.setInterval($.fn.pictrans, 3000);
	
	/**
	 * 鼠标移动到图片上去取消轮播，移开继续
	 */
	var enter = 0;
	$.fn.mouseenterpic = function(){
		enter = 1;
		window.clearInterval(bgshowinterval);
	};
	$(".banner-left .content ul li").on("mouseenter",$.fn.mouseenterpic);
	
	$.fn.mouseleavepic = function(){
		if(enter == 1){
			enter = 0;
			bgshowinterval = window.setInterval($.fn.pictrans, 3000);
		}
	};
	$(".banner-left .content ul li").on("mouseleave",$.fn.mouseleavepic);
	
	$.fn.mouseclickpic = function(){
		window.clearInterval(bgshowinterval);
		$.fn.pictrans();
		enter = 1;
	};
	$(".banner-left .content ul li").on("click",$.fn.mouseclickpic);
	
	/**
	 * 鼠标移动到小图区域，对应显示大图
	 */
	$.fn.mouseenterspic = function(){
		window.clearInterval(bgshowinterval);
		var curshowpic = showpic; 
		showpic = $(this).data("index");
		var top = (showpic-1) * 75;
		$(".banner-left .content .smallbg .smaborder").css("top",top+"px");
		$(".banner-left .content ul li.bgshow").removeClass("bgshow");
		$(".banner-left .content ul li:nth-child("+showpic+")").addClass("bgshow");
	};
	$(".banner-left .content .smallbg ul li").on("mouseenter",$.fn.mouseenterspic);
	
	
	/**
	 * 页面加载
	 */
	$.fn.load = function(){
		
		$.fn.getcode();
		var code = $(".code").val();
		//判断当前是否登录
		$.ajax({
			async: true,
			type: "post",
			url: "loginstatuscheck",
			data: {code: code},
			dataType: "json",
			success: function(data){
				var  status = data.status;
				var name = data.name;
				var $p1, $p2;
				if(status == "logined"){
					$p1 = $("<p class='flo'>您好：<span>"+name+"</span></p>");
					$p2 = $("<p class='flo'><a href='javascript:void(0);' class='exit'>退出登录</a></p>");
				}
				else{
					$p1 = $("<p class='flo'>您还未登录</p>");
					$p2 = $("<p class='flo'><a href='gologin'>登录</a><a href='goregister'>注册</a></p>");
				}
				$(".myinfo").append($p1).append($p2);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//获取一路走来最新四条数据
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: true,
			type: "post",
			url: "getmylongway",
			data: {code: code},
			dataType: "json",
			success: function(data){
				if(data.status == "codeerr"){
					return ;
				}
				$.each(data, function(index,item){
					var time,content;
					$.each(item, function(index1, item1){
						if(index1 == "pubtime"){
							time = item1;
						}
						else{
							content = item1;
						}
					});
					$div = $("<div class='longway-content'></div>");
					$timep = $("<p class='time'>"+time+"</p>");
					$contentp = $("<p class='content' title="+content+">"+content+"</p>");
					$(".longway-main-content").append($div.append($timep).append($contentp));
				});
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
	};
	$.fn.load();
	
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
					window.location.href = "welcome";
				},
				error: function(xhr){
					alert("服务器环境异常-->"+xhr.status);
				}
			});
		}
	};
	$(document).on("click","header .myinfo .exit",$.fn.exitlogin);

});
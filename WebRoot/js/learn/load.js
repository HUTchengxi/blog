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
	 * window.scroll页面滚动事件
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
		
		if(scrolltop >= 520){
			$(".hotbox").css("position","fixed").css("top","-10px");
			$(".longwaybox").css("position","fixed").css("top","275px");
		}
		else{
			$(".hotbox").css("position","relative");
			$(".longwaybox").css("position","relative").css("top",0);
		}
	};
	$(window).scroll($.fn.scrollfun);
	$(window).trigger("scroll");
	
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
		
		//加载热门文章
		$.ajax({
			async: true,
			type: "post",
			url: "loadhotblog",
			dataType: "json",
			success: function(data){
				console.log(data);
				$.each(data, function(index, item){
					var id = item.id;
					var title = item.title;
					var type = item.type;
					var $li = $("<li></li>");
					var $span = $("<span>"+index+"</span>");
					var $alink = $("<a href='golearn?id="+id+"&type="+type+"' target='_blank' class='hot-title'>"+title+"</a>");
					$(".right-content .hotbox .hot ul").append($li.append($span).append($alink).append("<hr />"));
				});
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		
		//根据url获取对应的blogid以及对应的type
		var url = window.location.href + "";
		var blogid = url.substring(url.indexOf("=")+1, url.indexOf("&"));
		var blogtype = url.substring(url.lastIndexOf("=")+1);
		
		//异步加载博客内容数据
		$.ajax({
			async: true,
			type: "post",
			url: "loadmyblog",
			data: {id: blogid},
			dataType: "json",
			success: function(data){
				var username, nickname, title, content, pubtime, readcount;
				$.each(data, function(index,item){
					if(index == "username"){
						username = item;
					}
					else if(index == "nickname"){
						nickname = item;
					}
					else if(index == "title"){
						title = item;
					}
					else if(index == "content"){
						content = item;
					}
					else if(index == "pubtime"){
						pubtime = item;
					}
					else{
						readcount = item;
					}
				});
				$("html head title").html(title+"---成兮个人博客网站");
				$(".left-content .blog-main").html(content);
				$(".left-content .blog-main").append("<div class='blog-end'><p>至此止笔</p></div>");
				$(".left-content header h2").html(title);
				$(".left-content .blog-info li.pubtime").html("编辑时间："+pubtime);
				$(".left-content .blog-info li:nth-child(2) span").html(readcount);
				$(".left-content .blog-info li:nth-child(3) span").html(nickname);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//动态生成当前文章的上篇和下一篇
		$.ajax({
			async: true,
			type: "post",
			url: "loadpnblog",
			data: {curid: blogid},
			dataType: "json",
			success: function(data){
				var next = data.next;
				var prev = data.prev;
				if(prev != "none"){
					$(".blog-pager li:nth-child(1)").html("<p>上一篇：<a href='golearn?id="+prev.id+"&type="+blogtype+"'>"+prev.title+"</a></p>");
				}
				if(next != "none"){
					$(".blog-pager li:nth-child(2)").html("<p>下一篇：<a href='golearn?id="+next.id+"&type="+blogtype+"'>"+next.title+"</a></p>");
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//自动获取关键字表
		$.ajax({
			async: true,
			type: "post",
			url: "loadtags",
			data: {id: blogid},
			dataType: "json",
			success: function(data){
				console.log(data);
				$.each(data, function(index,item){
					var tag = item.tag;
					var id = item.id;
					var $li = $("<li><a href='tagblogs?tagid="+id+"' target='_blank'>"+tag+"</a></li>");
					$(".blog-tags ul").append($li);
				});
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//自动添加阅读量
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: false,
			type: "post",
			url: "addflag",
			data: {code: code},
			dataType: "json",
			success: function(data){
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		$.ajax({
			async: true,
			type: "post",
			url: "addbmreadcount",
			data: {code: code, id: blogid},
			dataType: "json",
			success: function(data){
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//获取一路走来信息
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

	/**
	 * 点击更多事件
	 */
	$.fn.morefun = function(){
		var type = $(this).data("type");
		window.location = "getblogmore?type="+type;
	};
	$(document).on("click",".left-content .change",$.fn.morefun);
	
});


/**
 * 上传图片完美宽高480*300
 **/
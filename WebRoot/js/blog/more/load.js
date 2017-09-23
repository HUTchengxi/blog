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
		
		if(scrolltop >= 1150){
			$(".news-guest").css("position","fixed").css("top", "-20px");
			$(".longwaybox").css("position","fixed").css("top","265px");
		}
		else{
			$(".news-guest").css("position","relative").css("top",0);
			$(".longwaybox").css("position","relative").css("top",0);
		}
	};
	$(window).scroll($.fn.scrollfun);
	$(window).trigger("scroll");
	
	/**
	 * 页面加载
	 */
	var count = 0;
	var type = "";
	var pubname = "";
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
		
		//加载热门文章
		$.ajax({
			async: true,
			type: "post",
			url: "loadhotblog",
			dataType: "json",
			success: function(data){
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
		
		//加载最新留言
		$.ajax({
			async: true,
			type: "post",
			url: "loadlastguest",
			dataType: "json",
			success: function(data){
				$.each(data, function(index,item){
					var nickname = item.nickname;
					var date = item.date;
					var content = item.content;
					var $li = $("<li class='clearfix'></li>");
					var $imgdiv = $("<div class='guest-img'><img src='images/test/bannerS2.jpg' /></div>");
					var $maindiv = $("<div class='guest-main'></div>");
					var $infop = $("<p class='clearfix'><span class='guest-author'>"+nickname+"</span>留言:<span class='time'>"+date+"</span></p>");
					var $contentp = $("<p class='guest-content' title='"+content+"'>"+content+"</p>");
					$(".news-guest .main-content ul").append($li.append($imgdiv).append($maindiv.append($infop).append($contentp)));
				});
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//根据url改变伪动态数据
		var url = window.location.href + "";
		type = url.substring(url.lastIndexOf("=")+1);
		//前端开发
		if(type == "front"){
			$("header .pageshow h5").html("前端开发");
			$(".left-content h4.title").html("前端开发");
			pubname = "前端开发";
		}
		//后端框架
		else if(type == "web"){
			$("header .pageshow h5").html("后端框架");
			$(".left-content h4.title").html("后端框架");
			pubname = "后端框架";
		}
		//编程语言
		else if(type == "program"){
			$("header .pageshow h5").html("编程语言");
			$(".left-content h4.title").html("编程语言");
			pubname = "编程语言";
		}
		//数据库
		else if(type == "sql"){
			$("header .pageshow h5").html("数据库");
			$(".left-content h4.title").html("数据库");
			pubname = "数据库";
		}
		//性能优化
		else if(type == "seo"){
			$("header .pageshow h5").html("性能优化");
			$(".left-content h4.title").html("性能优化");
			pubname = "性能优化";
		}
		//经验总结
		else if(type == "total"){
			$("header .pageshow h5").html("经验总结");
			$(".left-content h4.title").html("经验总结");
			pubname = "经验总结";
		}
		
		//加载对应的博客数据
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code, start: 0, type: type},
			dataType: "json",
			success: function(data){
				$.each(data, function(index, item){
					var id = item.id;
					var imgsrc = item.imgsrc;
					var author = item.author;
					var title = item.title;
					var pubtime = item.pubtime;
					var descript = item.descript;
					var isfirst = item.isfirst;
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='"+type+"' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='"+type+"'>"+pubname+"</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .main ul").append($li);
				});
			},
			error: function(xhr){
				alert("服务器环境异常---->"+xhr.status);
			}
		});
		
		//获取当前类型的博客总数，判断是否需要使用分页
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmaincountbytype",
			data: {code: code,type: type},
			dataType: "json",
			success: function(data){
				var bcount = data.count;
				if(bcount == 3){
					$(".main-content .left-content .pager a").addClass("disabled");
				}
				else{
					count = bcount;	
					$(".main-content .left-content .pager a").addClass("disabled");
					$(".main-content .left-content .pager li:nth-child(2) a").removeClass("disabled");
				}
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
	
	//下翻页事件
	var startp = 3;
	$.fn.blognextfun = function(){
		if(startp == count)
			return ;
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start:startp,type: type},
			dataType: "json",
			success: function(data){
				$(".left-content .main ul").html("");
				var cnt = 0;
				$.each(data, function(index, item){
					cnt++;
					var id = item.id;
					var imgsrc = item.imgsrc;
					var author = item.author;
					var title = item.title;
					var pubtime = item.pubtime;
					var descript = item.descript;
					var isfirst = item.isfirst;
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='"+type+"' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='"+type+"'>"+pubname+"</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .main ul").append($li).css("opacity",0).animate({
						opacity: 1
					},400);
				});
				startp += cnt;
				if(startp == count)
					$(".left-content .pager li:nth-child(2) a").addClass("disabled");
				$(".left-content .pager li:nth-child(1) a.prevp").removeClass("disabled");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$(".main-content .left-content .pager li a.nextp").click($.fn.blognextfun);

	//上翻页事件
	$.fn.blogprevfun = function(){
		if(startp == 3)
			return ;
		var curlen  = $(".left-content .main ul li").length;
		startp -= curlen;
		var start = startp - 3;
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start:start,type: type},
			dataType: "json",
			success: function(data){
				$(".left-content .main ul").html("");
				var cnt = 0;
				$.each(data, function(index, item){
					cnt++;
					var id = item.id;
					var imgsrc = item.imgsrc;
					var author = item.author;
					var title = item.title;
					var pubtime = item.pubtime;
					var descript = item.descript;
					var isfirst = item.isfirst;
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='"+type+"' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='"+type+"'>"+pubname+"</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .main ul").append($li).css("opacity",0).animate({
						opacity: 1
					},400);
				});
				if(startp == 3)
					$(".left-content .pager li:nth-child(1) a").addClass("disabled");
				$(".left-content .pager li:nth-child(2) a").removeClass("disabled");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$(".main-content .left-content .pager li a.prevp").click($.fn.blogprevfun);

	/**
	 * 进入指定博客
	 */
	$.fn.golearnfun = function(){
		
		var learnid = $(this).data("id");
		var learntype = $(this).data("type");
		window.location = "golearn?id="+learnid+"&type="+learntype;
	};
	$(document).on("click","#golearn",$.fn.golearnfun);
});
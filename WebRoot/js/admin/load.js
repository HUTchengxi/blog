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
		console.log(curshowpic + "  " + showpic);
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
		
		//加载文章推荐
		$.ajax({
			async: true,
			type: "post",
			url: "loadtjblog",
			dataType: "json",
			success: function(data){
				$.each(data,function(index,item){
					var id = item.id;
					var imgsrc = item.imgsrc;
					var author = item.author;
					var title = item.title;
					var pubtime = item.pubtime;
					var descript = item.descript;
					var isfirst = item.isfirst;
					var pubtype = item.pubtype;
					var pubname ;
					if(pubtype == "web"){
						pubname = "后端框架";
					}
					else if(pubtype == "front"){
						pubname = "前端开发";
					}
					else if(pubtype == "program"){
						pubname = "编程语言";
					}
					else if(pubtype == "sql"){
						pubname = "数据库";
					}
					else if(pubtype == "seo"){
						pubname = "性能优化";
					}
					else if(pubtype == "total"){
						pubname = "经验总结";
					}
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='"+pubtype+"' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='"+pubtype+"'>"+pubname+"</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .articletj ul").append($li);
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
	};
	$.fn.load();
	
	/**
	 * 进入指定博客
	 */
	$.fn.golearnfun = function(){
		
		var learnid = $(this).data("id");
		var learntype = $(this).data("type");
		window.location = "golearn?id="+learnid+"&type="+learntype;
	};
	$(document).on("click","#golearn",$.fn.golearnfun);
	
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
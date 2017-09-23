$(function(){
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
		
		if(scrolltop >= 680){
			$(".news-guest").css("position","fixed").css("top","-30px");
			$(".longwaybox").css("position","fixed").css("top","255px");
		}
		else{
			$(".news-guest").css("position","relative");
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
		
		//获取关键字对应的所有博客，一次显示三条
		var url = window.location.href + "";
		var pagetype = url.substring(url.lastIndexOf("=")+1);
		$("header nav ul li:nth-child("+pagetype+")").addClass("licli");
		var keyword = url.substring(url.indexOf("=")+1,url.indexOf("&"));
		keyword = decodeURIComponent(keyword);
		$(".left-content .search-result span.key").html(keyword);
		if($.fn.checknull(keyword) == 1){
			$.ajax({
				async: true,
				type: "post",
				url: "loadkwblog",
				data: {keyword: keyword, startpos: 0},
				dataType: "json",
				success: function(data){
					var status = data.status;
					//无搜索内容
					if(status == "none"){
						$(".left-content .result-pager").css("display","none");
						$li = $("<li class='article-none'></li>");
						$nonediv = $("<div class='article-none'></div>");
						$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>没找到该关键字有关博客</h4>");
						$(".left-content .result-content ul").append($li.append($nonediv.append($noneh4)));
						return ;
					}
					var total = 0;
					$(".left-content .result-pager").css("display","block");
					$.each(data, function(index, item){
						total++;
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
						$(".left-content .result-content ul").append($li);
					});
					if(total < 3){
						$(".left-content .result-pager").css("display","none");
					}
				},
				error: function(xhr){
					alert("服务器环境异常-->"+xhr.status);
				}
			});
		}
		else{
			$(".left-content .result-pager").css("display","none");
			$li = $("<li class='article-none'></li>");
			$nonediv = $("<div class='article-none'></div>");
			$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>没找到该关键字有关博客</h4>");
			$(".left-content .result-content ul").append($li.append($nonediv.append($noneh4)));
		}
		
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
		
		//获取猜你喜欢
		$.ajax({
			async: true,
			type: "post",
			url: "loadrblog",
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
					$(".left-content .rlike ul").append($li);
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
	 * 猜你喜欢换一换事件
	 */
	$.fn.rlikechangefun = function(){
		$(".left-content .rlike ul").html("").css("opacity",0);
		$.ajax({
			async: true,
			type: "post",
			url: "loadrblog",
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
					$(".left-content .rlike ul").append($li);
				});
				$(".left-content .rlike ul").animate({
					opacity: 1
				},400);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$(".left-content .change").click($.fn.rlikechangefun);
	
	/**
	 * 点击搜索事件
	 */
	$.fn.clisearchfun = function(){
		
		var keyword = $(".left-content .search-box input.keyword").val();
		if($.fn.checknull(keyword) != 1){
			return ;
		}
		$(".left-content .result-content ul").html("");
		$(".left-content .search-result span.key").html(keyword);
		$.ajax({
			async: true,
			type: "post",
			url: "loadkwblog",
			data: {keyword: keyword, startpos: 0},
			dataType: "json",
			success: function(data){
				var status = data.status;
				//无搜索内容
				if(status == "none"){
					$(".left-content .result-pager").css("display","none");
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>没找到该关键字有关博客</h4>");
					$(".left-content .result-content ul").append($li.append($nonediv.append($noneh4)));
					return ;
				}
				var total = 0;
				$(".left-content .result-pager").css("display","block");
				$.each(data, function(index, item){
					total++;
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
					$(".left-content .result-content ul").append($li);
				});
				if(total < 3){
					$(".left-content .result-pager").css("display","none");
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$(".left-content .search-box button.search").click($.fn.clisearchfun);
	
	/**
	 * enter键盘搜索事件
	 */
	$.fn.keyupfun = function(event){
		var code = event.keyCode;
		if($(".left-content .search-box input").focus() && code == 13){
			$.fn.clisearchfun();
			$(".left-content .search-box input").blur();
		}
	};
	$(document).on("keyup",$.fn.keyupfun);
	
	/**
	 * 鼠标点击input输入框时全选内容事件
	 */
	$.fn.inputclifun = function(){
		$(this).select();
		var val = $(this).val();
//		if($.fn.checknull(val) == 1){
//			$(".left-content .search-box span.glyphicon-remove").css("display","inline-block");
//		}
	};
	$(".left-content .search-box input").click($.fn.inputclifun);
	
	/**
	 * 鼠标移开input输入框失去焦点事件
	 */
	$.fn.inputblurfun = function(){
		$(".left-content .search-box span.glyphicon-remove").css("display","none");
	};
	$(".left-content .search-box input").blur($.fn.inputblurfun);
	
	/**
	 * 点击删除input输入框内容按钮事件
	 */
	$.fn.inputvaldelfun = function(){
		$(this).css("display","inline-block");
		$(".left-content .search-box input").val("");
		$(this).css("display","none");
	};
	$(".left-content .search-box span.glyphicon-remove").click($.fn.inputvaldelfun);
	
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
	 * 进入指定博客
	 */
	$.fn.golearnfun = function(){
		
		var learnid = $(this).data("id");
		var learntype = $(this).data("type");
		window.location = "golearn?id="+learnid+"&type="+learntype;
	};
	$(document).on("click","#golearn",$.fn.golearnfun);
});




/**

	将一次性加载全部的博客改成各自单独加载
**/
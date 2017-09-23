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
		
		if(scrolltop >= 1090){
			$(".news-guest").css("position","fixed").css("top","-20px");
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
		
		//获取前端开发博客数据 置顶优先
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start: 0,type: "front"},
			dataType: "json",
			success: function(data){
				var front = 0, id, isfirst=0, title, author, pubtime, pubtype, descript, pubname, imgsrc;
				$.each(data,function(ind,ite){
					front++;
					$.each(ite, function(index,item){
						if(index == "isfirst"){
							isfirst = item;
						}
						if(index == "imgsrc")
							imgsrc = item;
						if(index == "id")
							id = item;
						if(index == "title")
							title = item;
						if(index == "author")
							author = item;
						if(index == "pubtime")
							pubtime = item;
						if(index == "descript")
							descript = item;
					});
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='front' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='front'>前端开发</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .front ul").append($li);
				});
				if(front == 3)
					$(".left-content .front").prev().append("<a href='javascript:void(0);' class='change' data-type='front'><span>总览</span></a>");
				else if(front == 0){
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该栏目暂无发布</h4>");
					$(".left-content .front ul").append($li.append($nonediv.append($noneh4)));
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+ xhr.status);
			}
		});
		
		//获取后端框架博客数据 置顶优先
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start: 0,type: "web"},
			dataType: "json",
			success: function(data){
				var web = 0, id, isfirst=0, title, author, pubtime, descript, pubname, imgsrc;
				$.each(data,function(ind,ite){
					web++;
					$.each(ite, function(index,item){
						if(index == "isfirst"){
							isfirst = item;
						}
						if(index == "imgsrc")
							imgsrc = item;
						if(index == "id")
							id = item;
						if(index == "title")
							title = item;
						if(index == "author")
							author = item;
						if(index == "pubtime")
							pubtime = item;
						if(index == "descript")
							descript = item;
					});
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='web' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='web'>后端框架</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .web ul").append($li);
				});
				if(web == 3)
					$(".left-content .web").prev().append("<a href='javascript:void(0);' class='change' data-type='web'><span>总览</span></a>");
				else if(web == 0){
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该栏目暂无发布</h4>");
					$(".left-content .web ul").append($li.append($nonediv.append($noneh4)));
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+ xhr.status);
			}
		});
		
		//获取编程语言博客数据 置顶优先
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start: 0,type: "program"},
			dataType: "json",
			success: function(data){
				var program = 0, id, isfirst=0, title, author, pubtime, descript, pubname, imgsrc;
				$.each(data,function(ind,ite){
					program++;
					$.each(ite, function(index,item){
						if(index == "isfirst"){
							isfirst = item;
						}
						if(index == "imgsrc")
							imgsrc = item;
						if(index == "id")
							id = item;
						if(index == "title")
							title = item;
						if(index == "author")
							author = item;
						if(index == "pubtime")
							pubtime = item;
						if(index == "descript")
							descript = item;
					});
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='program' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='program'>编程语言</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .program ul").append($li);
				});
				if(program == 3)
					$(".left-content .program").prev().append("<a href='javascript:void(0);' class='change' data-type='program'><span>总览</span></a>");
				else if(program == 0){
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该栏目暂无发布</h4>");
					$(".left-content .program ul").append($li.append($nonediv.append($noneh4)));
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+ xhr.status);
			}
		});
		
		//获取数据库博客数据 置顶优先
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start: 0,type: "sql"},
			dataType: "json",
			success: function(data){
				var sql = 0, id, isfirst=0, title, author, pubtime, descript, pubname, imgsrc;
				$.each(data,function(ind,ite){
					sql++;
					$.each(ite, function(index,item){
						if(index == "isfirst"){
							isfirst = item;
						}
						if(index == "imgsrc")
							imgsrc = item;
						if(index == "id")
							id = item;
						if(index == "title")
							title = item;
						if(index == "author")
							author = item;
						if(index == "pubtime")
							pubtime = item;
						if(index == "descript")
							descript = item;
					});
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='sql' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='sql'>数据库</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .sql ul").append($li);
				});
				if(sql == 3)
					$(".left-content .sql").prev().append("<a href='javascript:void(0);' class='change' data-type='sql'><span>总览</span></a>");
				else if(sql == 0){
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该栏目暂无发布</h4>");
					$(".left-content .sql ul").append($li.append($nonediv.append($noneh4)));
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+ xhr.status);
			}
		});
		
		//获取性能优化博客数据 置顶优先
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start: 0,type: "seo"},
			dataType: "json",
			success: function(data){
				var seo = 0, id, isfirst=0, title, author, pubtime, descript, pubname, imgsrc;
				$.each(data,function(ind,ite){
					seo++;
					$.each(ite, function(index,item){
						if(index == "isfirst"){
							isfirst = item;
						}
						if(index == "imgsrc")
							imgsrc = item;
						if(index == "id")
							id = item;
						if(index == "title")
							title = item;
						if(index == "author")
							author = item;
						if(index == "pubtime")
							pubtime = item;
						if(index == "descript")
							descript = item;
					});
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='seo' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' z-index="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='seo'>性能优化</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .seo ul").append($li);
				});
				if(seo == 3)
					$(".left-content .seo").prev().append("<a href='javascript:void(0);' class='change' data-type='seo'><span>总览</span></a>");
				else if(seo == 0){
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该栏目暂无发布</h4>");
					$(".left-content .seo ul").append($li.append($nonediv.append($noneh4)));
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+ xhr.status);
			}
		});
		
		//获取经验总结博客数据 置顶优先
		$.ajax({
			async: true,
			type: "post",
			url: "getblogmainbytype",
			data: {code: code,start: 0,type: "total"},
			dataType: "json",
			success: function(data){
				var total = 0, id, isfirst=0, title, author, pubtime, descript, pubname, imgsrc;
				$.each(data,function(ind,ite){
					total++;
					$.each(ite, function(index,item){
						if(index == "isfirst"){
							isfirst = item;
						}
						if(index == "imgsrc")
							imgsrc = item;
						if(index == "id")
							id = item;
						if(index == "title")
							title = item;
						if(index == "author")
							author = item;
						if(index == "pubtime")
							pubtime = item;
						if(index == "descript")
							descript = item;
					});
					var $li = $("<li clss='clearfix' data-id="+id+" data-type='total' id='golearn'></li>");
					var $imgdiv = $("<div class='article-img'><a href='javascript:void(0);' data-id="+id+" target='_blank'><img src='images/blog/contentbg/"+imgsrc+"' title="+title+" /></a></div>");
					var $contentdiv = $("<div class='article-content'><h3 class='title'>"+title+"</h3></div>");
					var $authorinfodiv = $("<div class='author-info'><p class='author'><a href='javascript:void(0);'><img src='images/test/bannerS2.jpg' /></a>"+author+"</p><span class='pubtime'>发布时间："+pubtime+"</span><span class='classifier'>分类：<a href='javascript:void(0);' z-type='total'>经验总结</a></span></div>");
					var $infop = $("<p class='article-info'>"+descript+"</p>");
					if(isfirst == 1){
						$li.append("<div class='article-isfirst'>顶</div>");
					}
					$li.append($imgdiv).append($contentdiv.append($authorinfodiv).append($infop));
					$(".left-content .total ul").append($li);
				});
				if(total == 3)
					$(".left-content .total").prev().append("<a href='javascript:void(0);' class='change' data-type='total'><span>总览</span></a>");
				else if(total == 0){
					$li = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$noneh4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该栏目暂无发布</h4>");
					$(".left-content .total ul").append($li.append($nonediv.append($noneh4)));
				}
			},
			error: function(xhr){
				alert("服务器环境异常-->"+ xhr.status);
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
		window.location = "getblogmore?type="+type
	};
	$(document).on("click",".left-content .change",$.fn.morefun);
	
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
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
	var year = 2017;
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
		
		//获取一路走来的数据，默认2017
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: false,
			type: "post",
			url: "getlongwaybyyear",
			data: {code: code,year: year},
			dataType: "json",
			success: function(data){
				$articlediv = $(".articletj");
				$articlediv.html("");
				//无记录
				if(data.status == "noway"){
					$noneli = $("<li class='article-none'></li>");
					$nonediv = $("<div class='article-none'></div>");
					$h4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>该年份无记录</h4>");
					$(".articletj").append($("<ul></ul>"));
					$(".articletj ul").append($noneli.append($nonediv.append($h4)));
					
					$h4 = $("<h4>可能感兴趣<a href='javascript:void(0);' class='changelongway'><span>换一换</span>");
					$(".articletj").append($h4);
					$ul = $("<ul></ul>");
					
					//随机三条感兴趣的一路走来
					$.ajax({
						async: false,
						type: "post",
						url: "randlongway",
						dataType: "json",
						success: function(data){
							$.each(data,function(index,item){
								var imgsrc = "images/test/longwaybg.jpg";
								var content,title,pubtime;
								$.each(item,function(index1,item1){
									if(index1 == "imgsrc"){
										imgsrc = item1;
									}
									else if(index1 == "content"){
										content = item1;
									}
									else if(index1 == "pubttime"){
										pubtime = item1;
									}
									else if(index1 == "title"){
										title = item1;
									}
								});
								$li = $("<li class='clearfix'></li>");
								$ldiv = $("<div class='article-img'><a href=''><img src="+imgsrc+" title="+title+" /></a></div>");
								$rdiv = $("<div class='article-content'></div>");
								$h3 = $("<h3 class='title'>"+title+"</h3>");
								$infodiv = $("<div class='author-info'></div>");
								$infop = $("<p class='author'><a href=''><img src='images/test/bannerS2.jpg' /></a>成兮</p>");
								$infospan = $("<span class='pubtime'>发布时间: "+pubtime+"</span><span class='classifier'>分类：<a href=''>一路走来</a></span>");
								$conp = $("<p class='article-info'>"+content+"</p>");
								$ul.append($li.append($ldiv).append($rdiv.append($h3).append($infodiv.append($infop).append($infospan)).append($conp)));
							});
						},
						error: function(xhr){
							alert("服务器环境异常---"+xhr.status);
							$noneli = $("<li class='article-none'></li>");
							$nonediv = $("<div class='article-none'></div>");
							$h4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>加载失败</h4>");
							$ul.append($noneli.append($nonediv.append($h4)));
						}
					});
					$(".articletj").append($ul);
					$(".articletj ul:nth-child(3)").addClass("checklongway");
					window.setTimeout(function(){
						$(".articletj ul:nth-child(3)").removeClass("checklongway");
					},500);
					return ;
				}
				//有记录
				else{
					$ul = $("<ul></ul>");
					$.each(data,function(index,item){
						var imgsrc = "images/test/longwaybg.jpg";
						var content,title,pubtime;
						$.each(item,function(index1,item1){
							if(index1 == "imgsrc"){
								imgsrc = item1;
							}
							else if(index1 == "content"){
								content = item1;
							}
							else if(index1 == "pubtime"){
								pubtime = item1;
							}
							else if(index1 == "title"){
								title = item1;
							}
						});
						$li = $("<li class='clearfix'></li>");
						$ldiv = $("<div class='article-img'><a href=''><img src="+imgsrc+" title="+title+" /></a></div>");
						$rdiv = $("<div class='article-content'></div>");
						$h3 = $("<h3 class='title'>"+title+"</h3>");
						$infodiv = $("<div class='author-info'></div>");
						$infop = $("<p class='author'><a href=''><img src='images/test/bannerS2.jpg' /></a>成兮</p>");
						$infospan = $("<span class='pubtime'>发布时间: "+pubtime+"</span><span class='classifier'>分类：<a href=''>一路走来</a></span>");
						$conp = $("<p class='article-info'>"+content+"</p>");
						$ul.append($li.append($ldiv).append($rdiv.append($h3).append($infodiv.append($infop).append($infospan)).append($conp)));
					});
					$(".articletj").append($ul);
				}
				$(".articletj ul:nth-child(1)").addClass("checklongway");
				window.setTimeout(function(){
					$(".articletj ul:nth-child(1)").removeClass("checklongway");
				},500);
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
				$noneli = $("<li class='article-none'></li>");
				$nonediv = $("<div class='article-none'></div>");
				$h4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>加载失败</h4>");
				$ul.append($noneli.append($nonediv.append($h4)));
				$(".articletj").append($ul);
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
	 * 点击换一换事件
	 */
	$.fn.changelongwayfun = function(){
		//随机三条感兴趣的一路走来
		$.ajax({
			async: false,
			type: "post",
			url: "randlongway",
			dataType: "json",
			success: function(data){
				$ul = $(".articletj ul:nth-child(3)");
				$ul.html("");
				$.each(data,function(index,item){
					var imgsrc = "images/test/longwaybg.jpg";
					var content,title,pubtime;
					$.each(item,function(index1,item1){
						if(index1 == "imgsrc"){
							imgsrc = item1;
						}
						else if(index1 == "content"){
							content = item1;
						}
						else if(index1 == "pubttime"){
							pubtime = item1;
						}
						else if(index1 == "title"){
							title = item1;
						}
					});
					$li = $("<li class='clearfix'></li>");
					$ldiv = $("<div class='article-img'><a href=''><img src="+imgsrc+" title="+title+" /></a></div>");
					$rdiv = $("<div class='article-content'></div>");
					$h3 = $("<h3 class='title'>"+title+"</h3>");
					$infodiv = $("<div class='author-info'></div>");
					$infop = $("<p class='author'><a href=''><img src='images/test/bannerS2.jpg' /></a>成兮</p>");
					$infospan = $("<span class='pubtime'>发布时间: "+pubtime+"</span><span class='classifier'>分类：<a href=''>一路走来</a></span>");
					$conp = $("<p class='article-info'>"+content+"</p>");
					$ul.append($li.append($ldiv).append($rdiv.append($h3).append($infodiv.append($infop).append($infospan)).append($conp)));
				});
			},
			error: function(xhr){
				alert("服务器环境异常---"+xhr.status);
				$noneli = $("<li class='article-none'></li>");
				$nonediv = $("<div class='article-none'></div>");
				$h4 = $("<h4><span class='glyphicon glyphicon-exclamation-sign'></span>加载失败</h4>");
				$ul.append($noneli.append($nonediv.append($h4)));
			}
		});
		$(".articletj ul:nth-child(3)").addClass("checklongway");
		window.setTimeout(function(){
			$(".articletj ul:nth-child(3)").removeClass("checklongway");
		},500);
		$(".right-content").addClass("checklongwayr");
		window.setTimeout(function(){
			$(".right-content").removeClass("checklongwayr");
		},500);
	};
	$(document).on("click",".articletj h4 a.changelongway",$.fn.changelongwayfun);
	
	/**
	 * 编辑成长记录年份
	 */
	$.fn.edityear = function(){
		year = $("#longwayyearmodal .modal-body input").val();
		$(".left-content .time .year").html(year);
		$.fn.load();
		$(this).next().trigger("click");
	};
	$("#longwayyearmodal .modal-footer button:nth-child(1)").click($.fn.edityear);
});
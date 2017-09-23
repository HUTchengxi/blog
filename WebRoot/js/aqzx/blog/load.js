$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(2)").addClass("clilink");
	};
	$.fn.blogloadfun();
	
	$.fn.gounlockfun = function(){
		console.log("a");
		$("#lockmodal .modal-body input").val("");
		$("#lockmodal .modal-body p").css("visibility","hidden");
		$("#lockmodal").modal("show");
	};
	$(".lock .gounlock").click($.fn.gounlockfun);
	
	$.fn.loadfun = function(){
		$.ajax({
			async: true,
			type: "post",
			url: 'ispriv',
			data:{id: 2},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$(".blog-main").css("display","none").css("opacity",0);
					$(".lock").css("display","block");
					$("#lockmodal").modal("show");
					$.fn.unlockfun = function(){
						var pass = $("#lockmodal input").val();
						if(pass == null || $.fn.checknull(pass) == 0){
							$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
							return ;
						}
						$("#lockmodal .modal-foot button.realdel").button("loading");
						$.fn.getcode();
						var code = $(".code").val();
						$.ajax({
							async: true,
							type: "post",
							url: "privcheck",
							data:{id:2,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadhtmlfun();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".blog-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".blog-main").css("display","block");
									},500);
									
								}
								$("#lockmodal .modal-foot button.realdel").button("reset");
							},
							error: function(xhr){
								alert("服务器环境异常--->"+xhr.status);
							}
						});
					};
					$("#lockmodal button.realdel").click($.fn.unlockfun);
				}
				else{
					$.fn.loadhtmlfun();
				}
			},
			error: function(xhr){
				alert("服务器环境异常"+xhr.status);
			}
		});
	};
	$.fn.loadfun();

	/**
	 * 页面加载时获取博客数据，首先默认获取html
	 */
	var loadtype = "html";
	var startpos = 0;
	$.fn.loadhtmlfun = function(){

		var height = $(".blog-main").height();
		var width = $(".blog-main").width();
		$(".zhezhao").css("width",width+"px").css("height",height+"px").css("display","block");
		$("#loader-wrapper").css("top","-100px").css("left","76px");
		$("#container").css("display","block");
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: false,
			type: 'post',
			url: "getmyblogbytype",
			data: {startpos: startpos, type: loadtype, code: code},
			dataType: "json",
			success: function(data){
				$(".blog-main .main-content").html("")
				if(data.status == "noblog"){
					startpos++;
					$nonediv = $("<div class='none'></div>");
					$h5 = $("<h5>空空如也</h5>");
					$(".blog-main .main-content").append($nonediv.append($h5));
					$(".mod-page").css("display","none");
					return ;
				}
				$(".mod-page").css("display","block");
				$.each(data,function(index,item){
					var title,id,pubdate,readcount,goodcount,badcount;
					$.each(item,function(index1,item1){
						if(index1 == "title"){
							title = item1;
						}
						if(index1 == "id"){
							id = item1;
						}
						if(index1 == "pubdate"){
							pubdate = item1;
						}
						if(index1 == "goodcount"){
							goodcount = item1;
						}
						if(index1 == "badcount"){
							badcount = item1;
						}
						if(index1 == "readcount"){
							readcount = item1;
						}
					});
					$contentdiv = $("<div class='content'></div>");
					$h5 = $("<h5><a href='http://localhost:8080/blog/learnblog?id="+id+"' target='_blank'>"+title+"</a><span class='pubdate'>"+pubdate+"</span><span class='info'>阅读:"+readcount+"&nbsp;&nbsp;点赞:"+goodcount+"&nbsp;&nbsp;&nbsp;踩:"+badcount+"</span></h5>");
					$moddiv = $("<div class='mod'></div>");
					$alink1 = $("<a href='gomodblog?blogid="+id+"'>修改</a>");
					$alink2 = $("<a href='javascript:void(0);' data-id="+id+">删除</a>");
					$(".blog-main .main-content").append($contentdiv.append($h5).append($moddiv.append($alink1).append($alink2)));
				});
				
				
				//加载一次获取所有数据总数
				var maxpage;
				$.ajax({
					async: false,
					type: "post",
					url: "getmybloglen",
					data: {type: loadtype, code: code},
					dataType: "json",
					success: function(data){
						maxpage = Math.ceil(data.count/5);
					},
					error: function(xhr){
						alert("服务器环境异常--->"+xhr.status);
					}
				});
				
				$(".mod-page a:nth-child(1)").css("visibility","hidden");
				$(".mod-page a:nth-child(1)").attr("data-page",0);
				$(".mod-page a:nth-child(2)").attr("data-page",0);
				$(".mod-page a:nth-child(4)").attr("data-page",0);
				$(".mod-page a:nth-child(5)").attr("data-page",maxpage);
				$(".mod-page a:nth-child(5)").css("visibility","visible");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		$(".zhezhao").css("display","none");
		$("#container").css("display","none");
	};
	
	
	/**
	 * 首页事件
	 */
	$.fn.firstpagefun = function(){
		var maxpage = $(this).data("page");
		//首页不是尾页
		if(maxpage != 0){
			startpos = 0;
			$.fn.loadhtmlfun();
		}
		$(".mod-page a:nth-child(1)").css("visibility","hidden");
		$(".mod-page a:nth-child(1)").attr("data-page",0);
		$(".mod-page a:nth-child(2)").attr("data-page",0);
		$(".mod-page a:nth-child(4)").attr("data-page",0);
		$(".mod-page a:nth-child(5)").css("visibility","visible");
		
	};
	$(document).on("click",".mod-page a:nth-child(1)",$.fn.firstpagefun);
	
	/**
	 * 上一页事件
	 */
	$.fn.lastpagefun = function(){
		var curpage = parseInt($(this).attr("data-page"));
		if(curpage == 0){
			return ;
		}
		startpos = (curpage-1)*5;
		$.fn.loadhtmlfun();
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",curpage-1);
		$(".mod-page a:nth-child(2)").attr("data-page",curpage-1);
		$(".mod-page a:nth-child(4)").attr("data-page",curpage-1);
		$(".mod-page a:nth-child(5)").css("visibility","visible");
		if(curpage == 1){
			$(".mod-page a:nth-child(1)").css("visibility","hidden");
		}
	};
	$(document).on("click",".mod-page a:nth-child(2)",$.fn.lastpagefun);
	
	/**
	 * 下一页事件
	 */
	$.fn.nextpagefun = function(){
		var curpage = parseInt($(this).attr("data-page"));
		var maxpage = $(".mod-page a:nth-child(5)").data("page");
		if(curpage == maxpage-1){
			return ;
		}
		startpos = (curpage+1)*5;
		$.fn.loadhtmlfun();
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",curpage+1);
		$(".mod-page a:nth-child(2)").attr("data-page",curpage+1);
		$(".mod-page a:nth-child(4)").attr("data-page",curpage+1);
		$(".mod-page a:nth-child(5)").css("visibility","visible");
		if(curpage == maxpage-2){
			$(".mod-page a:nth-child(5)").css("visibility","hidden");
		}
	};
	$(document).on("click",".mod-page a:nth-child(4)",$.fn.nextpagefun);
	
	/**
	 * 尾页事件
	 */
	$.fn.lastpagefun = function(){
		var maxpage = $(this).data("page");
		//首页不是尾页
		if(maxpage != 1){
			startpos = (maxpage-1)*5;
			$.fn.loadhtmlfun();
		}
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(2)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(4)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(5)").css("visibility","hidden");
		
	};
	$(document).on("click",".mod-page a:nth-child(5)",$.fn.lastpagefun);
	
	/**
	 * 删除博客事件
	 */
	$.fn.delblogfun = function(){
		$.fn.getcode();
		if(confirm("确认删除该博客吗?")){
			var blogid = $(this).data("id");
			var code = $(".code").val();
			window.location.href = "delblog?blogid="+blogid+"&code="+code;
			return ;
		}
		$.fn.getcode();
	};
	$(document).on("click",".blog-main .main-content .content .mod a:nth-child(2)",$.fn.delblogfun);
	
	/**
	 * 响应的专栏按钮点击事件
	 */
	$.fn.liclickfun = function(){
		loadtype = $(this).children("a").text();
		startpos = 0;
		$.fn.loadhtmlfun();
		$(".blog-main .type-ul li.clilink").removeClass("clilink");
		$(this).addClass("clilink");
	};
	$(".blog-main .type-ul li").click($.fn.liclickfun);
});
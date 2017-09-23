$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(3)").addClass("clilink");
	};
	$.fn.blogloadfun();
	
	$.fn.gounlockfun = function(){
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
			data:{id: 3},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$(".tool-main").css("display","none").css("opacity",0);
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
							data:{id: 3,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadgetdata();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".tool-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".tool-main").css("display","block");
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
					$.fn.loadgetdata();
				}
			},
			error: function(xhr){
				alert("服务器环境异常"+xhr.status);
			}
		});
	};
	$.fn.loadfun();
		
	/**
	 * 页面加载时获取工具数据动态生成表格
	 */
	var startpos = 0;
	$.fn.loadgetdata = function(){
		$(".tool-main table tbody").html("");
		$.fn.getcode();
		var code = $(".code").val();	
		//页面加载获取数据之前进行加载动画
		var height = $(".tool-main").height();
		var width = $(".tool-main").width();
		$("body").css("overflow","hidden");
		$(".zhezhao").css("height",height+"px").css("width",width+"px").css("opacity",1).css("display","block");
		$("#container").css("display","block");
		$.ajax({
			async: false,
			type: "post",
			url: "getmytoolsinfo",
			data:{startpos: startpos, code: code},
			dataType: "json",
			success: function(data){
				$(".zhezhao").css("opacity",1).animate({
					opacity: 0
				},500);
				$("#container").css("opacity",1).animate({
					opacity: 0
				},500);
				$(".blog-main").animate({
					opacity: 1
				},500);
				
				//加载一次获取所有数据总数
				var maxpage;
				$.fn.getcode();
				var code = $(".code").val();
				$.ajax({
					async: false,
					type: "post",
					url: "getmytoollen",
					data: {code: code},
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
			
				
				window.setTimeout(function(){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					$("body").css("overflow","auto");
					$.each(data,function(index,item){
						$tr = $("<tr></tr>");
						$.each(item,function(index1,item1){
							if(index1 == "id"){
								$tr.append($("<td><span>"+item1+"</span></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "title"){
								$tr.append($("<td><span>"+item1+"</span></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "href"){
								$tr.append($("<td><a href='"+item1+"' target='_blank'>"+item1+"</a></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "pubdate"){
								$tr.append($("<td>"+item1+"</td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "pubtype"){
								$tr.append($("<td>"+item1+"</td>"));
							}
						});
						$(".tool-main table tbody").append($tr);
						//随机获取一次session.code
						$.fn.getcode();
					});
				},500);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
				$(".zhezhao").css("display","none");
				$("#container").css("display","none");
				$("body").css("overflow","auto");
			}
		});
	};
	
	/**
	 * 首页事件
	 */
	$.fn.firstpagefun = function(){
		var maxpage = $(this).data("page");
		//首页不是尾页
		if(maxpage != 0){
			startpos = 0;
			$.fn.loadgetdata();
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
		$.fn.loadgetdata();
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
		$.fn.loadgetdata();
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
			$.fn.loadgetdata();
		}
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(2)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(4)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(5)").css("visibility","hidden");
		
	};
	$(document).on("click",".mod-page a:nth-child(5)",$.fn.lastpagefun);
	
});
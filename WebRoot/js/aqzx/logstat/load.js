$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(6)").addClass("clilink");
	};
	$.fn.blogloadfun();
	
	/**
	 * 点击解锁按钮事件
	 */
	$.fn.gounlockfun = function(){
		console.log("a");
		$("#lockmodal").modal("show");
	};
	$(".lock .gounlock").click($.fn.gounlockfun);
	
	/**
	 * 页面加载时判断权限
	 */
	$.fn.loadfun = function(){
		$.ajax({
			async: true,
			type: "post",
			url: 'ispriv',
			data:{id: 6},
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
							data:{id: 6,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadgetdata();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".privset-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".privset-main").css("display","block");
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
	 * 页面加载时获取对应的登录数据
	 */
	var startpos = 0;
	$.fn.loadgetdata = function(){
		
		$.fn.getcode();
		var code = $(".code").val();
		$(".log-main table tbody").html("");
		
		$.ajax({
			async: false,
			type: "post",
			url: "getmylogstate",
			data: {code: code, startpos: startpos},
			dataType: "json",
			success: function(data){
				$.each(data,function(index,item){
					var logdate,ip,pos,id;
					$.each(item,function(index1,item1){
						if(index1 == "logdate"){
							logdate = item1;
						}
						if(index1 == "ip"){
							ip = item1;
						}
						if(index1 == "pos"){
							pos = item1;
						}
						if(index1 == "id"){
							id = item1;
						}
					});
					$tr = $("<tr></tr>");
					$datetd = $("<td>"+logdate+"</td>");
					$iptd = $("<td>"+ip+"</td>");
					$postd = $("<td>"+pos+"</td>");
					$(".log-main table tbody").append($tr.append($postd).append($iptd).append($datetd));
				});
				
				//加载一次获取所有数据总数
				var maxpage;
				$.fn.getcode();
				var code = $(".code").val();
				$.ajax({
					async: false,
					type: "post",
					url: "getmylogstatelen",
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
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
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
		console.log(curpage);
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
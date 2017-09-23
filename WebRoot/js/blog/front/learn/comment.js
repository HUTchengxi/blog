$(function(){
	/**
	 * 点击查看评论展开或收起页面
	 */
	var showorhide = 0;
	var comnick = null;
	var comuser = null;
	$.fn.showcomment = function(){
		//点击展开
		if(showorhide == 0){
			$(".comment").animate({
				right: "0px"
			},500);
			$(".article").animate({
				left: "-200px"
			},500);
			$(".btns").animate({
				left: "646px"
			},500);
			$(".comment-bar span.info").text("收起评论");
			$(".comment-bar span.glyphicon").removeClass("glyphicon-backward").addClass("glyphicon-forward");
			showorhide = 1;
			return ;
		}
		//点击收起
		else{
			$(".comment").animate({
				right: "-390px"
			},500);
			$(".article").animate({
				left: 0
			},500);
			$(".btns").animate({
				left: "846px"
			},500);
			$(".comment-bar span.info").text("查看评论");
			$(".comment-bar span.glyphicon").removeClass("glyphicon-forward").addClass("glyphicon-backward");
			showorhide = 0;
			return ;
		}
	};
	$(".comment-bar a").on("click",$.fn.showcomment);
	
	/**
	 * 点击去评论按钮事件
	 */
	$.fn.commentfun = function(){
		$(".modify-text").animate({
			height: "150px"
		},300);
		comnick = null;
		comuser = null;
	};
	$(".modify-boot .commentlink").on("click",$.fn.commentfun);
	
	/**
	 * 点击取消收起评论
	 */
	$.fn.resetcommentfun = function(){
		$(".modify-text").css("visibility","visible").animate({
			height: "0px"
		},300);
		$(".modify-text textarea").val("");
	};
	$(".resetcomment").on("click",$.fn.resetcommentfun);
	
	/**
	 * nextcomment进行下一页事件
	 */
	var nextok = 1;
	var startpos = 0;
	$.fn.nextcommentfun = function(){
		/**
		 * 获取三条评论信息
		 */
		if(nextok == 0){
			return ;
		}
		startpos = $(this).attr("dataid")*3;
		$.ajax({
			async: true,
			type: "post",
			url: "getcommentbyid",
			data: {startpos: startpos},
			dataType: "json",
			success: function(data){
				$(".comment-content").html("");
				$h4 = $("<h4>评论区域</h4>");
				$(".comment-content").append($h4);
				//计算长度
				var len = 0;
				$.each(data,function(index,item){
					len++;
				});
				if(len == 1){
					$nodiv = $("<div class='content-div'></div>");
					$p1 = $("<p></p>");
					$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
					$(".comment-content").append($nodiv.append($p1).append($p2));
					nextok = 0;
				}
				else{
					$.each(data,function(index,item){
						if(index != "status"){
							var nickname,content,username,comnick,comuser,date;
							var iscom = 0;
							$.each(item,function(index1,item1){
								if(index1 == "comnick" && $.fn.checknull(item1) == 1){
									iscom = 1;
									comnick = item1;
								}
								if(index1 == "comuser"){
									comuser = item1;
								}
								if(index1 == "nickname"){
									nickname = item1;
								}
								if(index1 == "content"){
									content = item1;
								}
								if(index1 == "username"){
									username = item1;
								}
								if(index1 == "date"){
									date = item1;
								}
							});
							$nodiv = $("<div class='content-div'></div>");
							$p1 = $("<p>"+index+"楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+date+"</p>");
							if(iscom == 0){
								$p2 = $("<p><label>"+nickname+"：</label>"+content+"</p>");
							}
							else{
								$p2 = $("<p><label>"+nickname+"<span style='color:red;'>&nbsp;&nbsp;回复&nbsp;&nbsp;</span>"+
										comnick+"：</label>"+content+"</p>");
							}
							$moddiv = $("<div class='mod-btns'></div>");
							$rebacklink = $("<a href='javascript:void(0);' class='reback' data-id='"+index+"' " +
									"data-user='"+username+"' data-nick='"+nickname+"'>回复</a>");
//							$delelink = $("<a href='javascript:void(0);' class='dele' data-id='"+index+"'>删除</a>");
							
							$(".comment-content").append($nodiv.append($p1).append($p2).
									append($moddiv.append($rebacklink)));
						}
					});
				}
				if(len <= 3 && len != 1){
					$nodiv = $("<div class='content-div'></div>");
					$p1 = $("<p></p>");
					$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
					$(".comment-content").append($nodiv.append($p1).append($p2));
					nextok = 0;
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		$(".prevcomment").attr("dataid",parseInt($(".prevcomment").attr("dataid"))+1);
		$(this).attr("dataid",parseInt($(this).attr("dataid"))+1);
	};
	$(".nextcomment").on("click",$.fn.nextcommentfun);
	
	/**
	 * prevcomment进行上一页事件
	 */
	$.fn.prevcommentfun = function(){
		var temp = $(this).attr("dataid")*3;;
		if(startpos < 0 || temp < 0){
			return ;
		}
		startpos = $(this).attr("dataid")*3;
		nextok = 1;
		$.ajax({
			async: true,
			type: "post",
			url: "getcommentbyid",
			data: {startpos: startpos},
			dataType: "json",
			success: function(data){
				$(".comment-content").html("");
				$h4 = $("<h4>评论区域</h4>");
				$(".comment-content").append($h4);
				//计算长度
				var len = 0;
				$.each(data,function(index,item){
					len++;
				});
				if(len == 1){
					$nodiv = $("<div class='content-div'></div>");
					$p1 = $("<p></p>");
					$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
					$(".comment-content").append($nodiv.append($p1).append($p2));
					nextok = 0;
				}
				else{
					$.each(data,function(index,item){
						if(index != "status"){
							var nickname,content,username,comnick,comuser,date;
							var iscom = 0;
							$.each(item,function(index1,item1){
								if(index1 == "comnick" && $.fn.checknull(item1) == 1){
									iscom = 1;
									comnick = item1;
								}
								if(index1 == "comuser"){
									comuser = item1;
								}
								if(index1 == "nickname"){
									nickname = item1;
								}
								if(index1 == "content"){
									content = item1;
								}
								if(index1 == "username"){
									username = item1;
								}
								if(index1 == "date"){
									date = item1;
								}
							});
							$nodiv = $("<div class='content-div'></div>");
							$p1 = $("<p>"+index+"楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+date+"</p>");
							if(iscom == 0){
								$p2 = $("<p><label>"+nickname+"：</label>"+content+"</p>");
							}
							else{
								$p2 = $("<p><label>"+nickname+"<span style='color:red;'>&nbsp;&nbsp;回复&nbsp;&nbsp;</span>"+
										comnick+"：</label>"+content+"</p>");
							}

							$moddiv = $("<div class='mod-btns'></div>");
							$rebacklink = $("<a href='javascript:void(0);' class='reback' data-id='"+index+"' data-user='"+username+"' " +
									"data-nick='"+nickname+"'>回复</a>");
//							$delelink = $("<a href='javascript:void(0);' class='dele' data-id='"+index+"'>删除</a>");
							
							$(".comment-content").append($nodiv.append($p1).append($p2).
									append($moddiv.append($rebacklink)));
						}
					});
				}
				if(len <= 3 && len != 1){
					$nodiv = $("<div class='content-div'></div>");
					$p1 = $("<p></p>");
					$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
					$(".comment-content").append($nodiv.append($p1).append($p2));
					nextok = 0;
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		$(".nextcomment").attr("dataid",parseInt($(".nextcomment").attr("dataid"))-1);
		$(this).attr("dataid",parseInt($(this).attr("dataid"))-1);
		$(".comment-content").html("");
	};
	$(".prevcomment").on("click",$.fn.prevcommentfun);
	
	/**
	 * 发表评论
	 */
	var checknull = 0;
	$.fn.subcommentfun = function(){
		var content = $(".modify-text textarea").val();
		//未填写
		if($.fn.checknull(content) == 0){
			$(".modify-text textarea").css("color","red").val("不能为空或全为空格");
			checknull = 1;
			return ;
		}
		//异步发表评论
		$comhei = $(".comment").height();
		$(".czhezhao").css("display","block").css("height",$comhei+"px");
		$(".cloader").css("display","block");
		
		window.setTimeout(function(){
			
			$.ajax({
				async:false,
				type: "post",
				url: "pubcomment",
				data: {content: content,comuser:comuser,comnick: comnick},
				dataType: "json",
				success: function(data){
					$(".czhezhao").css("display","none");
					$(".cloader").css("display","none");
					
					$(".cok").css("display","block").css("opacity",0).animate({
						opacity: 1
					},1000).animate({
						opacity: 0
					},1000);
					$(".modify-text .resetcomment").trigger("click");
				},
				error: function(xhr){
					$(".czhezhao").css("display","none");
					$(".cloader").css("display","none");
					alert("服务器环境异常--->"+xhr.status);
				}
			});
			$(".modify-text textarea").val("");
			nextok = 1;
			//异步调用再次获取当前页面数据
			console.log(startpos);
			if(startpos < 0){
				return ;
			}
			nextok = 1;
			$.ajax({
				async: true,
				type: "post",
				url: "getcommentbyid",
				data: {startpos: startpos},
				dataType: "json",
				success: function(data){
					$(".comment-content").html("");
					$h4 = $("<h4>评论区域</h4>");
					$(".comment-content").append($h4);
					//计算长度
					var len = 0;
					$.each(data,function(index,item){
						len++;
					});
					if(len == 1){
						$nodiv = $("<div class='content-div'></div>");
						$p1 = $("<p></p>");
						$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
						$(".comment-content").append($nodiv.append($p1).append($p2));
						nextok = 0;
					}
					else{
						$.each(data,function(index,item){
							if(index != "status"){
								var nickname,content,username,comnick,comuser,date;
								var iscom = 0;
								$.each(item,function(index1,item1){
									if(index1 == "comnick" && $.fn.checknull(item1) == 1){
										iscom = 1;
										comnick = item1;
									}
									if(index1 == "comuser"){
										comuser = item1;
									}
									if(index1 == "nickname"){
										nickname = item1;
									}
									if(index1 == "content"){
										content = item1;
									}
									if(index1 == "username"){
										username = item1;
									}
									if(index1 == "date"){
										date = item1;
									}
								});
								$nodiv = $("<div class='content-div'></div>");
								$p1 = $("<p>"+index+"楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+date+"</p>");
								if(iscom == 0){
									$p2 = $("<p><label>"+nickname+"：</label>"+content+"</p>");
								}
								else{
									$p2 = $("<p><label>"+nickname+"<span style='color:red;'>&nbsp;&nbsp;回复&nbsp;&nbsp;</span>"+
											comnick+"：</label>"+content+"</p>");
								}

								$moddiv = $("<div class='mod-btns'></div>");
								$rebacklink = $("<a href='javascript:void(0);' class='reback' data-id='"+index+"' data-user='"+username+"' " +
										"data-nick='"+nickname+"'>回复</a>");
//								$delelink = $("<a href='javascript:void(0);' class='dele' data-id='"+index+"'>删除</a>");
								
								$(".comment-content").append($nodiv.append($p1).append($p2).
										append($moddiv.append($rebacklink)));
							}
						});
					}
					if(len <= 3 && len != 1){
						$nodiv = $("<div class='content-div'></div>");
						$p1 = $("<p></p>");
						$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
						$(".comment-content").append($nodiv.append($p1).append($p2));
						nextok = 0;
					}
				},
				error: function(xhr){
					alert("服务器环境异常--->"+xhr.status);
				}
			});
		},1000);
	};
	$(".subcomment").on("click",$.fn.subcommentfun);
	
	/**
	 * 输入框获得焦点时若之前正好校验一次，则清除val值
	 */
	$.fn.textareafocus = function(){
		if(checknull != 0){
			$(this).val("").css("color","black");
			checknull = 0;
			return;
		}
	};
	$(".modify-text textarea").on("focus",$.fn.textareafocus);
	
	/**
	 * 回复按钮点击事件
	 */
	$.fn.rebackfun = function(){
		comuser = $(this).data("user");
		comnick = $(this).data("nick");
		$(".modify-text").animate({
			height: "150px"
		},300);
	};
	$(document).on("click",".reback",$.fn.rebackfun);
});


/*
 * bug：增加评论时的一个bug
 * 
 * 
 * 
 */



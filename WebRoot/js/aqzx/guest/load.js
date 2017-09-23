$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	var loadtype = "myguest"; //myguest/mucom
	var startpos = 0;
	var max = 0;
	var curpage = 1;
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(4)").addClass("clilink");
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
			data:{id: 4},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$(".guest-main").css("display","none").css("opacity",0);
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
							data:{id: 4,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadgetdata();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".guest-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".guest-main").css("display","block");
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
	 * 页面加载时
	 */
	$.fn.loadgetdata = function(){
		//首次加载获取我的留言数据
		$(".cloader").css("display","block");
		console.log(loadtype);
		if(loadtype == "myguest"){
			$.ajax({
				async: false,
				type: "post",
				url: "getmyguestcount",
				dataType: "json",
				success: function(data){
					$(".guest-main .myguesttop .tj").text(data.count+"条留言");
					max = data.count;
				},
				error: function(xhr){
					alert("服务器环境异常--->"+xhr.status);
					return ;
				}
			});
			
			if(max == 0){
				$(".guest-main .myguestcontent ol").html("");
				$none = $("<div class='none'></div>");
				$p = $("<p>空空如也</p>");
				$(".guest-main .myguestcontent ol").append($none.append($p));
				$(".cloader").css("display","none");
				return ;
			}
			//
			//获取留言数据
//			if(startpos == max-1){
//				$(".cloader").css("display","none");
//				return ;
//			}
			$(".guest-main .myguestcontent ol").html("");
			$.ajax({
				async: true,
				type: "post",
				url: "getmyguest",
				data: {startpos: startpos},
				dataType: "json",
				success: function(data){
					if(data.status == "none"){
						return ;
					}
					var username,id,nickname,myscore,comnick,comuser,pubdate,content,goodcount,badcount;
					comnick = null;
					comuser = null;
					$.each(data,function(index,item){
						if(index == "id"){
							id = item;
						}
						if(index == "username"){
							username = item;
						}
						if(index == "nickname"){
							nickname = item;
						}
						if(index == "comnick"){
							comnick = item;
						}
						if(index == "comuser"){
							comuser = item;
						}
						if(index == "pubdate"){
							pubdate = item;
						}
						if(index == "content"){
							content = item;
						}
						if(index == "goodcount"){
							goodcount = item;
						}
						if(index == "badcount"){
							badcount = item;
						}
						if(index == "myscore"){
							myscore = item;
						}
					});
					$li = $("<li></li>");
					$maindiv = $("<div class='maincontent'></div>");
					$facediv = $("<div class='face'></div>");
					$contentdiv = $("<div class='content'></div>");
					$personinfodiv = $("<div class='personinfo'></div>");
					if(comnick == null || $.fn.checknull(comnick) == 0){
						$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")<span class='timespan'>"+pubdate+"</span></p>")
					}
					else{
						$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")&nbsp;&nbsp;<span class='comspan'>回复</span>&nbsp;&nbsp;<span class='nickspan'>"+comnick+"</span>("+comuser+")<span class='timespan'>"+pubdate+"</span></p>")
					}
					$pubcontentdiv = $("<div class='pubcontent'></div>");
					$contentp = $("<p>"+content+"</p>");
					$modgroupdiv = $("<div class='modgroup'></div>");
					if(myscore == 0){
						$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"'></a>");
						$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"'></a>");
						$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
						$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
					}
					else if(myscore == 1){
						$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='yes'></a>");
						$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='yes'></a>");
						$goodspan1 = $("<img src='images/guest/good_score_a.png' />");
						$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
					}
					else{
						$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='no'></a>");
						$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='no'></a>");
						$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
						$badspan1 = $("<img src='images/guest/bad_score_a.png' />");
					}
					$goodspan2 = $("<span>("+goodcount+")</span>");
					$badspan2 = $("<span>("+badcount+")</span>");
					$(".guest-main .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
					if(startpos == max-1)
						return ;
					startpos++;
					$.ajax({
						async: true,
						type: "post",
						url: "getmyguest",
						data: {startpos: startpos},
						dataType: "json",
						success: function(data){
							if(data.status == "none"){
								return ;
							}
							var username,id,nickname,myscore,comnick,comuser,pubdate,content,goodcount,badcount;
							comnick = null;
							comuser = null;
							$.each(data,function(index,item){
								if(index == "id"){
									id = item;
								}
								if(index == "username"){
									username = item;
								}
								if(index == "nickname"){
									nickname = item;
								}
								if(index == "comnick"){
									comnick = item;
								}
								if(index == "comuser"){
									comuser = item;
								}
								if(index == "pubdate"){
									pubdate = item;
								}
								if(index == "content"){
									content = item;
								}
								if(index == "goodcount"){
									goodcount = item;
								}
								if(index == "badcount"){
									badcount = item;
								}
								if(index == "myscore"){
									myscore = item;
								}
							});
							$li = $("<li></li>");
							$maindiv = $("<div class='maincontent'></div>");
							$facediv = $("<div class='face'></div>");
							$contentdiv = $("<div class='content'></div>");
							$personinfodiv = $("<div class='personinfo'></div>");
							if(comnick == null || $.fn.checknull(comnick) == 0){
								$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")<span class='timespan'>"+pubdate+"</span></p>")
							}
							else{
								$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")&nbsp;&nbsp;<span class='comspan'>回复</span>&nbsp;&nbsp;<span class='nickspan'>"+comnick+"</span>("+comuser+")<span class='timespan'>"+pubdate+"</span></p>")
							}
							$pubcontentdiv = $("<div class='pubcontent'></div>");
							$contentp = $("<p>"+content+"</p>");
							$modgroupdiv = $("<div class='modgroup'></div>");
							if(myscore == 0){
								$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"'></a>");
								$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"'></a>");
								$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
								$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
							}
							else if(myscore == 1){
								$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='yes'></a>");
								$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='yes'></a>");
								$goodspan1 = $("<img src='images/guest/good_score_a.png' />");
								$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
							}
							else{
								$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='no'></a>");
								$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='no'></a>");
								$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
								$badspan1 = $("<img src='images/guest/bad_score_a.png' />");
							}
							$goodspan2 = $("<span>("+goodcount+")</span>");
							$badspan2 = $("<span>("+badcount+")</span>");
							$(".guest-main .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
						},
						error: function(xhr){
							alert("服务器环境异常-->"+xhr.status);
						}
					});
				},
				error: function(xhr){
					alert("服务器环境异常-->"+xhr.status);
				}
			});
			$(".cloader").css("display","none");
		}
		//我评过的
		else{
			console.log("aa");
			$.ajax({
				async: false,
				type: "post",
				url: "getmycomcount",
				dataType: "json",
				success: function(data){
					$(".guest-main .myguesttop .tj").text(data.count+"条数据");
					max = data.count;
				},
				error: function(xhr){
					alert("服务器环境异常--->"+xhr.status);
					return ;
				}
			});
			
			if(max == 0){
				$(".guest-main .myguestcontent ol").html("");
				$none = $("<div class='none'></div>");
				$p = $("<p>空空如也</p>");
				$(".guest-main .myguestcontent ol").append($none.append($p));
				$(".cloader").css("display","none");
				return ;
			}
			//
			//获取留言数据
//			if(startpos == max-1){
//				$(".cloader").css("display","none");
//				return ;
//			}
			$(".guest-main .myguestcontent ol").html("");
			$.ajax({
				async: true,
				type: "post",
				url: "getmycom",
				data: {startpos: startpos},
				dataType: "json",
				success: function(data){
					if(data.status == "none"){
						return ;
					}
					var username,id,nickname,myscore,comnick,comuser,pubdate,content,goodcount,badcount;
					comnick = null;
					comuser = null;
					$.each(data,function(index,item){
						if(index == "id"){
							id = item;
						}
						if(index == "username"){
							username = item;
						}
						if(index == "nickname"){
							nickname = item;
						}
						if(index == "comnick"){
							comnick = item;
						}
						if(index == "comuser"){
							comuser = item;
						}
						if(index == "pubdate"){
							pubdate = item;
						}
						if(index == "content"){
							content = item;
						}
						if(index == "goodcount"){
							goodcount = item;
						}
						if(index == "badcount"){
							badcount = item;
						}
						if(index == "myscore"){
							myscore = item;
						}
					});
					$li = $("<li></li>");
					$maindiv = $("<div class='maincontent'></div>");
					$facediv = $("<div class='face'></div>");
					$contentdiv = $("<div class='content'></div>");
					$personinfodiv = $("<div class='personinfo'></div>");
					if(comnick == null || $.fn.checknull(comnick) == 0){
						$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")<span class='timespan'>"+pubdate+"</span></p>")
					}
					else{
						$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")&nbsp;&nbsp;<span class='comspan'>回复</span>&nbsp;&nbsp;<span class='nickspan'>"+comnick+"</span>("+comuser+")<span class='timespan'>"+pubdate+"</span></p>")
					}
					$pubcontentdiv = $("<div class='pubcontent'></div>");
					$contentp = $("<p>"+content+"</p>");
					$modgroupdiv = $("<div class='modgroup'></div>");
					if(myscore == 0){
						$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"'></a>");
						$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"'></a>");
						$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
						$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
					}
					else if(myscore == 1){
						$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='yes'></a>");
						$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='yes'></a>");
						$goodspan1 = $("<img src='images/guest/good_score_a.png' />");
						$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
					}
					else{
						$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='no'></a>");
						$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='no'></a>");
						$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
						$badspan1 = $("<img src='images/guest/bad_score_a.png' />");
					}
					$goodspan2 = $("<span>("+goodcount+")</span>");
					$badspan2 = $("<span>("+badcount+")</span>");
					$(".guest-main .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
					if(startpos == max-1)
						return ;
					startpos++;
					$.ajax({
						async: true,
						type: "post",
						url: "getmyguest",
						data: {startpos: startpos},
						dataType: "json",
						success: function(data){
							if(data.status == "none"){
								return ;
							}
							var username,id,nickname,myscore,comnick,comuser,pubdate,content,goodcount,badcount;
							comnick = null;
							comuser = null;
							$.each(data,function(index,item){
								if(index == "id"){
									id = item;
								}
								if(index == "username"){
									username = item;
								}
								if(index == "nickname"){
									nickname = item;
								}
								if(index == "comnick"){
									comnick = item;
								}
								if(index == "comuser"){
									comuser = item;
								}
								if(index == "pubdate"){
									pubdate = item;
								}
								if(index == "content"){
									content = item;
								}
								if(index == "goodcount"){
									goodcount = item;
								}
								if(index == "badcount"){
									badcount = item;
								}
								if(index == "myscore"){
									myscore = item;
								}
							});
							$li = $("<li></li>");
							$maindiv = $("<div class='maincontent'></div>");
							$facediv = $("<div class='face'></div>");
							$contentdiv = $("<div class='content'></div>");
							$personinfodiv = $("<div class='personinfo'></div>");
							if(comnick == null || $.fn.checknull(comnick) == 0){
								$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")<span class='timespan'>"+pubdate+"</span></p>")
							}
							else{
								$personp = $("<p><span class='nickspan'>"+nickname+"</span>("+username+")&nbsp;&nbsp;<span class='comspan'>回复</span>&nbsp;&nbsp;<span class='nickspan'>"+comnick+"</span>("+comuser+")<span class='timespan'>"+pubdate+"</span></p>")
							}
							$pubcontentdiv = $("<div class='pubcontent'></div>");
							$contentp = $("<p>"+content+"</p>");
							$modgroupdiv = $("<div class='modgroup'></div>");
							if(myscore == 0){
								$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"'></a>");
								$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"'></a>");
								$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
								$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
							}
							else if(myscore == 1){
								$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='yes'></a>");
								$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='yes'></a>");
								$goodspan1 = $("<img src='images/guest/good_score_a.png' />");
								$badspan1 = $("<img src='images/guest/bad_score_b.png' />");
							}
							else{
								$goodlink = $("<a href='javascript:void(0);' class='good' data-id='"+id+"' data-status='no'></a>");
								$badlink = $("<a href='javascript:void(0);' class='bad' data-id='"+id+"' data-status='no'></a>");
								$goodspan1 = $("<img src='images/guest/good_score_b.png' />");
								$badspan1 = $("<img src='images/guest/bad_score_a.png' />");
							}
							$goodspan2 = $("<span>("+goodcount+")</span>");
							$badspan2 = $("<span>("+badcount+")</span>");
							$(".guest-main .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
						},
						error: function(xhr){
							alert("服务器环境异常-->"+xhr.status);
						}
					});
				},
				error: function(xhr){
					alert("服务器环境异常-->"+xhr.status);
				}
			});
			$(".cloader").css("display","none");
		}
		
		$(".modpage a:nth-child(1)").css("visibility","hidden");
		$(".modpage a:nth-child(5)").css("visibility","visible");
	};
	
	/**
	 * 上一页事件
	 */
	$.fn.prevpagefun = function(){
		if(curpage == 1){
			return l
		}
		if($(".modpage a:nth-child(1)").css("visibility") == "hidden"){
			return ;
		}
		startpos = (curpage-1)*2;
		$.fn.loadgetdata();
		$(".modpage a:nth-child(5)").css("visibility","visible");
		if(startpos == 0){
			$(".modpage a:nth-child(1)").css("visibility","hidden");
		}
	};
	$(".modpage a:nth-child(2)").click($.fn.prevpagefun);
	
	/**
	 * 下一页事件
	 */
	$.fn.nextpagefun = function(){
		if($(".modpage a:nth-child(5)").css("visibility") == "hidden"){
			return ;
		}
		startpos++;
		curpage ++;
		$.fn.loadgetdata();
		$(".modpage a:nth-child(1)").css("visibility","visible");
		if(startpos == max-1 || startpos == max){
			$(".modpage a:nth-child(5)").css("visibility","hidden");
		}
	};
	$(".modpage a:nth-child(4)").click($.fn.nextpagefun);
	
	/**
	 * 首页事件
	 */
	$.fn.firstfun = function(){
		curpage = 1;
		startpos = 0;
		$(this).css("visibility","hidden");
		$(".modpage a:nth-child(5)").css("visibility",'visible');
		$.fn.loadgetdata();
	};
	$(".modpage a:nth-child(1)").click($.fn.firstfun);
	
	/**
	 * 尾页事件
	 */
	$.fn.lastfun = function(){
		var maxpage = Math.ceil(max/2);
		curpage = maxpage;
		startpos = (maxpage - 1)*2;
		$.fn.loadgetdata();
		$(this).css("visibility","hidden");
		$(".modpage a:nth-child(1)").css("visibility",'visible');
	};
	$(".modpage a:nth-child(5)").click($.fn.lastfun);

	/**
	 * 我评过的点击事件
	 */
	$.fn.liclifun = function(){
		$(".clipj").removeClass("clipj");
		$(this).addClass("clipj");
		loadtype = $(this).data("type");
		$.fn.loadgetdata();
	};
	$(document).on("click",".myguesttop span.pj",$.fn.liclifun);
	
});


/**
	上一页点击的bug事件
**/
$(function(){
	
	//获取我的留言数据
	$.fn.getmyguestfun = function(){
		//先获取我的留言总条数
		$.ajax({
			async: false,
			type: "post",
			url: "getmyguestcount",
			dataType: "json",
			success: function(data){
				$.each(data,function(index,item){
					$(".main-right .myguest .myguesttop .tj").text(item+"条留言");
					maxpage = item;
				});
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
		//在获取并解析留言数据
		$.ajax({
			async: true,
			type: "post",
			url: "getmyguest",
			data: {startpos: 0},
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
				$(".main-right .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	
	/**
	 * 加载时获取我的留言
	 */
	var maxpage = 0;
	var islogin = 0;
	$.fn.getmyguestload = function(){
		
		//获取用户登录信息
		$.fn.getcode();
		var code = $(".code").val(); 
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
					$.fn.getmyguestfun();
					islogin = 1;
				}
				else{
					$p1 = $("<p class='flo'>您还未登录</p>");
					$p2 = $("<p class='flo'><a href='gologin'>登录</a><a href='goregister'>注册</a></p>");
					
					var $nodiv = $("<div class='my-nologin'></div>");
					var $header = $("<header> <h4><span class='glyphicon glyphicon-exclamation-sign'></span>你还未登录</h4></header>");
					var $btndiv = $("<div class='login-btn'></div>");
					var $btnlinks = $("<a href='gologin'>点击登录</a><a href='goregister'>没有账号?</a><a href='forgetpwd'>忘记密码?</a>");
					$(".main-right .myguest .myguestcontent").append($nodiv.append($header).append($btndiv.append($btnlinks)));
				}
				$(".myinfo").append($p1).append($p2);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		
	};
	$.fn.getmyguestload();
	
	

	/**
	 * 上一页
	 */
	var startpage = 0;
	$.fn.prevguest = function(){
		if(startpage == 0){
			return ;
		}
		startpage--;
		$.ajax({
			async: true,
			type: "post",
			url: "getmyguest",
			data: {startpos: startpage},
			dataType: "json",
			success: function(data){
				$(".main-right .myguest .myguestcontent ol").html("");
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
				$(".main-right .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$(".main-right .myguest .modpage a.prevpage").on("click",$.fn.prevguest);
	
	/**
	 * 下一页
	 */
	$.fn.nextguest = function(){
		if(startpage == maxpage-1){
			return ;
		}
		startpage++;
		$.ajax({
			async: true,
			type: "post",
			url: "getmyguest",
			data: {startpos: startpage},
			dataType: "json",
			success: function(data){
				$(".main-right .myguest .myguestcontent ol").html("");
				var username,id,myscore,nickname,comnick,comuser,pubdate,content,goodcount,badcount;
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
				$(".main-right .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$(".main-right .myguest .modpage a.nextpage").on("click",$.fn.nextguest);
	
	/**
	 * 首页
	 */
	$.fn.firstpage = function(){
		$.ajax({
			async: true,
			type: "post",
			url: "getmyguest",
			data: {startpos: 0},
			dataType: "json",
			success: function(data){
				$(".main-right .myguest .myguestcontent ol").html("");
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
				$(".main-right .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
				
				startpage = 0;
				$(".modpage a.firstpage").css("visibility","hidden");
				$(".modpage a.lastpage").css("visibility","visible");
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$(".main-right .myguest .modpage a.firstpage").on("click",$.fn.firstpage);
	
	/**
	 * 尾页
	 */
	$.fn.lastpage = function(){
		$.ajax({
			async: true,
			type: "post",
			url: "getmyguest",
			data: {startpos: maxpage-1},
			dataType: "json",
			success: function(data){
				$(".main-right .myguest .myguestcontent ol").html("");
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
				$(".main-right .myguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
				
				startpage = maxpage -1;
				$(".modpage a.lastpage").css("visibility","hidden");
				$(".modpage a.firstpage").css("visibility","visible");
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$(".main-right .myguest .modpage a.lastpage").on("click",$.fn.lastpage);
	
	
	/**
	 * 点击回复展开回复框
	 */
	var comopen = 0;
	$.fn.comclick = function(){
		if(comopen == 0 && $(this).text() == "回复"){
			$(this).parent().next().css("display","block").animate({
				height: "167px"
			},500);
			$(this).html("收起回复");
			comopen = 1;
		}
		else if(comopen == 1 && $(this).text() == "回复"){
			$(".commitbar").animate({
				height: "0"
			},500);
			var $this = $(this);
			window.setTimeout(function(){
				$(".commitbar").css("display","none");
				$("textarea").val("说点什么....");
				$this.parent().next().css("display","block").animate({
					height: "167px"
				},500);
			},500);
			$(".commit").html("回复");
			$(this).html("收起回复");
		}
		else if($(this).text() == "收起回复"){
			$(".commitbar").animate({
				height: "0"
			},500);
			window.setTimeout(function(){
				$(".commitbar").css("display","none");
			},500);
			comopen = 0;
			$(this).html("回复");
			$("textarea").val("说点什么....");
		}
	};
	$(document).on("click",".commit",$.fn.comclick);
	
	/**
	 * 留言发表框失去焦点和获得焦点事件
	 */
	$.fn.getfocus = function(){
		if($(this).val() == "说点什么...."){
			$(this).val("");
		}
	};
	$(document).on("focus","textarea",$.fn.getfocus);
	$.fn.getblur = function(){
		if($.fn.checknull($(this).val()) == 0){
			$(this).val("说点什么....");
		}
	};
	$(document).on("blur","textarea",$.fn.getblur);
	
	/**
	 * 点击发表留言事件
	 */
	var coming = 0;
	$.fn.comguest = function(){
		if(coming == 1){
			return ;
		}
		$.fn.getcode();
		var code = $(".code").val();
		var content = $(".main-left .guest textarea").val();
		if($.fn.checknull(content) == 0 || content == "说点什么...."){
			$(this).next().html("评论内容不能为空").css("visibility","visible");
			var $this = $(this);
			window.setTimeout(function(){
				$this.next().css("visibility","hidden");
			},3000);
			return ;
		}
		if(islogin == 0){
			$(this).next().html("您还未登录").css("visibility","visible");
			var $this = $(this);
			window.setTimeout(function(){
				$this.next().css("visibility","hidden");
			},3000);
			return ;
		}
		$(".czhezhao").css("display","block");
		$(".cloader").css("display","block").css("opacity",1);

		$.ajax({
			async: true,
			type: "post",
			url: "comguest",
			data:{content: content,comnick: null,comuser: null,code: code},
			dataType: "json",
			success: function(data){
				$("textarea").val("").trigger("focus");
				$.fn.comlistload();
				$.each(data,function(index,item){
					if(item == "ok"){
						$(".cloader").animate({
							opacity: 0
						},100);
						$(".czhezhao").css("display","none")
						$(".cok").css("display","block").animate({
							opacity: 1
						},500);
						window.setTimeout(function(){
							$(".cloader").css("display","none");
							$(".cok").animate({
								opacity: 0
							},500);
							window.setTimeout(function(){
								$(".cok").css("display","none");
							},500);
						},500);
					}
				});
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$(".main-left .guest a").on("click",$.fn.comguest);
});
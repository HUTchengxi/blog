$(function(){
	
	/**
	 * 页面加载时获取所有留言
	 */
	var max = 0;
	var startpos = 0;
	$.fn.comlistload = function(){
		//页面加载时先获取所有留言人数和留言条数
		$.ajax({
			async: true,
			type: "post",
			url: "getguestcount",
			dataType: "json",
			success: function(data){
				var people, guest;
				$.each(data,function(index,item){
					if(index == "people"){
						people = item;
					}
					if(index == "guest"){
						guest = item;
						max = item;
					}
				});
				$(".guestlist .listtop .tj").text(people+"人参与，"+guest+"条留言");
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
		//然后获取留言信息
		$.ajax({
			async: true,
			type: "post",
			url: "getguests",
			data: {startpos: 0},
			dataType: "json",
			success: function(data){
				var getcount = 0;
				$(".listcontent ol").html("");
				$(".getmore").remove();
				$.each(data,function(index,item){
					var username,id,myscore,nickname,comnick,comuser,pubdate,content,goodcount,badcount;
					comnick = null;
					comuser = null;
					getcount++;
					startpos++;
					$.each(item,function(index1,item1){
						if(index1 == "id"){
							id = item1;
						}
						if(index1 == "username"){
							username = item1;
						}
						if(index1 == "nickname"){
							nickname = item1;
						}
						if(index1 == "comnick"){
							comnick = item1;
						}
						if(index1 == "comuser"){
							comuser = item1;
						}
						if(index1 == "pubdate"){
							pubdate = item1;
						}
						if(index1 == "content"){
							content = item1;
						}
						if(index1 == "goodcount"){
							goodcount = item1;
						}
						if(index1 == "badcount"){
							badcount = item1;
						}
						if(index1 == "myscore"){
							myscore = item1;
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
					$comlink = $("<a href='javascript:void(0);' class='commit' data-id="+id+"'>回复</a>");
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
					$commitbardiv = $("<div class='commitbar'></div>");
					$textareabar = $("<textarea rows='6' cols='70'>说点什么....</textarea>");
					$alink = $("<a href='javascript:void(0);'><button data-id='"+id+"'></button></a>");
					$comp = $("<p></p>");
					$(".listcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($comlink).append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))).append($commitbardiv.append($textareabar).append($alink).append($comp)))));
				});
				if(getcount == 5 && max != 5){
					$getmorelink = $("<a class='getmore' href='javascript:void(0);' data-status='can'></a>");
					$morespan = $("<span>加载更多<span class='glyphicon glyphicon-chevron-down'></span></span>");
				}
				else if(getcount == 0){
					$getmorelink = $("<a href='javascript:void(0);' class='getmore' data-status='none'></a>");
					$morespan = $("<span>虚位以待中哟</span>");
				}
				else{
					$getmorelink = $("<a href='javascript:void(0);' class='getmore' data-status='none'></a>");
					$morespan = $("<span>没有更多了</span>");
				}
				$(".listcontent").append($getmorelink.append($morespan));
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$.fn.comlistload();
	
	/**
	 * 加载更多事件
	 */
	$.fn.getmore = function(){
		var val = $(this).children().text();
		if(val == "没有更多了" || val == "虚位以待中哟"){
			return false;
		}
		else{
			$.ajax({
				async: true,
				type: "post",
				url: "getguests",
				data: {startpos: startpos},
				dataType: "json",
				success: function(data){
					var getcount = 0;
					$(".getmore").remove();
					$.each(data,function(index,item){
						var username,id,myscore,nickname,comnick,comuser,pubdate,content,goodcount,badcount;
						comnick = null;
						comuser = null;
						getcount++;
						$.each(item,function(index1,item1){
							if(index1 == "id"){
								id = item1;
							}
							if(index1 == "username"){
								username = item1;
							}
							if(index1 == "nickname"){
								nickname = item1;
							}
							if(index1 == "comnick"){
								comnick = item1;
							}
							if(index1 == "comuser"){
								comuser = item1;
							}
							if(index1 == "pubdate"){
								pubdate = item1;
							}
							if(index1 == "content"){
								content = item1;
							}
							if(index1 == "goodcount"){
								goodcount = item1;
							}
							if(index1 == "badcount"){
								badcount = item1;
							}
							if(index1 == "myscore"){
								myscore = item1;
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
						$comlink = $("<a href='javascript:void(0);' class='commit' data-id="+id+"'>回复</a>");
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
						$commitbardiv = $("<div class='commitbar'></div>");
						$textareabar = $("<textarea rows='6' cols='80'>说点什么....</textarea>");
						$alink = $("<a href='javascript:void(0);'><button data-id='"+id+"'></button></a>");
						$comp = $("<p></p>");
						$(".listcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($comlink).append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))).append($commitbardiv.append($textareabar).append($alink).append($comp)))));
					});
					startpos += getcount;
					if(getcount == 5){
						$getmorelink = $("<a class='getmore' href='javascript:void(0);' data-status='can'></a>");
						$morespan = $("<span>加载更多<span class='glyphicon glyphicon-chevron-down'></span></span>");
					}
					else{
						$getmorelink = $("<a href='javascript:void(0);' class='getmore' data-status='none'></a>");
						$morespan = $("<span>没有更多了</span>");
					}
					$(".listcontent").append($getmorelink.append($morespan));
				},
				error: function(xhr){
					alert("服务器环境异常-->"+xhr.status);
				}
			});
		}
	};
	$(document).on("click",".getmore",$.fn.getmore);
	
	/**
	 * 鼠标移入点赞事件
	 */
	$.fn.mouseentergood = function(){
		$(this).children("img").attr("src","images/guest/good_score_a.png");
	};
	$(document).on("mouseenter",".good",$.fn.mouseentergood);
	
	/**
	 * 鼠标移出点赞事件
	 */
	$.fn.mouseleavegood = function(){
		if($(this).data("status") == "yes"){
			return ;
		}
		$(this).children("img").attr("src","images/guest/good_score_b.png");
	};
	$(document).on("mouseleave",".good",$.fn.mouseleavegood);
	
	/**
	 * 鼠标移入踩事件
	 */
	$.fn.mouseentergood = function(){
		$(this).children("img").attr("src","images/guest/bad_score_a.png");
	};
	$(document).on("mouseenter",".bad",$.fn.mouseentergood);
	
	/**
	 * 鼠标移出踩事件
	 */
	$.fn.mouseleavegood = function(){
		if($(this).data("status") == "no"){
			return ;
		}
		$(this).children("img").attr("src","images/guest/bad_score_b.png");
	};
	$(document).on("mouseleave",".bad",$.fn.mouseleavegood);
	
	/**
	 * 点赞功能的实现
	 */
	$.fn.goodcountfun = function(){
		console.log();
		if($(this).data("status") == "yes" || $(this).data("status") == "no"){
			return ;
		}
		var comid = $(this).data("id");
		$.fn.getcode();
		var code = $(".code").val();
		$this = $(this);
		$.ajax({
			async: true,
			type: "post",
			url: "goodguest",
			data: {status: "good", id: comid, code: code},
			dataType: "json",
			success: function(data){
				$.fn.gethotguestload();
				$this.attr("data-status","yes");
				$this.parent().children("a.bad").attr("data-status","yes");
				$this.children("img").attr("src","images/guest/good_score_a.png");
				$this.children("span").text("("+(parseInt($this.children("span").text().substring(1,$this.children("span").text().length-1))+1)+")");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		})
	};
	$(document).on("click",".good",$.fn.goodcountfun);
	
	/**
	 * 踩事件
	 */
	$.fn.badcountfun = function(){
		if($(this).data("status") == "yes" || $(this).data("status") == "no"){
			return ;
		}
		var comid = $(this).data("id");
		$.fn.getcode();
		var code = $(".code").val();
		$this = $(this);
		$.ajax({
			async: true,
			type: "post",
			url: "goodguest",
			data: {status: "bad", id: comid, code: code},
			dataType: "json",
			success: function(data){
				$.fn.gethotguestload();
				$this.attr("data-status","no");
				$this.parent().children("a.good").attr("data-status","no");
				$this.children("img").attr("src","images/guest/bad_score_a.png");
				$this.children("span").text("("+(parseInt($this.children("span").text().substring(1,$this.children("span").text().length-1))+1)+")");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		})
	};
	$(document).on("click",".bad",$.fn.badcountfun);
});
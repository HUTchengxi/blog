$(function(){
	/**
	 * 页面加载时获取最热门留言第一条
	 */
	$.fn.gethotguestload = function(){
		$.ajax({
			async: true,
			type: "post",
			url: "gethotguest",
			dataType: "json",
			success: function(data){
				var getcount = 0;
				$(".hotguest .myguestcontent ol").html("");
				$.each(data,function(index,item){
					var username,id,nickname,myscore,comnick,comuser,pubdate,content,goodcount,badcount;
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
					$(".hotguest .myguestcontent ol").append($li.append($maindiv.append($facediv).append($contentdiv.append($personinfodiv.append($personp)).append($pubcontentdiv.append($contentp)).append($modgroupdiv.append($goodlink.append($goodspan1).append($goodspan2)).append($badlink.append($badspan1).append($badspan2))))));
				});
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr.status);
			}
		});
	};
	$.fn.gethotguestload();
	
	/**
	 * 热门留言三个link点击事件
	 */
	$.fn.linkclick = function(){
		var index = $(this).data("index");
		console.log(index);
		$(".main-right .hotguest .contentcontainer").animate({
			left: -484*index+"px"
		},500);
		$(".alinkhover").removeClass("alinkhover");
		$(this).addClass("alinkhover");
	};
	$(".main-right .hotguest .modpage a").on("click",$.fn.linkclick);
});
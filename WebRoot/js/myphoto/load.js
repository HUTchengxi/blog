$(function(){
	
	/**
	 * 页面打开后动态加载我的相册
	 */
	var startpos = 0;
	$.fn.loadimgfun = function(){
		$.ajax({
			async: false,
			type: "post",
			url: "getmyphotos",
			data: {startpos: 0},
			dataType: "json",
			success: function(data){
				//并未上传图片到相册
				if(data.status == "none"){
					$("#works").html("<p>&nbsp;</p><p>&nbsp;</p><p&nbsp;></p><p>&nbsp;</p><p>没有上传图片</p><p>请到<a href='aqzx' title='后台管理中心'>后台</a>上传照片至我的相册</p>");
					$loadmore = $("<a href='javascript:void(0);'>加载完了</a>");
					$(".photo-page").html("").append($loadmore);
					return ;
				}
				//动态生成图片查看器
				$.each(data,function(index,item){
					var imgsrc, title, descript ;
					imgsrc = "images/myphoto/photos/";
					startpos ++;
					$.each(item,function(index1,item1){
						if(index1 == "imgsrc")
							imgsrc += item1;
						if(index1 == "title")
							title = item1;
						if(index1 == "descript")
							descript = item1;
					});
					if(index == "1")
						$figure = $("<figure class='effect-oscar wowload fadeIn'></figure>");
					else
						$figure = $("<figure class='effect-oscar wowload fadeInUp'></figure>");
					$img = $("<img src='"+imgsrc+"' />");
					$figcaption = $("<figcaption></figcaption>");
					$h2 = $("<h2>"+title+"</h2>");
					$p = $("<p>"+descript+"<br /></p>");
					$alink = $("<a href='"+imgsrc+"' title='"+title+"' data-gallery>View more</a>");
					$("#works").append($figure.append($img).append($figcaption.append($h2).append($p.append($alink))));
					
				});
				
				if(startpos != 0 &&startpos%6 == 0){
					$loadmore = $("<a href='javascript:void(0);' class='loadmore'>加载更多</a>");
				}
				else{
					$loadmore = $("<a href='javascript:void(0);'>加载完了</a>");
				}
				$(".photo-page").html("").append($loadmore);
				
				var height = $(document).height();
				var width = $(document).width();
				$(".zhezhao").css("height",height+"px").css("width",width+"px").css("opacity",1).css("display","block");
				$("#container").css("display","block");
			
				//判断图片是否都加载完毕
				var $imglist = $("img");
				var len = $imglist.length;
				console.log(len);
				var temp = 0;
				for(var i=0;i <len; i++){
					var newimg = new Image();
					newimg.src = $imglist[i].src;
					newimg.onload = function(){
						temp++;
						if(temp == len){
							$(".zhezhao").css("opacity",0).css("display","none");
							$("#container").animate({
								opacity: 0
							},500);
							$("html body").css("opacity",0).animate({
								opacity: 1
							},500);
							window.setTimeout(function(){
								$("#container").css("display","none");
							},500);
						}
					};
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	
	/**
	 * 页面刚开始加载时打开一个全新的页面
	 */
	$.fn.headloadfun = function(){
		$("body").css("overflow","hidden");
		var height = 684;
		$("#works").css("opacity",0);
		$("#blueimp-gallery").css("opacity",0);
		$(".photo-page").css("opacity",0);
		$(".headshow").css("opacity",0).css("height",height+"px").css("line-height",height/2+"px").css("font-size","50px").animate({
			opacity: 1
		},1000);
		window.setTimeout(function(){
			$(".headshow").animate({
				height: "50px",
				lineHeight: "50px",
				fontSize: "20px"
			},500);
			$.fn.loadimgfun();
			$(window).scrollTop(0);
			$("#works").css("opacity",1);
			$("#blueimp-gallery").css("opacity",1);
			$(".photo-page").css("opacity",1);
			$("body").css("overflow","auto");
		},2000);
	};
	$.fn.headloadfun();
	
	/**
	 * close按钮关闭当前打开的图片弹窗
	 */
	$.fn.closeimgshow = function(){
		$("#blueimp-gallery").css("display","none");
		$("body").css("overflow","auto");
	};
	$(document).on("click",".close",$.fn.closeimgshow);
	
	/**
	 * esc按键事件
	 */
	$.fn.keyupfun = function(e){
		var keycode = e.keyCode;
		//esc
		if(keycode == 27 && $("#blueimp-gallery").css("display") == "block"){
			$.fn.closeimgshow();
		}
	};
	$(document).on("keyup",$.fn.keyupfun);
	
	/**
	 * 加载更多事件
	 */
	$.fn.loadmorefun = function(){
		$.ajax({
			async: true,
			type: "post",
			url: "getmyphotos",
			data: {startpos: startpos},
			dataType: "json",
			success: function(data){
				console.log(data);
				//并未上传图片到相册
				if(data.status == "none"){
					$loadmore = $("<a href='javascript:void(0);'>加载完了</a>");
					$(".photo-page").html("").append($loadmore);
					return ;
				}
				//动态生成图片查看器
				$.each(data,function(index,item){
					var imgsrc, title, descript ;
					imgsrc = "images/myphoto/photos/";
					startpos ++;
					$.each(item,function(index1,item1){
						if(index1 == "imgsrc")
							imgsrc += item1;
						if(index1 == "title")
							title = item1;
						if(index1 == "descript")
							descript = item1;
					});
					if(index == "1")
						$figure = $("<figure class='effect-oscar wowload fadeIn'></figure>");
					else
						$figure = $("<figure class='effect-oscar wowload fadeInUp'></figure>");
					$img = $("<img src='"+imgsrc+"' />");
					$figcaption = $("<figcaption></figcaption>");
					$h2 = $("<h2>"+title+"</h2>");
					$p = $("<p>"+descript+"<br /></p>");
					$alink = $("<a href='"+imgsrc+"' title='"+title+"' data-gallery>View more</a>");
					$("#works").append($figure.append($img).append($figcaption.append($h2).append($p.append($alink))));
					
				});
				
				if(startpos != 0 &&startpos%6 == 0){
					$loadmore = $("<a href='javascript:void(0);' class='loadmore'>加载更多</a>");
				}
				else{
					$loadmore = $("<a href='javascript:void(0);'>加载完了</a>");
				}
				startpos--;
				$(".photo-page").html("").append($loadmore);
				
				var height = $(document).height();
				var width = $(document).width();
				$(".zhezhao").css("height",height+"px").css("width",width+"px").css("opacity",1).css("display","block");
				$("#container").css("display","block");
			
				//判断图片是否都加载完毕
				var $imglist = $("img");
				var len = $imglist.length;
				var temp = 0;
				for(var i=0;i <len; i++){
					var newimg = new Image();
					newimg.src = $imglist[i].src;
					newimg.onload = function(){
						temp++;
						if(temp == len){
							$("body").css("overflow","scroll");
							$(".zhezhao").css("opacity",0).css("display","none");
							$("#container").animate({
								opacity: 0
							},500);
							$("html body").css("opacity",0).animate({
								opacity: 1
							},500);
							window.setTimeout(function(){
								$("#container").css("display","none");
							},500);
						}
					};
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$(document).on("click",".photo-page a.loadmore",$.fn.loadmorefun);
});
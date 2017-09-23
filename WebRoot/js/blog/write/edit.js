$(function(){
	/**
	 * 创建编辑器
	 */
	var ue = UE.getEditor('myEditor');
	
	/**
	 * 点击提交按钮进行提交
	 */
	$.fn.publish = function(){
		var title = $(".main .main-title .title").val();
		var content = ue.getContent();
		if($.fn.checknull(title) == 0){
			alert("请填写你的标题");
			$.fn.getcode();
			return ;
		}
		if($.fn.checknull(content) == 0){
			alert("博客内容不能为空");
			$.fn.getcode();
			return ;
		}
		//弹出选择背景图片和发布的类别和原创类别框
		$("#homehead").css("opacity","0.3");
		$(".shadow").css("display","block");
		$(".main-choose").css("display","block");
		$(".main-choose").animate({
			opacity: 1
		},300);
	};
	$(".main .main-btn .publish").click($.fn.publish);
	
	/**
	 * 点击弹出框的叉叉和取消退出弹出框
	 */
	$.fn.exitchoose = function(){
		//隐藏选择背景图片和发布的类别和原创类别框
		$(".main-choose").animate({
			opacity: 0
		},300);
		window.setTimeout(function(){$(".shadow").css("display","none");$(".main-choose").css("display","none");$("#homehead").css("opacity","1");},300);
	};
	$(".main-choose .exit-btn .exit").click($.fn.exitchoose);
	$(".main-choose .pub-btn .declear").click($.fn.exitchoose);
	
	/**
	 * 背景选择下拉列表值改变时触发事件
	 */
	$.fn.imgsrcchange = function(){
		$(".czhezhao").css("display","block");
		$(".cloader").css("display","block");
		var imgsrc = $(this).val();
		var tempimg = new Image();
		tempimg.src = "images/blog/contentbg/"+imgsrc+".jpg";
		tempimg.onload = function(){
			$(".czhezhao").css("display","none");
			$(".cloader").css("display","none");
			$(".main-choose .img-skim img").attr("src","images/blog/contentbg/"+imgsrc+".jpg").css("opacity","0").animate({
				opacity: 1
			},300);
		};
	};
	$(".main-choose .choose-imgsrc select").change($.fn.imgsrcchange);
	
});




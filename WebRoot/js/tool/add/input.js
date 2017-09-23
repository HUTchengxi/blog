$(function(){
	/**
	 * 输入框的获得焦点事件
	 */
	$.fn.getfocus = function(){
		$(this).attr("placeholder","");
	};
	$(".main .title").on("focus",$.fn.getfocus);
	$(".main .pubtype").on("focus",$.fn.getfocus);
	$(".main .enname").on("focus",$.fn.getfocus);
	$(".main .filenum").on("focus",$.fn.getfocus);
	
	/**
	 * 输入框的失去焦点事件
	 */
	$.fn.losefocus = function(){
		$(this).attr("placeholder",$(this).data("ph"));
		var title = $(".main .title").val();
		var pubtype = $(".main .pubtype").val();
		var enname = $(".main .enname").val();
		var filenum = $(".main .filenum").val();
		if($.fn.checknull(title) == 1 && $.fn.checknull(pubtype) == 1 && $.fn.checknull(enname) == 1 && $.fn.checknull(filenum) == 1){
			$(".main .form-btns").animate({
				opacity: 1
			},200);
		}
		else{
			$(".main .form-btns").animate({
				opacity: 0
			},200);
		}
	};
	$(".main .title").on("blur",$.fn.losefocus);
	$(".main .pubtype").on("blur",$.fn.losefocus);
	$(".main .enname").on("blur",$.fn.losefocus);
	$(".main .filenum").on("blur",$.fn.losefocus);
	
	/**
	 * 动态生成file文本框
	 */
	$.fn.filenumchange = function(){
		var filenum = $(this).val();
		var $filediv = $(".main .form-files");
		if($.fn.checknull(filenum) == 1){
			//动态file文本选择框
			$filediv.css("opacity","0").html("");
			for(var i=1;i<=filenum; i++){
				$filelabel = $("<label for='files'>上传文件"+i+"</label>");
				$file = $("<input type='file' name='files' class='files' />");
				$filediv.append($filelabel).append($file).append("<br />").animate({
					opacity: 1
				},100);
			}
		}
		else{
			$filediv.animate({
				opacity: 0
			},100).html("");
		}
	};
	$(".main .filenum").on("keyup",$.fn.filenumchange);
	$(".main .filenum").on("change",$.fn.filenumchange);	
	
	/**
	 * 重写按钮事件
	 */
	$.fn.resetform = function(){
		$(".main .title").val("");
		$(".main .pubtype").val("");
		$(".main .file").val("");
		$.fn.getcode();
	};
	$(".main .reset").on("click",$.fn.resetform);
	
	/**
	 * 添加按钮事件
	 */
	$.fn.publishform = function(){
		var title = $(".main .title").val();
		var pubtype = $(".main .pubtype").val();
		var files = $(".main .files").val();
		if($.fn.checknull(title) == 0){
			alert("请填写标题");
			return ;
		}
		if($.fn.checknull(pubtype) == 0){
			alert("请填写类型");
			return ;
		}
		if($.fn.checknull(files) == 0){
			alert("请选择文件");
			return ;
		}
		$(".main form").attr("action","addtoolinfo");
		$(".main form .publish").attr("type","submit");
	};
	$(".main .publish").on("click",$.fn.publishform);
});
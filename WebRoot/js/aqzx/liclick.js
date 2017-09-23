$(function(){
	
	/**
	 * 页面加载时判断是否超级管理，设置相关属性
	 */
	$.fn.loadident = function(){
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: false,
			type: "post",
			url: "loadident",
			data: {code: code},
			dataType: "json",
			success: function(data){
				if(data.status != 1){
					$(".main-bar ul li:nth-child(8)").attr("data-ident","1");
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$.fn.loadident();
	
	/**
	 *li的click事件 
	 */
	$.fn.liclickfun = function(){
		console.log($(this).data("ident") == null);
		if($(this).data("ident") == null)
			window.location = $(this).data("src");
		else{
			alert("您无权进行此操作");
		}
	};
	$(".main-bar ul li").click($.fn.liclickfun);
});
$(function(){
	
	/**
	 * 页面加载时设置code随机值
	 */
	$.fn.getcode();
	
	/**
	 * 页面加载时获取工具数据动态生成表格
	 */
	$.fn.loadgetdata = function(){
		var code = $(".code").val();
		
		//页面加载获取数据之前进行加载动画
		var height = $(document).height();
		var width = $(document).width();
		$("html body").css("overflow","hidden");
		$(".zhezhao").css("height",height+"px").css("width",width+"px").css("opacity",1).css("display","block");
		$("#container").css("display","block");
		$.ajax({
			async: true,
			type: "post",
			url: "gettoolsinfo",
			data:{code: code},
			dataType: "json",
			success: function(data){
				$(".zhezhao").css("opacity",1).animate({
					opacity: 0
				},500);
				$("#container").css("opacity",1).animate({
					opacity: 0
				},500);
				$("html body").css("overflow","scroll");
				$("#homehead").animate({
					opacity: 1
				},500);
				$(".main").animate({
					opacity: 1
				},500);
				window.setTimeout(function(){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					$.each(data,function(index,item){
						$tr = $("<tr></tr>");
						$.each(item,function(index1,item1){
							if(index1 == "id"){
								$tr.append($("<td><span>"+item1+"</span></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "author"){
								$tr.append($("<td><span>"+item1+"</span></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "title"){
								$tr.append($("<td><span>"+item1+"</span></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "href"){
								$tr.append($("<td><a href='"+item1+"' target='_blank'>"+item1+"</a></td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "pubdate"){
								$tr.append($("<td>"+item1+"</td>"));
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "pubtype"){
								$tr.append($("<td>"+item1+"</td>"));
							}
						});
						$(".main table tbody").append($tr);
						//随机获取一次session.code
						$.fn.getcode();
					});
				},500);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	window.setTimeout($.fn.loadgetdata,300);
});
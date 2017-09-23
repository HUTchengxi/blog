$(function(){
	
	/**
	 * 页面加载时设置code随机值
	 */
	$.fn.getcode();
	
	/**
	 * 页面加载时获取博客数据
	 */
	$.fn.loadgetinfo = function(){
		$("#container").css("display","block").css("top",0);
		code = $(".code").val();
		$.ajax({
			async: true,
			type: "post",
			url: "getbloginfo",
			data:{code: code},
			dataType: "json",
			success: function(data){
				$("#container").css("opacity",1).animate({
					opacity: 0
				},500);
				window.setTimeout(function(){
					$("#container").css("display","none");
					$.each(data,function(index,item){
						$tr = $("<tr></tr>");	
						var id;
						$.each(item,function(index,item){
							if(index == "id"){
								id = item;
							}
						});
						$.each(item,function(index,item){
							if(index == "author"){
								$tr.append("<td><span>"+item+"</span></td>");
							}
							else if(index == "pubdate"){
								$tr.append("<td>"+item+"</td>");
							}
							else if(index == "title"){
								$tr.append("<td><a href='learnblog?id="+id+"' target='_blank' ' title='"+item+"'>"+item+"</a></td>");
							}
							else if(index == "pubtype"){
								if(item == "yc"){
									item = "原创";
								}
								else if(item == "zz"){
									item = "转载";
								}
								else if(item == "fl"){
									item = "分类";
								}
								$tr.append("<td><span>"+item+"</span></td>");
							}
						});
						$(".main table tbody").append($tr);
					});
				},500);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	window.setTimeout($.fn.loadgetinfo, 200);
});
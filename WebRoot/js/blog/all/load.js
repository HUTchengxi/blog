$(function(){
	
	/**
	 * 页面加载完成时获取博客数据
	 */
	$.fn.loadbloginfo = function(){
		$("#container").css("display","block").css("top",0);
		$.ajax({
			async: true,
			type: "post",
			url: "getblogs",
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
						$.each(item,function(index1,item1){
							if(index1 == "id"){
								id = item1;
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "author"){
								$tr.append("<td><span>"+item1+"</span></td>");
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "type"){
								$tr.append("<td><span>"+item1+"</span></td>");
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "title"){
								$tr.append("<td><a href='learnblog?id="+id+"' target='_blank' ' title='"+item1+"'>"+item1+"</a></td>");
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "pubdate"){
								$tr.append("<td>"+item1+"</td>");
							}
						});
						$.each(item,function(index1,item1){
							if(index1 == "pubtype"){
								if(item1 == "yc"){
									item1 = "原创";
								}
								else if(item1 == "zz"){
									item1 = "转载";
								}
								else if(item1 == "fl"){
									item1 = "分类";
								}
								$tr.append("<td><span>"+item1+"</span></td>");
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
	$.fn.loadbloginfo();
});
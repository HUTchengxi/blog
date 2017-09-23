$(function(){
	/**
	 * modal删除指定id的实用工具
	 */
	$.fn.realdelebtn = function(){
		$.fn.getcode();
		var toolid = $(".toolid").val();
		var code = $(".code").val();
		if($.fn.checknull(toolid) == 0){
			alert("要删除的工具id不能为空");
			$.fn.getcode();
			return ;
		}
		if(confirm("确认要删除id为"+toolid+"的工具吗?")){
			$.ajax({
				async: true,
				type: "post",
				url: "deletoolbyid",
				data: {toolid: toolid,code: code},
				dataType: "json",
				success: function(data){
					$.each(data,function(index,item){
						if(index == "status"){
							if(item == "noid"){
								alert("id为"+toolid+"的实用工具不存在!");
								return ;
							}
							if(item == "delok"){
								alert("删除成功!");
								window.location.href="welltools";
							}
							if(item == "forbiden"){
								alert("你无权限进行该操作，警告!!!");
								$("#delmodal input").val("");
								$("#delmodal .modal-foot .reset").trigger("click");
								return ;
							}
						}
					});
				},
				error: function(xhr){
					alert("服务器环境异常--->"+xhr.status);
					$.fn.getcode();
				}
			});
			return ;
		}
		$("#delmodal input").val("");
		$("#delmodal .modal-foot .reset").trigger("click");
	};
	$("#delmodal .modal-foot .realdel").on("click",$.fn.realdelebtn);
});
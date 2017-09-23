$(function(){
	
	/**
	  * 校验text是否未填写   1已填写  0未填写
	  */
	$.fn.checknull = function(text){
		if(typeof(text) == "number"){
			if(number != null)
				return 1;
			return 0;
		}
		//字符串
		for(var i=0; i<text.length; i++){
			if(text.charAt(i) != " "){
				return 1;
			}
		}
		return 0;
	};
	
	/**
	 * 校验手机号码    -1不正确  1正确
	 */
	$.fn.phonecheck = function(phone){
		if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
	        return -1;
	    } 
		return 1;
	}
	
	/**
	 * 页面预加载时获取十六位校验码
	 */
	$.fn.getcode = function(){
		$.ajax({
			async: false,
			type: "post",
			url: "getcode",
			dataType: "json",
			success: function(data){
				data = data.toString();
				$(".code").val(data);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
				window.close();
			}
		});
	};
	
	/**
	 * 密码校验：是否为空或者包含空格  -2为空   -1包含空格   0长度小于六位   1正确
	 */
	$.fn.pwdcheck = function(password){
		if(password == null)
			return -2;
		var len = password.length;
		for(var i=0; i<len; i++){
			if(password.charAt(i) == " ")
				return -1;
		}
		if(len < 6)
			return 0;
		return 1;
	};
});
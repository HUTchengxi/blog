$(function(){
	/**
	 * 初始化异步，生成防盗链code
	 */
	$.fn.getcode();
	/**
	 * 校验用户登录方法
	 */
	var logtime = "";
	var pos, time, cip;
	$.fn.logincheck = function(){
		var username = $("#username").val();
		var password = $("#password").val();
		if(username == null || $.fn.checknull(username) == 0){
			alert("用户名不能为空");
			$.fn.getcode();
			return ;
		}
		if(password == null || $.fn.checknull(password) == 0){
			alert("密码不能为空");
			$.fn.getcode();
			return ;
		}
		var code = $(".code").val();
		var hei = $(document).height();
		var wid = $(document).width();
		$(".zhezhao").css("display","block").css("height",hei+"px").css("width",wid+"px");
		$("#container").css("display","block");
		$.ajax({
			async: true,
			type: "post",
			url: "adminlogin",
			data:{username: username,password: password,code: code},
			dataType: "json",
			success: function(data){
				window.setTimeout(function(){
					data = data.toString();
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					window.setTimeout(function(){
						if(data == "nouser"){
							alert("用户名不存在");
							$("#username").val("");
							$("#password").val("");
							$.fn.getcode();
							return ;
						}
						if(data == "passerr"){
							alert("密码错误");
							$("#password").val("");
							$.fn.getcode();
							return ;
						}
						
						//记录登录状态
						$.fn.getposfun();
					},100);
				},1000);
			},
			error: function(xhr){
				$(".zhezhao").css("display","none");
				$(".loader").css("display","none");
				console.log("登录环境异常---->"+xhr.status);
			}
		});
		
	};
	$("#wrapper form button").click($.fn.logincheck);
	
	/**
	 * 获取当前地理位置
	 */
	
	$.fn.getposfun = function(){
		$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
            if (remote_ip_info.ret == '1') {
            	pos = remote_ip_info.country+" "+remote_ip_info.province+" "+remote_ip_info.city;
                //alert('国家：' + remote_ip_info.country + '<BR>省：' + remote_ip_info.province + '<BR>市：' + remote_ip_info.city + '<BR>区：' + remote_ip_info.district + '<BR>ISP：' + remote_ip_info.isp + '<BR>类型：' + remote_ip_info.type + '<BR>其他：' + remote_ip_info.desc);
            	$.fn.getotherinfofun();
            } else {
            	pos = "未知";
                alert('没有找到匹配的IP地址信息！');
            }
        });
	};
	
	/**
	 * 获取其他数据信息
	 */
	$.fn.getotherinfofun = function(){
		
		var time = new Date().toString();
		time = time.substring(0,time.indexOf("("));
		
		cip = returnCitySN["cip"];  
		
		console.log(time+" "+pos+" "+cip+" "+code);
		$.fn.getcode();
		var code = $(".code").val();
		$.ajax({
			async: false,
			type: 'post',
			url: "addlogstate",
			data: {logtime: time, pos: pos, ip: cip, code: code},
			dataType: "json",
			success: function(data){
				console.log(data);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		window.setTimeout(function(){window.location.href = "welcome";},500);
	};
});
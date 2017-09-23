$(function(){
	
	$.fn.gounlockfun = function(){
		console.log("a");
		$("#lockmodal .modal-body input").val("");
		$("#lockmodal .modal-body p").css("visibility","hidden");
		$("#lockmodal").modal("show");
	};
	$(".lock .gounlock").click($.fn.gounlockfun);
	
	$.fn.loadfun = function(){
		$.ajax({
			async: true,
			type: "post",
			url: 'ispriv',
			data:{id: 1},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$(".guest-main").css("display","none").css("opacity",0);
					$(".lock").css("display","block");
					$("#lockmodal").modal("show");
					$.fn.unlockfun = function(){
						var pass = $("#lockmodal input").val();
						if(pass == null || $.fn.checknull(pass) == 0){
							$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
							return ;
						}
						$("#lockmodal .modal-foot button.realdel").button("loading");
						$.fn.getcode();
						var code = $(".code").val();
						$.ajax({
							async: true,
							type: "post",
							url: "privcheck",
							data:{id:1,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadmyinfo();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".guest-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".guest-main").css("display","block");
									},500);
									
								}
								$("#lockmodal .modal-foot button.realdel").button("reset");
							},
							error: function(xhr){
								alert("服务器环境异常--->"+xhr.status);
							}
						});
					};
					$("#lockmodal button.realdel").click($.fn.unlockfun);
				}
				else{
					$.fn.loadmyinfo();
				}
			},
			error: function(xhr){
				alert("服务器环境异常"+xhr.status);
			}
		});
	};
	$.fn.loadfun();
	
	/**
	 * 页面加载时获取当前登录用户的数据
	 */
	$.fn.loadmyinfo = function(){
		$(".main-bar ul li:nth-child(1)").addClass("clilink");
		var height = $(".info-content").height();
		var width = $(".info-content").width();
		$(".zhezhao").css("width",width+"px").css("height",height+"px").css("display","block");
		$("#loader-wrapper").css("top","-100px").css("left","76px");
		$("#container").css("display","block");
		$.fn.getcode();
		var code = $('.code').val();
			$.ajax({
				async: false,
				type: "post",
				url: 'getmyinfo',
				data: {code: code},
				dataType: "json",
				success: function(data){
					var username, password, nickname, phone;
					$.each(data, function(index,item){
						if(index == "username"){
							username = item;
						}
						if(index == "password"){
							password = item;
						}
						if(index == "nickname"){
							nickname = item;
						}
						if(index == "phone"){
							phone = item;
						}
					});
					$(".myuser input").val(username);
					$(".mypass input").val(password);
					$(".mynick input").val(nickname);
					$(".myphone input").val(phone);
				},
				error: function(xhr){
					alert("服务器环境异常--->"+xhr.status);
				}
			});
			$(".info-content").css("display","block").animate({
				opacity: 1
			},300);
			$(".zhezhao").css("display","none");
			$("#container").css("display","none");
	};
	
});
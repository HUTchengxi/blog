$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(7)").addClass("clilink");
	};
	$.fn.blogloadfun();
		
	/**
	 * 页面加载时判断权限密码是否开启
	 */
	var loadli = 1; //default
	$.fn.loadfun = function(){
		$.ajax({
			async: true,
			type: "post",
			url: 'ispriv',
			data:{id: 7},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$(".privset-main").css("display","none").css("opacity",0);
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
							data:{id: 7,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadprivsetfun();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".privset-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".privset-main").css("display","block");
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
					$.fn.loadprivsetfun();
				}
			},
			error: function(xhr){
				alert("服务器环境异常"+xhr.status);
			}
		});
	};
	$.fn.loadfun();
	
	/**
	 * 加载密码权限数据
	 */
	$.fn.loadprivsetfun = function(){
		$(".privset-main .none").css("display","none");
		$(".privset-main .group:nth-child(4) select option:nth-child(1)").attr("selected","true");
		$.ajax({
			async: true,
			type: "post",
			url: "ispriv",
			data: {id:  loadli},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$.fn.getcode();
					var code=$(".code").val();
					$.ajax({
						async: true,
						type: "post",
						url: "getlipass",
						data: {id: loadli, code: code},
						dataType: "json",
						success: function(data){
							$(".privset-main .group:nth-child(3) input").val(data.code).attr("type","password");
						},
						error: function(xhr){
							alert("服务器环境异常--->"+xhr.status);
						}
					});
				}
				else{
					$(".privset-main .group:nth-child(3) input").val("null").attr("type","text");
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$.fn.loadprivsetfun();
	
	/**
	 * 重置事件
	 */
	$.fn.resetfun = function(){
		$(".privset-main .group span").css("visibility","hidden");
		$(".privset-main .group p").css("display","none");
		$(".privset-main .group:nth-child(5) input").val("");
		$(".privset-main .group:nth-child(6) input").val("");
	};
	$(".privset-main .group button:nth-child(2)").click($.fn.resetfun);
	
	/**
	 * 提交密码设置事件
	 */
	$.fn.savepwdsetfun = function(){
		$(".privset-main .group input").trigger("blur");
		if($(".privset-main .group:nth-child(5) span.glyphicon-remove").css("visibility") == "visible"){
			return ;
		}
		if($(".privset-main .group:nth-child(6) span.glyphicon-remove").css("visibility") == "visible"){
			return ;
		}
		
		var height = $(".privset-main").height();
		var width = $(".privset-main").width();
		$(".zhezhao").css("width",width+"px").css("height",height+"px").css("display","block");
		$("#container").css("display","block");
		
		$.fn.getcode();
		var pass = $(".privset-main .group:nth-child(5) input").val();
		var code = $(".code").val();
		$.ajax({
			async: false,
			type: "post",
			url: "setlipwd",
			data: {id: loadli, password: pass, code: code},
			dataType: "json",
			success: function(data){
				if(data.status == "ok"){
					alert("修改成功");
					$.fn.loadprivsetfun();
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		$(".zhezhao").css("display","none");
		$("#container").css("display","none");
	};
	$(".privset-main .group button:nth-child(1)").click($.fn.savepwdsetfun);
	
	/**
	 * 密码确认校验
	 */
	$.fn.pwd2checkfun = function(){
		var pwd = $(this).val();
		var pwd2 = $(".privset-main .group:nth-child(5) input").val();
		if(pwd == null || $.fn.checknull(pwd) == 0){
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().next().css("visibility","visible");
			$(this).next().next().next().html("密码不能为空").css("display","block");
		}
		else if(pwd != pwd2){
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().next().css("visibility","visible");
			$(this).next().next().next().html("密码不一致").css("display","block");
		}
		else{
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().css("visibility","visible");
			$(this).next().next().next().css("display","none");
		}
	};
	$(".privset-main .group:nth-child(6) input").change($.fn.pwd2checkfun);
	$(".privset-main .group:nth-child(6) input").blur($.fn.pwd2checkfun);
	
	/**
	 * 新的密码校验
	 */
	$.fn.pwdcheckfun = function(){
		var pwd = $(this).val();
		if(pwd == null || $.fn.checknull(pwd) == 0){
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().next().css("visibility","visible");
			$(this).next().next().next().html("密码不能为空").css("display","block");
		}
		else{
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().css("visibility","visible");
			$(this).next().next().next().css("display","none");
		}
	};
	$(".privset-main .group:nth-child(5) input").change($.fn.pwdcheckfun);
	$(".privset-main .group:nth-child(5) input").blur($.fn.pwdcheckfun);
	
	/**
	 * 设置密码选择器事件
	 */
	$.fn.setpwdchangefun = function(){
		var val = $(this).val();
		if(val == "no"){
			$(".privset-main .none").css("display","none");
			$(".privset-main .group span").css("visibility","hidden");
			$(".privset-main .group p").css("display","none");
			$(".privset-main .group:nth-child(5) input").val("");
			$(".privset-main .group:nth-child(6) input").val("");
		}
		else{
			$(".privset-main .none").css("display","block");
		}
	};
	$(".privset-main .group:nth-child(4) select").change($.fn.setpwdchangefun);
	
	/**
	 * 界面选择框事件
	 */
	$.fn.licheckfun = function(){
		loadli = $(this).val();
		$(".privset-main .group:nth-child(4) select option:nth-child(1)").attr("selected","true");
		$.fn.loadprivsetfun();
	};
	$(".privset-main .group:nth-child(2) select").change($.fn.licheckfun);
	
	/**
	 * 点击解锁按钮事件
	 */
	$.fn.gounlockfun = function(){
		console.log("a");
		$("#lockmodal .modal-body input").val("");
		$("#lockmodal .modal-body p").css("visibility","hidden");
		$("#lockmodal").modal("show");
	};
	$(".lock .gounlock").click($.fn.gounlockfun);
	
	/**
	 *取消页面右击事件
	 */ 
	$.fn.rightclickfun = function(){
		return false;
	};
	$(document).contextmenu($.fn.rightclickfun);
	/**
	 * 取消f12事件
	 */
//	$.fn.f12clifun = function(e){
//		var code = e.keyCode;
//		
//		if(code == 123){
//			console.log("aa");
//			return ;
//		}
//	};
//	$(document).on("keyup",$.fn.f12clifun);
});
$(function(){
	/**
	 * 每秒进行调用，三秒后转至主页
	 */
	var goremain = 3;
	var gointerval;
	$.fn.gologinfun = function(){
		if(goremain == 0){
			window.clearInterval(gointerval);
			window.location.href = "gologin";
			return ;
		}
		$(".content .content-form3 span.time").text(goremain);
		goremain--;
	};
	
	/**
	 * 修改密码按钮事件
	 */
	$.fn.modpassfun = function(){
		$.fn.getcode();
		$(".password-group input").trigger("blur");
		$(".password2-group input").trigger("blur");
		window.setTimeout(function(){
			var show1 = $(".password-group .glyphicon-remove").css("opacity");
			var show2 = $(".password2-group .glyphicon-remove").css("opacity");
			if(show1 != 0 || show2 != 0){
				return ;
			}
			var password = $(".password-group input").val();
			var code = $(".code").val();
			$.ajax({
				async: true,
				type: "post",
				url: "modpwdbyphone",
				data:{password:password,code:code},
				dataType: "json",
				success: function(data){
					alert("修改成功");  //这里做成特效
					//进入第三步
					$(".content .valicode-group span").css("opacity",0);
					$(".content .valicode-group span.glyphicon-ok").animate({
						opacity: 1
					},200);
					$(".content .btn-group").css("visibility","visible").animate({
						opacity: 1
					},500);
				},
				error: function(xhr){	
					alert("服务器环境异常--->"+xhr.stauts);
				}
			});
		},500);
	};
	$(".content-form2 .btn a").on("click",$.fn.modpassfun);
	
	/**
	 * 第一次密码输入框的值改变事件
	 */
	$.fn.passonechange = function(){
		$(".password2-group input").val("");
		$(".password2-group span").css("opacity",0);
	};
	$(".password-group input").on("keyup",$.fn.passonechange);
	
	
	/**
	 * 第二次密码输入框的值改变事件
	 */
	$.fn.passtwoblur = function(){
		var passtwo = $(this).val();
		var password = $(".password-group input").val();
		if($.fn.checknull(passtwo) == 0){
			$(".password2-group span").css("opacity",0);
			$(".password2-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".password2-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写或不规范").animate({
				opacity: 1
			},200);
			return ;
		}
		if(passtwo != password){
			$(".password2-group span").css("opacity",0);
			$(".password2-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".password2-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("两次密码不正确").animate({
				opacity: 1
			},200);
			return ;
		}
		$(".password2-group span.glyphicon-remove").css("opacity",0);
		$(".password2-group span.glyphicon-ok").animate({
			opacity: 1
		},200);
		$(".password2-group .infospan").css("color","#27ff00").text("").animate({
			opacity: 1
		},200);
	};
	$(".password2-group input").on("blur",$.fn.passtwoblur);
	
	/**
	 * 第一次输入密码失去焦点事件
	 */
	$.fn.passoneblur = function(){
		var password = $(this).val();
		//未填写
		if($.fn.checknull(password) == 0){
			$(".password-group span").css("opacity",0);
			$(".password-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".password-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写或不规范").animate({
				opacity: 1
			},200);
			return ;
		}
		var len = password.length;
		//长度小于六位或者大于12位
		if(len < 6){
			$(".password-group span").css("opacity",0);
			$(".password-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".password-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("长度必须至少为六位").animate({
				opacity: 1
			},200);
			return ;
		}
		if(len > 12){
			$(".password-group span").css("opacity",0);
			$(".password-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".password-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("长度不允许超过12位").animate({
				opacity: 1
			},200);
			return ;
		}
		$(".password-group span").css("opacity",0);
		$(".password-group span.glyphicon-ok").animate({
			opacity: 1
		},200);
		$(".password-group .infospan").css("color","#27ff00").text("").animate({
			opacity: 1
		},200);
	};
	$(".password-group input").on("blur",$.fn.passoneblur);
	
	/**
	 * 验证码输入框值改变事件
	 */
	$.fn.valichange = function(){
		var valicode = $(this).val();
		if(valicode.length < 4){
			$(".content .valicode-group span").css("opacity",0);
			$(".content .valicode-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".content .btn-group").css("visibility","hidden").css("opacity",0);
			return ;
		}
		//进行异步校验验证码
		$.ajax({
			async: true,
			type:"post",
			url: "checkphonecode",
			data:{phonecode: valicode},
			dataType: "json",
			success: function(data){
				data = data.toString();
				
				if(data == "codenull"){
					$(".content .btn-group").css("visibility","hidden").css("opacity",0);
					return ;
				}
				if(data == "checkerr"){
					$(".content .valicode-group span").css("opacity",0);
					$(".content .valicode-group span.glyphicon-remove").animate({
						opacity: 1
					},200);
					$(".content .btn-group").css("visibility","hidden").css("opacity",0);
					return ;
				}
				if(data == "checkok"){
					$(".content .valicode-group span").css("opacity",0);
					$(".content .valicode-group span.glyphicon-ok").animate({
						opacity: 1
					},200);
					$(".content .btn-group").css("visibility","visible").animate({
						opacity: 1
					},500);
				}
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$(".valicode-group input").on("keyup",$.fn.valichange);
	
	/**
	 * 发送验证码按钮事件
	 */
	$.fn.sendcode = function(){
		$.fn.getcode();
		var phone = $(".content .phone-group input").val();
		if(cansend == 0){
			return ;
		}
		$(".content .phone-group input").trigger("blur");
		window.setTimeout(function(){
			
			if($(".content .phone-group span.glyphicon-remove").css("opacity") != 0){
				return ;
			}
			cansend = 0;
			var code = $(".code").val();
			$.ajax({
				async: true,
				type: "get",
				url: "sendcode",
				data:{phone: phone,code: code},
				dataType: "json",
				success: function(data){
					$(this).attr("disabled","true");
					$.fn.sendbtnshow();
					sendinterval = window.setInterval($.fn.sendbtnshow,1000);
					alert("发送成功");
				},
				error: function(xhr){
					alert("服务器环境异常--->"+xhr.status);
					$.fn.getcode();
					cansend = 1;
				}
			});
		},500);
	};
	$(".content .content-form1 .valicode-group button").click($.fn.sendcode);
	
	
	/**
	 * 点击发送后的发送按钮显示
	 */
	var remain = 60;
	var sendinterval ;
	var cansend = 1;
	$.fn.sendbtnshow = function(){
		if(remain == 0){
			remain = 60;
			$(".valicode-group button").text("重新发送");
			$(".valicode-group button").attr("disabled",false);
			cansend = 1;
			window.clearInterval(sendinterval);
//			$.ajax({
//				async: true,
//				type: "post",
//				url: "clearphonecode",
//				dataType: "json",
//				success: function(data){
//				},
//				error: function(xhr){
//					alert("服务器环境异常--->"+xhr.status);
//				}
//			})
			return ;
		}
		cansend = 0;
		$(".valicode-group button").text(remain+"(s)");
		remain--;
	};
	
	
	/**
	 * 手机号码失去焦点事件校验
	 */
	$.fn.phoneblur = function(){
		var phone = $(".phoneg input").val();
		//未填写
		if($.fn.checknull(phone) == 0){
			$(".content .phoneg span").css("opacity",0);
			$(".content .phoneg span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".content .phoneg .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写").animate({
				opacity: 1
			},200);
			return ;
		}
		//验证格式
		if($.fn.phonecheck(phone) == -1){
			$(".phoneg span").css("opacity",0);
			$(".phoneg span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".phoneg .infospan").css("color","rgba(169, 37, 37, 0.97)").text("格式不正确").animate({
				opacity: 1
			},200);
			return ;
		}
		 //满足要求时进行异步判断手机号码是否存在
        $.ajax({
        	async: true,
        	type: "post",
        	url: "selectphoneexist",
        	data: {phone: phone},
        	dataType: "json",
        	success: function(data){
        		$.each(data,function(index,item){
        			if(item != "isexist"){
        				$(".phoneg span").css("opacity",0);
        				$(".phoneg span.glyphicon-remove").animate({
        					opacity: 1
        				},200);
        				$(".phoneg .infospan").css("color","rgba(169, 37, 37, 0.97)").text("手机号码未注册").animate({
        					opacity: 1
        				},200);
        				return ;
        			}
        			else{
        				$(".phoneg span").css("opacity",0);
        				$(".phoneg span.glyphicon-ok").animate({
        					opacity: 1
        				},200);
        				return ;
        			}
        		});
        	},
        	error: function(xhr){
        		alert("服务器环境异常--->"+xhr.status);
        	}
        });
	};
	$(".content .phoneg  input").on("blur",$.fn.phoneblur);
	
	/**
	 * 下一步按钮事件
	 */
	var step = 1;
	$.fn.onebtnnext = function(){
		if(step == 1){
			$(".content-form1").animate({
				opacity: 0
			},1000).css("top","-278px");
			$(".content-form2").css("display","block").animate({
				opacity: 1
			},1000).css("top","-525px");
			$(".content .btn-group").animate({
				opacity: 0
			},500);
			
			$(".content .phone-group span").css("opacity",0);
			$(".content .valicode-group span").css("opacity",0);
			
			$(".content .content-cyc div.rec1").css("opacity","1");
			$(".content .content-cyc div.cyc2").css("opacity","1");
			
			step = 2;
			window.setTimeout(function(){
				$(".content .btn-group").css("visibility","hidden");
			},500);
			return ;
		}
		if(step == 2){
			$(".content-form2").animate({
				opacity: 0
			},1000).css("top","-803px");
			$(".content-form3").css("display","block").animate({
				opacity: 1
			},1000).css("top","-976px");
			$(".content .btn-group").animate({
				opacity: 0
			},200);
			
			$(".content .content-cyc div.rec2").css("opacity","1");
			$(".content .content-cyc div.cyc3").css("opacity","1");
			
			step = 3;
			window.setTimeout(function(){
				$(".content .btn-group").css("visibility","hidden");
				gointerval = window.setInterval($.fn.gologinfun,1000);
			},200);
			return ;
		}
	};
	$(".content .btn-group a").click($.fn.onebtnnext);
	
	/**
	 * 密码的明文与密文的转换
	 */
	var pwdtrans = 0;
	$.fn.pwdtrans = function(){
		if(pwdtrans == 1){
			$(".content .content-main2 .main-pwd input").attr("type","password");
			$(".content .content-main2 .main-pwd a span").removeClass("glyphicon-eye-open")
				.addClass("glyphicon-eye-close");
			pwdtrans = 0;
		}
		else{
			$(".content .content-main2 .main-pwd input").attr("type","text");
			$(".content .content-main2 .main-pwd a span").removeClass("glyphicon-eye-close")
			.addClass("glyphicon-eye-open");
			pwdtrans = 1;
		}
	};
	$(".content ").click($.fn.pwdtrans);
});
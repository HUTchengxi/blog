$(function(){
	
	/**
	 * 用户名输入框失去焦点事件
	 */
	$.fn.userblur = function(){
		
		var username = $(this).val();
		//未填写
		if($.fn.checknull(username) == 0){
			$(".main form .user-group span").css("opacity",0);
			$(".main form .user-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .user-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写或不规范").animate({
				opacity: 1
			},200);
			return ;
		}
		var Regx = /^[A-Za-z0-9]*$/;
		//不满足要求： 只包含数字和字母
        if (!Regx.test(username)) {
        	$(".main form .user-group span").css("opacity",0);
        	$(".main form .user-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .user-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("只能包含字母或者数字").animate({
				opacity: 1
			},200);
			return ;
        }
        //满足要求时进行异步判断用户名是否已存在
        $.ajax({
        	async: true,
        	type: "post",
        	url: "selectuserexist",
        	data: {username: username},
        	dataType: "json",
        	success: function(data){
        		$.each(data,function(index,item){
        			if(item == "isexist"){
        				$(".main form .user-group span").css("opacity",0);
        				$(".main form .user-group span.glyphicon-remove").animate({
        					opacity: 1
        				},200);
        				$(".main form .user-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("账号已被注册").animate({
        					opacity: 1
        				},200);
        				return ;
        			}
        			else{
        				$(".main form .user-group span").css("opacity",0);
        				$(".main form .user-group span.glyphicon-ok").animate({
        					opacity: 1
        				},200);
        				$(".main form .user-group .infospan").css("color","#27ff00").text("可以注册").animate({
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
	$(".main form .user-group input").on("blur",$.fn.userblur);
	
	/**
	 * 昵称失去焦点事件
	 */
	$.fn.nickblur = function(){
		var nickname = $(this).val();
		//未填写
		if($.fn.checknull(nickname) == 0){
			$(".main form .nick-group span").css("opacity",0);
			$(".main form .nick-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .nick-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写或不规范").animate({
				opacity: 1
			},200);
			return ;
		}
		$(".main form .nick-group span").css("opacity",0);
		$(".main form .nick-group span.glyphicon-ok").animate({
			opacity: 1
		},200);
		$(".main form .nick-group .infospan").css("color","#27ff00").text("").animate({
			opacity: 1
		},200);
	};
	$(".main form .nick-group input").on("blur",$.fn.nickblur);
	
	/**
	 * 第一次输入密码失去焦点事件
	 */
	$.fn.passoneblur = function(){
		var password = $(this).val();
		//未填写
		if($.fn.checknull(password) == 0){
			$(".main form .pass-group span").css("opacity",0);
			$(".main form .pass-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .pass-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写或不规范").animate({
				opacity: 1
			},200);
			return ;
		}
		var len = password.length;
		//长度小于六位或者大于12位
		if(len < 6){
			$(".main form .pass-group span").css("opacity",0);
			$(".main form .pass-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .pass-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("长度必须至少为六位").animate({
				opacity: 1
			},200);
			return ;
		}
		if(len > 12){
			$(".main form .pass-group span").css("opacity",0);
			$(".main form .pass-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .pass-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("长度不允许超过12位").animate({
				opacity: 1
			},200);
			return ;
		}
		$(".main form .pass-group span").css("opacity",0);
		$(".main form .pass-group span.glyphicon-ok").animate({
			opacity: 1
		},200);
		$(".main form .pass-group .infospan").css("color","#27ff00").text("").animate({
			opacity: 1
		},200);
	};
	$(".main form .pass-group input").on("blur",$.fn.passoneblur);
	
	/**
	 * 第一次密码输入框的值改变事件
	 */
	$.fn.passonechange = function(){
		$(".main form .pass2-group input").val("");
	};
	$(".main form .pass-group input").on("change",$.fn.passonechange);
	
	
	/**
	 * 第二次密码输入框的值改变事件
	 */
	$.fn.passtwoblur = function(){
		var passtwo = $(this).val();
		var password = $(".main form .pass-group input").val();
		if($.fn.checknull(passtwo) == 0){
			$(".main form .pass2-group span").css("opacity",0);
			$(".main form .pass2-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .pass2-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写").animate({
				opacity: 1
			},200);
			return ;
		}
		if(passtwo != password){
			$(".main form .pass2-group span").css("opacity",0);
			$(".main form .pass2-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .pass2-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("两次密码不正确").animate({
				opacity: 1
			},200);
			return ;
		}
		$(".main form .pass2-group span.glyphicon-remove").css("opacity",0);
		$(".main form .pass2-group span.glyphicon-ok").animate({
			opacity: 1
		},200);
		$(".main form .pass2-group .infospan").css("color","#27ff00").text("").animate({
			opacity: 1
		},200);
	};
	$(".main form .pass2-group input").on("blur",$.fn.passtwoblur);
	
	/**
	 * 手机号码输入框失去焦点事件
	 */
	$.fn.phoneblur = function(){
		var phone = $(this).val();
		//未填写
		if($.fn.checknull(phone) == 0){
			$(".main form .phone-group span").css("opacity",0);
			$(".main form .phone-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .phone-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("必须填写").animate({
				opacity: 1
			},200);
			return ;
		}
		//验证格式
		if($.fn.phonecheck(phone) == -1){
			$(".main form .phone-group span").css("opacity",0);
			$(".main form .phone-group span.glyphicon-remove").animate({
				opacity: 1
			},200);
			$(".main form .phone-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("格式不正确").animate({
				opacity: 1
			},200);
			return ;
		}
		 //满足要求时进行异步判断用户名是否已存在
        $.ajax({
        	async: true,
        	type: "post",
        	url: "selectphoneexist",
        	data: {phone: phone},
        	dataType: "json",
        	success: function(data){
        		$.each(data,function(index,item){
        			if(item == "isexist"){
        				$(".main form .phone-group span").css("opacity",0);
        				$(".main form .phone-group span.glyphicon-remove").animate({
        					opacity: 1
        				},200);
        				$(".main form .phone-group .infospan").css("color","rgba(169, 37, 37, 0.97)").text("手机号码已被注册").animate({
        					opacity: 1
        				},200);
        				return ;
        			}
        			else{
        				$(".main form .phone-group span").css("opacity",0);
        				$(".main form .phone-group span.glyphicon-ok").animate({
        					opacity: 1
        				},200);
        				$(".main form .phone-group .infospan").css("color","#27ff00").text("可以注册").animate({
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
	$(".main form .phone-group input").on("blur",$.fn.phoneblur);
	
	/**
	 * 点击注册进行字段判断
	 */
	$.fn.registerbtn = function(){
		
		//点击注册时进行加载动画
		var hei = $(document).height();
		var wid = $(document).width();
		$(".zhezhao").css("display","block").css("height",hei+"px").css("width",wid+"px");
		$(".loader").css("display","block");
		
		var username = $(".user-group input").val();
		var nickname = $(".nick-group input").val();
		var password = $(".pass-group input").val();
		var passwordtwo = $(".pass2-group input").val();
		var phone = $(".phone-group input").val();
		var removelist = $(".glyphicon-remove");
		var valiok = 1;
		
		//在trigger所有字段的blur事件
		$("input").trigger("blur");
		window.setTimeout(function(){
			for(var i=0; i<removelist.length; i++){
				if($(removelist[i]).css("opacity") == 1){
					valiok = -1;
					break;
				}
			}
			if($.fn.checknull(username) == 0 || $.fn.checknull(nickname) == 0 || $.fn.checknull(password) == 0
					|| $.fn.checknull(passwordtwo) == 0 || $.fn.checknull(phone) == 0){
				$(".zhezhao").css("display","none");
				$(".loader").css("display","none");
				alert("请填写完所有字段");
				return ;
			}
			if(valiok == -1){
				$(".zhezhao").css("display","none");
				$(".loader").css("display","none");
				alert("请规范填写");
				return ;
			}
			
			//异步进行注册
			$.ajax({
				async: true,
				type: "post",
				url: "register",
				data: {username: username,nickname: nickname,password:password,phone: phone},
				dataType: "json",
				success: function(data){
					$.each(data,function(index,item){
						if(item == "registerok"){
							$(".zhezhao").css("display","none");
							$(".loader").css("display","none");
							alert("注册成功");
							window.location.href = "gologin";
						}
					});
				},
				error: function(xhr){
					$(".zhezhao").css("display","none");
					$(".loader").css("display","none");
					alert("服务器环境异常--->"+xhr.status);
				}
			});
		},300);
	};
	$(".main form").submit($.fn.registerbtn);
});


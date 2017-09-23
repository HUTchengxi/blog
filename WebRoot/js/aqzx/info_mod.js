$(function(){
	
	/**
	 * 点击修改按钮进行对应的信息修改
	 */
	$.fn.modinfobtn = function(){
		var val = $(this).text();
		var mod = $(this).data("mod");
		if(val == "修改"){
			$(this).text("取消");
			$(this).next().css("visibility","visible");
			$("."+mod).css("display","block").animate({
				height: "28px"
			},300);
			window.setTimeout(function(){
				$("."+mod+" div:nth-child(1) input").trigger("focus");
			},300);
		}
		else{
			$(this).text("修改");
			$(this).next().css("visibility","hidden");
			$("."+mod).animate({
				height: "0"
			},300);
			window.setTimeout(function(){
				if(mod == "pass-mod"){
					$("."+mod+" div:nth-child(3)").html("").css("visibility","hidden");
				}
				else{
					$("."+mod+" div:nth-child(2)").html("").css("visibility","hidden");
				}
				$("."+mod).css("display","none");
				$("."+mod+" input").val("");
				$("."+mod+" span").css("visibility","hidden");
			},300);
		}
	};
	$(".mod a:nth-child(1)").click($.fn.modinfobtn);
	
	/**
	 * 保存修改按钮事件
	 */
	$.fn.savemodbtn = function(){
		var mod = $(this).prev().data("mod");
		//修改密码
		if(mod == "pass-mod"){
			var newpass1 = $("."+mod+" div:nth-child(1) input").val();
			var newpass2 = $("."+mod+" div:nth-child(2) input").val();
			$("."+mod+" span").css("visibility","hidden");
			if(newpass1 == null || $.fn.checknull(newpass1) == 0){
				$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","visible");
				$("."+mod+" div:nth-child(3)").css("visibility","visible").html("密码不能为空");
				return ;
			}
			if(newpass1.length <6){
				$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","visible");
				$("."+mod+" div:nth-child(3)").css("visibility","visible").html("密码长度不能小于六位");
				return ;
			}
			$("."+mod+" div:nth-child(1) span.glyphicon-ok").css("visibility","visible");
			$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","hidden");
			if(newpass1 != newpass2){
				$("."+mod+" div:nth-child(2) span.glyphicon-remove").css("visibility","visible");
				$("."+mod+" div:nth-child(3)").html("两次密码不正确");
				return ;
			}
			$.fn.getcode();
			var code = $(".code").val();
			$(".zhezhao").css("display","block");
			$("#container").css("display","block");
			var $this = $(this);
			//异步修改密码
			$.ajax({
				async: true,
				type: "post",
				url: "modmypass",
				data: {newpass: newpass1, code: code},
				dataType: "json",
				success: function(data){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					alert("修改成功");
					$this.prev().trigger("click");
					$.fn.loadmyinfo();
				},
				error: function(xhr){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					alert("服务器环境异常--->"+xhr.status);
				}
			});
		}
		
		//修改昵称
		if(mod == "nick-mod"){
			var newnick = $("."+mod+" input").val();
			$("."+mod+" span").css("visibility","hidden");
			if(newnick == null || $.fn.checknull(newnick) == 0){
				$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","visible");
				$("."+mod+" div:nth-child(2)").css("visibility","visible").html("昵称不能为空");
				return ;
			}
			$.fn.getcode();
			var code = $(".code").val();
			$(".zhezhao").css("display","block");
			$("#container").css("display","block");
			var $this = $(this);
			//异步修改昵称
			$.ajax({
				async: true,
				type: "post",
				url: "modmynick",
				data: {newnick: newnick, code: code},
				dataType: "json",
				success: function(data){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					alert("修改成功");
					$this.prev().trigger("click");
					$.fn.loadmyinfo();
				},
				error: function(xhr){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					alert("服务器环境异常--->"+xhr.status);
				}
			});
		}
		
		//修改手机号码
		if(mod == "phone-mod"){
			var newphone = $("."+mod+" input").val();
			$("."+mod+" span").css("visibility","hidden");
			if(newphone == null || $.fn.checknull(newphone) == 0){
				$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","visible");
				$("."+mod+" div:nth-child(2)").css("visibility","visible").html("手机号码不能为空");
				return ;
			}
			if($.fn.phonecheck(newphone) == -1){
				$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","visible");
				$("."+mod+" div:nth-child(2)").css("visibility","visible").html("手机号码格式不正确");
				return ;
			}
			$.fn.getcode();
			var code = $(".code").val();
			$(".zhezhao").css("display","block");
			$("#container").css("display","block");
			var $this = $(this);
			//异步修改手机号码
			$.ajax({
				async: true,
				type: "post",
				url: "modmyphone",
				data: {newphone: newphone, code: code},
				dataType: "json",
				success: function(data){
					if(data.status == "phoneexist"){
						$(".zhezhao").css("display","none");
						$("#container").css("display","none");
						$("."+mod+" div:nth-child(1) span.glyphicon-remove").css("visibility","visible");
						$("."+mod+" div:nth-child(2)").css("visibility","visible").html("手机号码已被使用");
						return;
					}
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					alert("修改成功");
					$this.prev().trigger("click");
					$.fn.loadmyinfo();
				},
				error: function(xhr){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					alert("服务器环境异常--->"+xhr.status);
				}
			});
		}
	};
	$(".mod a:nth-child(2)").click($.fn.savemodbtn);
});
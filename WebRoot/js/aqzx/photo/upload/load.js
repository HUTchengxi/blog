$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(5)").addClass("clilink");
	};
	$.fn.blogloadfun();
	
	/**
	 * title与descript不能为空事件
	 */
	$.fn.colnotnullfun = function(){
		var val = $(this).val();
		if(val == null || $.fn.checknull(val) == 0){
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().next().css("visibility","visible");
			$(this).next().next().next().css("visibility","visible").html("不能为空");
			return ;
		}
		$(this).parent().children("span").css("visibility","hidden");
		$(this).next().css("visibility","visible");
		$(this).next().next().next().css("visibility","hidden");
	};
	$(".main-content .group:nth-child(1) input").blur($.fn.colnotnullfun);
	$(".main-content .group:nth-child(2) textarea").blur($.fn.colnotnullfun);
	
	/**
	 * 自定义上传文件框点击事件
	 */
	$.fn.fileclifun = function(){
		$(".group input.img").trigger("click");
	};
	$(".group input.imgtext").click($.fn.fileclifun);

	/**
	 * 文件框改变后获取文件名绑定imgtext事件
	 */
	$.fn.filechangefun = function(){
		var val = $(this).val();
		var filename = val.substring(val.lastIndexOf("\\")+1);
		var filetype = val.substring(val.lastIndexOf(".")+1);
		console.log(filetype);
		//只允许上传图片类型文件
		if(filetype != "jpg" && filetype != "jpeg" && filetype != "png" && filetype != "gif" && filetype != "bmp"){
			$(this).parent().children("span").css("visibility","hidden");
			$(this).next().next().css("visibility","visible");
			$(this).next().next().next().css("visibility","visible").html("文件格式不正确");
			return ;
		}
		$(this).parent().children("span").css("visibility","hidden");
		$(this).next().css("visibility","visible");
		$(this).next().next().next().css("visibility","hidden");
		$(".group input.imgtext").val(val.substring(val.lastIndexOf("\\")+1));
		
		//图片在线预览
		var file = $(this)[0].files[0];
		var reader = new FileReader();
		//监听FileReader的onload事件
		reader.onload = function(){
			$(".main-content .group:nth-child(4)").css("display","block");
			$(".main-content .group:nth-child(4) img").attr("src",reader.result);
		};
		//调用reader的readAsDataURL方法将图片转换成base64
		reader.readAsDataURL(file);
	};
	$(".group input.img").change($.fn.filechangefun);
	
	/**
	 * 重写事件
	 */
	$.fn.rewritefun = function(){
		
		$(".main-content .group:nth-child(1) input").val("");
		$(".main-content .group:nth-child(2) textarea").val("");
		$(".main-content .group:nth-child(3) .img").val("");
		$(".main-content .group:nth-child(3) .imgtext").val("");
		$(".main-content .group:nth-child(4)").css('display',"none");
	};
	$(".main-content .group:nth-child(5) a:nth-child(2)").click($.fn.rewritefun);
	
	/**
	 * 上传事件
	 */
	$.fn.uploadfun = function(){
		$(".main-content .group:nth-child(1) input").trigger("blur");
		$(".main-content .group:nth-child(2) textarea").trigger("blur");
		$(".main-content .group:nth-child(3) .img").trigger("change");
		var title = $(".main-content .group:nth-child(1) input").val();
		var descript = $(".main-content .group:nth-child(2) textarea").val();
		var imgsrc = $(".main-content .group:nth-child(3) .imgtext").val();
		var file = $(".main-content .group:nth-child(3) .img")[0].files[0];
		
		if(title == null || $.fn.checknull(title) == 0){
			return ;
		}
		if(descript == null || $.fn.checknull(descript) == 0){
			return ;
		}
		if(imgsrc == null || $.fn.checknull(imgsrc) == 0){
			return ;
		}
		
		//异步上传
		var data = new FormData();
		data.append("title",title);
		data.append("descript",descript);
		data.append("img",file);
		
		$.ajax({
			async: true,
			type: "post",
			url: 'uploadmyphoto',
			data: data,
			dataType: "json",
			cache: false,  
	        contentType: false,  
	        processData: false,  
	        success: function(data){
	        	if(data.status == "exist"){
	        		alert("图片已经上传过了");
	        	}
	        	else{
	        		alert('上传成功');
	        		window.location = "aqzx_photo_upload";
	        	}
	        },
	        error: function(xhr){
	        	alert("服务器环境异常--->"+xhr.status);
	        }
		});
	};
	$(".main-content .group:nth-child(5) a:nth-child(1)").click($.fn.uploadfun);
	
});
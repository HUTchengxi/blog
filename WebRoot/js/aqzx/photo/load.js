$(function(){
	
	/**
	 * 页面加载时设置相关css样式
	 */
	$.fn.blogloadfun = function(){
		$(".main-bar ul li:nth-child(5)").addClass("clilink");
	};
	$.fn.blogloadfun();
	
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
			data:{id: 5},
			dataType: "json",
			success: function(data){
				var haspass = data.haspass;
				if(haspass == 1){
					$(".blog-main").css("display","none").css("opacity",0);
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
							data:{id: 5,pass: pass,code: code},
							dataType: "json",
							success: function(data){
								var status = data.status;
								if(status == "passerr"){
									$("#lockmodal .modal-body p").html("密码错误").css("visibility","visible");
								}
								else{
									$.fn.loadgetdata();
									$("#lockmodal .modal-body p").html("").css("visibility","hidden");
									$(".blog-main").animate({
										opacity: 1
									},500);
									$(".lock").css("display","none");
									$("#lockmodal").modal("hide");
									window.setTimeout(function(){
										$(".blog-main").css("display","block");
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
					$.fn.loadgetdata();
				}
			},
			error: function(xhr){
				alert("服务器环境异常"+xhr.status);
			}
		});
	};
	$.fn.loadfun();
	
	/**
	 * 页面加载时获取工具数据动态生成表格
	 */
	var startpos = 0;
	$.fn.loadgetdata = function(){
		$(".photo-main .main-content").html("").css("opacity",0);
		$.fn.getcode();
		var code = $(".code").val();	
		//页面加载获取数据之前进行加载动画
		var height = $(".photo-main").height();
		var width = $(".photo-main").width();
		$("body").css("overflow","hidden");
		$(".zhezhao").css("height",height+"px").css("width",width+"px").css("opacity",1).css("display","block");
		$("#container").css("display","block");
		var imgobj = [];
		$.ajax({
			async: false,
			type: "post",
			url: "getmyphotosinfo",
			data:{startpos: startpos, code: code},
			dataType: "json",
			success: function(data){
				$(".zhezhao").css("opacity",1).animate({
					opacity: 0
				},500);
				$("#container").css("opacity",1).animate({
					opacity: 0
				},500);
				if(data.status == "nophoto"){
					$none = $("<div class='none'></div>");
					$p1 = $("<p>还没有上传过照片</p>");
					$p2 = $("<p>点击<a href='aqzx_photo_upload'>添加</a>上传我的照片</p>");
					$(".photo-main").html("");
					$(".photo-main .main-content").append($none.append($p1).append($p2));
					return ;
				}
				
				var len = 0;
				$.each(data,function(index,item){
					var id,title,imgsrc,descript, orsrc;
					imgsrc = "images/myphoto/photos/";
					$.each(item,function(index1,item1){
						if(index1 == "id"){
							id = item1;
						}
						if(index1 == "title"){
							title = item1;
						}
						if(index1 == "imgsrc"){
							imgsrc += item1;
							orsrc = item1;
							imgobj[len] = imgsrc;
						}
						if(index1 == "descript"){
							descript = item1;
						}
					});
					
					$content = $("<div class='content'></div>");
					$img = $("<img src='"+imgsrc+"' data-orsrc="+orsrc+" data-title="+title+" data-descipt="+descript+" data-id="+id+" />");
					$alink = $("<a href='javascript:void(0);'><span class='glyphicon glyphicon-remove'></span></a>");
					$show = $("<div class='show'></div>");
					$show1 = $("<span>点击图片进行编辑</span>");
					$(".main-content").append($content.append($img).append($alink).append($show.append($show1)));
					len++;
					if(len%3 == 0){
						$(".main-content").append($("<div class='clear'></div>"));
					}
				});
				if(len%3 != 0){
					$(".main-content").append($("<div class='clear'></div>"));
				}
				
				
				//加载一次获取所有数据总数
				var maxpage;
				$.fn.getcode();
				var code = $(".code").val();
				$.ajax({
					async: false,
					type: "post",
					url: "getmyphotolen",
					data: {code: code},
					dataType: "json",
					success: function(data){
						maxpage = Math.ceil(data.count/6);
						console.log(maxpage);
					},
					error: function(xhr){
						alert("服务器环境异常--->"+xhr.status);
					}
				});
				
				$(".mod-page a:nth-child(1)").css("visibility","hidden");
				$(".mod-page a:nth-child(1)").attr("data-page",0);
				$(".mod-page a:nth-child(2)").attr("data-page",0);
				$(".mod-page a:nth-child(4)").attr("data-page",0);
				$(".mod-page a:nth-child(5)").attr("data-page",maxpage);
				$(".mod-page a:nth-child(5)").css("visibility","visible");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//图片加载完成后在显示页面数据
		var len = imgobj.length;
		var temp = 0;
		for(var i=0; i<len; i++){
			var img = new Image();
			img.src = imgobj[i];
			img.onload = function(){
				temp++;
				if(temp == len){
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
					$("body").css("overflow","auto");
					$(".main-content").animate({
						opacity: 1
					},500);
				}
			}
		}
	};
	
	
	/**
	 * 首页事件
	 */
	$.fn.firstpagefun = function(){
		var maxpage = $(this).data("page");
		//首页不是尾页
		if(maxpage != 0){
			startpos = 0;
			$.fn.loadgetdata();
		}
		$(".mod-page a:nth-child(1)").css("visibility","hidden");
		$(".mod-page a:nth-child(1)").attr("data-page",0);
		$(".mod-page a:nth-child(2)").attr("data-page",0);
		$(".mod-page a:nth-child(4)").attr("data-page",0);
		$(".mod-page a:nth-child(5)").css("visibility","visible");
		
	};
	$(document).on("click",".mod-page a:nth-child(1)",$.fn.firstpagefun);
	
	/**
	 * 上一页事件
	 */
	$.fn.lastpagefun = function(){
		var curpage = parseInt($(this).attr("data-page"));
		if(curpage == 0){
			return ;
		}
		startpos = (curpage-1)*6;
		$.fn.loadgetdata();
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",curpage-1);
		$(".mod-page a:nth-child(2)").attr("data-page",curpage-1);
		$(".mod-page a:nth-child(4)").attr("data-page",curpage-1);
		$(".mod-page a:nth-child(5)").css("visibility","visible");
		if(curpage == 1){
			$(".mod-page a:nth-child(1)").css("visibility","hidden");
		}
	};
	$(document).on("click",".mod-page a:nth-child(2)",$.fn.lastpagefun);
	
	/**
	 * 下一页事件
	 */
	$.fn.nextpagefun = function(){
		var curpage = parseInt($(this).attr("data-page"));
		var maxpage = $(".mod-page a:nth-child(5)").data("page");
		if(curpage == maxpage-1){
			return ;
		}
		startpos = (curpage+1)*6;
		$.fn.loadgetdata();
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",curpage+1);
		$(".mod-page a:nth-child(2)").attr("data-page",curpage+1);
		$(".mod-page a:nth-child(4)").attr("data-page",curpage+1);
		$(".mod-page a:nth-child(5)").css("visibility","visible");
		if(curpage == maxpage-2){
			$(".mod-page a:nth-child(5)").css("visibility","hidden");
		}
	};
	$(document).on("click",".mod-page a:nth-child(4)",$.fn.nextpagefun);
	
	/**
	 * 尾页事件
	 */
	$.fn.lastpagefun = function(){
		var maxpage = $(this).data("page");
		//首页不是尾页
		if(maxpage != 1){
			startpos = (maxpage-1)*6;
			$.fn.loadgetdata();
		}
		$(".mod-page a:nth-child(1)").css("visibility","visible");
		$(".mod-page a:nth-child(1)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(2)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(4)").attr("data-page",maxpage-1);
		$(".mod-page a:nth-child(5)").css("visibility","hidden");
		
	};
	$(document).on("click",".mod-page a:nth-child(5)",$.fn.lastpagefun);
	
	/**
	 * 图片删除事件
	 */
	var delcli = 0;
	$.fn.delephotofun = function(){
		delcli = 1;
		var imgid = $(this).prev().data("id");
		var orsrc = $(this).prev().data("orsrc");
		console.log(orsrc);
		if(window.confirm("确定要删除这张图片吗?")){
			$(".zhezhao").css("display","block");
			$("#container").css("display","block");
			$.fn.getcode();
			var code = $(".code").val();
			$.ajax({
				async: false,
				type: "post",
				url: "delemyphotobyid",
				data: {imgsrc: orsrc, id: imgid, code: code},
				dataType: "json",
				success: function(data){
					alert("删除成功");
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
				},
				error: function(xhr){
					alert("服务器环境异常");
					$(".zhezhao").css("display","none");
					$("#container").css("display","none");
				}
			});
			var curpage = $(".mod-page a:nth-child(2)").data("page");
			startpos = curpage * 6;
			$.fn.loadgetdata();
		}
	};
	$(document).on("click",".main-content .content a",$.fn.delephotofun);

	/**
	 * 鼠标移动到图片上去时span进行3D转换
	 */
	$.fn.imghoverfun = function(){
		$(this).children("div.show").children().css("transform","scaleX(1) scaleY(1)");
	};
	$(document).on("mouseenter",".content",$.fn.imghoverfun);
	
	/**
	 * 鼠标移开时span进行3D转换
	 */
	$.fn.imgblurfun = function(){
		$(this).children("div.show").children().css("transform","scaleX(2.5) scaleY(0)");
	};
	$(document).on("mouseleave",".content",$.fn.imgblurfun);

	/**
	 * 图片点击编辑事件
	 */
	$.fn.imgeditfun = function(){
		if(delcli == 1){
			delcli = 0;
			return ;
		}
		var title = $(this).children("img").data("title");
		var descript = $(this).children("img").data("descipt");
		var id = $(this).children("img").data("id");
		//注入数据
		$(".edit input").val(title).attr("id",id);
		$(".edit textarea").val(descript);
		$(".editzz").css("display","block");
		$(".edit").css("display","block").css("opacity",1).animate({
			top: "25%",
		},500);
	};
	$(document).on("click",".main-content .content",$.fn.imgeditfun);
});

/**
 * 弹出框的取消/关闭事件
 */
$.fn.closeeditfun = function(){
	$(".edit").animate({
		top: "-67%",
		opacity: 0
	});
	window.setTimeout(function(){
		$(".editzz").css("display","none");
		$(".edit").css("display","none");
	},500);
};
$(document).on("click",".edit a.close", $.fn.closeeditfun);
$(document).on("click",".edit .mod-group a:nth-child(2)",$.fn.closeeditfun);

/**
 * 保存修改事件
 */
$.fn.saveeditfun = function(){
	
	var title = $(".edit input").val();
	var descript = $(".edit textarea").val();
	var id = $(".edit input").attr("id");
	
	if(title == null || $.fn.checknull(title) == 0){
		alert("图片标题不能为空");
		return ;
	}
	
	$.fn.getcode();
	var code = $(".code").val();
	$.ajax({
		async: true,
		type: "post",
		url: "editmyphotoinfo",
		data: {id: id, title: title, descript: descript, code: code},
		dataType: "json",
		success: function(data){
			alert("修改成功");
			$(".edit .mod-group a:nth-child(2)").trigger("click");
			//页面重新获取数据
			$.fn.loadgetdata();
		},
		error: function(xhr){
			alert("服务器环境异常--->"+xhr.status);
		}
	});
};
$(document).on("click",".edit .mod-group a:nth-child(1)",$.fn.saveeditfun);

/**
 * esc键盘事件
 */
$.fn.keyupfun = function(e){
	var code = e.keyCode;
	//esc
	if(code == 27 && $(".edit").css("display") == "block"){
		$(".edit .mod-group a:nth-child(2)").trigger("click");
	}
};
$(document).on("keyup",$.fn.keyupfun);

$(function(){
	/**
	 * 加载博客数据
	 */
	var goodcount = 0;
	var badcount = 0;
	var readcount = 0;
	$.fn.loadgetblog = function(){
		
		//数据加载完成之前进行加载动画
		$("html body").css("overflow","hidden");
		var height = $(document).height();
		var width = $(document).width();
		$(".zhezhao").css("height",height+"px").css("width",width+"px").css("opacity",1).css("display","block");
		$("#container").css("display","block").css("top","70px");
		$.ajax({
			async: true,
			type: "post",
			url: "getblogbyid",
			dataType: "json",
			success: function(data){
				$("html body").css("overflow","scroll");
				$(".zhezhao").animate({
					opacity: 0
				},500);
				$("#container").css("opacity",1).animate({
					opacity: 0
				},500);
				$(".main").animate({
					opacity: 1
				},500);
				$("#homehead").animate({
					opacity: 1
				},500);
				window.setTimeout(function(){
					$("#container").css("display","none");
					$(".zhezhao").css("display","none");
					var content,blogid;
					$.each(data,function(index,item){
						//id
						if(index == "id"){
							blogid = item;
						}
						//标题
						if(index == "title"){
							$("html head title").text(item+"---成兮个人博客");
							$(".main .article").html("<h3>"+item+"</h3>");
						}
						//背景图片
						if(index == "imgsrc"){
							$("html body .main").css("background-image"," url(images/blog/contentbg/"+item+")").css("background-size","cover");
						}
						//阅读量
						if(index == "readcount"){
							readcount = item;
						}
						//点赞数
						if(index == "goodcount"){
							goodcount = item;
						}
						//踩数
						if(index == "badcount"){
							badcount = item;
						}
						//内容
						if(index == "content"){
							content = item;
						}
					});
					$.each(data,function(index,item){
						//作者
						if(index == "author"){
							$(".main .article").append("<h4>作者：<span>"+item+"</span></h4>");
						}
					});
					$(".main .article").append("<h5>阅读："+readcount+"&nbsp;&nbsp;&nbsp;&nbsp;赞："+goodcount+"&nbsp;&nbsp;&nbsp;&nbsp;踩："+badcount+"</h5>");
					$(".main .article").append("<hr style='border: 1px solid rgba(128, 128, 128, 0.57);' />");
					//添加内容
					$article = $("<article>"+content+"</article>");
					$(".main .article").append($article).append("<br />");
					//添加删除修改操作按钮
					$btnsdiv = $("<div class='btns'></div>");
					$modbtn = $("<a href='gomodblog?blogid="+blogid+"' title='点击修改我的博客内容'>修改</a>");
					$delbtn = $("<a href='javascript:void(0);' class='delblog' title='点击删除我的博客内容'>删除</a>");
					$(".main").prepend($btnsdiv.append($modbtn).append($delbtn));
					
					/**
					 * 判断点赞与踩
					 */
					$.ajax({
						async: false,
						type: "post",
						url: "getscore",
						dataType: "json",
						success: function(data){
							$.each(data,function(index,item){
								if(index == "status"){
									//未评分
									if(item == "noscore"){
										//添加点赞和踩按钮
										$scorediv = $("<div class='score'></div>");
										$gooddiv = $("<div class='good'></div>");
										$baddiv = $("<div class='bad'></div>");
										$goodinfo = $("<div class='goodinfo infodiv'><span class='glyphicon glyphicon-thumbs-up'></span>+1</div>");
										$badinfo = $("<div class='badinfo infodiv'><span class='glyphicon glyphicon-thumbs-down'></span>+1</div>");
										$good = $("<a href='javascript:void(0);' title='给博主赞赞'>" +
										"<span class='glyphicon glyphicon-thumbs-up sendgood'></span></a>");
										$bad = $("<a href='javascript:void(0);' title='写的不咋地?'>" +
										"<span class='glyphicon glyphicon-thumbs-down sendbad'></span></a>");
										$(".main .article").append($scorediv.append($gooddiv.append($good)).append($goodinfo).append($baddiv.append($bad)).append($badinfo));
									}
									//已评分
									if(item == "hasscore"){
										$.each(data,function(index1,item1){
											if(index1 == "score"){
												//点赞
												if(item1 == 1){
													//添加点赞和踩按钮
													$scorediv = $("<div class='score'></div>");
													$gooddiv = $("<div class='good' style='background-color: rgba(255, 165, 0, .55);'></div>");
													$baddiv = $("<div class='bad'></div>");
													$goodinfo = $("<div class='goodinfo infodiv'><span class='glyphicon glyphicon-thumbs-up'></span>+1</div>");
													$badinfo = $("<div class='badinfo infodiv'><span class='glyphicon glyphicon-thumbs-down'></span>+1</div>");
													$good = $("<a href='javascript:void(0);' title='给博主赞赞'>" +
													"<span class='glyphicon glyphicon-thumbs-up'></span></a>");
													$bad = $("<a href='javascript:void(0);' title='写的不咋地?'>" +
													"<span class='glyphicon glyphicon-thumbs-down'></span></a>");
													$(".main .article").append($scorediv.append($gooddiv.append($good)).append($goodinfo).append($baddiv.append($bad)).append($badinfo));
												}
												//踩
												else{
													//添加点赞和踩按钮
													$scorediv = $("<div class='score'></div>");
													$gooddiv = $("<div class='good'></div>");
													$baddiv = $("<div class='bad' style='background-color: rgba(0,0,0,.55);'></div>");
													$goodinfo = $("<div class='goodinfo infodiv'><span class='glyphicon glyphicon-thumbs-up'></span>+1</div>");
													$badinfo = $("<div class='badinfo infodiv'><span class='glyphicon glyphicon-thumbs-down'></span>+1</div>");
													$good = $("<a href='javascript:void(0);' title='给博主赞赞'>" +
													"<span class='glyphicon glyphicon-thumbs-up'></span></a>");
													$bad = $("<a href='javascript:void(0);' title='写的不咋地?'>" +
													"<span class='glyphicon glyphicon-thumbs-down'></span></a>");
													$(".main .article").append($scorediv.append($gooddiv.append($good)).append($goodinfo).append($baddiv.append($bad)).append($badinfo));
												}
											}
										});
									}
								}
							});
						},
						error: function(xhr){
							alert("服务器环境异常--->"+xhr.status);
						}
					});
					/**
					 * 获取三条评论信息
					 */
					$.ajax({
						async: true,
						type: "post",
						url: "getcommentbyid",
						data: {startpos: 0},
						dataType: "json",
						success: function(data){
							//计算长度
							var len = 0;
							console.log(data);
							$.each(data,function(index,item){
								len++;
							});
							if(len == 1){
								$nodiv = $("<div class='content-div'></div>");
								$p1 = $("<p></p>");
								$p2 = $("<p style='text-align:center'><label>当前无评论</label></p>");
								$(".comment-content").append($nodiv.append($p1).append($p2));
							}
							else{
								$.each(data,function(index,item){
									if(index != "status"){
										var nickname,content,username,comnick,comuser,date;
										var iscom = 0;
										$.each(item,function(index1,item1){
											if(index1 == "comnick" && $.fn.checknull(item1) == 1){
												iscom = 1;
												comnick = item1;
											}
											if(index1 == "comuser"){
												comuser = item1;
											}
											if(index1 == "nickname"){
												nickname = item1;
											}
											if(index1 == "content"){
												content = item1;
											}
											if(index1 == "username"){
												username = item1;
											}
											if(index1 == "date"){
												date = item1;
											}
										});
										$nodiv = $("<div class='content-div'></div>");
										$p1 = $("<p>"+index+"楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+date+"</p>");
										if(iscom == 0){
											$p2 = $("<p><label>"+nickname+"：</label>"+content+"</p>");
										}
										else{
											$p2 = $("<p><label>"+nickname+"<span style='color:red;'>&nbsp;&nbsp;回复&nbsp;&nbsp;</span>"+
													comnick+"：</label>"+content+"</p>");
										}

										$moddiv = $("<div class='mod-btns'></div>");
										$rebacklink = $("<a href='javascript:void(0);' class='reback' data-id='"+index+"' data-user='"+username+"' " +
												"data-nick='"+nickname+"'>回复</a>");
//										$delelink = $("<a href='javascript:void(0);' class='dele' data-id='"+index+"'>删除</a>");
										
										$(".comment-content").append($nodiv.append($p1).append($p2).
												append($moddiv.append($rebacklink)));
									}
								});
							}
							if(len <= 3 && len != 1){
								$nodiv = $("<div class='content-div'></div>");
								$p1 = $("<p></p>");
								$p2 = $("<p style='text-align:center'><label>加载到底了</label></p>");
								$(".comment-content").append($nodiv.append($p1).append($p2));
								nextok = 0;
							}
						},
						error: function(xhr){
							alert("服务器环境异常--->"+xhr.status);
						}
					});
					/**
					 * 删除按钮添加事件
					 */
					$.fn.delblog = function(){
						if(confirm("确认删除该博客吗?")){
							var code = $(".code").val();
							window.location.href = "delblog?blogid="+blogid+"&code="+code;
							return ;
						}
						$.fn.getcode();
					};
					$(document).on("click",".delblog",$.fn.delblog);
				},500);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$.fn.loadgetblog();
	$.fn.getcode();
	
	/**
	 * 博客阅读量加1
	 */
	$.fn.addreadcount = function(){
		var code = $(".code").val();
		$.ajax({
			async: true,
			type: "post",
			url: "addread",
			data: {code: code},
			dataType: "json",
			success: function(data){
				
			},
			error: function(xhr){
				alert("服务器环境异常-->"+xhr);
			}
		});
	};
	//增加5秒延迟，防止恶意刷分
	window.setTimeout($.fn.addreadcount,5000);
	
	var isclick = 0;
	/**
	 * 点赞按钮事件
	 */
	$.fn.sendgoodcli = function(){
		if(isclick != 0)
			return ;
		isclick = 1;
		var code = $(".code").val();
		$.ajax({
			async:true,
			type: "post",
			url: "sendscore",
			data: {code: code,score: "1"},
			dataType: "json",
			success: function(data){
				console.log(data);
				$(".good").css("background-color","rgba(255, 165, 0, .55)");
				$(".goodinfo").css("visibility","visible").animate({
					marginTop: "-10px",
					opacity: 0
				},800)
				window.setTimeout(function(){$(".goodinfo").css("visibility","hidden");},800);
				//立即进行页面赞数更新
				goodcount++;
				$(".main .article h5").html("");
				$(".main .article h5").html("阅读："+readcount+"&nbsp;&nbsp;&nbsp;&nbsp;赞："+goodcount+"&nbsp;&nbsp;&nbsp;&nbsp;踩："+badcount);
				
				//解除点赞和踩按钮更新
//				$(".sendbad").unbind("click");
//				$(".sendgood").unbind("click");
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$(document).on("click",".sendgood",$.fn.sendgoodcli);
	
	/**
	 * 踩按钮事件
	 */
	$.fn.sendbadcli = function(){
		if(isclick != 0)
			return ;
		isclick = 1;
		var code = $(".code").val();
		$.ajax({
			async:true,
			type: "post",
			url: "sendscore",
			data: {code: code,score: "-1"},
			dataType: "json",
			success: function(data){
				console.log(data);
				$(".bad").css("background-color","rgba(0,0,0,.55)");
				$(".badinfo").css("visibility","visible").animate({
					marginTop: "-10px",
					opacity: 0
				},800)
				window.setTimeout(function(){$(".badinfo").css("visibility","hidden");},800);
				//立即进行页面踩数更新
				badcount++;
				$(".main .article h5").html("");
				$(".main .article h5").html("阅读："+readcount+"&nbsp;&nbsp;&nbsp;&nbsp;赞："+goodcount+"&nbsp;&nbsp;&nbsp;&nbsp;踩："+badcount);
				
				//解除点赞和踩按钮更新
				//原生使用:sendbaddom.removeEventListener("click",fun,false);
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	}
	$(document).on("click",".sendbad",$.fn.sendbadcli);
});


/*
  bug：当进行点赞操作时，因为使用的是异步刷新，所以如果这时候进行点赞后再次进行点赞就会进行多次点赞与踩
  
  deal1：可以让每次都是进行数据更新为1而不是加1，这样就算点击多次结果也只是1  
  （效率不高，因为这时候还要对blog_info进行修改，本来是进行自增的，每次点击都会自增）
  
  deal2：点击之后解除按钮的事件绑定  
  	（jQuery：unbind()/   js：removeEventListener()）
  	（不能这样解决，因为使用的是document进行的动态事件绑定，貌似无法进行解绑）
  	
  deal3：定义一个变量，进行判断
  	（OK）
  
  Q：每次进行点击后立刻进行页面的点赞数和踩数的更新
  
  bug：session问题，如果点击了一个博客A然后不关闭并打开另一个博客B，此时对博客A进行点赞，会发现点赞的是B
*/
$(function(){
	/**
	 * 页面加载完成时body透明度设置为1并且生成code标识码并判断是否是修改页面
	 */
	$.fn.loadopacity = function(){
		$("body").css("opacity","1");
		$.fn.getcode();
		$.ajax({
			async: true,
			type: "post",
			url: "modorcreate",
			dataType: "json",
			success: function(data){
				var blogid;
				$.each(data,function(index,item){
					if(index == "blogid"){
						blogid = item;
					}
					if(index == "status"){
						if(item == "create"){
							/**
							 * 发布按钮事件
							 */
							$.fn.realpublish = function(){
								var title = $(".main .main-title .title").val();
								var ue = UE.getEditor('myEditor');
								var content ;
								ue.ready(function(){
									content = ue.getContent();
								});
								var pubtype = $(".main-choose .choose-type .pubtype").val();
								var isfirst = $(".main-choose .choose-pubtype .isfirst").val();
								var imgsrc = $(".main-choose .choose-imgsrc .imgsrc").val();
								var descript = $(".main-choose .choose-descript .descript").val()+"...";
								var keywords ="";
								var alltags = $($(".main-choose .choose-keywords ul li input.keywords"));
								var j=0;
								for(var i=0; i<alltags.length; i++){
									if(alltags[i].checked){
										if(j == 0){
											keywords += alltags[i].value;
										}
										else{
											keywords += ","+alltags[i].value;
										}
										j++;
									}
								}
								var code = $(".code").val();
								$.ajax({
									async: true,
									type: "post",
									url: "pubblogmain",
									data: {title:title,content:content,isfirst: isfirst,pubtype:pubtype,imgsrc:imgsrc,code:code,descript: descript, keywords: keywords},
									dataType: "json",
									success: function(data){
										if(data.status == "ok"){
											alert("发表成功");
											window.location.href = "welcome";
										}
									},
									error: function(xhr){
										alert("服务器环境异常-->"+xhr.stauts);
									}
								});
							};
							$(".main-choose .pub-btn .publish").on("click",$.fn.realpublish);
						}
						else{
							//修改博客
							$.fn.realmod = function(){
								var title = $(".main .main-title .title").val();
								var ue = UE.getEditor('myEditor');
								var content ;
								ue.ready(function(){
									content = ue.getContent();
								});
								var type = $(".main-choose .choose-type .type").val();
								var pubtype = $(".main-choose .choose-pubtype .pubtype").val();
								var imgsrc = $(".main-choose .choose-imgsrc .imgsrc").val();
								var code = $(".code").val();
								var descript = $(".main-choose .choose-descript .descript").val()+"...";
								$.ajax({
									async: true,
									type: "post",
									url: "modblog",
									data: {blogid:blogid,title:title,content:content,type:type,pubtype:pubtype,imgsrc:imgsrc,code:code,descript: descript},
									dataType: "json",
									success: function(data){
										alert("修改成功");
										window.location.href = "welcome";
									},
									error: function(xhr){
										alert("服务器环境异常-->"+xhr.stauts);
									}
								});
							};
							$(".main .pub-btn .publish").on("click",$.fn.realmod);
						}
						return ;
					}
				});
				$.each(data,function(index,item){
					if(index == "status" && item == "create"){
						return ;
					}
					if(index == "title"){
						$(".title").val(item);
					}
					if(index == "content"){
						var ue = UE.getEditor('myEditor');
						ue.ready(function() { 
							ue.setContent(item); 
						});
					}
					if(index == "descript"){
						$(".choose-descript textarea").val(item)
					}
				});
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
		
		//获取所有tags关键字
		$.ajax({
			async: true,
			type: "post",
			url: "gettags",
			dataType: "json",
			success: function(data){
				$.each(data, function(index, item){
					var tag = item.tag;
					var id = item.id;
					var $li = $("<li><input type='checkbox' name='keywords' class='keywords' value="+id+" />"+tag+"</li>");
					$(".main .main-choose .choose-keywords ul").append($li);
				});
			},
			error: function(xhr){
				alert("服务器环境异常--->"+xhr.status);
			}
		});
	};
	$.fn.loadopacity();
});
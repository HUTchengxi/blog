$(function(){
	
	/**
	 * 获取当前页面的网址并自动生成qrcode二维码
	 */
	$.fn.getqrcodefun = function(){
	
		var str = window.location + "";
		$('#code').qrcode(str);
		
		$("#sub_btn").click(function(){
			$("#code").empty();
			var str = toUtf8($("#mytxt").val());
			
			$("#code").qrcode({
				render: "table",
				width: 200,
				height:200,
				text: str
			});
		});
		function toUtf8(str) {   
			var out, i, len, c;   
			out = "";   
			len = str.length;   
			for(i = 0; i < len; i++) {   
				c = str.charCodeAt(i);   
				if ((c >= 0x0001) && (c <= 0x007F)) {   
					out += str.charAt(i);   
				} else if (c > 0x07FF) {   
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
					out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
					out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
				} else {   
					out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
					out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
				}   
			};
			return out;   
		};
	};
	$.fn.getqrcodefun();
	
	/**
	 * 点击手机按钮打开二维码页面
	 */
	$.fn.opencode = function(){
		var height = $("html body").height();
		var width = $("html body").width();
		$(".zhezhao").css("width",width+"px").css("height",height+"px").css("display","block").css("opacity","1");
		$(".qrcode").css("visibility","visible").animate({
			opacity: 1
		},300);
	};
	$(".sidebarbox ul li:nth-child(2) a").click($.fn.opencode);
	
	/**
	 * 点击关闭二维码页面
	 */
	$.fn.closecode = function(){
		$(".qrcode").animate({
			opacity: 0
		},300);
		window.setTimeout(function(){
			$(".qrcode").css("visibility","hidden");
			$(".zhezhao").css("display","none").css("opacity",0);
		},300);
	};
	$(".qrcode a").click($.fn.closecode);
});
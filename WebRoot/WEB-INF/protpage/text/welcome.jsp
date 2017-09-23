<%@ page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html>
	<head>
		<title>首页--成兮个人博客</title>
		
		<!-- all head link -->
		<jsp:include page="../all_header.html" />
	
		<!-- css link -->
		<link rel="stylesheet" href="css/admin/blog.css" />
		<link rel="stylesheet" href="css/admin/head.css" />
		<link rel="stylesheet" href="css/admin/sidebar.css" />
		<link rel="stylesheet" href="css/admin/qrcode.css" />
		<link rel="stylesheet" href="css/login/loading.css" />
		
		<!-- js link -->
		<script src="js/admin/exit.js"></script>
		<script src="js/admin/load.js"></script>
		<script src="js/admin/gobtn.js"></script>
		<script src="js/admin/getqrcode.js"></script>
		<script src="js/admin/showhide.js"></script>
	</head>
	<body>
	
		<!-- 页面加载动画 -->
		<div class="zhezhao" style="position: absolute;top: 0;left: 0;z-index: 99;background-color: rgba(158, 158, 158, 0.35);"></div>
		
		<!-- load content link -->
		<jsp:include page="../login/loading.html" />
	
		<!--  head content link -->
		<jsp:include page="head.html" />
		
		<!-- main content link -->
		<jsp:include page="main_head.html" />
        <jsp:include page="main_proshow.html" />
        <hr />
        <jsp:include page="main_jrbk.html" />
        <hr />
		<jsp:include page="main_hot.html" />		
        <hr />
        
        <!-- foot content link -->
       <div class="content" style="color: gray;text-align: center;">
       		<jsp:include page="foot.html" />
       </div>
       
       <!-- 侧边栏：日后加上分享功能，因此包含在一个div中 -->
       <jsp:include page="sidebar.html" />
       
       <!-- 扫码登录 -->
       <jsp:include page="qrcode.html" />
	</body>
</html>

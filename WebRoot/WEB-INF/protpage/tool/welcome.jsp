<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>实用工具--第三方---成兮个人博客网站</title>
	
	<!-- all head link -->
	<jsp:include page="../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/admin/head.css" />
	<link rel="stylesheet" href="css/tool/main.css" /><!-- 
	<link rel="stylesheet" href="css/login/loader.css" />-->
	<link rel="stylesheet" href="css/login/loading.css" />
	
	<!-- js link -->
	<script src="js/admin/exit.js"></script>
	<script src="js/tool/load.js"></script>
	<script src="js/tool/modal.js"></script>
	
</head>
<body>

	<!-- 页面加载遮罩 -->
	<div class="zhezhao" style="position: absolute;top: 0;left: 0;z-index: 99;background-color: rgba(158, 158, 158, 0.35);"></div>
	
	<!-- 加载动画 --><!-- 
	<jsp:include page="../login/login_loader.html" />-->
	<jsp:include page="../login/loading.html" />
	
	 <script src="js/pageshow/canvas-nest.js" count="200" zindex="-2" opacity=".5" color="47,135,193"></script>
	
	<!-- head content link -->
	<jsp:include page="../admin/head.html" />
	
	<!-- main content link -->
	<jsp:include page="main.html" />
	
	<input type="text" name="code" class="code" readOnly style="visibility: hidden;position: absolute;" />
	
</body>
</html>
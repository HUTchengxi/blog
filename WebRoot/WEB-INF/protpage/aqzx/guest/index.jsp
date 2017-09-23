<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>我的留言管理---成兮个人博客网站后台</title>
	
	<!-- all head link -->
	<jsp:include page="../../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/aqzx/head.css" />
	<link rel="stylesheet" href="css/aqzx/main-bar.css" />
	<link rel="stylesheet" href="css/aqzx/guest/main_content.css" />
	<link rel="stylesheet" href="css/login/loading.css" />
	<link rel="stylesheet" href="css/blog/front/learn/cloader.css" />
	<link rel="stylesheet" href="css/aqzx/lock.css" />
	
	<!-- js link -->
	<script src="js/aqzx/guest/load.js"></script>
	<script src="js/aqzx/liclick.js"></script>
	
</head>
<body>
	
	<div class="head">在这里，管理一切你的信息</div>
	
	<jsp:include page="../lock.html" />
	
	<!-- 页面加载动画 -->
	<div class="zhezhao" style="position: absolute;top: 50px;left: 180px;z-index: 99;background-color: rgba(158, 158, 158, 0.35);"></div>
		
	<!-- load content link -->
	<jsp:include page="../../login/loading.html" />
	
	<!-- main content link -->
	<jsp:include page="main.html" />
	
	<input type="text" name="code" class="code" readOnly style="visibility: hidden; position: absolute;" />
	
</body>
</html>
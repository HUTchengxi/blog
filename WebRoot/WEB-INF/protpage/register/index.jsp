<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>注册界面---成兮个人博客网</title>
	
	<!-- all head link -->
	<jsp:include page="../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/register/index.css" />
	<link rel="stylesheet" href="css/register/main.css" />
	<link rel="stylesheet" href="css/login/loader.css" />
	
	<!-- js link -->
	<script src="js/register/load.js"></script>
	<script src="js/register/inputevent.js"></script>
	
</head>
<body>

	<div class="bg"></div>
	
	<!-- 注册加载动画遮罩 -->
	<div class="zhezhao" style="position: absolute;z-index: 99;background-color: rgba(241, 236, 236, 0.49);display: none;"></div>
  
  	<!-- loader content link -->
  	<jsp:include page="../login/login_loader.html" />
	
	<!-- main content link -->
	<jsp:include page="main.html" />
	
</body>
</html>
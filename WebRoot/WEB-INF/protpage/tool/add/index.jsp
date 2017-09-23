<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>添加实用工具---成兮个人博客网站</title>
	
	<!-- all header link -->
	<jsp:include page="../../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/admin/head.css" />
	<link rel="stylesheet" href="css/tool/add/main.css" />
	
	<!-- js link -->
	<script src="js/admin/exit.js"></script>
	<script src="js/tool/add/input.js"></script>
	<script src="js/tool/add/load.js"></script>
	
</head>
<body>
	
	<script src="js/pageshow/canvas-nest.js" count="200" zindex="-2" opacity=".5" color="47,135,193"></script>
	
	<!-- head content link -->
	<jsp:include page="../../admin/head.html" />
	
	<!-- main content link -->
	<jsp:include page="main.html" />
	
	<input type="text" name="code" class="code" readOnly style="position: absolute;visibility: hidden;" />
	
</body>
</html>
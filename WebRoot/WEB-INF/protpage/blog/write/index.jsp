<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>编写博客--成兮个人博客网</title>
	
	<!-- all head link -->
	<jsp:include page="../../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/admin/head.css" />
	<link rel="stylesheet" href="css/blog/write/main.css" />
	<link rel="stylesheet" href="css/blog/write/shadow.css" />
	<link rel="stylesheet" href="css/blog/write/cloader.css" />
	<link rel="stylesheet" href="UE/themes/default/css/ueditor.css"/>
	
	<!-- ueditor link -->
	<script type="text/javascript" src="UE/ueditor.config.js"></script>
	<script type="text/javascript" src="UE/ueditor.all.js"></script>
	
	<!-- js link -->
	<script src="js/admin/exit.js"></script>
	<script src="js/blog/write/load.js"></script>
	<script src="js/blog/write/edit.js"></script>
	<script src="js/blog/write/title.js"></script>
	
</head>
<body>

	<script src="js/pageshow/canvas-nest.js" count="200" zindex="-2" opacity=".5" color="47,135,193"></script>

	<div class="shadow"></div>
	
	<!-- main content link -->
	<jsp:include page="main.html" />
	
	<input type="text" name="code" class="code" readOnly style="position: absolute;visibility: hidden;" />
	
</body>
</html>
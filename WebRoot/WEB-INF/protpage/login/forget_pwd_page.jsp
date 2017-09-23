<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!Doctype html>
<html>
<head>
	<title>找回密码---个人博客异常处理页面</title>
	
	<!-- header content link -->
	<jsp:include page="../all_header.html" />
	
	<!-- js link -->
	<script src="js/login/forget.js"></script>
	
	<!-- css link -->
	<link rel="stylesheet" href="css/login/forget_head.css" />
	<link rel="stylesheet" href="css/login/forget_content_cyc.css" />
	<link rel="stylesheet" href="css/login/forget_content_form.css" />
	
</head>
<body>
	
	<!-- head content link -->
	<jsp:include page="forget_pwd_head.html" />
	
	<!-- main content link -->
	<jsp:include page="forget_pwd_content.html" />
	
	<input type="text"  name="code" class="code" readOnly style="position: absolute;visibility: hidden;" />
	
</body>
</html>
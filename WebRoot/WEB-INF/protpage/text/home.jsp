<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>留言板--成兮个人博客网站</title>
	
	<!-- all header link -->
	<jsp:include page="../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/admin/head.css" />
	<link rel="stylesheet" href="css/guest/main-left.css" />
	<link rel="stylesheet" href="css/guest/main-hr.css" />
	<link rel="stylesheet" href="css/guest/main_right.css" />
	<link rel="stylesheet" href="css/guest/guest_head.css" />
	<link rel="stylesheet" href="css/guest/guest_load.css" />
	
	<!-- js link -->
	<script src="js/admin/exit.js"></script>
	<script src="js/guest/scroll.js"></script>
	<script src="js/guest/comlist_load.js"></script>
	<script src="js/guest/myguest_load.js"></script>
	<script src="js/guest/hotguest_load.js"></script>
	<script src="js/guest/guest_commit.js"></script>
</head>
<body>
	<!-- head content link -->
	<jsp:include page="../admin/head.html" />
	
	<!-- main content link -->
	<jsp:include page="main.html" />
	
	<input type="text" name="code" class="code" style="visibility: hidden; position: absolute;" />
</body>
</html>
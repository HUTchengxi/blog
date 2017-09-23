<%@ page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>我的相册---成兮个人博客</title>
	
	<!-- all head content -->
	<jsp:include page="../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/myphoto/head.css" />
	<link rel="stylesheet" href="css/login/loading.css" />
	<link rel="stylesheet" href="css/myphoto/photo_page.css" />
	
	<!-- animate.css -->
	<link rel="stylesheet" href="assets/animate/animate.css" />
	<link rel="stylesheet" href="assets/animate/set.css" />
	
	<!-- gallery -->
	<link rel="stylesheet" href="assets/gallery/blueimp-gallery.min.css">
	
	<link rel="stylesheet" href="assets/style.css">

</head>

<body>

	<div class="headshow">
		每一张照片，都有一个故事 ----<span style="color: red">${sessionScope.nickname }</span>
	 </div>
	 
	<!-- my js link  -->
	<script src="js/myphoto/load.js"></script>
	
	 <!-- 页面加载动画 -->
	<div class="zhezhao" style="position: absolute;top: 0;left: 0;z-index: 99;background-color: rgba(158, 158, 158, 0.35);"></div>
		
	<!-- load content link -->
	<jsp:include page="../login/loading.html" />

	<!-- works -->
	<jsp:include page="work.html" />
	<!-- works -->
	
	
	<!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->
	<jsp:include page="show.html" />
	
	<!-- 加载更多div -->
	<div class="photo-page"></div>
	
	<!-- boostrap -->
	<script src="assets/bootstrap/js/bootstrap.js" type="text/javascript" ></script>
	
	<!-- jquery mobile -->
	<script src="assets/mobile/touchSwipe.min.js"></script>
	<script src="assets/respond/respond.js"></script>
	
	<!-- gallery -->
	<script src="assets/gallery/jquery.blueimp-gallery.min.js"></script>
	
	<!-- custom script -->
	<script src="assets/script.js"></script>
	
</body>
</html>
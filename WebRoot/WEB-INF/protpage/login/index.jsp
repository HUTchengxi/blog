<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML>
<html>
  <head>    
    <title>个人博客</title>
    
    <!-- header content link -->
	<jsp:include page="../all_header.html" />
	
	<!-- css link -->
	<link rel="stylesheet" href="css/login/boot.css" />
	<link rel="stylesheet" href="css/login/main.css" />
	<link rel="stylesheet" href="css/login/loader.css" />
	<link rel="stylesheet" href="css/login/loading.css" />
	
	<!-- js link -->
	<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>  
	<script src="js/login/home_login.js"></script>
  </head>
  <body>
  
  	<div class="zhezhao" style="position: absolute;z-index: 99;background-color: rgba(241, 236, 236, 0.49);display: none;"></div>
  
  	<!-- loader content link --><!--  
  	<jsp:include page="login_loader.html" />-->
  	<jsp:include page="loading.html" />
  
    <script src="js/pageshow/canvas-nest.js" count="200" zindex="-2" opacity=".5" color="47,135,193"></script>
    	
	<!-- login wrap content link -->
	<jsp:include page="login_wrap.html" />
	
	<!-- prot input -->
	<input type="text" name="code" class="code" readOnly value="<%=session.getAttribute("code")%>" style="position: absolute;visibility: hidden;"/>
    	
    
  </body>
</html>

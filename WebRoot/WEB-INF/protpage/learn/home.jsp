<%@ page language="java" pageEncoding="utf-8"
	contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>--成兮个人博客</title>

<!-- all head link -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

<!-- css link -->
<!-- ICONS -->
<link rel="icon" type="image/x-icon" href="images/logo/logo.ico" />
<link rel="shorticon" type="image/x-icon" href='images/logo/logo.ico' />
<!-- BOOTSTRAP -->
<link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css" />
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="css/admin/sidebar.css" />
<link rel="stylesheet" href="css/admin/qrcode.css" />
<link rel="stylesheet" href="css/learn/home.css" />
</head>
<body>

	<header>
		<div class="myinfo">
			<p>生活若无光，花开向何方?</p>
		</div>
		<div class="logo"></div>
		<nav>
			<ul class="clearfix">
				<li><a href="welcome" title="成兮个人博客首页">首页</a>
				</li>
				<li class="licli"><a href="allblog" title="个人博客大杂烩">博客汇总</a>
				</li>
				<li><a href="welcome" title="成兮个人博客首页">视频教程</a>
				</li>
				<li><a href="welcome" title="成兮个人博客首页">资源下载</a>
				</li>
				<li><a href="welcome" title="成兮个人博客首页">社区论坛</a>
				</li>
				<li><a href="welcome" title="成兮个人博客首页">投稿中心</a>
				</li>
				<li><a href="welcome" title="成兮个人博客首页">留言板</a>
				</li>
				<li><a href="welcome" title="成兮个人博客首页">相关介绍</a>
				</li>
			</ul>
		</nav>
	</header>

	<div class="main-content clearfix">
		<div class="left-content">
			<header>
				<h2></h2>
				<div class='blog-info'>
					<ul class='clearfix'>
						<li class='pubtime'></li>
						<li>浏览量：<span class='inf'></span></li>
						<li>作者：<span class='inf'></span></li>
					</ul>
				</div>
			</header>
			<div class="blog-main">
			</div>
			<div class="blog-pager">
				<ul>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div class="blog-tags">
				<h4>tag关键字</h4>
				<ul class="clearfix">
				</ul>
			</div>
			<div class="blog-call">
				<h4>欢迎各位有兴趣的程序猿添加本人微信</h4>
				<h4>本二维码为本人微信，不含任何商业活动，单纯想一起学习交流，非诚勿扰，谢谢</h4>
				<div class="call-bg">
					<img src="images/blog/learn/weixin.jpg" />
				</div>
			</div>
		</div>
		<div class="right-content">
			<div class="searchbox">
				<h4 class="divh">站内搜索</h4>
				<div class="search-wrap">
					<form action="keysearch">
						<div class="input-group">
							<input type="text" class="form-control" name="keyword"
								placeholder="输入关键字查找" />
							<input type="number" name="pagetype" value="2" style="position: absolute;visibility: hidden" readOnly />
							<button class="input-group-addon" type="submit">
								<span class="glyphicon glyphicon-search"></span>
							</button>
						</div>
					</form>
				</div>
			</div>
			<div class="navbox">
				<h4 class="divh">交流版块</h4>
				<div class="side-nav">
					<ul class="clearfix">
						<li><a href="">社区论坛</a>
						</li>
						<li><a href="">留言板</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="hotbox">
				<h4 class="divh">热门文章</h4>
				<div class="hot">
					<ul>
					</ul>
				</div>
			</div>
			<div class="longwaybox">
				<h4 class="divh">
					相关推荐 <a href="longwaymore"> <span class="morelink">更多 <span
							class="glyphicon glyphicon-chevron-right"></span> <span
							class="glyphicon glyphicon-chevron-right"></span> </span> </a>
				</h4>
				<div class="longway-main-content">
				</div>
			</div>
		</div>
	</div>

	<div class="sidebarbox">
		<ul>
			<li class="borderb"><a href="javascriipt:void(0);"
				title="点击返回顶部"> <span
					class="glyphicon glyphicon-chevron-left trans"></span> </a>
			</li>
			<li class="borderb"><a href="javascriipt:void(0);"
				title="点击扫码登录"> <span class="glyphicon glyphicon-phone"></span>
			</a>
			</li>
			<li><a href="javascript:void(0);" title="点击返回底部"> <span
					class="glyphicon glyphicon-chevron-right trans"></span> </a>
			</li>
		</ul>
	</div>
	<div class="qrcode">
		<div id="code"></div>
		<a href="javascript:void(0);" title="点击关闭"> <span
			class="glyphicon glyphicon-remove"></span> </a>
		<p>手机扫码访问网站</p>
	</div>

	<div class="zhezhao"></div>
	<input type="text" name="code" class="code"
		style="visibility: hidden;position: absolute;" readOnly />
	<link rel="stylesheet" href="css/admin/qrcode.css" />

	<!-- js link -->
	<!-- JS -->
	<script src="js/jquery.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script src="js/jquery.qrcode.min.js"></script>
	<script src="js/admin/getqrcode.js"></script>
	<script src="js/admin/gobtn.js"></script>
	<script src="js/all_isnull.js"></script>
	<script src="js/learn/load.js"></script>

	<footer>
		<p>
			<span>开发者：成兮</span> <span>备案号：未备案</span>
		</p>
	</footer>
</body>
</html>
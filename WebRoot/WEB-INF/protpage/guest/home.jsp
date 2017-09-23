<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>留言板--成兮个人博客网站</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- ICONS -->
	<link rel="icon" type="image/x-icon" href="images/logo/logo.ico" />
	<link rel="shorticon" type="image/x-icon" href='images/logo/logo.ico' />
	<!-- BOOTSTRAP -->
	<link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css" />
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/guest/home.css" />
	
</head>
<body>
	
	<header>
		<div class="myinfo">
			<p>生活若无光，花开向何方?</p>
		</div>
		<div class="logo"></div>
		<nav>
			<ul class="clearfix">
				<li><a href="welcome" title="成兮个人博客首页">首页</a></li>
				<li><a href="allblog" title="成兮个人博客首页">博客汇总</a></li>
				<li><a href="welcome" title="成兮个人博客首页">视频教程</a></li>
				<li><a href="welcome" title="成兮个人博客首页">资源下载</a></li>
				<li><a href="welcome" title="成兮个人博客首页">社区论坛</a></li>
				<li><a href="welcome" title="成兮个人博客首页">投稿中心</a></li>
				<li class="licli"><a href="goguest" title="成兮个人博客首页">留言板</a></li>
				<li><a href="welcome" title="成兮个人博客首页">相关介绍</a></li>
			</ul>
		</nav>
	</header>
	
	<!-- main content link -->
	<div class="main clearfix">
		<div class="main-left">
			<div class="left-hr">
				<p>IF NO NOW,WHEN?</p>
			</div>
			<div class="guest">
				<span>留言板</span>
				<textarea rows="6" cols="70">说点什么....</textarea>
				<a href="javascript:void(0);">
					<button type="button"></button>
				</a>
				<p>评论内容为空</p>
				<div class="czhezhao"></div>
				<div class="cloader">
					<div class="cloading">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div class="cok">
				<span class="glyphicon glyphicon-ok"></span>
				</div>
			</div>
			<div class="center-hr">
				<P>IF NOT ME,WHO?</P>
			</div>
			<div class="guestlist">
				<div class="listtop">
					<span class="pl">留言</span>
					<span class="tj">人参与，条留言</span>
					<p class="hr"></p>
					<p>所有留言</p>
				</div>
				<div class="listcontent">
					<ol>
					</ol>
					<!-- <a href="javascript:void(0);" class="getmore">
						<span>加载更多<span class="glyphicon glyphicon-chevron-down"></span></span>
					</a> -->
				</div>
			</div>
		</div>
		
		<div class="main-hr"></div>

		<div class="main-right">
			<div class="myguest">
				<div class="myguesttop">
						<span class="pj">我的留言</span>
						<span class="tj">none条留言</span>
						<p class="hr"></p>
						<p>所有留言</p>
				</div>
				<div class="myguestcontent">
					<ol></ol>
				</div>
				<div class="modpage">
					<a href="javascript:void(0);" class="firstpage">首条</a>
					<a href="javascript:void(0);" class="prevpage" data-index="1">上一条</a>
					<span>...</span>
					<a href="javascript:void(0);" class="nextpage" data-index="1">下一条</a>
					<a href="javascript:void(0);" class="lastpage">尾条</a>
				</div>
			</div>
			<div class="righthr">青春丿终散场丶</div>
			<div class="hotguest">
				<div class="myguesttop">
						<span class="pj">热门留言</span>
						<span class="tj">前三条热门</span>
						<p class="hr"></p>
						<p>所有热门</p>
				</div>
				<div class="myguestcontent">
					<div class="contentcontainer">
						<ol></ol>
					</div>
				</div>
				<div class="modpage">
					<a href="javascript:void(0);" data-index="0" class="alinkhover">1</a>
					<a href="javascript:void(0);" data-index="1">2</a>
					<a href="javascript:void(0);" data-index="2">3</a>
				</div>
			</div>
		</div>
	</div>
	
	<footer>
		<p>
			<span>开发者：成兮</span> <span>备案号：未备案</span>
		</p>
	</footer>
	
	<input type="text" name="code" class="code" style="visibility: hidden; position: absolute;" />
	
	<!-- JS -->
	<script src="js/jquery.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script src="js/all_isnull.js"></script>
	<script src="js/jquery.qrcode.min.js"></script>
	<!-- js link -->
	<script src="js/guest/scroll.js"></script>
	<script src="js/guest/comlist_load.js"></script>
	<script src="js/guest/myguest_load.js"></script>
	<script src="js/guest/hotguest_load.js"></script>
	<script src="js/guest/guest_commit.js"></script>
</body>
</html>
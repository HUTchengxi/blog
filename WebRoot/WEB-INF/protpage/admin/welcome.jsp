<%@ page language="java" pageEncoding="utf-8"
	contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>首页--成兮个人博客</title>

	<!-- all head link -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

	<!-- css link -->
	<!-- ICONS -->
	<link rel="icon" type="image/x-icon" href="images/logo/logo.ico" />
	<link rel="shorticon" type="image/x-icon" href='images/logo/logo.ico' />
	<!-- BOOTSTRAP -->
	<link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css" />
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/admin/sidebar.css" />
	<link rel="stylesheet" href="css/admin/qrcode.css" />
	<link rel="stylesheet" href="css/admin/welcome.css" />
</head>
<body>

	<header>
		<div class="myinfo">
			<p>生活若无光，花开向何方?</p>
		</div>
		<div class="logo"></div>
		<nav>
			<ul class="clearfix">
				<li class="licli"><a href="welcome" title="成兮个人博客首页">首页</a></li>
				<li><a href="allblog" title="成兮个人博客首页">博客汇总</a></li>
				<li><a href="welcome" title="成兮个人博客首页">视频教程</a></li>
				<li><a href="welcome" title="成兮个人博客首页">资源下载</a></li>
				<li><a href="welcome" title="成兮个人博客首页">社区论坛</a></li>
				<li><a href="welcome" title="成兮个人博客首页">投稿中心</a></li>
				<li><a href="goguest" title="成兮个人博客首页">留言板</a></li>
				<li><a href="aboutme" title="成兮个人博客首页">相关介绍</a></li>
			</ul>
		</nav>
	</header>

	<div class="banner">
		<div class="banner-left">
			<div class="content">
				<ul class="clearfix">
					<li class="bgshow"><a href="javascript:void(0);"> <img
							src="images/test/bannerL1.jpg" /> </a>
					</li>
					<li><a href="javascript:void(0);"> <img
							src="images/test/bannerL2.jpg" /> </a>
					</li>
					<li><a href="javascript:void(0);"> <img
							src="images/test/bannerL3.jpg" /> </a>
					</li>
					<li><a href="javascript:void(0);"> <img
							src="images/test/bannerL4.jpg" /> </a>
					</li>
				</ul>
				<div class="smallbg">
					<div class="smaborder"></div>
					<ul>
						<li data-index="1"><a href="javascript:void(0);"> <img
								src="images/test/bannerS1.jpg" /> </a>
						</li>
						<li data-index="2"><a href="javascript:void(0);"> <img
								src="images/test/bannerS2.jpg" /> </a>
						</li>
						<li data-index="3"><a href="javascript:void(0);"> <img
								src="images/test/bannerS3.jpg" /> </a>
						</li>
						<li data-index="4"><a href="javascript:void(0);"> <img
								src="images/test/bannerS4.jpg" /> </a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="banner-right">
			<p>每日一句</p>
			<p class="sentence">你若安好，便是晴天</p>
			<p class="author">----成兮</p>
			<p class="pubdate">2017-08-15</p>
		</div>
	</div>

	<div class="main-content clearfix">
		<div class="left-content">
			<h4>文章推荐</h4>
			<div class="articletj">
				<ul>
				</ul>
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
							<input type="number" name="pagetype" value="1" style="position: absolute;visibility: hidden" readOnly />
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
						<li><a href="">社区论坛</a></li>
						<li><a href="">留言板</a></li>
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
			<div class="news-guest">
				<h4 class="divh">热门留言
					<a href="goguest"> <span class="morelink">更多
							<span class="glyphicon glyphicon-chevron-right"></span> <span
							class="glyphicon glyphicon-chevron-right"></span> </span>	
					</a>
				</h4>
				<div class="main-content">
					<ul>
						<!-- 
						<li class="clearfix">
							<div class='guest-img'>
								<img src='images/test/bannerS2.jpg' />
							</div>
							<div class="guest-main">
								<p class="clearfix">
									<span class="guest-author">成兮</span>留言: <span class="time">2017-08-10
										10:00:00</span>
								</p>
								<p class="guest-content">
									<a href=""> 这是怎样的石澳，大多数的hi睡得很死 </a>
								</p>
							</div></li>
						 -->
					</ul>
				</div>
			</div>
			<div class="longwaybox">
				<h4 class="divh">
					一路走来 <a href="longwaymore"> <span class="morelink">更多
							<span class="glyphicon glyphicon-chevron-right"></span> <span
							class="glyphicon glyphicon-chevron-right"></span> </span> </a>
				</h4>
				<div class="longway-main-content">
					<!-- 
					<div class="longway-content">
						<p class="time">what time</p>
						<p class="content">dosomething</p>
					</div>
					-->
				</div>
			</div>
		</div>
	</div>

	<div class="fd-link">
		<h4 class="divh">友情链接</h4>
		<div class="fd-content">
			<div class="fd-blog fd-main-content">
				<h4>博客</h4>
				<ul class="clearfix">
					<li><a href="http://www.csdn.net/" target="_blank">CSDN</a></li>
					<li><a href="https://www.cnblogs.com/" target="_blank">博客园</a>
					</li>
					<li><a href="http://www.broadview.com.cn/" target="_blank">博文视点</a>
					</li>
					<li><a
						href="http://www.toutiao.com/search/?keyword=%E6%8A%80%E6%9C%AF"
						target="_blank">今日头条</a></li>
					<li><a href="http://www.jb51.net/" target="_blank">脚本之家</a></li>
				</ul>
			</div>
			<div class="fd-blog fd-main-content">
				<h4>素材</h4>
				<ul class="clearfix">
					<li><a href="http://www.quanjing.com/" target="blank">全景高清网</a>
					</li>
					<li><a href="https://ccavbox.tumblr.com/" target="_blank">百年珍藏</a>
					</li>
					<li><a href="http://www.cssmoban.com/" target="_blank">模板之家</a>
					</li>
					<li><a href="http://sc.chinaz.com/" target="_blank">站长素材</a></li>
					<li><a href="http://www.shejidaren.com/" target="_blank">设计达人</a>
					</li>
				</ul>
			</div>
			<div class="fd-blog fd-main-content">
				<h4>求职</h4>
				<ul class="clearfix">
					<li><a href="http://my.51job.com/" target="_blank">51job</a></li>
					<li><a href="http://www.zhaopin.com/" target="_blank">智联招聘</a>
					</li>
					<li><a href="https://www.liepin.com/" target="_blank">猎聘网</a>
					</li>
					<li><a href="http://www.yingjiesheng.com/" target="_blank">应届生网</a>
					</li>
					<li><a href="http://www.chinahr.com/" target="_blank">中华英才网</a>
					</li>
				</ul>
			</div>
			<div class="fd-blog fd-main-content">
				<h4>开发</h4>
				<ul class="clearfix">
					<li><a href="http://id.amap.com/" target="_blank">高德地图</a></li>
					<li><a href="http://apistore.baidu.com/" target="_blank">百度开发者</a>
					</li>
					<li><a href="https://www.mysubmail.com/" target="_blank">塞邮云通信</a>
					</li>
					<li><a href="http://dev.netease.im/" target="_blank">网易IM</a>
					</li>
					<li><a href="http://www.liantu.com/" target="_blank">联图网</a></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="sidebarbox">
		<ul>
			<li class="borderb"><a href="javascriipt:void(0);"
				title="点击返回顶部"> <span
					class="glyphicon glyphicon-chevron-left trans"></span> </a></li>
			<li class="borderb"><a href="javascriipt:void(0);"
				title="点击扫码登录"> <span class="glyphicon glyphicon-phone"></span>
			</a></li>
			<li><a href="javascript:void(0);" title="点击返回底部"> <span
					class="glyphicon glyphicon-chevron-right trans"></span> </a></li>
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
	<script src="js/admin/load.js"></script>

	<footer>
		<p>
			<span>开发者：成兮</span> <span>备案号：未备案</span>
		</p>
	</footer>
</body>
</html>
功能模块：
	1.普通管理登录注册功能   				黄/徐
	2.手机验证找回密码功能					猪/冯
	3.个人博客编写功能							猪/冯
	4.个人博客查询功能							猪/冯
	5.个人博客修改功能：访问自己的博客可以进行修改，访问别人的博客修改按钮无效，	黄/徐
	6.个人博客删除功能：目前删除功能只对超级管理员开放			猪/冯
	7.实用工具展示并使用功能				猪/冯
	8.使用工具添加功能							黄/徐
	9.实用工具删除功能：目前只对超级管理员开放		猪/冯
	10.页面加载动画								冯/黄/徐
	11.个人博客评论回复功能				黄/徐
	12.个 人博客点赞踩功能					黄/徐
	13.背景特效（第三方开源框架)    冯/猪
	14.新增返回顶部返回底部功能
	15.新增二维码扫码手机登录功能

mysql数据
项目测试
	




1.将comment评论框absolute改成了fixed


1.touch 1-1.c创建一个文件
2.gedit 1-1.c进入该文件的编辑状态
3.gcc -o 1-1 1-1.c生成可执行文件
4../1-1执行可执行文件1-1

1.pwd：查看当前目录
2.cd：进入某个目录
3.touch：创建一个文件

1.使用tab键进行命令补全
2.ctrl+c：强制终止当前程序并恢复到可以控制的状态（可以通过tail命令进行测试)
3.ctrl+d：退出编辑状态或退出中断
4.Ctrl+d	键盘输入结束或退出终端
5.Ctrl+s	暂停当前程序，暂停后按下任意键恢复运行
	Ctrl+z	将当前程序放到后台运行，恢复到前台为命令fg
	Ctrl+a	将光标移至输入行头，相当于Home键
	Ctrl+e	将光标移至输入行末，相当于End键
	Ctrl+k	删除从光标所在位置到行末
	Alt+Backspace	向前删除一个单词
	Shift+PgUp	将终端显示向上滚动
	Shift+PgDn	将终端显示向下滚动
	
	通配符的使用:
		touch a.c b.c
		ls *.c	匹配一个或多个字符的通配符
		ls a.?	匹配一个字符的通配符
		
		*	匹配 0 或多个字符
		?	匹配任意一个字符
		[list]	匹配 list 中的任意单一字符
		[!list]	匹配 除list 中的任意单一字符以外的字符
		[c1-c2]	匹配 c1-c2 中的任意单一字符 如：[0-9] [a-z]
		{string1,string2,...}	匹配 string1 或 string2 (或更多)其一字符串
		{c1..c2}	匹配 c1-c2 中全部字符 如{1..10}
		
	who命令常用参数:
		-a	打印能打印的全部
		-d	打印死掉的进程
		-m	同am i,mom likes
		-q	打印当前登录用户数及用户名
		-u	打印当前登录用户登录信息
		-r	打印运行等级
			
	创建一个新的用户：sudo adduser chengxi
	创建成功后会在当前desktop同目录下创建一个名为home的文件夹，查看 ls home
	登录指定用户: su -l chengxi
	
	查看当前用户所属用户组:  groups shiyanlou 查看shiyanlou用户所属的用户组
	
	查看文件：sudo cat /etc/sudoers.d/shiyanlou
	排序查看文件：cat /etc/group | sort
	过滤：模糊查询: car etc/group
	
	
	
	

	
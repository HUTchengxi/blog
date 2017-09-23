package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: PageForwardController
 * @Description: 页面跳转控制类
 * @author Chengxi
 * @Date: 2017-6-16下午10:49:05
 */
@Controller
public class PageForwardController {
	
	
	/**
	 * 进入关键字查找界面
	 * @return
	 */
	@RequestMapping("keysearch")
	public String gosearch(){
		return "keysearch/index";
	}
	
	/**
	 * 进入博客内容展示界面
	 * @return
	 */
	@RequestMapping("golearn")
	public String golearn(){
		return "learn/home";
	}
	
	/**
	 * 进入博客汇总对应的更多页面
	 * @param type
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getblogmore")
	public String getBlogMore(String type, String code) throws IOException{
		
		return "blog/more/home";
	}
	
	@RequestMapping("aboutme")
	public String goAboutMePage(){
		
		return "admin/aboutme";
	}
	
	
	
	
	
	
	//测试主页界面
	@RequestMapping("gotest")
	public String test(){
		
		return "text/blog";
	}
	
	/**
	 * 博客汇总主页
	 * @return
	 */
	@RequestMapping("allblog")
	public String goAllBlog(){
		
		return "blog/home";
	}
	
	/**
	 * 加载权限
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("loadident")
	public void loadIdent(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) 
			throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		String username = (String) session.getAttribute("username");
		PrintWriter writer = response.getWriter();
		
		if(username.equals("chengxi")){
			jsonobj.put("status", 1);
		}
		else
			jsonobj.put("status", -1);
		writer.print(jsonobj);
	}
	
	/**
	 * 进入我的相册
	 * @param code
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("gomyphoto")
	public String goMyPhoto(HttpServletRequest request, HttpServletResponse response){
		
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			return "login/index";
		}
		
		return "myphoto/welcome";
	}
	
	/**
	 * 进入留言板
	 * @param request
	 * @return
	 */
	@RequestMapping("goguest")
	public String goGuest(){

		return "guest/home";
	}

	/**
	 * 进入注册界面
	 * @return
	 */
	@RequestMapping("goregister")
	public String goRegister(){
		
		return "register/index";
	}
	
	/**
	 * 进入安全中心/保护设置
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_privset")
	public String goAQPrivset(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/privset/index";
	}
	
	/**
	 * 进入安全中心/我的最近登录
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_logstat")
	public String goAQLogstat(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/logstat/index";
	}
	
	/**
	 * 进入安全中心/我的相册上传界面
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_photo_upload")
	public String goAQPhotoUpload(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/photo/upload/index";
	}
	
	/**
	 * 进入安全中心/我的相册
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_photo")
	public String goAQPhoto(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/photo/index";
	}
	
	/**
	 * 进入安全中心/我的留言
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_guest")
	public String goAQGuest(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/guest/index";
	}
	
	/**
	 * 进入安全中心/我的工具
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_tool")
	public String goAQTool(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/tool/index";
	}
	
	/**
	 * 进入安全中心/我的博客
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx_blog")
	public String goAQBlog(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/blog/index";
	}
	
	/**
	 * 进入安全中心
	 * @param request
	 * @return
	 */
	@RequestMapping("aqzx")
	public String goAQZX(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			
			return "login/index";
		}
		
		return "aqzx/index";
	}
	
	/**
	 * 进入关键字查找博客页面
	 * @param keyword
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("someblogspage")
	public String goSomeBlogsPage(@RequestParam("keyword") String keyword,HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException{
		
		request.setCharacterEncoding("utf-8");
		if(request.getSession().getAttribute("username") == null){
			return "login/index";
		}
		
		keyword = new String(keyword.getBytes("ISO-8859-1"),"utf-8");
		System.out.println("keyword->"+keyword);
		//给一个标识标志当前查看的关键字查找的博客
		request.getSession().setAttribute("mark", "some");
		request.getSession().setAttribute("keyword",keyword);
		return "blog/all/welcome";
	}
	
	/**
	 * 进入所有博客页面
	 * @return
	 */
	@RequestMapping("allblogspage")
	public String goAllBlogsPage(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null){
			return "login/index";
		}
		
		//给一个标识标志当前查看的所有博客
		request.getSession().setAttribute("mark", "all");
		return "blog/all/welcome";
	}
	
	/**
	 * 进入前端特效展示页面
	 * @param request
	 * @return
	 */
	@RequestMapping("frontshow")
	public String goShowPage(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		if(session.getAttribute("username") == null)
			return "login/index";
		return "frontshow/welcome";
	}
	
	
	/**
	 * 进入到实用工具页面
	 * @param request
	 * @return
	 */
	@RequestMapping("welltools")
	public String goToolPage(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") == null)
			return "login/index";
		return "tool/welcome";
	}
	
	
	/**
	 * 修改指定id的博客
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("gomodblog")
	public String mogBlog(@RequestParam("blogid") String id,HttpServletRequest request){
		
		request.getSession().setAttribute("blogid",id);
		request.getSession().setAttribute("ismod","1");
		return "blog/write/index";
	}
	
	/**
	 * 进入ui博客网页
	 * @param type
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value="ui",method=RequestMethod.GET)
	public String ui(@RequestParam("type") String type,HttpServletRequest request) throws UnsupportedEncodingException{
		
		HttpSession session = request.getSession();
		if(session.getAttribute("username") != null){
			session.setAttribute("type",type);
			return "blog/ui/welcome";
		}
		return "login/index";
	}
	
	
	/**
	 * 进入指定后端框架博客网页
	 * @param type
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value="behind",method=RequestMethod.GET)
	public String behind(@RequestParam("type") String type,HttpServletRequest request) throws UnsupportedEncodingException{
		
		HttpSession session = request.getSession();
		if(session.getAttribute("username") != null){
			session.setAttribute("type",type);
			return "blog/behind/welcome";
		}
		return "login/index";
	}
	
	/**
	 * 进入指定编程语言博客网页
	 * @param type
	 * @param request
	 * @param response
	 * @throws UnsupportedEncodingException 
	 * @return 
	 */
	@RequestMapping(value="program",method=RequestMethod.GET)
	public String program(@RequestParam("type") String type,HttpServletRequest request) throws UnsupportedEncodingException{
		
		HttpSession session = request.getSession();
		if(session.getAttribute("username") != null){
			session.setAttribute("type",type);
			return "blog/program/welcome";
		}
		return "login/index";
	}
	
	/**
	 * 进入指定前端网页
	 * @param type
	 * @param request
	 * @param response
	 * @throws UnsupportedEncodingException 
	 * @return 
	 */
	@RequestMapping(value="front",method=RequestMethod.GET)
	public String front(@RequestParam("type") String type,HttpServletRequest request) throws UnsupportedEncodingException{
		
		HttpSession session = request.getSession();
		if(session.getAttribute("username") != null){
			session.setAttribute("type",type);
			return "blog/front/welcome";
		}
		return "login/index";
	}
	
	
	/**
	 * 编写博客页面
	 * @param request
	 * @return
	 */
	@RequestMapping("gowrite")
	public String goWritePage(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") != null){
			request.getSession().removeAttribute("ismod");
			return "blog/write/index";
		}
		return "login/index";
	}
	
	/**
	 * 查看指定博客
	 * @param id
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value="learnblog",method=RequestMethod.GET)
	public String goLearn(@RequestParam("id") String id, HttpServletRequest request) throws UnsupportedEncodingException{
		
		HttpSession session  = request.getSession();
		if(session.getAttribute("username") == null){
			return "login/index";
		}
		session.setAttribute("blogid",id);
		return "blog/front/learn/learn";
	}
	
	/**
	 * 进入个人博客页面
	 * @return
	 */
	@RequestMapping("personalblog")
	public String goPersonalBlog(HttpServletRequest request){
		if(request.getSession().getAttribute("username") != null)
			return "blog/blog";
		return "login/index";
	}

	/**
	 * 进入忘记密码页面
	 * @return
	 */
	@RequestMapping("forgetpwd")
	public String getForgetPwdPage(){
		return "login/forget_pwd_page";
	}
	
	/**
	 * 进入登录页面
	 * @param request
	 * @return
	 */
	@RequestMapping("gologin")
	public String gologin(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		if(session.getAttribute("username") != null)
			return "admin/welcome";
		return "login/index";
	}

	/**
	 * 登录成功进入首页
	 * @return
	 */
	@RequestMapping("welcome")
	public String welcome(HttpServletRequest request){
		
		return "admin/welcome";
	}
}

package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Domain.Admin;
import org.blog.Domain.Blog;
import org.blog.Domain.BlogInfo;
import org.blog.Service.AdminService;
import org.blog.Service.BlogInfoService;
import org.blog.Service.BlogService;
import org.blog.Service.CommentService;
import org.blog.Service.ScoreInfoService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: BlogController
 * @Description: 博客控制器
 * @author Chengxi
 * @Date: 2017-6-22上午11:40:58
 */
@Controller
public class BlogController {
	
	/**
	 * 自动注入blogService
	 */
	@Autowired
	@Qualifier("blogService")
	private BlogService blogService;
	
	/**
	 * 自动注入bloginfoService  
	 */
	@Autowired
	@Qualifier("bloginfoService")
	private BlogInfoService bloginfoService;
	
	/**
	 * 自动注入scoreInfoService
	 */
	@Autowired
	@Qualifier("scoreInfoService")
	private ScoreInfoService scoreInfoService;
	
	/**
	 * 自动注入commentService
	 */
	@Autowired
	@Qualifier("commentService")
	private CommentService commentService;
	
	/**
	 * 自动注入adminService
	 */
	@Autowired
	@Qualifier("adminService")
	private AdminService adminService;
	
	
	
	
	
	/**
	 * 获取指定类型的博客数量
	 * @param type
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getmybloglen")
	public void getMyBlogLen(@RequestParam("type") String type, @RequestParam("code") String code, HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		
		Integer len = blogService.getMyBlogLenByType(type, username);
		jsonobj.put("count",len);
		writer.print(jsonobj);
	}
	
	/**
	 * 获取当前登录用户的对应的类型的所有博客
	 * @param startpos
	 * @param type
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getmyblogbytype")
	public void getMyBlogByType(@RequestParam("startpos") Integer startpos, @RequestParam("type") String type, @RequestParam("code") String code, 
			HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String username = (String) session.getAttribute("username");
		String realcode = (String) session.getAttribute("code");
		
		if(username == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		
		else{
			Blog[] blogs = blogService.getMyBlogByType(type,username,startpos);
			if(blogs.length == 0){
				jsonobj.put("status","noblog");
			}
			else{
				int i = 1;
				for(Blog blog: blogs){
					JSONObject jsonobj1 = new JSONObject();
					jsonobj1.put("id", blog.getId());
					jsonobj1.put("type",blog.getType());
					Admin admin = adminService.getAdminByUsername(blog.getUsername());
					jsonobj1.put("author", admin.getNickname());
					jsonobj1.put("pubdate", blog.getPubdate());
					jsonobj1.put("title",blog.getTitle());
					jsonobj1.put("pubtype",blog.getPubtype());
					BlogInfo bloginfo = bloginfoService.getBlogInfoById(blog.getId());
					jsonobj1.put("readcount",bloginfo.getReadcount());
					jsonobj1.put("goodcount",bloginfo.getGoodcount());
					jsonobj1.put("badcount",bloginfo.getBadcount());
					jsonobj.put((i++)+"", jsonobj1);
				}
			}
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 获取博主推荐文章：博主推荐表四篇或阅读前四或赞前四
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("gettjblog")
	public void getTJBlog(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		if(session.getAttribute("username") == null){
			jsonobj.put("status","invalid");
			jsonobj.put("code","tj404");
			writer.print(jsonobj);
			return ;
		}
		
		BlogInfo[] bloginfos = bloginfoService.getTJBlogs();
		
		int infolen = bloginfos.length;
		if(infolen > 4){
			infolen = 4;
		}
		
		for(BlogInfo bloginfo: bloginfos){
			Integer blogid = bloginfo.getId();
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("readcount", bloginfo.getReadcount());
			jsonobj1.put("goodcount",bloginfo.getGoodcount());
			jsonobj1.put("badcount",bloginfo.getBadcount());
			Blog blog = blogService.getBlogById(blogid);
			jsonobj1.put("title",blog.getTitle());
			Admin admin = adminService.getAdminByUsername(blog.getUsername());
			jsonobj1.put("author",admin.getNickname());
			String descript = blog.getDescript();
			jsonobj1.put("descript",descript);
			jsonobj.put(blogid+"", jsonobj1);
		}
		
		writer.print(jsonobj);
	}
	
	
	/**
	 * 获取所有博客或者关键字博客 mark  all/some
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getblogs")
	public void getBlogs(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		
		String mark = (String) session.getAttribute("mark");
		
		if(mark==null){
			jsonobj.put("status", "error url way");
			writer.print(jsonobj.toString());
			return ;
		}
		
		//查找所有的博客
		if(mark.equals("all")){
			
			Blog[] blogs = blogService.getAllBlogs();
			int i = 1;
			for(Blog blog: blogs){
				JSONObject jsonobj1 = new JSONObject();
				jsonobj1.put("id", blog.getId());
				jsonobj1.put("type",blog.getType());
				Admin admin = adminService.getAdminByUsername(blog.getUsername());
				jsonobj1.put("author", admin.getNickname());
				jsonobj1.put("pubdate", blog.getPubdate());
				jsonobj1.put("title",blog.getTitle());
				jsonobj1.put("pubtype",blog.getPubtype());
				jsonobj1.put("content",blog.getContent());
				
				jsonobj.put((i++)+"", jsonobj1);
			}
			writer.print(jsonobj.toString());
			return ;
		}
		
		//查找关键字博客
		if(mark.equals("some")){
			
			String keyword = (String) session.getAttribute("keyword");
			
			System.out.println("cckeyword->"+keyword);
			
			//模糊查询
			Blog[] blogs = blogService.getSomeBlogsByKeyword(keyword);
			int i = 1;
			for(Blog blog: blogs){
				JSONObject jsonobj1 = new JSONObject();
				jsonobj1.put("id", blog.getId());
				jsonobj1.put("type",blog.getType());
				Admin admin = adminService.getAdminByUsername(blog.getUsername());
				jsonobj1.put("author", admin.getNickname());
				jsonobj1.put("pubdate", blog.getPubdate());
				jsonobj1.put("title",blog.getTitle());
				jsonobj1.put("pubtype",blog.getPubtype());
				jsonobj1.put("content",blog.getContent());
				
				jsonobj.put((i++)+"", jsonobj1);
			}
			writer.print(jsonobj.toString());
			return ;
		}
	}
	
	
	/**
	 * 判断是编写博客还是修改博客
	 * @description status->create编写博客   status->mod修改博客
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("modorcreate")
	public void isMod(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		if(session.getAttribute("ismod") == null){
			jsonobj.put("status","create");
			writer.print(jsonobj.toString());
			return ;
		}
		Integer ismod = Integer.parseInt((String) session.getAttribute("ismod"));
		
		//修改页面
		if(ismod == 1){
			
			Integer blogid = Integer.parseInt((String) session.getAttribute("blogid"));
			Blog blog = blogService.getBlogById(blogid);
			
			//判断是否是当前用户的博客
			String realuser = blog.getUsername();
			String curuser = (String) session.getAttribute("username");
			if(!realuser.equals(curuser)){
				jsonobj.put("status","create");
				writer.print(jsonobj.toString());
				return ;
			}
			
			jsonobj.put("blogid", blogid);
			jsonobj.put("status","mod");
			jsonobj.put("title",blog.getTitle());
			jsonobj.put("content",blog.getContent());
			jsonobj.put("descript",blog.getDescript());
			writer.print(jsonobj.toString());
		}
		//编写博客
		else{
			jsonobj.put("status","create");
			writer.print(jsonobj.toString());
		}
	}
	
	/**
	 * 删除id对应的博客
	 * @param blogid
	 * @param code
	 * @param request
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("delblog")
	public String deleteBlog(@RequestParam("blogid") String blogid,@RequestParam("code") String code,
			HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		Integer id = Integer.parseInt(blogid);
		HttpSession session = request.getSession();
		String realcode = (String) session.getAttribute("code");
		
		if(realcode.equals(code)){
			//删除博客对应的阅读数据
			bloginfoService.deleteById(id);
			//删除博客对应的点赞数据
			scoreInfoService.deleteById(id);
			//删除博客对应的评论数据
			commentService.delteById(id);
			blogService.deleteById(id);
			return "blog/repage/delok";
		}
		return "login/index";
	}
	
	
	/**
	 * 查看博客内容byid
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getblogbyid")
	public void getBlogById(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		Integer blogid = Integer.parseInt((String) session.getAttribute("blogid"));
		
		Blog blog = blogService.getBlogById(blogid);
		BlogInfo bloginfo = bloginfoService.getBlogInfoById(blogid);
		
		 // title author readcount goodcount badcount content imgsrc id
		jsonobj.put("id",blog.getId());
		jsonobj.put("title", blog.getTitle());
		Admin admin = adminService.getAdminByUsername(blog.getUsername());
		jsonobj.put("author", admin.getNickname());
		jsonobj.put("readcount",bloginfo.getReadcount());
		jsonobj.put("goodcount",bloginfo.getGoodcount());
		jsonobj.put("badcount",bloginfo.getBadcount());
		jsonobj.put("content",blog.getContent());
		jsonobj.put("imgsrc",blog.getImgsrc());
		
		writer.print(jsonobj.toString());
	}
	
	/**
	 * 修改博客
	 * @param blogid
	 * @param title
	 * @param content
	 * @param type
	 * @param pubtype
	 * @param imgsrc
	 * @param code
	 * @param descript
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("modblog")
	public void modBlog(@RequestParam("blogid") String blogid,@RequestParam("title") String title,
			@RequestParam("content") String content,@RequestParam("type") String type,
			@RequestParam("pubtype") String pubtype,@RequestParam("imgsrc") String imgsrc,@RequestParam("code") String code,
			@RequestParam("descript") String descript,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session =request.getSession();
		String realcode  = (String) session.getAttribute("code");
		JSONObject jsonobj = new JSONObject();
		
		if(!(realcode.equals(code))){
			jsonobj.put("error", "some pig go into private blog invalid");
			writer.print(jsonobj);
			return ;
		}
		
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String pubdate = sdf.format(now);
		
		String author = (String) session.getAttribute("nickname");
		imgsrc = imgsrc + ".jpg";
		
		blogService.modBlogById(blogid,type, pubtype, pubdate, title, content, author, imgsrc,descript);
		
		jsonobj.put("status", "ok");
		writer.print(jsonobj.toString());
	}
	
	
	/**
	 * 发表博客
	 * @param title
	 * @param content
	 * @param type
	 * @param pubtype
	 * @param imgsrc
	 * @param code
	 * @param descript
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("pubblog")
	public void publish(@RequestParam("title") String title,@RequestParam("content") String content,
			@RequestParam("type") String type,@RequestParam("pubtype") String pubtype,@RequestParam("imgsrc") String imgsrc,
			@RequestParam("code") String code,HttpServletRequest request,HttpServletResponse response,
			@RequestParam("descript") String descript) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session =request.getSession();
		String realcode  = (String) session.getAttribute("code");
		JSONObject jsonobj = new JSONObject();
		
		if(!(realcode.equals(code))){
			jsonobj.put("error", "some pig go into private blog invalid");
			writer.print(jsonobj);
			return ;
		}
		
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String pubdate = sdf.format(now);
		
		String author = (String) session.getAttribute("nickname");
		imgsrc = imgsrc + ".jpg";
		String username = (String) session.getAttribute("username");
		
		blogService.publish(username, type, pubtype, pubdate, title, content, author, imgsrc,descript);
		
		Blog lastblog = blogService.getLastBlog();
		Integer id = lastblog.getId();
		bloginfoService.setDefault(id);
		
		jsonobj.put("status", "ok");
		writer.print(jsonobj.toString());
	}
	

	/**
	 * 获取相关数据
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getbloginfo")
	public void getBlogInfo(@RequestParam("code") String code,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		String type = (String) session.getAttribute("type");
		String realcode = (String) session.getAttribute("code");
		
		if(!(realcode.equals(code))){
			jsonobj.put("error", "a pig go  into personalblog that invalid haha !");
			writer.print(jsonobj.toString());
			return ;
		}
		
		Blog[] blogs = blogService.getBlogByType(type);
		int i = 1;
		for(Blog blog: blogs){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", blog.getId());
			jsonobj1.put("type",blog.getType());
			Admin admin = adminService.getAdminByUsername(blog.getUsername());
			jsonobj1.put("author", admin.getNickname());
			jsonobj1.put("pubdate", blog.getPubdate());
			jsonobj1.put("title",blog.getTitle());
			jsonobj1.put("pubtype",blog.getPubtype());
			jsonobj1.put("content",blog.getContent());
			
			jsonobj.put((i++)+"", jsonobj1);
		}
		writer.print(jsonobj.toString());
	}

}

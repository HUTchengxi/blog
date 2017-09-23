package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Domain.Blogmain;
import org.blog.Service.BlogmainService;
import org.blog.Service.BlogtagsService;
import org.blog.Service.TagsService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: BlogMainController
 * @Description: 二代blog更新控制器
 * @author Chengxi
 * @Date: 2017-8-21下午11:38:08
 */
@Controller
public class BlogMainController {

	/**
	 * 自动注入blogmainService
	 */
	@Autowired
	@Qualifier("blogmainService")
	private BlogmainService blogmainService;
	
	/**
	 * 自动注入tagsService
	 */
	@Autowired
	@Qualifier("blogtagsService")
	private BlogtagsService blogtagsService;
	
	/**
	 * 自动注入tagsService
	 */
	@Autowired
	@Qualifier("tagsService")
	private TagsService tagsService;
	
	//获取指定博客类型的博客数量
	@RequestMapping("getblogmaincountbytype")
	public void getCountByType(String code, String type,HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		String realcode = (String) session.getAttribute("code");
		
		if(realcode == null || !(realcode.equals(code))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		Integer count = blogmainService.getCountByType(type);
		jsonobj.put("count",count);
		writer.print(jsonobj);
	}
	
	/**
	 * 猜你喜欢博客内容数据传送
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("loadrblog")
	public void loadRBlog(HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Blogmain[] allblogs = blogmainService.getAll();
		int len = allblogs.length;
		Random rand = new Random();
		int ok[] = new int[]{-1,-1,-1};
		int temp = 0;
		
		for(int i=1; i<=3; ){
			int j = rand.nextInt(len);
			for(int k=0;k<3;k++){
				if(ok[k] == -1){
					ok[k] = j;
					temp = 0;
					break;
				}
				else{
					if(ok[k] == j){
						temp = 1;
						break;
					}
				}
			}
			if(temp == 0){
				System.out.println(j);
				JSONObject jsonobj1 = new JSONObject();
				jsonobj1.put("id",allblogs[j].getId());
				jsonobj1.put("author",allblogs[j].getNickname());
				jsonobj1.put("title",allblogs[j].getTitle());
				jsonobj1.put("pubtype",allblogs[j].getPubtype());
				jsonobj1.put("pubtime", allblogs[j].getPubtime());
				jsonobj1.put("content",allblogs[j].getContent());
				jsonobj1.put("descript",allblogs[j].getDescript());
				jsonobj1.put("imgsrc",allblogs[j].getImgsrc());
				jsonobj.put(i+"", jsonobj1);
				i++;
			}
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 关键字搜索
	 * @param keyword
	 * @param startpos
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("loadkwblog")
	public void loadKWBlog(String keyword, Integer startpos, HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Blogmain[] kwblogs = blogmainService.loadKWBlog(keyword, startpos);
		if(kwblogs.length == 0){
			jsonobj.put("status","none");
			writer.print(jsonobj);
			return ;
		}
		int i = 1;
		for(Blogmain blog: kwblogs){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", blog.getId());
			jsonobj1.put("imgsrc",blog.getImgsrc());
			jsonobj1.put("author", blog.getNickname());
			jsonobj1.put("title", blog.getTitle());
			jsonobj1.put("pubtime", blog.getPubtime());
			jsonobj1.put("descript", blog.getDescript());
			jsonobj1.put("isfirst",blog.getIsfirst());
			jsonobj1.put("pubtype",blog.getPubtype());
			jsonobj.put(i+"", jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 加载热门文章
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("loadhotblog")
	public void loadHotBlog(HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Blogmain[] hotblogs = blogmainService.getHotblog();
		int i = 1;
		for(Blogmain hotblog: hotblogs){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id",hotblog.getId());
			jsonobj1.put("type", hotblog.getPubtype());
			jsonobj1.put("title",hotblog.getTitle());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 添加阅读量
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("addbmreadcount")
	public void addReadcount(String code, Integer id, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		
		String realcode = (String) session.getAttribute("code");
		
		if(realcode == null || !(realcode.equals(code))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		String flag = String.valueOf((Integer) session.getAttribute("flag"));
		if(flag == null){
			jsonobj.put("status","flagerr");
			writer.print(jsonobj);
			return ;
		}
		
		session.removeAttribute("flag");
		blogmainService.addReadcount(id);
		jsonobj.put("status", "addok");
		writer.print(jsonobj);
	}
	
	/**
	 * 获取当前展示文章的上一篇和下一篇数据
	 * @param curid
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("loadpnblog")
	public void loadPNBlog(Integer curid, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Integer previd = curid -1;
		int prevhas = 0;
		while(previd != 0){
			Blogmain prevblog = blogmainService.loadPBlog(previd);
			if(prevblog == null){
				previd--;
			}
			else{
				JSONObject jsonobj2 = new JSONObject();
				jsonobj2.put("id",prevblog.getId());
				jsonobj2.put("title",prevblog.getTitle());
				jsonobj.put("prev",jsonobj2);
				prevhas = 1;
				break;
			}
		}
		if(prevhas == 0){
			jsonobj.put("prev","none");
		}
		
		int nexthas = 0;
		Integer nextid = curid + 1;
		for(int i=0; i<50; i++){
			Blogmain nextblog = blogmainService.loadNBlog(nextid);
			if(nextblog != null){
				JSONObject jsonobj2 = new JSONObject();
				jsonobj2.put("id",nextblog.getId());
				jsonobj2.put("title",nextblog.getTitle());
				jsonobj.put("next",jsonobj2);
				nexthas = 1;
				break;
			}
			nextid = nextid + 1;
		}
		
		if(nexthas == 0){
			jsonobj.put("next","none");
		}
		
		writer.print(jsonobj);
	}
	
	/**
	 * 根据id获取对应的博客内容
	 * @param id
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("loadmyblog")
	public void loadMyBlog(Integer id, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Blogmain blog = blogmainService.loadMyBlog(id);
		
		jsonobj.put("username", blog.getUsername());
		jsonobj.put("nickname", blog.getNickname());
		jsonobj.put("title",blog.getTitle());
		jsonobj.put("content",blog.getContent());
		jsonobj.put("pubtime",blog.getPubtime());
		jsonobj.put("readcount", blog.getReadcount());
		
		writer.print(jsonobj);
	}
	
	/**
	 * 加载文章推荐
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("loadtjblog")
	public void loadTJBlog(HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Blogmain[] blogmains = blogmainService.getTJBlog();
		int i = 1;
		for (Blogmain blogmain : blogmains) {
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", blogmain.getId());
			jsonobj1.put("imgsrc",blogmain.getImgsrc());
			jsonobj1.put("author", blogmain.getNickname());
			jsonobj1.put("title", blogmain.getTitle());
			jsonobj1.put("pubtime", blogmain.getPubtime());
			jsonobj1.put("descript", blogmain.getDescript());
			jsonobj1.put("isfirst",blogmain.getIsfirst());
			jsonobj1.put("pubtype",blogmain.getPubtype());
			jsonobj.put(i+"", jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}

	/**
	 * 获取对应栏目的博客
	 * 
	 * @Param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getblogmainbytype")
	public void getBlogs(String code, Integer start, String type, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		response.setCharacterEncoding("utf-8");

		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		
		String realcode = (String) session.getAttribute("code");
		
		if(realcode == null || !(realcode.equals(code))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}

		Blogmain[] blogmains = blogmainService.getBlogmainByType(type,start);
		int i = 1;
		for (Blogmain blogmain : blogmains) {
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", blogmain.getId());
			jsonobj1.put("imgsrc",blogmain.getImgsrc());
			jsonobj1.put("author", blogmain.getNickname());
			jsonobj1.put("title", blogmain.getTitle());
			jsonobj1.put("pubtime", blogmain.getPubtime());
			jsonobj1.put("descript", blogmain.getDescript());
			jsonobj1.put("isfirst",blogmain.getIsfirst());
			jsonobj.put(i+"", jsonobj1);
			i++;
		}
		writer.print(jsonobj.toString());
		return;

	}

	/**
	 * 发表博客
	 * 
	 * @param title
	 * @param content
	 * @param type
	 * @param pubtype
	 * @param imgsrc
	 * @param code
	 * @param descript
	 * @param keywords
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("pubblogmain")
	public void publish(@RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam("isfirst") String isfirst,
			@RequestParam("pubtype") String pubtype,
			@RequestParam("imgsrc") String imgsrc,
			@RequestParam("code") String code, 
			@RequestParam("keywords") String keyword,
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("descript") String descript) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");

		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		String realcode = (String) session.getAttribute("code");
		JSONObject jsonobj = new JSONObject();

		if (realcode == null) {
			jsonobj.put("error", "some pig go into private blog invalid");
			writer.print(jsonobj);
			return;
		}

		int first = 0;
		if (isfirst.equals("first"))
			first = 1;

		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String pubdate = sdf.format(now);

		String nickname = (String) session.getAttribute("nickname");
		imgsrc = imgsrc + ".jpg";
		String username = (String) session.getAttribute("username");

		blogmainService.publish(username, nickname, title, content, imgsrc,
				pubdate, pubtype, descript, first);
		
		Integer blogid = blogmainService.getId(content, pubdate);
		
		String[] keywords = keyword.split(",");
		
		for(int i=0; i<keywords.length; i++){
			//获取tagname
			String tagname = tagsService.getTagname(Integer.parseInt(keywords[i]));
			//进行保存
			blogtagsService.saveTags(blogid, Integer.parseInt(keywords[i]), tagname);
		}
		
		jsonobj.put("status", "ok");
		writer.print(jsonobj.toString());
	}
}

package org.blog.Controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Domain.Tool;
import org.blog.Service.ToolService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * @ClassName: TollController
 * @Description: tool表映射控制类
 * @author Chengxi
 * @Date: 2017-6-27上午10:01:19
 */
@Controller
public class ToolController {
	
	/**
	 * 自动注入toolService
	 */
	@Autowired
	@Qualifier("toolService")
	private ToolService toolService;
	
	
	/**
	 * 获取当前登录用户的工具数量
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmytoollen")
	public void getMyToolLen(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
	
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String realcode = (String) session.getAttribute("code");
		String nickname = (String) session.getAttribute("nickname");
		
		if(nickname == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		
		Integer len = toolService.getMyToolLenByType(nickname);
		jsonobj.put("count",len);
		writer.print(jsonobj);
	}
	
	/**
	 * 获取当前用户的所有的tool数据
	 * @param startpos
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmytoolsinfo")
	public void getMyTools(@RequestParam("startpos") Integer startpos, @RequestParam("code") String code,
			HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		String realcode = (String) session.getAttribute("code");
		String nickname = (String) session.getAttribute("nickname");
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		if(nickname == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(!(realcode.equals(code))){
			jsonobj.put("status","have some pig go into personal blog invalid");
			writer.print(jsonobj.toString());
			return ;
		}
		
		Tool[] tools = toolService.getMyTools(nickname,startpos);
		int i = 1;
		for(Tool tool: tools){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", tool.getId());
			jsonobj1.put("author",tool.getAuthor());
			jsonobj1.put("title",tool.getTitle());
			jsonobj1.put("href",tool.getHref());
			jsonobj1.put("pubdate",tool.getPubdate());
			jsonobj1.put("pubtype",tool.getPubtype());
			jsonobj.put((i++)+"", jsonobj1);
		}
		
		System.out.println(jsonobj.toString());
		writer.print(jsonobj.toString());
	}
	
	/**
	 * 添加工具
	 * @param title
	 * @param pubtype
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@RequestMapping("addtoolinfo")
	public String addTool(@RequestParam("title") String title,@RequestParam("pubtype") String pubtype,
			@RequestParam("files") MultipartFile[] files,@RequestParam("enname") String enname,
			HttpServletRequest request,HttpServletResponse response) throws IllegalStateException, IOException{
		
		request.setCharacterEncoding("utf-8");
		
		//上传文件
		String filepath = request.getServletContext().getRealPath("tools/")+File.separator+enname;
		File rootfile = new File(filepath);
		
		if(rootfile.exists()){
			return "tool/repage/exist";
		}
		rootfile.mkdir();
		String htmlfile = "";
		for(MultipartFile file: files){
			String filename = file.getOriginalFilename();
			if(filename.substring(filename.indexOf('.')+1) == "html"){
				htmlfile = "filename";
			}
			file.transferTo(new File(filepath+File.separator+filename));
		}
		
		//保存数据库
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String pubdate = sdf.format(now);
		String href = "http://localhost:8080/blog/tools/"+enname+"/"+htmlfile;
		HttpSession session = request.getSession();
		String author = (String) session.getAttribute("nickname");
		
		toolService.addTool(title,author,href,pubtype,pubdate);
		
		return "tool/repage/addok";
	}
	
	
	/**
	 * 进入添加工具页面
	 * @param request
	 * @return
	 */
	@RequestMapping("addtool")
	public String goAddToolPage(HttpServletRequest request){
		
		if(request.getSession().getAttribute("username") != null)
			return "tool/add/index";
		
		return "login/index";
	}
	
	
	/**
	 * 根据id删除对应的实用工具
	 * @param toolid
	 * @param code
	 * @param request
	 * @param resposne
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("deletoolbyid")
	public void delToolById(@RequestParam("toolid") String toolid,@RequestParam("code") String code,HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		HttpSession session = request.getSession();
		String realcode = (String) session.getAttribute("code");
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		if(!(realcode.equals(code)) || session.getAttribute("username") == null){
			jsonobj.put("error", "some pig go into my personal blog invalid");
			writer.print(jsonobj.toString());
			return;
		}
		
		Integer id = Integer.parseInt(toolid);
		//先查询是否存在该id对应的实用工具
		Tool tool = toolService.getToolById(id);
		if(tool == null){
			jsonobj.put("status", "noid");
			writer.print(jsonobj.toString());
			return ;
		}
		
		//解析出文件目录名
		String href = tool.getHref();
		String rootfilename = href.substring(33,href.lastIndexOf("/"));
		//删除对应的文件目录下的所有文件以及文件目录
		String path = request.getServletContext().getRealPath("tools/")+File.separator+rootfilename;
		File rootfile = new File(path);
		File[] files = rootfile.listFiles();
		for(File file: files){
			file.delete();
		}
		rootfile.delete();
		
		
		toolService.delToolById(toolid);
		jsonobj.put("status", "delok");
		writer.print(jsonobj.toString());
	}

	/**
	 * 获取所有的tool数据
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("gettoolsinfo")
	public void getAllTools(@RequestParam("code") String code,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		String realcode = (String) session.getAttribute("code");
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		if(!(realcode.equals(code))){
			jsonobj.put("status","have some pig go into personal blog invalid");
			writer.print(jsonobj.toString());
			return ;
		}
		
		Tool[] tools = toolService.getAllTools();
		int i = 1;
		for(Tool tool: tools){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", tool.getId());
			jsonobj1.put("author",tool.getAuthor());
			jsonobj1.put("title",tool.getTitle());
			jsonobj1.put("href",tool.getHref());
			jsonobj1.put("pubdate",tool.getPubdate());
			jsonobj1.put("pubtype",tool.getPubtype());
			jsonobj.put((i++)+"", jsonobj1);
		}
		
		System.out.println(jsonobj.toString());
		writer.print(jsonobj.toString());
	}
}





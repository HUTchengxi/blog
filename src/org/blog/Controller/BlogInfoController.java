package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Service.BlogInfoService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: BlogInfoController
 * @Description: 博客信息表控制器
 * @author Chengxi
 * @Date: 2017-7-1下午8:05:46
 */
@Controller
public class BlogInfoController {
	
	/**
	 * 自动注入bloginfoService
	 */
	@Autowired
	@Qualifier("bloginfoService")
	private BlogInfoService bloginfoService;

	
	/**
	 * 博客阅读量加1
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("addread")
	public void addRead(@RequestParam("code") String code ,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8"); 
		
		HttpSession session = request.getSession();
		PrintWriter writer = response.getWriter();
		String realCode = (String) session.getAttribute("code");
		JSONObject jsonobj = new JSONObject();
		
		if(!(code.equals(realCode))){
			jsonobj.put("status","you go into my blog invalid");
			writer.print(jsonobj.toString());
			return ;
		}
		
		Integer blogid = Integer.parseInt((String) session.getAttribute("blogid"));
		String addmark = (String)session.getAttribute("addmark"+blogid);
		
		//每次对应的博客只允许添加一次阅读
		if(addmark != null){
			jsonobj.put("status","hasadded");
			writer.print(jsonobj.toString());
			return ;
		}
		
		bloginfoService.addReadById(blogid);
		session.setAttribute("addmark"+blogid, "read");
		
		jsonobj.put("status","ok");
		writer.print(jsonobj.toString());
	}
}




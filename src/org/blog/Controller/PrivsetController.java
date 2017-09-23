package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.blog.Domain.Privset;
import org.blog.Service.PrivsetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: PrivsetController
 * @Description: 密码权限控制器
 * @author Chengxi
 * @Date: 2017-8-5下午5:59:54
 */
@Controller
public class PrivsetController {

	/**
	 * 自动注入privsetService
	 */
	@Autowired
	@Qualifier("privsetService")
	private PrivsetService privsetService;
	
	
	/**
	 * 设置指定页面的密码权限
	 * @param id
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("setlipwd")
	public void setLiPwd(@RequestParam("id") Integer id,@RequestParam("password") String password,  @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		UUID uuid = UUID.nameUUIDFromBytes(password.getBytes("utf-8"));
		password = uuid.toString().replace("-", "");
		
		privsetService.setLiPwd(id,password);
		jsonobj.put("status", "ok");
		writer.print(jsonobj);
	}
	
	/**
	 * 获取当前页面的密码
	 * @param id
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getlipass")
	public void getLiPass(@RequestParam("id") Integer id, @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		String password = privsetService.getPasswordById(id);
		jsonobj.put("code", password);
		writer.print(jsonobj);
	}
	
	/**
	 * 判断当前页面的权限
	 * @param id
	 * @param pass
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("privcheck")
	public void privCheck(@RequestParam("id") Integer id, @RequestParam("pass") String pass, @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		UUID uuid = UUID.nameUUIDFromBytes(pass.getBytes("utf-8"));
		pass = uuid.toString().replace("-", "");
		
		Privset privset = privsetService.checkpassById(id,pass);
		
		if(privset == null){
			jsonobj.put("status", "passerr");
			writer.print(jsonobj);
			return ;
		}
		jsonobj.put("status", "ok");
		writer.print(jsonobj);
	}
	
	/**
	 * 判断是否需要密码
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("ispriv")
	public void isPriv(@RequestParam("id") Integer id, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
			writer.print(jsonobj);
			return ;
		}
		
		jsonobj.put("haspass",privsetService.hasPass(id));
		writer.print(jsonobj);
	}
}

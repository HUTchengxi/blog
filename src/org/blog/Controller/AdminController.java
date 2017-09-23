package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Domain.Admin;
import org.blog.Service.AdminService;
import org.blog.Service.ToolService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: AdminController
 * @Description: admin管理员控制类
 * @author Chengxi
 * @Date: 2017-6-16下午10:10:17
 */
@Controller
public class AdminController {
	
	/**
	 * 自动注入AdminService
	 */
	@Autowired
	@Qualifier("adminService")
	private AdminService adminService;
	
	/**
	 * 自动注入toolService
	 */
	@Autowired
	@Qualifier("toolService")
	private ToolService toolService;
	
	
	/**
	 * 判断用户当前登录状态
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("loginstatuscheck")
	public void loginstatusCheck(String code, HttpServletRequest request, 
			HttpServletResponse response) throws IOException{
	
		response.setCharacterEncoding("utf-8");
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String realcode = (String) session.getAttribute("code");
		String nickname = (String) session.getAttribute("nickname");
		
		if(realcode == null || !(realcode.equals(code))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return;
		}
		
		if(nickname == null){
			jsonobj.put("status","logining");
			writer.print(jsonobj);
			return ;
		}
		jsonobj.put("status", "logined");
		jsonobj.put("name", nickname);
		writer.print(jsonobj);
	}
	
	/**
	 * 修改当前用户的绑定手机号码
	 * @param newphone
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("modmyphone")
	public void modMyPhone(@RequestParam("newphone") String newphone, @RequestParam("code") String code,
			HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		//判断手机号码是否存在
		Admin admin = adminService.selectAdminByPhone(newphone);
		if(admin != null){
			jsonobj.put("status","phoneexist");
			writer.print(jsonobj);
			return ;
		}
		
		adminService.modMyPhone(username,newphone);
		jsonobj.put("status","modok");
		writer.print(jsonobj);
	}
	
	
	/**
	 * 修改当前用户的昵称
	 * @param newnick
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("modmynick")
	public void modMyNick(@RequestParam("newnick") String newnick, @RequestParam("code") String code,
			HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		String nickname = (String) session.getAttribute("nickname");
		adminService.modMyNick(username,newnick);
		session.setAttribute("nickname",newnick);
		//修改实用工具的昵称
		toolService.modAuthor(nickname,newnick);
		jsonobj.put("status","modok");
		writer.print(jsonobj);
	}
	
	/**
	 * 修改当前用户的密码数据
	 * @param newpass
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("modmypass")
	public void modMyPass(@RequestParam("newpass") String newpass, @RequestParam("code") String code,
			HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		UUID uuid = UUID.nameUUIDFromBytes(newpass.getBytes("utf-8"));
		String password = uuid.toString().replace("-", "");
		adminService.modMyPass(username,password);
		jsonobj.put("status","modok");
		writer.print(jsonobj);
	}
	
	/**
	 *获取当前登录用户的个人信息 
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmyinfo")
	public void getMyInfo(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) 
			throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		String username = (String) session.getAttribute("username");
		String realcode = (String) session.getAttribute("code");
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			jsonobj.put("status","invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "errcode");
			writer.print(jsonobj);
			return ;
		}
		
		Admin admin = adminService.getMyAdmin(username);
		
		jsonobj.put("username",admin.getUsername());
		jsonobj.put("nickname",admin.getNickname());
		jsonobj.put("password",admin.getPassword());
		jsonobj.put("phone",admin.getPhone());
		
		writer.print(jsonobj);
	}
	
	/**
	 * 注册用户
	 * @param username
	 * @param nickname
	 * @param password
	 * @param phone
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("register")
	public void registerUser(@RequestParam("username") String username,@RequestParam("nickname") String nickname,
			@RequestParam("password") String password, @RequestParam("phone") String phone,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		UUID uuid = UUID.nameUUIDFromBytes(password.getBytes("utf-8"));
		password = uuid.toString().replace("-", "");
		
		adminService.addUser(username,nickname,password,phone);
		
		jsonobj.put("status", "registerok");
		writer.print(jsonobj.toString());
	}
	
	/**
	 * 根据手机号获取用户
	 * @param phone
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("selectphoneexist")
	public void selectPhoneExist(@RequestParam("phone") String phone,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		Admin admin = adminService.selectAdminByPhone(phone);
		
		if(admin == null){
			jsonobj.put("status","noexist");
			writer.print(jsonobj.toString());
			return ;
		}
		
		jsonobj.put("status","isexist");
		writer.print(jsonobj.toString());
	}
	
	/**
	 * 判断注册的账号是否已存在
	 * @param username
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("selectuserexist")
	public void selectUserExist(@RequestParam("username") String username,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		Admin admin = adminService.selectByUsername(username);
		
		if(admin == null){
			jsonobj.put("status","noexist");
			writer.print(jsonobj.toString());
			return ;
		}
		
		jsonobj.put("status","isexist");
		writer.print(jsonobj.toString());
	}
	
	/**
	 * 管理员退出登录
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("exitlogin")
	public void Exit(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter write = response.getWriter();
		HttpSession session = request.getSession();
		JSONArray jsonarr = new JSONArray();
		
		//销毁当前会话中的所有的属性
		session.invalidate();
		
		jsonarr.put("exitok");
		
		write.print(jsonarr.toString());
	}
	
	/**
	 * 通过手机号码修改管理员的密码
	 * @param password
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("modpwdbyphone")
	public void modpwdByPhone(@RequestParam("password") String password,
			@RequestParam("code") String code,HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		String phone = (String) session.getAttribute("phone");
		UUID uuid = UUID.nameUUIDFromBytes(password.getBytes("utf-8"));
		password = uuid.toString().replace("-", "");
		JSONArray jsonarr = new JSONArray();
		
		adminService.modpwdByPhone(phone, password);
		
		session.removeAttribute("phone");
		jsonarr.put("modok");
		writer.print(jsonarr.toString());
	}

	/**
	 * 管理员登录
	 * @param username
	 * @param password
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("adminlogin")
	public void Login(@RequestParam("username") String username,@RequestParam("password") String password,
			@RequestParam("code") String code,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		UUID uuid = UUID.nameUUIDFromBytes(password.getBytes("utf-8"));
		password = uuid.toString().replace("-", "");
		Admin admin = adminService.getAdminByUsername(username);
		PrintWriter writer = response.getWriter();
		JSONArray jsonarr = new JSONArray();
		
		if(admin == null){
			jsonarr.put("nouser");
			writer.print(jsonarr);
			return ;
		}
		String realpass = admin.getPassword();
		if(realpass.equals(password)){
			HttpSession session = request.getSession();
			session.setAttribute("username", admin.getUsername());
			session.setAttribute("nickname",admin.getNickname());
			jsonarr.put("ok");
			writer.print(jsonarr);
			return ;
		}
		jsonarr.put("passerr");
		writer.print(jsonarr);
	}
}





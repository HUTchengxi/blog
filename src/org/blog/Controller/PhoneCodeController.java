package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lib.MESSAGEXsend;

import org.blog.Domain.Admin;
import org.blog.Service.AdminService;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import utils.ConfigLoader;
import config.AppConfig;

/**
 * @ClassName: PhoneSendCodeController
 * @Description: 发送手机验证码
 * @author Chengxi
 * @Date: 2017-6-20上午10:20:29
 */
@Controller
public class PhoneCodeController {
	
	/**
	 * 自动注入adminService
	 */
	@Autowired
	@Qualifier("adminService")
	private AdminService adminService;
	
	
	/**
	 * 短信验证码六十秒失效
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("clearphonecode")
	public void clearPhoneCode(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		JSONArray jsonarr = new JSONArray();
		HttpSession session = request.getSession();
		PrintWriter writer = response.getWriter();
		
		session.removeAttribute("phonecode");
		jsonarr.put("clearok");
		writer.print(jsonarr.toString());
	}
	
	
	/**
	 * 校验短信验证码
	 * @param phonecode
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("checkphonecode")
	public void checkPhoneCode(@RequestParam("phonecode") String phonecode,
			HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		PrintWriter writer = response.getWriter();
		JSONArray jsonarr = new JSONArray();
		
		String realcode = (String) session.getAttribute("phonecode");
		if(realcode == null){
			jsonarr.put("codenull");
			writer.print(jsonarr.toString());
			return ;
		}
		if(realcode.equals(phonecode)){
			jsonarr.put("checkok");
			writer.print(jsonarr.toString());
		}
		else{
			jsonarr.put("checkerr");
			writer.print(jsonarr.toString());
		}
	}

	/**
	 * 发送短信验证码
	 * @param phone
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("sendcode")
	public void sendCode(@RequestParam("phone") String phone,@RequestParam("code") String code,
			HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		
		JSONArray jsonarr = new JSONArray();
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		
		//判断手机号码是否存在
		Admin admin = adminService.selectAdminByPhone(phone);
		if(admin == null){
			jsonarr.put("nophone");
			writer.print(jsonarr.toString());
			return ;
		}
		
		AppConfig config = ConfigLoader.load(ConfigLoader.ConfigType.Message);
		MESSAGEXsend submsg = new MESSAGEXsend(config);
		submsg.addTo(phone);
		submsg.setProject("Ckn6C4");
		String randstr = "";
		Random rand = new Random();
		for(int i=0; i<4; i++)
			randstr += (int)Math.ceil(rand.nextInt(10));
		submsg.addVar("code", randstr);
		session.setAttribute("phonecode",randstr);
		session.setAttribute("phone",phone);
		submsg.xsend();
		jsonarr.put("sendok");
		writer.print(jsonarr.toString());
	}
}

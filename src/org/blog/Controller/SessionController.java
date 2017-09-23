package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName: SessionController
 * @Description: Session控制类
 * @author Chengxi
 * @Date: 2017-6-16下午9:36:54
 */
@Controller
public class SessionController {
	
	
	/**
	 * 添加用户标识
	 * @param code
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("addflag")
	public void addFlag(String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
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
		
		session.setAttribute("flag",1);
		jsonobj.put("status","flagok");
		writer.print(jsonobj);
	}
	
	/**
	 * 防盗链获取code
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getcode")
	public void getCode(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		//随机生成16位字符串
		UUID uuid = UUID.randomUUID();
		String str = uuid.toString();
		str = str.replace("-", "");
		
		HttpSession session = request.getSession();
		session.setAttribute("code", str);
		
		JSONArray jsonarr = new JSONArray();
		jsonarr.put(str);
		
		System.out.println("sesison.code->"+jsonarr);
		PrintWriter write = response.getWriter();
		write.print(jsonarr.toString());
		
	}
}










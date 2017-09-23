package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.blog.Domain.Logstate;
import org.blog.Service.LogstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: LogstateController
 * @Description: 登录状态控制器
 * @author Chengxi
 * @Date: 2017-7-31下午8:40:17
 */
@Controller
public class LogstateController {
	
	/**
	 * 自动注入logstateService
	 */
	@Autowired
	@Qualifier("logstateService")
	private LogstateService logstateService;
	
	
	/**
	 * 获取当前登录用户的登录状态的总数量
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getmylogstatelen")
	public void getMyLogstateLen(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null | !(code.equals(realcode))){
			jsonobj.put("status","nocode");
			writer.print(jsonobj);
			return ;
		}
		
		Integer logstatelen = logstateService.getMyLogstateLen(username);
		jsonobj.put("count",logstatelen);
		writer.print(jsonobj);
	}
	
	/**
	 * 获取当前登录用户的登录状态
	 * @param code
	 * @param startpos
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmylogstate")
	public void getMyLogstate(@RequestParam("code") String code, @RequestParam("startpos") Integer startpos, HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String username = (String) session.getAttribute("username");
		String realcode = (String) session.getAttribute("code");
		
		if(username == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj);
			return ;
		}
		
		if(code == null | !(code.equals(realcode))){
			jsonobj.put("status","nocode");
			writer.print(jsonobj);
			return ;
		}
		
		Logstate[] logstates = logstateService.getMyLogstate(username,startpos);
		
		int i = 1;
		for(Logstate logstate: logstates){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("logdate",logstate.getLogdate());
			jsonobj1.put("ip",logstate.getIp());
			jsonobj1.put("pos",logstate.getPos());
			jsonobj1.put("id",logstate.getId());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		
		writer.print(jsonobj);
	}

	/**
	 * 记住登录状态
	 * @param logtime
	 * @param pos
	 * @param ip
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("addlogstate")
	public void addLogstate(@RequestParam("logtime") String logtime, @RequestParam("pos") String pos, @RequestParam("ip") String ip,  
			@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		String realcode = (String) session.getAttribute("code");
		
		if(code == null || !(code.equals(realcode))){
			jsonobj.put("status","nocode");
			writer.print(jsonobj);
			return ;
		}
		
		String username = (String) session.getAttribute("username");
		logstateService.addLogstate(username,logtime,0,ip,pos);
		jsonobj.put("status","ok");
		writer.print(jsonobj);
		
	}
}

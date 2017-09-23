package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.blog.Domain.Guest;
import org.blog.Domain.GuestScore;
import org.blog.Service.AdminService;
import org.blog.Service.GuestScoreService;
import org.blog.Service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: GuestController
 * @Description: 留言类控制器
 * @author Chengxi
 * @Date: 2017-7-24上午8:34:42
 */
@Controller
public class GuestController {
	
	/**
	 * 自动注入GuestService
	 */
	@Autowired
	@Qualifier("guestService")
	private GuestService guestService;
	
	/**
	 * 自动注入AdminService
	 */
	@Autowired
	@Qualifier("adminService")
	private AdminService adminService;
	
	/**
	 * 自动注入guestscoreSerivce
	 */
	@Autowired
	@Qualifier("guestscoreService")
	private GuestScoreService guestscoreService;
	
	
	/**
	 * 加载最新三条留言
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("loadlastguest")
	public void loadLastGuest(HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Guest[] hotguests = guestService.getHotGuest();
		int i = 1;
		for(Guest guest: hotguests){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("nickname",guest.getNickname());
			jsonobj1.put("date",guest.getDate());
			jsonobj1.put("content",guest.getContent());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 进行点赞
	 * @param status
	 * @param id
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("goodguest")
	public void goodGuest(@RequestParam("status") String status, @RequestParam("id") Integer id, @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String username = (String) session.getAttribute("username");
		String realcode = (String) session.getAttribute("code");
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}
		
		if(code == null || code.equals(realcode)){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}
		
		if(status.equals("good")){
			int score = 1;
			guestscoreService.saveMyScore(id,username,score);
			guestService.saveGoodScore(id);
			jsonobj.put("status","ok");
			writer.print(jsonobj);
			return ;
		}
		
		else{
			int score = -1;
			guestscoreService.saveMyScore(id,username,score);
			guestService.saveBadScore(id);
			jsonobj.put("status","ok");
			writer.print(jsonobj);
			return ;
		}
		
	}
	
	/**
	 * 发表留言
	 * @param content
	 * @param comnick
	 * @param comuser
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("comguest")
	public void comGuest(@RequestParam("content") String content, @RequestParam("comnick") String comnick, @RequestParam("comuser") String comuser, @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String username = (String) session.getAttribute("username");
		String nickname = (String) session.getAttribute("nickname");
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}
		
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date = sdf.format(now);
		
		guestService.save(username,nickname,comuser,comnick,content,date,0,0);
		jsonobj.put("status", "ok");
		writer.print(jsonobj);
	}
	
	/**
	 * 获取对应的前三条热门留言
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("gethotguest")
	public void getHotGuest(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		
		Guest[] guests = guestService.getHotGuest();
		
		int i = 1;
		for(Guest guest: guests){
			Integer id = guest.getId();
			GuestScore guestinfo = guestscoreService.getScore(id,username);
			JSONObject jsonobj1 = new JSONObject();
			if(guestinfo == null)
				jsonobj1.put("myscore", "0");
			else
				jsonobj1.put("myscore",guestinfo.getScore());
			jsonobj1.put("nickname", guest.getNickname());
			jsonobj1.put("id", guest.getId());
			jsonobj1.put("username",guest.getUsername());
			jsonobj1.put("comnick", guest.getComnick());
			jsonobj1.put("comuser",guest.getComuser());
			jsonobj1.put("content",guest.getContent());
			jsonobj1.put("pubdate", guest.getDate());
			jsonobj1.put("goodcount",guest.getGoodcount());
			jsonobj1.put("badcount",guest.getBadcount());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		
		writer.print(jsonobj);
	}
	
	/**
	 * 获取指定用户的留言总条数
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getmyguestcount")
	public void getMyGuestCount(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}
		
		jsonobj.put("count",guestService.getMyGuestCount(username));
		writer.print(jsonobj);
	}
	
	/**
	 * 从指定开始位置获取一条我的留言数据
	 * @param startpos
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmyguest")
	public void getMyGuest(@RequestParam("startpos") Integer startpos, HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}

		Guest guest = guestService.getMyGuest(username,startpos);
		if(guest == null){
			jsonobj.put("status","none");
			writer.print(jsonobj);
			return ;
		}
		
		Integer id = guest.getId();
		GuestScore guestinfo = guestscoreService.getScore(id,username);
		if(guestinfo == null)
			jsonobj.put("myscore", "0");
		else
			jsonobj.put("myscore",guestinfo.getScore());
		jsonobj.put("nickname", guest.getNickname());
		jsonobj.put("id", guest.getId());
		jsonobj.put("username",guest.getUsername());
		jsonobj.put("comnick", guest.getComnick());
		jsonobj.put("comuser",guest.getComuser());
		jsonobj.put("content",guest.getContent());
		jsonobj.put("pubdate", guest.getDate());
		jsonobj.put("goodcount",guest.getGoodcount());
		jsonobj.put("badcount",guest.getBadcount());
		
		writer.print(jsonobj);
	}
	
	/**
	 * 获取当前参与人数和留言总条数
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getguestcount")
	public void getGuestCount(HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		
		jsonobj.put("people", adminService.getAdminCount());
		jsonobj.put("guest", guestService.getGuestCount());
		
		writer.print(jsonobj);
	}

	/**
	 * 每次获取五条数据并获取我的点赞与否
	 * @param startpos
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getguests")
	public void getGuests(@RequestParam("startpos") Integer startpos, HttpServletRequest request, HttpServletResponse response) 
			throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");

		Guest[] guests = guestService.getGuests(startpos);
		
		int i = 1;
		for(Guest guest: guests){
			Integer id = guest.getId();
			GuestScore guestinfo = guestscoreService.getScore(id,username);
			JSONObject jsonobj1 = new JSONObject();
			if(guestinfo == null)
				jsonobj1.put("myscore", "0");
			else
				jsonobj1.put("myscore",guestinfo.getScore());
			jsonobj1.put("nickname", guest.getNickname());
			jsonobj1.put("id", guest.getId());
			jsonobj1.put("username",guest.getUsername());
			jsonobj1.put("comnick", guest.getComnick());
			jsonobj1.put("comuser",guest.getComuser());
			jsonobj1.put("content",guest.getContent());
			jsonobj1.put("pubdate", guest.getDate());
			jsonobj1.put("goodcount",guest.getGoodcount());
			jsonobj1.put("badcount",guest.getBadcount());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		
		writer.print(jsonobj);
	}
}

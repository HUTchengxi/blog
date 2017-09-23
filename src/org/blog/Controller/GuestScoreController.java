package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.blog.Domain.Guest;
import org.blog.Domain.GuestScore;
import org.blog.Service.GuestScoreService;
import org.blog.Service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: GuestScoreController
 * @Description: 留言评分控制器
 * @author Chengxi
 * @Date: 2017-8-4下午11:06:50
 */
@Controller
public class GuestScoreController {
	
	/**
	 * 自动注入guestService
	 */
	@Autowired
	@Qualifier("guestscoreService")
	private GuestScoreService guestscoreService;
	
	/**
	 * 自动注入guestService
	 */
	@Autowired
	@Qualifier("guestService")
	private GuestService guestService;
	
	/**
	 * 每次获取一条我评过的
	 * @param startpos
	 * @param request
	 * @param response
	 */
	@RequestMapping("getmycom")
	public void getMyCom(@RequestParam("startpos") Integer startpos, HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}

		Integer comid = guestscoreService.getMyComId(username,startpos);
		if(comid == null){
			jsonobj.put("status","none");
			writer.print(jsonobj);
			return ;
		}
		Guest guest = guestService.getGuestById(comid);
		GuestScore guestinfo = guestscoreService.getScore(comid,username);
		if(guestinfo == null)
			jsonobj.put("myscore", "0");
		else
			//数据报错： face / username /nickname/ comnick/ comuser/ content/ pubdate/ score
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
	 * 获取指定用户的留言评分总条数
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getmycomcount")
	public void getMyComCount(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}
		
		jsonobj.put("count",guestscoreService.getMyComCount(username));
		writer.print(jsonobj);
	}
}

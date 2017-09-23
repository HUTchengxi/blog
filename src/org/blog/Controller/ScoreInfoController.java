package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Domain.ScoreInfo;
import org.blog.Service.BlogInfoService;
import org.blog.Service.ScoreInfoService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: ScoreInfoController
 * @Description: 用户评分表控制类
 * @author Chengxi
 * @Date: 2017-7-2上午10:33:33
 */
@Controller
public class ScoreInfoController {
	
	/**
	 * 自动注入scoreInfoService
	 */
	@Autowired
	@Qualifier("scoreInfoService")
	private ScoreInfoService scoreInfoService;
	
	/**
	 * 自动注入bloginfoService
	 */
	@Autowired
	@Qualifier("bloginfoService")
	private BlogInfoService blogInfoService;
	
	
	/**
	 * 博客评分
	 * @param code
	 * @param score 1 -1
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("sendscore")
	public void sendGoodScore(@RequestParam("code") String code,@RequestParam("score") String score,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		HttpSession session = request.getSession();
		
		String realcode = (String) session.getAttribute("code");
		
		if(code == null || !(code.equals(realcode))){
			System.out.println("code->"+code);
			System.out.println("realcode->"+realcode);
			jsonobj.put("status", "you get url invalid code");
			writer.print(jsonobj.toString());
			return ;
		}
		
		Integer blogid = Integer.parseInt((String) session.getAttribute("blogid"));
		String username = (String) session.getAttribute("username");
		Integer scoreint = Integer.parseInt(score);
		//score_info表数据更新
		scoreInfoService.addScore(username,blogid,scoreint);
		//blog_info表数据更新
		if(scoreint == 1){
			System.out.println("add good");
			blogInfoService.addGood(blogid);
		}
		else{
			System.out.println("add bad");
			blogInfoService.addBad(blogid);
		}
		
		jsonobj.put("status","sendok");
		writer.print(jsonobj.toString());
	}

	
	/**
	 * 获取当前用户的评分信息
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getscore")
	public void getScore(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		
		String username = (String) session.getAttribute("username");
		Integer blogid = Integer .parseInt((String) session.getAttribute("blogid"));
		
		if(username == null){
			jsonobj.put("status", "you get in my personal blog invalid!");
			writer.print(jsonobj.toString());
			return ;
		}
		
		if(blogid == null){
			jsonobj.put("status","you get in my personal blog invalid blogid");
			writer.print(jsonobj.toString());
			return ;
		}
		
		//查找是否评分
		ScoreInfo scoreInfo = scoreInfoService.getScoreInfoByUI(username,blogid);
		
		//还未评分
		if(scoreInfo == null){
			jsonobj.put("status", "noscore");
			writer.print(jsonobj.toString());
			return ;
		}
		
		//已评分
		Integer score = scoreInfo.getScore();
		jsonobj.put("status","hasscore");
		jsonobj.put("score",score);
		writer.print(jsonobj.toString());
	}
}








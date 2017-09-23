package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.blog.Domain.Longway;
import org.blog.Service.LongwayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName: LongwayController
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-18上午12:18:33
 */
@Controller
public class LongwayController {
	
	/**
	 * 自动注入longwayService
	 */
	@Autowired
	@Qualifier("longwayService")
	private LongwayService longwayService;


	/**
	 * 随机获取三条感兴趣一路走来
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("randlongway")
	public void getRandLongway(HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Longway[] longways = longwayService.getAll();
		int len = longways.length;
		Random rand = new Random();
		int ok[] = new int[]{-1,-1,-1};
		int temp = 0;
		
		for(int i=1; i<=3; ){
			int j = rand.nextInt(len);
			for(int k=0;k<3;k++){
				if(ok[k] == -1){
					ok[k] = j;
					temp = 0;
					break;
				}
				else{
					if(ok[k] == j){
						temp = 1;
						break;
					}
				}
			}
			if(temp == 0){
				System.out.println(j);
				JSONObject jsonobj1 = new JSONObject();
				jsonobj1.put("title",longways[j].getTitle());
				jsonobj1.put("pubttime", longways[j].getPubtime());
				jsonobj1.put("content",longways[j].getContent());
				jsonobj1.put("imgsrc",longways[j].getImgsrc());
				jsonobj.put(i+"", jsonobj1);
				i++;
			}
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 获取指定年份的博客成长记录
	 * @param code
	 * @param year
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getlongwaybyyear")
	public void getLongwayByYear(String code, String year, HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String realcode = (String) request.getSession().getAttribute("code");
		
		if(realcode == null || !(realcode.equals(code))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		Longway[] longways = longwayService.getLongwayByYear(year);
		if(longways.length == 0){
			jsonobj.put("status","noway");
			writer.print(jsonobj);
			return ;
		}
		int i = 1;
		for(Longway longway: longways){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("title",longway.getTitle());
			jsonobj1.put("content",longway.getContent());
			jsonobj1.put("pubtime",longway.getPubtime());
			jsonobj1.put("imgsrc",longway.getImgsrc());
			jsonobj.put(i+"", jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 一路走来更多
	 * @return
	 */
	@RequestMapping("longwaymore")
	public String getMorePage(){
		
		return "admin/longway_more";
	}
	
	/**
	 * 获取我的前四条最新的一路走来数据
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmylongway")
	public void getMyLongway(String code, HttpServletRequest request,
			 HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		String realcode = (String) request.getSession().getAttribute("code");
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		if(realcode == null || !(realcode.equals(code))){
			jsonobj.put("status","codeerr");
			writer.print(jsonobj);
			return ;
		}
		
		Longway[] longways = longwayService.selectMyLongway();
		int i =1;
		for(Longway longway: longways){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("content",longway.getContent());
			jsonobj1.put("pubtime",longway.getPubtime());
			jsonobj.put(i+"", jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
}

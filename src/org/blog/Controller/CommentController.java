package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.blog.Domain.Comment;
import org.blog.Service.CommentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @ClassName: CommentController
 * @Description: 评论表控制器
 * @author Chengxi
 * @Date: 2017-7-4上午10:02:04
 */
@Controller
public class CommentController {

	
	/**
	 * 自动注入commentService
	 */
	@Autowired
	@Qualifier("commentService")
	private CommentService commentService;
	
	
	/**
	 * 发表评论或回复
	 * @param content
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("pubcomment")
	public void pubComment(@RequestParam("content") String content,@RequestParam("comuser") String comuser,
			@RequestParam("comnick") String comnick, HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		
		String username = (String) session.getAttribute("username");
		String nickname = (String) session.getAttribute("nickname");
		Integer blogid = Integer.parseInt((String) session.getAttribute("blogid"));
		
		if(username == null){
			jsonobj.put("status", "invalid");
			writer.print(jsonobj.toString());
			return ;
		}
		
		//id
		//查询当前博客的所有评论
		Integer count = commentService.getCommentCountById(blogid) + 1;
		
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date = sdf.format(now);
		
		commentService.pubComment(count,blogid,username,nickname,comuser,comnick,content,date);
		jsonobj.put("status","ok");
		writer.print(jsonobj.toString());
		
	}
	
	/**
	 * 通过id获取对应的博客的三个评论
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getcommentbyid")
	public void getCommentById(@RequestParam("startpos") Integer startpos, HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		PrintWriter writer = response.getWriter();
		JSONObject jsonobj = new JSONObject();
		HttpSession session = request.getSession();
		
		Integer blogid = Integer.parseInt((String) session.getAttribute("blogid"));
		Comment[] comments = commentService.getCommentById(blogid,startpos);
		
		if(comments.length == 0){
			jsonobj.put("status","no");
			writer.print(jsonobj.toString());
			return ;
		}
		
		jsonobj.put("status","some");
		for(Comment comment: comments){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("username",comment.getUsername());
			jsonobj1.put("nickname",comment.getNickname());
			jsonobj1.put("comuser",comment.getComuser());
			jsonobj1.put("comnick",comment.getComnick());
			jsonobj1.put("content",comment.getContent());
			jsonobj1.put("date", comment.getDate());
			Integer id = comment.getId();
			jsonobj.put(id+"", jsonobj1);
		}
		writer.print(jsonobj.toString());
	}
}







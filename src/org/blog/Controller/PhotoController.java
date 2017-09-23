package org.blog.Controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.blog.Domain.Photo;
import org.blog.Service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * @ClassName: PhotoController
 * @Description: 我的相册控制器
 * @author Chengxi
 * @Date: 2017-7-27上午11:24:29
 */
@	Controller
public class PhotoController {
	
	/**
	 * 自动注入PhotoService
	 */
	@Autowired
	@Qualifier("photoService")
	private PhotoService photoService;
	
	
	/**
	 * 上传我的照片
	 * @param title
	 * @param descript
	 * @param file
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("uploadmyphoto")
	public void uploadMyPhoto(@RequestParam("title") String title, @RequestParam("descript") String descript, @RequestParam("img") MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
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
		
		//上传我的图片到images/myphoto/photos/
		String filename = file.getOriginalFilename();
		System.out.println(filename);
		String path = request.getServletContext().getRealPath("images/myphoto/photos/") + File.separator + filename;
		File temp = new File(path);
		if(temp.exists()){
			jsonobj.put("status","exist");
			writer.print(jsonobj);
			return ;
		}
		file.transferTo(temp);
		
		//数据库保存
		photoService.uploadMyPhoto(username,title,descript, filename);
		jsonobj.put("status","upladok");
		writer.print(jsonobj);
		return ;
	}
	
	/**
	 * 修改我的相册照片相关数据
	 * @param id
	 * @param title
	 * @param descript
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("editmyphotoinfo")
	public void editMyPhotoInfo(Integer id,String title,String descript,String code,
			HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		String username = (String) session.getAttribute("username");
		String realcode = (String) session.getAttribute("code");
		
		
		if(username == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		
		else{
			
			//判断id对应的username是否为当前登录用户
			String realuser = photoService.getUsernameById(id);
			
			if(!(realuser.equals(username))){
				jsonobj.put("status","usererr");
			}
			else{
				//执行修改操作
				photoService.editMyPhotoInfo(id,title,descript);
				jsonobj.put("status","editok");
			}
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 删除指定id照片
	 * @param id
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("delemyphotobyid")
	public void deleMyPhotoById(@RequestParam("id") Integer id, @RequestParam("code") String code,
		HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		
		else{
			
			//删除该位置的图片
			String imgsrc = photoService.getMyphotoImgsrcById(id);
			photoService.deleMyPhotoById(id);
			jsonobj.put("status", "deleok");
			String path = request.getServletContext().getRealPath("images/myphoto/photos") + File.separator + imgsrc;
			File file = new File(path);
			System.out.println(path);
			file.delete();
		}
		
		writer.print(jsonobj);
	}
	
	/**
	 * 获取我的相册照片总数量
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmyphotolen")
	public void getMyPhotoLen(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String realcode = (String) session.getAttribute("code");
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		else{
			Integer len = photoService.getMyPhotoLen(username);
			jsonobj.put("count",len);
		}
		writer.print(jsonobj);
	}
	
	/**
	 * 加载我的相册照片数据
	 * @param startpos
	 * @param code
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmyphotosinfo")
	public void getMyphotosInfo(@RequestParam("startpos") Integer startpos, @RequestParam("code") String code,
				HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String username = (String) session.getAttribute("username");
		String realcode = (String) session.getAttribute("code");
		
		if(username == null){
			jsonobj.put("status","invalid");
		}
		
		else if(code == null || !(code.equals(realcode))){
			jsonobj.put("status", "codeerr");
		}
		
		else{
			Photo[] photos = photoService.getMyPhotoByUsername(username, startpos);
			if(photos.length == 0){
				jsonobj.put("status","nophoto");
			}
			else{
				int i = 1;
				for(Photo photo: photos){
					JSONObject jsonobj1 = new JSONObject();
					jsonobj1.put("id",photo.getId());
					jsonobj1.put("imgsrc", photo.getImgsrc());
					jsonobj1.put("title",photo.getTitle());
					jsonobj1.put("descript",photo.getDescript());
					jsonobj.put(i+"",jsonobj1);
					i++;
				}
			}
		}
		
		writer.print(jsonobj);
	}

	/**
	 * 获取我的相册列表数据 一次加载九条数据
	 * @param startpos
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("getmyphotos")
	public void getMyPhotos(@RequestParam("startpos") Integer startpos, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		HttpSession session  = request.getSession();
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		String username = (String) session.getAttribute("username");
		
		if(username == null){
			writer.print(jsonobj.put("status","invalid"));
			return ;
		}
		
		Photo[] photos = photoService.getMyPhoto(username,startpos);
		if(photos == null || photos.length == 0){
			jsonobj.put("status","none");
			writer.print(jsonobj);
			return ;
		}
		
		int i = 1;
		for(Photo photo: photos){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id",photo.getId());
			jsonobj1.put("imgsrc",photo.getImgsrc());
			jsonobj1.put("title", photo.getTitle());
			jsonobj1.put("descript",photo.getDescript());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
}

package org.blog.Controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * @ClassName: TestController
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-7下午9:43:12
 */
@Controller
public class TestController {

	/**
	 * 异步上传多个文件测试代码
	 * @param files
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("uploadtestsss")
	public void upload(@RequestParam("files") MultipartFile[] files, HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setCharacterEncoding("utf-8");
		
		for(MultipartFile file: files){
			String filename = file.getOriginalFilename();
			String path = request.getServletContext().getRealPath("images/test") + File.separator + filename;
			
			System.out.println(path);
			File temp = new File(path);
			if(!(temp.exists())){
				temp.mkdir();
			}
			file.transferTo(temp);
		}
		
		System.out.println(files.length);
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		jsonobj.put("status","ok");
		writer.print(jsonobj);
	}
	
	public static void main(String[] args){
		
		Random rand = new Random();
		for(int i=0; i<100; i++){
			int n = rand.nextInt(10);
			System.out.println(n+1);
		}
	}
}

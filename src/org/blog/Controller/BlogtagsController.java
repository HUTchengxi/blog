package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.blog.Domain.Blogtags;
import org.blog.Service.BlogtagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName: BlogtagsController
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午1:41:12
 */
@Controller
public class BlogtagsController {
	
	/**
	 * 自动注入blogtagService
	 */
	@Autowired
	@Qualifier("blogtagsService")
	private BlogtagsService blogtagsService;

	/**
	 * 获取指定博客的所有关键字数据
	 * @param id
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("loadtags")
	public void loadTags(Integer id, HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Blogtags[] blogtags = blogtagsService.getTags(id);
		int i = 1;
		for(Blogtags blogtag: blogtags){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("id", blogtag.getTagid());
			jsonobj1.put("tag",blogtag.getTag());
			jsonobj.put(i+"",jsonobj1);
			i++;
		}
		
		writer.print(jsonobj);
	}
}

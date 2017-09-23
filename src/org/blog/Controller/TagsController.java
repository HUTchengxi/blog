/**
 * 
 */
package org.blog.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.blog.Domain.Tags;
import org.blog.Service.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName: TagsController
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午9:48:11
 *
 * 
 */
@Controller
public class TagsController {

	/**
	 * 自动注入tagsService
	 */
	@Autowired
	@Qualifier("tagsService")
	private TagsService tagsService;
	
	
	/**
	 * 获取所有的关键字
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("gettags")
	public void loadTags(HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonobj = new JSONObject();
		PrintWriter writer = response.getWriter();
		
		Tags[] tags = tagsService.getTags();
		int i = 1;
		for(Tags tag: tags){
			JSONObject jsonobj1 = new JSONObject();
			jsonobj1.put("tag",tag.getTagname());
			jsonobj1.put("id", tag.getId());
			jsonobj.put(i+"", jsonobj1);
			i++;
		}
		writer.print(jsonobj);
	}
}

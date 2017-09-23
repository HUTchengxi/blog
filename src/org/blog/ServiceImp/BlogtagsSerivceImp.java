/**
 * 
 */
package org.blog.ServiceImp;

import org.blog.Domain.Blogtags;
import org.blog.Mapper.BlogtagsMapper;
import org.blog.Service.BlogtagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: BlogtagsSerivceImp
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午1:39:45
 *
 * 
 */
@Service("blogtagsService")
public class BlogtagsSerivceImp implements BlogtagsService{

	/**
	 * 自动注入blogtagsMapper
	 */
	@Autowired
	private BlogtagsMapper blogtagsMapper;
	
	@Override
	public Blogtags[] getTags(Integer id) {
		
		return blogtagsMapper.getTags(id);
	}

	@Override
	public void saveTags(Integer blogid, Integer tagid, String tagname) {

		blogtagsMapper.saveTags(blogid, tagid, tagname);
	}

	
}

/**
 * 
 */
package org.blog.ServiceImp;

import org.blog.Domain.Tags;
import org.blog.Mapper.TagsMapper;
import org.blog.Service.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: TagsServiceImp
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午9:46:49
 *
 * 
 */
@Service("tagsService")
public class TagsServiceImp implements TagsService {
	
	/**
	 * 自动注入tagsMapper
	 */
	@Autowired
	private TagsMapper tagsMapper;

	@Override
	public Tags[] getTags() {
		
		return tagsMapper.getTags();
	}

	@Override
	public String getTagname(Integer tagid) {

		return tagsMapper.getTagname(tagid);
	}

}

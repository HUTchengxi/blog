package org.blog.Service;

import org.blog.Domain.Blogtags;

/**
 * @ClassName: BlogtagsService
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午1:38:51
 */
public interface BlogtagsService {

	/**
	 * 获取指定博客的所有关键字
	 * @param id
	 * @return
	 */
	Blogtags[] getTags(Integer id);

	/**
	 * 保存对应博客的关键字
	 * @param blogid
	 * @param tagid
	 * @param tagname
	 */
	void saveTags(Integer blogid, Integer tagid, String tagname);
}

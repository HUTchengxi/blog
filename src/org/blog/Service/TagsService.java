/**
 * 
 */
package org.blog.Service;

import org.blog.Domain.Tags;

/**
 * @ClassName: TagsService
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午9:46:06
 *
 * 
 */
public interface TagsService {

	
	/**
	 * 获取所有的tags关键字
	 * @return
	 */
	Tags[] getTags();

	/**
	 * 获取对应的tagname
	 * @param tagid
	 * @return
	 */
	String getTagname(Integer tagid);
}

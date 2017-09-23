/**
 * 
 */
package org.blog.Mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.Tags;

/**
 * @ClassName: TagsMapper
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午9:44:44
 *
 * 
 */
public interface TagsMapper {

	/**
	 * 获取所有的tags关键字
	 * @return
	 */
	@Select("select * from tags")
	Tags[] getTags();

	/**
	 * 获取指定的tagname
	 * @param tagid
	 * @return
	 */
	@Select("select tagname from tags where id = #{tagid}")
	String getTagname(@Param("tagid") Integer tagid);
}

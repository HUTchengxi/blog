package org.blog.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.Blogtags;

/**
 * @ClassName: BlogtagsMapper
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午1:37:48
 */
public interface BlogtagsMapper {

	@Select("select * from blog_tags where blogid = #{id}")
	Blogtags[] getTags(@Param("id") Integer id);

	/**
	 * 保存对应博客的关键字设置
	 * @param blogid
	 * @param tagid
	 * @param tagname
	 */
	@Insert("insert into blog_tags values(#{blogid},#{tagid},#{tagname})")
	void saveTags(@Param("blogid") Integer blogid, @Param("tagid") Integer tagid, @Param("tagname") String tagname);
}

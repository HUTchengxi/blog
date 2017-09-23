package org.blog.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Tool;

/**
 * @ClassName: ToolMapper
 * @Description: tool类映射mapper
 * @author Chengxi
 * @Date: 2017-6-27上午10:11:48
 */
public interface ToolMapper {

	/**
	 * 获取所有的tool
	 * @return
	 */
	@Select("select * from tool")
	public Tool[] getAllTools();

	/**
	 * 根据id查找对应的tool
	 * @param id
	 * @return
	 */
	@Select("select * from tool where id=#{id}")
	public Tool getToolById(@Param("id") Integer id);

	/**
	 * 删除id对应的tool
	 * @param toolid
	 */
	@Delete("delete from tool where id=#{id}")
	public void delToolById(@Param("id") String toolid);

	/**
	 * 添加工具
	 * @param title
	 * @param author
	 * @param href
	 * @param pubtype
	 * @param pubdate
	 */
	@Insert("insert into tool(title,author,href,pubtype,pubdate) values(#{title},#{author},#{href},#{pubtype},#{pubdate})")
	public void addTool(@Param("title") String title,@Param("author") String author,@Param("href") String href,
			@Param("pubtype") String pubtype,@Param("pubdate") String pubdate);

	/**
	 * 修改作者名
	 * @param nickname
	 * @param newnick
	 */
	@Update("update tool set author=#{newauthor} where author=#{oldauthor}")
	public void modAuthor(@Param("oldauthor") String nickname, @Param("newauthor") String newnick);

	/**
	 * 获取指定用户的五条使用工具数据
	 * @param nickname
	 * @param startpos
	 * @return
	 */
	@Select("select * from tool where author=#{nickname} limit #{startpos},5")
	public Tool[] getMyTools(@Param("nickname") String nickname, @Param("startpos") Integer startpos);

	/**
	 * 获取指定用户的实用工具的数量
	 * @param nickname
	 * @return
	 */
	@Select("select count(*) from tool where author=#{nickname}")
	public Integer getMyToolLenByType(@Param("nickname") String nickname);
}

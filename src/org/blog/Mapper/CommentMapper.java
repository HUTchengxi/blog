package org.blog.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.Comment;

/**
 * @ClassName: CommentMapper
 * @Description: 评论表映射mapper接口代理
 * @author Chengxi
 * @Date: 2017-7-4上午9:58:18
 */
public interface CommentMapper {

	/**
	 *获取对应博客的所有评论
	 * @param blogid
	 * @return
	 */
	@Select("select * from comment_info where blogid = #{blogid} limit #{startpos},3")
	Comment[] getCommentById(@Param("blogid") Integer blogid,@Param("startpos") Integer startpos);

	/**
	 *发表博客或回复
	 * @param blogid
	 * @param username
	 * @param nickname
	 * @param comuser
	 * @param comnick
	 * @param content
	 * @param date
	 */
	@Insert("insert into comment_info(id,blogid,username,nickname,comuser,comnick,content,date) values(#{count},#{blogid}," +
			"#{username},#{nickname},#{comuser},#{comnick},#{content},#{date})")
	void pubComment(@Param("count") Integer count,@Param("blogid") Integer blogid,@Param("username") String username,@Param("nickname") String nickname,
			@Param("comuser")String comuser, @Param("comnick") String comnick,@Param("content") String content,
			@Param("date") String date);

	/**
	 * 获取对应博客的所有评论数
	 * @param blogid
	 * @return
	 */
	@Select("select count(*) from comment_info where blogid=#{blogid}")
	Integer getCommentCountById(@Param("blogid") Integer blogid);

	/**
	 *删除博客对应的所有评论
	 * @param id
	 */
	@Delete("delete from comment_info where blogid=#{id}")
	void deleteById(@Param("id") Integer id);

}

/**
 * 
 */
package org.blog.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.ScoreInfo;

/**
 * @ClassName: ScoreInfoMapper
 * @Description: 
 * @author Chengxi
 * @Date: 2017-7-2上午10:30:28
 *
 * 
 */
public interface ScoreInfoMapper {

	/**
	 * 根据用户名和博客id查找评分信息
	 * @param username
	 * @param blogid
	 * @return
	 */
	@Select("select * from score_info where username=#{username} and blogid=#{blogid}")
	ScoreInfo getScoreInfoByUI(@Param("username") String username, @Param("blogid") Integer blogid);

	/**
	 * 进行博客评分
	 * @param username
	 * @param blogid
	 * @param score
	 */
	@Insert("insert into score_info values(#{blogid},#{username},#{score})")
	void addScore(@Param("username") String username, @Param("blogid") Integer blogid, @Param("score") Integer score);

	/**
	 * 根据id删除对应的点赞数据
	 * @param id
	 */
	@Delete("delete from score_info where blogid=#{blogid}")
	void deleteById(@Param("blogid") Integer id);

}

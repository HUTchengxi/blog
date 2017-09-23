package org.blog.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.GuestScore;

/**
 * @ClassName: GuestScoreMapper
 * @Description: 
 * @author Chengxi
 * @Date: 2017-7-24下午10:27:25
 */
public interface GuestScoreMapper {
	

	/**
	 * 保存点赞与踩
	 * @param id
	 * @param username
	 * @param score
	 */
	@Insert("insert into guest_score values(#{id},#{username},#{score})")
	void saveMyScore(@Param("id") Integer id, @Param("username") String username, @Param("score") int score);

	/**
	 * 获取指定留言的当前用户的评分
	 * @param id
	 * @param username
	 * @return
	 */
	@Select("select * from guest_score where guestid=#{id} and username=#{username}")
	GuestScore getScore(@Param("id") Integer id, @Param("username") String username);

	/**
	 * 获取指定用户的评分总数量
	 * @param username
	 * @return
	 */
	@Select("select count(*) from guest_score where username=#{username}")
	Integer getMyComCount(@Param("username") String username);

	/**
	 * 获取一条我评过的
	 * @param username
	 * @param startpos
	 * @return
	 */
	@Select("select guestid from guest_score where username=#{username} limit #{startpos},1")
	Integer getMyComId(@Param("username") String username, @Param("startpos") Integer startpos);

}

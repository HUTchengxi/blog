package org.blog.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Guest;

/**
 * @ClassName: GuestMapper
 * @Description: 留言表数据访问层
 * @author Chengxi
 * @Date: 2017-7-20下午5:27:22
 */
public interface GuestMapper {

	/**
	 * 获取对应的五条数据
	 * @return
	 */
	@Select("select * from guest limit #{startpos},5")
	Guest[] getGuests(@Param("startpos") Integer startpos);

	/**
	 * 获取当前留言总条数
	 * @return
	 */
	@Select("select count(id) from guest")
	Integer getGuestCount();

	/**
	 * 获取指定开始位置的指定用户的一条留言数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	@Select("select * from guest where username = #{username} limit #{startpos}, 1")
	Guest getMyGuest(@Param("username") String username, @Param("startpos") Integer startpos);

	/**
	 * 获取指定用户的留言总条数
	 * @param username
	 * @return
	 */
	@Select("select count(id) from guest where username = #{username}")
	Integer getMyGuestCount(@Param("username") String username);

	/**
	 * 获取前三条热门留言
	 * @return
	 */
	@Select("select * from guest order by goodcount desc,badcount asc limit 0,3")
	Guest[] getHotGuest();

	/**
	 * 发表留言
	 * @param username
	 * @param nickname
	 * @param comuser
	 * @param comnick
	 * @param content
	 * @param date
	 * @param goodcount
	 * @param badcount
	 */
	@Insert("insert into guest(username,nickname,comuser,comnick,content,date,goodcount,badcount) values(#{username},#{nickname},#{comuser},#{comnick},#{content},#{date},#{goodcount},#{badcount})")
	void save(@Param("username") String username, @Param("nickname") String nickname, @Param("comuser") String comuser, @Param("comnick") String comnick,
			@Param("content") String content, @Param("date") String date, @Param("goodcount") int goodcount, @Param("badcount") int badcount);

	/**
	 * 点赞加1
	 * @param id
	 */
	@Update("update guest set goodcount = goodcount + 1 where id = #{id}")
	void saveGoodScore(@Param("id") Integer id);

	/**
	 * 踩加1
	 * @param id
	 */
	@Update("update guest set badcount = badcount + 1 where id = #{id}")
	void saveBadScore(@Param("id") Integer id);

	/**
	 * 获取id对应的guest
	 * @param comid
	 * @return
	 */
	@Select("select * from guest where id=#{id}")
	Guest getGuestById(@Param("id") Integer comid);
}



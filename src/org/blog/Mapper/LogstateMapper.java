package org.blog.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.Logstate;

/**
 * @ClassName: LogstateMapper
 * @Description: 登录状态映射mapper
 * @author Chengxi
 * @Date: 2017-7-31下午8:48:27
 */
public interface LogstateMapper {

	/**
	 * 记住登录状态
	 * @param username
	 * @param logdate
	 * @param attime
	 * @param ip
	 * @param pos
	 */
	@Insert("insert into logstate(username,logdate,attime,ip,pos) values(#{username},#{logdate},#{attime},#{ip},#{pos})")
	void addLogstate(@Param("username") String username, @Param("logdate") String logdate, @Param("attime") Integer attime, 
			@Param("ip") String ip, @Param("pos") String pos);

	/**
	 * 获取指定用户的当前登录状态
	 * @param username
	 * @param startpos
	 * @return
	 */
	@Select("select * from logstate where username=#{username} order by id desc limit #{startpos},5")
	Logstate[] getMyLogstate(@Param("username") String username, @Param("startpos") Integer startpos);

	/**
	 * 获取指定用户的登录状态总数量
	 * @param username
	 * @return
	 */
	@Select("select count(*) from logstate where username=#{username}")
	Integer getMyLogstateLen(@Param("username") String username);
}

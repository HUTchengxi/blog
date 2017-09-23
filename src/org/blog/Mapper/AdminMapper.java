package org.blog.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Admin;

/**
 * @ClassName: AdminMapper
 * @Description: admin表映射类
 * @author Chengxi
 * @Date: 2017-6-16下午10:03:46
 */
public interface AdminMapper {

	/**
	 * 根据用户名获取管理员
	 * @param username
	 * @return
	 */
	@Select("select * from admin where username=#{username}")
	Admin getAdminByUsername(@Param("username") String username);

	/**
	 * 根据手机号码修改用户密码
	 * @param phone
	 * @param password
	 */
	@Update("update admin set password = #{password} where phone = #{phone}")
	void modpwdByPhone(@Param("phone") String phone, @Param("password") String password);

	/**
	 * 根据手机号码查找用户

	 */
	@Select("select * from admin where phone=#{phone}")
	Admin selectAdminByPhone(@Param("phone") String phone);

	/**
	 * 根据用户账号获取用户
	 * @param username
	 * @return
	 */
	@Select("select * from admin where username=#{username}")
	Admin selectByUsername(@Param("username") String username);

	/**
	 * 注册新的管理员用户
	 * @param username
	 * @param nickname
	 * @param password
	 * @param phone
	 */
	@Insert("insert into admin(username,password,nickname,phone) values(#{username},#{password},#{nickname},#{phone})")
	void addUser(@Param("username") String username, @Param("nickname") String nickname, 
			@Param("password") String password, @Param("phone") String phone);

	/**
	 * 获取当前管理员总人数
	 * @return
	 */
	@Select("select count(id) from admin")
	Integer getAdminCount();

	/**
	 * 修改指定用户的密码
	 * @param username
	 * @param newpass
	 */
	@Update("update admin set password=#{newpass} where username=#{username}")
	void modMyPass(@Param("username") String username, @Param("newpass") String newpass);

	/**
	 * 修改指定用户的昵称
	 * @param username
	 * @param newnick
	 */
	@Update("update admin set nickname=#{newnick} where username=#{username}")
	void modMyNick(@Param("username") String username, @Param("newnick") String newnick);

	/**
	 * 修改指定用户的绑定手机号码
	 * @param username
	 * @param newphone
	 */
	@Update("update admin set phone=#{newphone} where username=#{username}")
	void modMyPhone(@Param("username") String username, @Param("newphone") String newphone);
}




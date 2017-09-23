package org.blog.Mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Privset;

/**
 * @ClassName: PrivsetMapper
 * @Description: 密码权限表映射类
 * @author Chengxi
 * @Date: 2017-8-5下午5:40:01
 */
public interface PrivsetMapper {

	/**
	 * 查询指定页面是否设置了密码
	 * @param id
	 * @return
	 */
	@Select("select haspass from privset where liid=#{id}")
	Integer hasPass(@Param("id") Integer id);

	/**
	 * 判断密码是否正确
	 * @param id
	 * @param pass
	 * @return
	 */
	@Select("select * from privset where liid=#{id} and password=#{pass}")
	Privset checkpassById(@Param("id") Integer id, @Param("pass") String pass);

	/**
	 * 获取指定页面的password
	 * @param id
	 * @return
	 */
	@Select("select password from privset where liid=#{id}")
	String getPasswordById(@Param("id") Integer id);

	/**
	 * 设置指定页面的pwd
	 * @param id
	 * @param password
	 */
	@Update("update privset set password=#{password},haspass=1 where liid=#{id}")
	void setLiPwd(@Param("id") Integer id, @Param("password") String password);
}

package org.blog.Service;

import org.blog.Domain.Privset;

/**
 * @ClassName: PrivsetService
 * @Description: 密码权限设置表服务层接口
 * @author Chengxi
 * @Date: 2017-8-5下午5:44:41
 */
public interface PrivsetService {

	/**
	 * 判断指定页面是否需要权限
	 * @param id
	 * @return
	 */
	Integer hasPass(Integer id);

	/**
	 * 判断密码是否正确
	 * @param id
	 * @param pass
	 * @return
	 */
	Privset checkpassById(Integer id, String pass);

	/**
	 * 获取指定页面的密码
	 * @param id
	 * @return
	 */
	String getPasswordById(Integer id);

	/**
	 * 设置指定页面的pwd
	 * @param id
	 * @param password
	 */
	void setLiPwd(Integer id, String password);
}

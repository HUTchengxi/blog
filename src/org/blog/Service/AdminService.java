package org.blog.Service;

import org.blog.Domain.Admin;

/**
 * @ClassName: AdminService
 * @Description: admin管理员操作服务层接口
 * @author Chengxi
 * @Date: 2017-6-16下午10:06:49
 */
public interface AdminService {
	
	
	/**
	 * 通过手机号码修改用户密码
	 * @param phone
	 * @param password
	 */
	public void modpwdByPhone(String phone,String password);

	/**
	 * 通过用户名返回管理员类
	 * @param username
	 * @return
	 */
	public Admin getAdminByUsername(String username);

	/**
	 *根据手机号码查询用户
	 * @param phone
	 * @return
	 */
	public Admin selectAdminByPhone(String phone);

	/**
	 * 根据用户账号获取admin
	 * @param username
	 * @return
	 */
	public Admin selectByUsername(String username);

	/**
	 * 用户注册
	 * @param username
	 * @param nickname
	 * @param password
	 * @param phone
	 */
	public void addUser(String username, String nickname, String password,
			String phone);

	/**
	 * 获取当前人总数
	 * @return
	 */
	public Integer getAdminCount();

	/**
	 * 获取当前用户的数据
	 * @param username
	 * @return
	 */
	public Admin getMyAdmin(String username);

	/**
	 * 修改指定用户的密码
	 * @param username
	 * @param newpass
	 */
	public void modMyPass(String username, String newpass);

	/**
	 * 修改指定用户的昵称
	 * @param username
	 * @param newnick
	 */
	public void modMyNick(String username, String newnick);

	/**
	 * 修改指定用户的绑定手机号码
	 * @param username
	 * @param newphone
	 */
	public void modMyPhone(String username, String newphone);
}

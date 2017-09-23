package org.blog.Service;

import org.blog.Domain.Logstate;

/**
 * @ClassName: LogstateService
 * @Description: 登录状态类服务层接口
 * @author Chengxi
 * @Date: 2017-7-31下午8:50:32
 */
public interface LogstateService {

	/**
	 * 记住登录状态
	 * @param username
	 * @param pubdate
	 * @param attime
	 * @param ip
	 * @param pos
	 */
	public void addLogstate(String username, String pubdate, Integer attime, String ip, String pos);

	/**
	 * 获取指定用户的登录状态数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	public Logstate[] getMyLogstate(String username, Integer startpos);

	/**
	 * 获取指定用户的登录状态数据
	 * @param username
	 * @return
	 */
	public Integer getMyLogstateLen(String username);
}

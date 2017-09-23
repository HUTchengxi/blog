package org.blog.Service;

import org.blog.Domain.ScoreInfo;

/**
 * @ClassName: ScoreInfoService
 * @Description: 用户评分表服务层接口
 * @author Chengxi
 * @Date: 2017-7-2上午10:30:56
 */
public interface ScoreInfoService {

	/**
	 * 根据用户名和博客id获取评分信息
	 * @param username
	 * @param blogid
	 * @return
	 */
	ScoreInfo getScoreInfoByUI(String username, Integer blogid);

	/**
	 * 进行博客评分
	 * @param username
	 * @param blogid
	 * @param scoreint 1 -1
	 */
	void addScore(String username, Integer blogid, Integer scoreint);

	/**
	 * 根据id删除对应的点赞数据
	 * @param id
	 */
	void deleteById(Integer id);

}

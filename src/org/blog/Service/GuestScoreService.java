package org.blog.Service;

import org.blog.Domain.Guest;
import org.blog.Domain.GuestScore;

/**
 * @ClassName: GueScoreService
 * @Description: 留言评分表服务层接口
 * @author Chengxi
 * @Date: 2017-7-24下午10:27:53
 */
public interface GuestScoreService {

	/**
	 * 保存点赞与踩
	 * @param id
	 * @param username
	 * @param score
	 */
	void saveMyScore(Integer id, String username, int score);

	/**
	 * 获取当前用户当前留言的评分
	 * @param id
	 * @param username
	 * @return
	 */
	GuestScore getScore(Integer id, String username);

	/**
	 * 获取指定用户的全部评分数
	 * @param username
	 * @return
	 */
	Integer getMyComCount(String username);

	/**
	 * 获取我评过的一条数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	Integer getMyComId(String username, Integer startpos);

}

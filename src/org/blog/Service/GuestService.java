package org.blog.Service;

import org.blog.Domain.Guest;

/**
 * @ClassName: GuestService
 * @Description: 留言类服务层接口
 * @author Chengxi
 * @Date: 2017-7-20下午5:30:24
 */
public interface GuestService {

	/**
	 * 获取对应的开始截断的五条数据
	 * @param startpos
	 * @return
	 */
	public Guest[] getGuests(Integer startpos);

	/**
	 * 获取当前留言总条数
	 * @return
	 */
	public Integer getGuestCount();

	/**
	 * 获取指定位置开始的指定用户的一条留言数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	public Guest getMyGuest(String username, Integer startpos);

	/**
	 * 获取指定用户的留言总条数
	 * @return
	 */
	public Integer getMyGuestCount(String username);

	/**
	 * 获取前三条热门留言
	 * @return
	 */
	public Guest[] getHotGuest();

	/**
	 * 发表留言
	 * @param username
	 * @param nickname
	 * @param comuser
	 * @param comnick
	 * @param content
	 * @param date
	 * @param i
	 * @param j
	 */
	public void save(String username, String nickname, String comuser,
			String comnick, String content, String date, int i, int j);

	/**
	 * 点赞加1
	 * @param id
	 */
	public void saveGoodScore(Integer id);

	/**
	 * 踩加1
	 * @param id
	 */
	public void saveBadScore(Integer id);

	/**
	 * 获取id对应的guest
	 * @param comid
	 * @return
	 */
	public Guest getGuestById(Integer comid);
}

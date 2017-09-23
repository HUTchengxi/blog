package org.blog.ServiceImp;

import org.blog.Domain.Guest;
import org.blog.Mapper.GuestMapper;
import org.blog.Service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: GuesetServiceImp
 * @Description: 留言类服务层实现类
 * @author Chengxi
 * @Date: 2017-7-20下午5:31:54
 */
@Service("guestService")
public class GuestServiceImp implements GuestService {
	
	/**
	 * 自动注入GuestMapper
	 */
	@Autowired
	private GuestMapper guestMapper;

	@Override
	public Guest[] getGuests(Integer startpos) {

		return guestMapper.getGuests(startpos);
	}

	@Override
	public Integer getGuestCount() {

		return guestMapper.getGuestCount();
	}

	@Override
	public Guest getMyGuest(String username, Integer startpos) {

		return guestMapper.getMyGuest(username, startpos);
	}

	@Override
	public Integer getMyGuestCount(String username) {

		return guestMapper.getMyGuestCount(username);
	}

	@Override
	public Guest[] getHotGuest() {

		return guestMapper.getHotGuest();
	}

	@Override
	public void save(String username, String nickname, String comuser,
			String comnick, String content, String date, int goodcount, int badcount) {

		guestMapper.save(username,nickname,comuser,comnick,content,date,goodcount,badcount);
	}

	@Override
	public void saveGoodScore(Integer id) {

		guestMapper.saveGoodScore(id);
	}

	@Override
	public void saveBadScore(Integer id) {

		guestMapper.saveBadScore(id);
	}

	@Override
	public Guest getGuestById(Integer comid) {

		return guestMapper.getGuestById(comid);
	}

}

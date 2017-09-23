package org.blog.ServiceImp;

import org.blog.Domain.Guest;
import org.blog.Domain.GuestScore;
import org.blog.Mapper.GuestScoreMapper;
import org.blog.Service.GuestScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: GuestScoreServiceImp
 * @Description: 留言评分表服务层实现类
 * @author Chengxi
 * @Date: 2017-7-24下午10:28:29
 */
@Service("guestscoreService")
public class GuestScoreServiceImp implements GuestScoreService {
	
	/**
	 * 自动注入guestscoreMapper
	 */
	@Autowired
	private GuestScoreMapper guestscoreMapper;

	@Override
	public void saveMyScore(Integer id, String username, int score) {

		guestscoreMapper.saveMyScore(id,username,score);
	}

	@Override
	public GuestScore getScore(Integer id, String username) {

		return guestscoreMapper.getScore(id, username);
	}

	@Override
	public Integer getMyComCount(String username) {

		return guestscoreMapper.getMyComCount(username);
	}

	@Override
	public Integer getMyComId(String username, Integer startpos) {

		return guestscoreMapper.getMyComId(username, startpos);
	}

}

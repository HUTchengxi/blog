package org.blog.ServiceImp;

import org.blog.Domain.ScoreInfo;
import org.blog.Mapper.ScoreInfoMapper;
import org.blog.Service.ScoreInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: ScoreInfoServiceImp
 * @Description: 用户评分表服务层实现类
 * @author Chengxi
 * @Date: 2017-7-2上午10:31:25
 */
@Service("scoreInfoService")
public class ScoreInfoServiceImp implements ScoreInfoService {

	/**
	 * 自动注入scoreInfoMapper
	 */
	@Autowired
	private ScoreInfoMapper scoreInfoMapper;
	
	public ScoreInfo getScoreInfoByUI(String username, Integer blogid) {

		return scoreInfoMapper.getScoreInfoByUI(username,blogid);
	}

	public void addScore(String username, Integer blogid, Integer score) {
		
		scoreInfoMapper.addScore(username,blogid,score);
	}

	public void deleteById(Integer id) {
		
		scoreInfoMapper.deleteById(id);
	}

	
}

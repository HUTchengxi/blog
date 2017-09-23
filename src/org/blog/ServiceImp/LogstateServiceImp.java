package org.blog.ServiceImp;

import org.blog.Domain.Logstate;
import org.blog.Mapper.LogstateMapper;
import org.blog.Service.LogstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: LogstateServiceImp
 * @Description: 登录状态类服务层实现类
 * @author Chengxi
 * @Date: 2017-7-31下午8:52:11
 */
@Service("logstateService")
public class LogstateServiceImp implements LogstateService {

	/**
	 * 自动注入logstateMapper
	 */
	@Autowired
	private LogstateMapper logstateMapper;
	
	@Override
	public void addLogstate(String username, String logdate, Integer attime,
			String ip, String pos) {

		logstateMapper.addLogstate(username, logdate, attime, ip, pos);
	}

	@Override
	public Logstate[] getMyLogstate(String username, Integer startpos) {

		return logstateMapper.getMyLogstate(username, startpos);
	}

	@Override
	public Integer getMyLogstateLen(String username) {

		return logstateMapper.getMyLogstateLen(username);
	}

}

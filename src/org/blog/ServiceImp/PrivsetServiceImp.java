package org.blog.ServiceImp;

import org.blog.Domain.Privset;
import org.blog.Mapper.PrivsetMapper;
import org.blog.Service.PrivsetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: PrivsetServiceImp
 * @Description: 密码权限表服务层实现类
 * @author Chengxi
 * @Date: 2017-8-5下午5:47:12
 */
@Service("privsetService")
public class PrivsetServiceImp implements PrivsetService {

	/**
	 * 自动注入privsetMapper
	 */
	@Autowired
	private PrivsetMapper privsetMapper;
	
	@Override
	public Integer hasPass(Integer id) {

		return privsetMapper.hasPass(id);
	}

	@Override
	public Privset checkpassById(Integer id, String pass) {

		return privsetMapper.checkpassById(id, pass);
	}

	@Override
	public String getPasswordById(Integer id) {
		
		return privsetMapper.getPasswordById(id);
	}

	@Override
	public void setLiPwd(Integer id, String password) {

		privsetMapper.setLiPwd(id, password);
	}

}

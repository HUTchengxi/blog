package org.blog.ServiceImp;

import org.blog.Domain.Admin;
import org.blog.Mapper.AdminMapper;
import org.blog.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: AdminServiceImp
 * @Description: admin管理员操作服务层实现类
 * @author Chengxi
 * @Date: 2017-6-16下午10:07:50
 */
@Service("adminService")
public class AdminServiceImp implements AdminService {
	
	/**
	 * 自动注入AdminMapper
	 */
	@Autowired
	private AdminMapper adminMapper;
	
	public void modpwdByPhone(String phone,String password){
		adminMapper.modpwdByPhone(phone,password);
	}
	
	public Admin getAdminByUsername(String username){
		
		return adminMapper.getAdminByUsername(username);
	}

	@Override
	public Admin selectAdminByPhone(String phone) {

		return adminMapper.selectAdminByPhone(phone);
	}

	@Override
	public Admin selectByUsername(String username) {

		return adminMapper.selectByUsername(username);
	}

	@Override
	public void addUser(String username, String nickname, String password,
			String phone) {

		adminMapper.addUser(username,nickname,password,phone);
	}

	@Override
	public Integer getAdminCount() {

		return adminMapper.getAdminCount();
	}

	@Override
	public Admin getMyAdmin(String username) {

		return adminMapper.selectByUsername(username);
	}

	@Override
	public void modMyPass(String username, String newpass) {

		adminMapper.modMyPass(username,newpass);
	}

	@Override
	public void modMyNick(String username, String newnick) {

		adminMapper.modMyNick(username, newnick);
	}

	@Override
	public void modMyPhone(String username, String newphone) {

		adminMapper.modMyPhone(username, newphone);
	}

}

package org.blog.ServiceImp;

import org.blog.Domain.BlogInfo;
import org.blog.Mapper.BlogInfoMapper;
import org.blog.Service.BlogInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: BlogInfoServiceImp
 * @Description: bloginfo映射bean类服务层实现类
 * @author Chengxi
 * @Date: 2017-6-23上午9:42:24
 */
@Service("bloginfoService")
public class BlogInfoServiceImp implements BlogInfoService {

	/**
	 * 自动注入BlogInfoMapper
	 */
	@Autowired
	private BlogInfoMapper bloginfoMapper;
	
	
	public void setDefault(Integer id){
		
		bloginfoMapper.setDefault(id);
	}
	
	public BlogInfo getInfoById(Integer id) {
		
		return bloginfoMapper.getInfoById(id);
	}

	public BlogInfo getBlogInfoById(Integer blogid) {
		
		return bloginfoMapper.getBlogInfoById(blogid);
	}

	public void deleteById(Integer id) {
		
		bloginfoMapper.deleteById(id);
	}

	public void addReadById(Integer blogid) {

		bloginfoMapper.addReadById(blogid);
	}

	public void addGood(Integer blogid) {
		
		bloginfoMapper.addGood(blogid);
	}

	public void addBad(Integer blogid) {
		
		bloginfoMapper.addBad(blogid);
	}

	@Override
	public BlogInfo[] getTJBlogs() {

		return bloginfoMapper.getTJBlogs();
	}

}






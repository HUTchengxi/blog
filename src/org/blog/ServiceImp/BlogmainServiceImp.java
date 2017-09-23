/**
 * 
 */
package org.blog.ServiceImp;

import org.blog.Domain.Blogmain;
import org.blog.Mapper.BlogmainMapper;
import org.blog.Service.BlogmainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: BlogmainServiceImp
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-21下午11:42:40
 *
 * 
 */
@Service("blogmainService")
public class BlogmainServiceImp implements BlogmainService {
	
	/**
	 * 自动注入blogmainMapper
	 */
	@Autowired
	private BlogmainMapper blogmainMapper;
	
	@Override
	public void publish(String username, String nickname, String title,
			String content, String imgsrc, String pubtime, String pubtype,
			String descript, Integer isfirst) {

		blogmainMapper.saveBlogmain(username, nickname, title, content, imgsrc, pubtime, pubtype, descript, isfirst);
	}

	
	@Override
	public Blogmain[] getAllBlogmainData() {

		return blogmainMapper.getAllBlogmainData();
	}


	@Override
	public Blogmain[] getBlogmainByType(String type, Integer start) {

		return blogmainMapper.getBlogmainByType(type,start);
	}


	@Override
	public Blogmain loadMyBlog(Integer id) {

		return blogmainMapper.loadMyBlog(id);
	}


	@Override
	public Blogmain loadPBlog(Integer curid) {
		
		return blogmainMapper.loadMyBlog(curid);
	}


	@Override
	public Blogmain loadNBlog(Integer curid) {
		
		return blogmainMapper.loadMyBlog(curid);
	}


	@Override
	public void addReadcount(Integer id) {

		blogmainMapper.addReadcount(id);
	}


	@Override
	public Integer getId(String content, String pubdate) {

		return blogmainMapper.getId(content, pubdate);
	}


	@Override
	public Blogmain[] getHotblog() {

		return blogmainMapper.getHotblog();
	}


	@Override
	public Blogmain[] getTJBlog() {

		return blogmainMapper.getTJBlog();
	}


	@Override
	public Blogmain[] loadKWBlog(String keyword, Integer startpos) {

		return blogmainMapper.loadKWBlog(keyword, startpos);
	}


	@Override
	public Blogmain[] getAll() {

		return blogmainMapper.getAll();
	}


	
	@Override
	public Integer getCountByType(String type) {

		return blogmainMapper.getCountByType(type);
	}

}

package org.blog.ServiceImp;

import org.blog.Domain.Blog;
import org.blog.Mapper.BlogMapper;
import org.blog.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: BlogServiceImp
 * @Description: blog表服务层实现类
 * @author Chengxi
 * @Date: 2017-6-22下午2:50:40
 */
@Service("blogService")
public class BlogServiceImp implements BlogService {

	/**
	 * 自动注入blogMapper
	 */
	@Autowired
	private BlogMapper blogMapper;
	
	
	public Blog getLastBlog(){
		
		return blogMapper.getLastBlog();
	}
	
	public void publish(String username, String type,String pubtype,String pubdate,String title,String content,String author,
			String imgsrc,String descript){
		
		blogMapper.publish(username,type, pubtype,pubdate, title, content, author, imgsrc,descript);
	}
	
	public Blog[] getBlogByType(String type) {
		
		return blogMapper.getblogByType(type);
	}

	public Blog getBlogById(Integer blogid) {

		return blogMapper.getBlogById(blogid);
	}

	public void deleteById(Integer id) {
		
		blogMapper.deleteById(id);
	}

	public void modBlogById(String blogid, String type, String pubtype,
			String pubdate, String title, String content, String author,
			String imgsrc,String descript) {
		
		blogMapper.modBlogById(blogid,type,pubtype,pubdate,title,content,author,imgsrc,descript);
	}

	public Blog[] getAllBlogs() {

		return blogMapper.getAllBlogs();
	}

	public Blog[] getSomeBlogsByKeyword(String keyword) {

		return blogMapper.getSomeBlogsByKeyword(keyword);
	}

	@Override
	public Blog[] getMyBlogByType(String type, String username,Integer startpos) {

		return blogMapper.getMyBlogByType(type, username,startpos);
	}

	@Override
	public Integer getMyBlogLenByType(String type, String username) {

		return blogMapper.getMyBlogLenByType(type,username);
	}

}

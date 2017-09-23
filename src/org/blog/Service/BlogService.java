package org.blog.Service;

import org.blog.Domain.Blog;

/**
 * @ClassName: BlogService
 * @Description: blog表服务层接口
 * @author Chengxi
 * @Date: 2017-6-22下午2:49:19
 */
public interface BlogService {
	
	/**
	 * 获取最后一个博客
	 * @return
	 */
	public Blog getLastBlog();
	
	/**
	 *发表博客
	 *@param username
	 * @param type
	 * @param pubtype
	 * @param pubdate
	 * @param title
	 * @param content
	 * @param author
	 * @param imgsrc
	 * @param descript
	 */
	public void publish(String username, String type,String pubtype,String pubdate,String title,String content,String author,
			String imgsrc,String descript);

	/**
	 * 通过博客type获取博客数据
	 * @param type
	 * @return
	 */
	public Blog[] getBlogByType(String type);

	/**
	 * 通过id获取博客
	 * @param blogid
	 * @return
	 */
	public Blog getBlogById(Integer blogid);

	/**
	 * 删除id对应的博客
	 * @param id
	 */
	public void deleteById(Integer id);

	/**
	 * 修改博客
	 * @param blogid
	 * @param type
	 * @param pubtype
	 * @param pubdate
	 * @param title
	 * @param content
	 * @param author
	 * @param imgsrc
	 * @param descript
	 */
	public void modBlogById(String blogid, String type, String pubtype,
			String pubdate, String title, String content, String author,
			String imgsrc,String descript);

	/**
	 * 获取所有的博客
	 * @return
	 */
	public Blog[] getAllBlogs();

	/**
	 * 根据内容关键字查找相关博客
	 * @param keyword
	 * @return
	 */
	public Blog[] getSomeBlogsByKeyword(String keyword);

	/**
	 * 获取指定用户的指定类型的所有博客
	 * @param type
	 * @param username
	 * @param startpos 
	 * @return
	 */
	public Blog[] getMyBlogByType(String type, String username, Integer startpos);

	/**
	 * 获取当前用户的指定类型的博客数量
	 * @param type
	 * @param username
	 * @return
	 */
	public Integer getMyBlogLenByType(String type, String username);

}

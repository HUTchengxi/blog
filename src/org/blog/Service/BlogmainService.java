package org.blog.Service;

import org.blog.Domain.Blogmain;

/**
 * @ClassName: BlogMainService
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-21下午11:39:48
 */
public interface BlogmainService {

	/**
	 * 发表博客
	 * @param username
	 * @param nickname
	 * @param title
	 * @param content
	 * @param imgsrc
	 * @param pubtime
	 * @param pubtype
	 * @param descript
	 * @param isfirst
	 */
	public void publish(String username, String nickname, String title, String content, String imgsrc, String pubtime, String pubtype, String descript, Integer isfirst);

	/**
	 * 获取所有的博客数据
	 * @return
	 */
	public Blogmain[] getAllBlogmainData();

	/**
	 * 获取指定类型的博客
	 * @param type
	 * @param start
	 * @return
	 */
	public Blogmain[] getBlogmainByType(String type, Integer start);

	/**
	 * 获取id对应的博客内容
	 * @param id
	 * @return
	 */
	public Blogmain loadMyBlog(Integer id);

	/**
	 * 加载上一篇
	 * @param curid
	 * @return
	 */
	public Blogmain loadPBlog(Integer curid);

	/**
	 * 加载下一篇
	 * @param curid
	 * @return
	 */
	public Blogmain loadNBlog(Integer curid);

	/**
	 * 添加阅读量
	 * @param id
	 */
	public void addReadcount(Integer id);

	/**
	 * 获取id
	 * @param content
	 * @param pubdate
	 * @return
	 */
	public Integer getId(String content, String pubdate);

	/**
	 * 加载热门文章
	 * @return
	 */
	public Blogmain[] getHotblog();

	/**
	 * 加载推荐文章
	 * @return
	 */
	public Blogmain[] getTJBlog();

	/**
	 * 关键字查询文章
	 * @param keyword
	 * @param startpos
	 * @return
	 */
	public Blogmain[] loadKWBlog(String keyword, Integer startpos);

	/**
	 * 获取所有的博客内容
	 * @return
	 */
	public Blogmain[] getAll();

	/**
	 * 获取指定博客类型的博客数量
	 * @param type
	 * @return
	 */
	public Integer getCountByType(String type);
}

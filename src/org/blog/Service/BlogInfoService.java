package org.blog.Service;

import org.blog.Domain.BlogInfo;

/**
 * @ClassName: BlogInfoService
 * @Description: bloginfo映射bean类服务层接口
 * @author Chengxi
 * @Date: 2017-6-23上午9:41:01
 */
public interface BlogInfoService {

	
	/**
	 * 为首次添加的博客添加初始化数据
	 */
	public void setDefault(Integer id);
	
	/**
	 * 根据id获取博客相关数据
	 * @param id
	 * @return
	 */
	public BlogInfo getInfoById(Integer id);

	/**
	 * 通过id获取相应博客的相关数据
	 * @param blogid
	 * @return
	 */
	public BlogInfo getBlogInfoById(Integer blogid);

	/**
	 *删除id对应的博客数据
	 * @param id
	 */
	public void deleteById(Integer id);

	/**
	 * 指定博客阅读量加1
	 * @param blogid
	 */
	public void addReadById(Integer blogid);

	/**
	 *点赞数增加
	 * @param blogid
	 */
	public void addGood(Integer blogid);

	/**
	 * 踩数增加
	 * @param blogid
	 */
	public void addBad(Integer blogid);

	/**
	 * 获取前四较好博客信息
	 * @return
	 */
	public BlogInfo[] getTJBlogs();
}

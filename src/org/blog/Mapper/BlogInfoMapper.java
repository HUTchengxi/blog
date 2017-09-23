package org.blog.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.BlogInfo;

/**
 * @ClassName: blogInfoMapper
 * @Description: bloginfo表映射mapper类
 * @author Chengxi
 * @Date: 2017-6-23上午9:39:02
 */
public interface BlogInfoMapper {

	
	/**
	 * 为新增的博客添加初始化数据
	 * @param id
	 */
	@Insert("insert into blog_info values(#{id},0,0,0)")
	public void setDefault(@Param("id") Integer id);
	
	/**
	 * 根据id获取博客相关数据
	 * @param id
	 * @return
	 */
	@Select("select * from blog_info where id = #{id}")
	public BlogInfo getInfoById(@Param("id") Integer id);

	/**
	 * 通过id获取相应的博客数据
	 * @param blogid
	 * @return
	 */
	@Select("select * from blog_info where id = #{id}")
	public BlogInfo getBlogInfoById(@Param("id") Integer blogid);

	/**
	 * 通过id删除对应的bloginfo
	 * @param id
	 */
	@Delete("delete from blog_info where id = #{id}")
	public void deleteById(@Param("id") Integer id);

	/**
	 * 指定博客阅读量加1
	 * @param blogid
	 */
	@Update("update blog_info set readcount = readcount+1 where id=#{blogid}")
	public void addReadById(@Param("blogid") Integer blogid);

	/**
	 * 点赞数更新
	 * @param blogid
	 */
	@Update("update blog_info set goodcount = goodcount + 1 where id = #{id}")
	public void addGood(@Param("id") Integer blogid);

	/**
	 * 踩数更新
	 * @param blogid
	 */
	@Update("update blog_info set badcount = badcount + 1 where id = #{id}")
	public void addBad(@Param("id") Integer blogid);

	/**
	 * 博客按照readcount和goodcount进行排序
	 * @return
	 */
	@Select("select * from blog_info order by readcount desc,goodcount desc,badcount asc limit 4")
	public BlogInfo[] getTJBlogs();
}

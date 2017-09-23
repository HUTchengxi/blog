package org.blog.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Blogmain;

/**
 * @ClassName: BlogmainMapper
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-21下午11:44:01
 */
public interface BlogmainMapper {

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
	@Insert("insert into blog_main(username,nickname,title,content,imgsrc,pubtime,pubtype,isfirst,descript) values(#{username},#{nickname},#{title},#{content},#{imgsrc},#{pubtime},#{pubtype},#{isfirst},#{descript})")
	void saveBlogmain(@Param("username") String username, @Param("nickname") String nickname, @Param("title") String title, @Param("content") String content, @Param("imgsrc") String imgsrc, @Param("pubtime") String pubtime, @Param("pubtype") String pubtype, @Param("descript") String descript, @Param("isfirst") Integer isfirst);

	/**
	 * 获取所有的博客数据
	 * @return
	 */
	@Select("select * from blog_main")
	Blogmain[] getAllBlogmainData();

	/**
	 * 获取指定类型的博客数据
	 * @param type
	 * @param start
	 * @return
	 */
	@Select("select * from blog_main where pubtype=#{type} order by isfirst desc,id desc limit #{start},3")
	Blogmain[] getBlogmainByType(@Param("type") String type, @Param("start")Integer start);

	/**
	 * 获取id对应的博客
	 * @param id
	 * @return
	 */
	@Select("select * from blog_main where id=#{id}")
	Blogmain loadMyBlog(@Param("id") Integer id);
	
	/**
	 * 博客阅读量加1
	 * @param id
	 */
	@Update("update blog_main set readcount = readcount+1 where id = #{id}")
	void addReadcount(@Param("id") Integer id);

	/**
	 * 获取对应的id
	 * @param content
	 * @param pubdate
	 * @return
	 */
	@Select("select id from blog_main where content = #{content} and pubtime = #{pubdate}")
	Integer getId(@Param("content") String content, @Param("pubdate") String pubdate);

	/**
	 * 加载热门文章
	 * @return
	 */
	@Select("select * from blog_main order by isfirst desc, goodcount desc, readcount desc, badcount asc limit 0, 6")
	Blogmain[] getHotblog();

	/**
	 * 加载推荐文章
	 * @return
	 */
	@Select("select * from blog_main order by isfirst desc, goodcount desc, readcount desc, badcount asc limit 0, 3")
	Blogmain[] getTJBlog();

	/**
	 * 关键字查询文章
	 * @param keyword
	 * @param startpos
	 * @return
	 */
	@Select("select * from blog_main where content like '%${keyword}%' or pubtype like '%${keyword}%' order by isfirst desc limit #{startpos}, 3")
	Blogmain[] loadKWBlog(@Param("keyword") String keyword, @Param("startpos") Integer startpos);

	/**
	 * 获取所有博客
	 * @return
	 */
	@Select("select * from blog_main")
	Blogmain[] getAll();

	/**
	 * 获取指定博客类型的博客数量
	 * @param type
	 * @return
	 */
	@Select("select count(*) from blog_main where pubtype=#{type}")
	Integer getCountByType(@Param("type") String type);
}

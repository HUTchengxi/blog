package org.blog.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Blog;

/**
 * @ClassName: BlogMapper
 * @Description: blog表映射mapper类
 * @author Chengxi
 * @Date: 2017-6-22下午2:47:12
 */
public interface BlogMapper {
	
	
	/**
	 * 获取最后一个博客
	 * @return
	 */
	@Select("select   *   from   blog   order   by   id   desc   limit   1")
	Blog getLastBlog();
	
	/**
	 * 发表博客
	 * @param type
	 * @param pubtype
	 * @param pubdate
	 * @param title
	 * @param content
	 * @param author
	 * @param imgsrc
	 * @param descript
	 */
	@Insert("insert into blog(username,type,pubtype,pubdate,title,content,author,imgsrc,descript) values(#{username},#{type},#{pubtype},#{pubdate},#{title},#{content},#{author}," +
			"#{imgsrc},#{descript})")
	void publish(@Param("username") String username, @Param("type") String type,@Param("pubtype") String pubtype,@Param("pubdate") String pubdate,
			@Param("title") String title,@Param("content") String content,@Param("author") String author,
			@Param("imgsrc") String imgsrc,@Param("descript") String descript);
	
	/**
	 * 根据type获取博客数据
	 * @param type
	 * @return
	 */
	@Select("select * from blog where type=#{type}")
	Blog[] getblogByType(@Param("type") String type);

	/**
	 * 通过id获取博客内容
	 * @param blogid
	 * @return
	 */
	@Select("select * from blog where id = #{id}")
	Blog getBlogById(@Param("id") Integer blogid);

	/**
	 * 通过id删除对应的博客
	 * @param id
	 */
	@Delete("delete from blog where id = #{id}")
	void deleteById(@Param("id") Integer id);

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
	@Update("update blog set type=#{type},pubtype=#{pubtype},pubdate=#{pubdate},title=#{title},content=#{content}" +
			",author=#{author},imgsrc=#{imgsrc},descript=#{descript} where id=#{id}")
	void modBlogById(@Param("id") String blogid, @Param("type") String type, @Param("pubtype") String pubtype,
			@Param("pubdate") String pubdate, @Param("title") String title, @Param("content") String content, 
			@Param("author") String author,@Param("imgsrc") String imgsrc,@Param("descript") String descript);

	/**
	 * 获取所有的博客
	 * @return
	 */
	@Select("select * from blog")
	Blog[] getAllBlogs();

	/**
	 * 通过内容关键字查找相关的博客
	 * @param keyword
	 * @return
	 */
	@Select("SELECT * FROM blog WHERE content LIKE '%${keyword}%'")
	Blog[] getSomeBlogsByKeyword(@Param("keyword") String keyword);

	/**
	 * 获取指定用户的指定类型的所有博客
	 * @param type
	 * @param username
	 * @param startpos 
	 * @return
	 */
	@Select("select * from blog where type=#{type} and username=#{username} limit  #{startpos}, 5")
	Blog[] getMyBlogByType(@Param("type") String type,@Param("username") String username, @Param("startpos") Integer startpos);

	/**
	 * 获取指定用户的指定类型的博客的数量
	 * @param type
	 * @param username
	 * @return
	 */
	@Select("select count(*) from blog where type=#{type} and username=#{username}")
	Integer getMyBlogLenByType(@Param("type") String type,@Param("username") String username);

}

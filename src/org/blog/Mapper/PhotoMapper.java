package org.blog.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.blog.Domain.Photo;

/**
 * @ClassName: PhotoMapper
 * @Description: 我的相册映射类
 * @author Chengxi
 * @Date: 2017-7-27上午11:20:43
 */
public interface PhotoMapper {

	/**
	 *获取我的相册列表 一次加载六条数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	@Select("select * from my_photo where username = #{username} limit #{startpos}, 6")
	Photo[] getMyPhoto(@Param("username") String username, @Param("startpos") Integer startpos);

	/**
	 * 加载我的相册数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	@Select("select * from my_photo where username=#{username} limit #{startpos},6")
	Photo[] getMyPhotoByUsername(@Param("username") String username, @Param("startpos") Integer startpos);

	/**
	 * 获取我的相册照片总数量
	 * @param username
	 * @return
	 */
	@Select("select count(*) from my_photo where username=#{username}")
	Integer getMyPhotoLen(@Param("username") String username);

	/**
	 * 删除指定相册照片
	 * @param id
	 */
	@Delete("delete from my_photo where id=#{id}")
	void deleMyPhotoById(@Param("id") Integer id);

	/**
	 * 获取对应的username
	 * @param id
	 * @return
	 */
	@Select("select username from my_photo where id=#{id}")
	String getUsernameById(@Param("id") Integer id);

	/**
	 * 修改我的相册数据
	 * @param id
	 * @param title
	 * @param descript
	 */
	@Update("update my_photo set title=#{title},descript=#{descript} where id=#{id}")
	void editMyPhotoInfo(@Param("id") Integer id, @Param("title") String title, @Param("descript") String descript);

	/**
	 * 上传我的照片
	 * @param username
	 * @param title
	 * @param descript
	 * @param imgsrc
	 */
	@Insert("insert into my_photo(username,imgsrc,title,descript) values(#{username},#{imgsrc},#{title},#{descript})")
	void uploadMyPhoto(@Param("username") String username, @Param("title") String title, @Param("descript") String descript,
			@Param("imgsrc") String imgsrc);

	/**
	 * 获取对应的imgsrc
	 * @param id
	 * @return
	 */
	@Select("select imgsrc from my_photo where id=#{id}")
	String getMyPhotoImgsrcById(@Param("id") Integer id);
}

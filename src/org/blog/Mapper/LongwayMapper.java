package org.blog.Mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.blog.Domain.Longway;

/**
 * @ClassName: LongwayMapper
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-18上午12:14:10
 */
public interface LongwayMapper {

	/**
	 * 获取最新四条我的一路走来
	 * @return
	 */
	@Select("select * from longway where priv = 1 order by id desc limit 0,4")
	Longway[] selectMyLongway();

	/**
	 * 获取指定年份的博客成长记录
	 * @param year
	 * @return
	 */
	@Select("select * from longway where priv = 1 and pubtime like '${year}%' order by id asc")
	Longway[] getLongwayByYear(@Param("year") String year);

	/**
	 * 获取所有的成长记录
	 * @return
	 */
	@Select("select * from longway")
	Longway[] getAll();
}

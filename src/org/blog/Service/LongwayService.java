package org.blog.Service;

import org.blog.Domain.Longway;

/**
 * @ClassName: LongwayService
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-18上午12:16:10
 */
public interface LongwayService {

	/**
	 * 获取最新四条我的一路走来
	 * @return
	 */
	Longway[] selectMyLongway();

	/**
	 * 获取指定年份的成长记录
	 * @param year
	 * @return
	 */
	Longway[] getLongwayByYear(String year);

	/**
	 * 
	 * 获取全部
	 * @return
	 */
	Longway[] getAll();
}

package org.blog.Service;

import org.blog.Domain.Photo;

/**
 * @ClassName: PhotoService
 * @Description: 我的相册服务层接口
 * @author Chengxi
 * @Date: 2017-7-27上午11:21:57
 */
public interface PhotoService {

	/**
	 * 获取我的相册列表
	 * @param username
	 * @param startpos
	 * @return
	 */
	Photo[] getMyPhoto(String username, Integer startpos);

	/**
	 * 加载我的相册数据
	 * @param username
	 * @param startpos
	 * @return
	 */
	Photo[] getMyPhotoByUsername(String username, Integer startpos);

	/**
	 * 获取我的相册照片总数量
	 * @param username
	 * @return
	 */
	Integer getMyPhotoLen(String username);

	/**
	 * 删除指定相册照片
	 * @param id
	 */
	void deleMyPhotoById(Integer id);

	/**
	 * 获取对应的usernanme
	 * @param id
	 * @return
	 */
	String getUsernameById(Integer id);

	/**
	 * 保存修改
	 * @param id
	 * @param title
	 * @param descript
	 */
	void editMyPhotoInfo(Integer id, String title, String descript);

	/**
	 * 上传我的照片
	 * @param username
	 * @param title
	 * @param descript
	 * @param filename
	 */
	void uploadMyPhoto(String username, String title, String descript,
			String filename);

	/**
	 * 获取对应的imgsrc
	 * @param id
	 * @return
	 */
	String getMyphotoImgsrcById(Integer id);
}

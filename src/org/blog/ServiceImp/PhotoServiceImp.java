package org.blog.ServiceImp;

import org.blog.Domain.Photo;
import org.blog.Mapper.PhotoMapper;
import org.blog.Service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: PhotoServiceImp
 * @Description: 我的相册服务层实现类
 * @author Chengxi
 * @Date: 2017-7-27上午11:23:06
 */
@Service("photoService")
public class PhotoServiceImp implements PhotoService {
	
	/**
	 * 自动注入photoMapper
	 */
	@Autowired
	private PhotoMapper photoMapper;

	@Override
	public Photo[] getMyPhoto(String username, Integer startpos) {
		
		return photoMapper.getMyPhoto(username, startpos);
	}

	@Override
	public Photo[] getMyPhotoByUsername(String username, Integer startpos) {

		return photoMapper.getMyPhotoByUsername(username,startpos);
	}

	@Override
	public Integer getMyPhotoLen(String username) {

		return photoMapper.getMyPhotoLen(username);
	}

	@Override
	public void deleMyPhotoById(Integer id) {

		photoMapper.deleMyPhotoById(id);
	}

	@Override
	public String getUsernameById(Integer id) {

		return photoMapper.getUsernameById(id);
	}

	@Override
	public void editMyPhotoInfo(Integer id, String title, String descript) {
		
		photoMapper.editMyPhotoInfo(id,title,descript);
	}

	@Override
	public void uploadMyPhoto(String username, String title, String descript,
			String imgsrc) {

		photoMapper.uploadMyPhoto(username,title,descript,imgsrc);
	}

	@Override
	public String getMyphotoImgsrcById(Integer id) {
		
		return photoMapper.getMyPhotoImgsrcById(id);
	}

}

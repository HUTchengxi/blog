package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Photo
 * @Description: 我的相册bean类
 * @author Chengxi
 * @Date: 2017-7-27上午11:18:46
 */
public class Photo implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String username;
	private String imgsrc;
	private String title;
	private String descript;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getImgsrc() {
		return imgsrc;
	}
	public void setImgsrc(String imgsrc) {
		this.imgsrc = imgsrc;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescript() {
		return descript;
	}
	public void setDescript(String descript) {
		this.descript = descript;
	}
	
	@Override
	public String toString() {
		return "Photo [id=" + id + ", username=" + username + ", imgsrc="
				+ imgsrc + ", title=" + title + ", descript=" + descript + "]";
	}
	
}

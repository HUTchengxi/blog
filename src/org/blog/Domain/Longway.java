package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Longway
 * @Description: 一路走来记录类
 * @author Chengxi
 * @Date: 2017-8-18上午12:12:44
 */
public class Longway implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String title;
	private String content;
	private String pubtime;
	private String imgsrc;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImgsrc() {
		return imgsrc;
	}
	public void setImgsrc(String imgsrc) {
		this.imgsrc = imgsrc;
	}
	private Integer priv;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getPubtime() {
		return pubtime;
	}
	public void setPubtime(String pubtime) {
		this.pubtime = pubtime;
	}
	public Integer getPriv() {
		return priv;
	}
	public void setPriv(Integer priv) {
		this.priv = priv;
	}
	@Override
	public String toString() {
		return "Longway [id=" + id + ", content=" + content + ", pubtime="
				+ pubtime + ", priv=" + priv + "]";
	}
	

}

package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Blog
 * @Description: blog表映射bean类
 * @author Chengxi
 * @Date: 2017-6-22下午2:41:07
 */
public class Blog implements Serializable {

	private final static long serialVersionUID = 12345L;
	
	private Integer id;
	private String username;
	private String type;
	private String pubtype;
	private String pubdate;
	private String title;
	private Integer isfirst;
	private String content;
	private String author;
	private String imgsrc;
	private String descript;
	
	public String getDescript() {
		return descript;
	}
	public void setDescript(String descript) {
		this.descript = descript;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPubtype() {
		return pubtype;
	}
	public void setPubtype(String pubtype) {
		this.pubtype = pubtype;
	}
	public String getPubdate() {
		return pubdate;
	}
	public void setPubdate(String pubdate) {
		this.pubdate = pubdate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getIsfirst() {
		return isfirst;
	}
	public void setIsfirst(Integer isfirst) {
		this.isfirst = isfirst;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getImgsrc() {
		return imgsrc;
	}
	public void setImgsrc(String imgsrc) {
		this.imgsrc = imgsrc;
	}
	
	@Override
	public String toString() {
		return "Blog [id=" + id + ", username=" + username + ", type=" + type
				+ ", pubtype=" + pubtype + ", pubdate=" + pubdate + ", title="
				+ title + ", isfirst=" + isfirst + ", content=" + content
				+ ", author=" + author + ", imgsrc=" + imgsrc + ", descript="
				+ descript + "]";
	}
	
}

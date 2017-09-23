package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Tool
 * @Description: tool表格映射bean类
 * @author Chengxi
 * @Date: 2017-6-27上午10:05:21
 */
public class Tool implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String title;
	private String author;
	private String href;
	private String pubtype;
	private String pubdate;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
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
	
	@Override
	public String toString() {
		return "Tool [id=" + id + ", title=" + title + ", author=" + author
				+ ", href=" + href + ", pubtype=" + pubtype + ", pubdate="
				+ pubdate + "]";
	}
	
}

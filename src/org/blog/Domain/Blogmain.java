/**
 * 
 */
package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: BlogMain
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-20上午10:59:16
 *
 * 
 */
public class Blogmain implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String username;
	private String nickname;
	private String title;
	private String pubtime;
	private String pubtype;
	private String content;
	private String imgsrc;
	private String descript; 
	private String readcount;
	private String goodcount;
	private String badcount;
	private Integer isfirst;
	
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
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPubtime() {
		return pubtime;
	}
	public void setPubtime(String pubtime) {
		this.pubtime = pubtime;
	}
	public String getPubtype() {
		return pubtype;
	}
	public void setPubtype(String pubtype) {
		this.pubtype = pubtype;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getImgsrc() {
		return imgsrc;
	}
	public void setImgsrc(String imgsrc) {
		this.imgsrc = imgsrc;
	}
	public String getReadcount() {
		return readcount;
	}
	public void setReadcount(String readcount) {
		this.readcount = readcount;
	}
	public String getGoodcount() {
		return goodcount;
	}
	public void setGoodcount(String goodcount) {
		this.goodcount = goodcount;
	}
	public String getBadcount() {
		return badcount;
	}
	public void setBadcount(String badcount) {
		this.badcount = badcount;
	}
	public Integer getIsfirst() {
		return isfirst;
	}
	public void setIsfirst(Integer isfirst) {
		this.isfirst = isfirst;
	}
	
	public String getDescript() {
		return descript;
	}
	public void setDescript(String descript) {
		this.descript = descript;
	}
	@Override
	public String toString() {
		return "BlogMain [id=" + id + ", username=" + username + ", nickname="
				+ nickname + ", title=" + title + ", pubtime=" + pubtime
				+ ", pubtype=" + pubtype + ", content=" + content + ", imgsrc="
				+ imgsrc + ", readcount=" + readcount + ", goodcount="
				+ goodcount + ", badcount=" + badcount + ", isfirst=" + isfirst
				+ "]";
	}
	
}

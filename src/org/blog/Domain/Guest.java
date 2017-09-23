package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Guest
 * @Description: 留言表格bean类
 * @author Chengxi
 * @Date: 2017-7-20下午5:24:42
 */
public class Guest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String username;
	private String nickname;
	private String comuser;
	private String comnick;
	private String content;
	private String date;
	private Integer goodcount;
	private Integer badcount;
	
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
	public String getComuser() {
		return comuser;
	}
	public void setComuser(String comuser) {
		this.comuser = comuser;
	}
	public String getComnick() {
		return comnick;
	}
	public void setComnick(String comnick) {
		this.comnick = comnick;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Integer getGoodcount() {
		return goodcount;
	}
	public void setGoodcount(Integer goodcount) {
		this.goodcount = goodcount;
	}
	public Integer getBadcount() {
		return badcount;
	}
	public void setBadcount(Integer badcount) {
		this.badcount = badcount;
	}
	
	@Override
	public String toString() {
		return "Guest [id=" + id + ", username=" + username + ", nickname="
				+ nickname + ", comuser=" + comuser + ", comnick=" + comnick
				+ ", content=" + content + ", date=" + date + ", goodcount="
				+ goodcount + ", badcount=" + badcount + "]";
	}
	
}

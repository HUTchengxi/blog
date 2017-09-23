package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Comment
 * @Description: 评分表bean类
 * @author Chengxi
 * @Date: 2017-7-4上午9:56:56
 */
public class Comment implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private Integer blogid;
	private String username;
	private String nickname;
	private String comuser;
	private String comnick;
	private String content;
	private String date;
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
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

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getBlogid() {
		return blogid;
	}
	public void setBlogid(Integer blogid) {
		this.blogid = blogid;
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
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	@Override
	public String toString() {
		return "Comment [id=" + id + ", blogid=" + blogid + ", username="
				+ username + ", nickname=" + nickname + ", comuser=" + comuser
				+ ", comnick=" + comnick + ", content=" + content + ", date="
				+ date + "]";
	}
	
}

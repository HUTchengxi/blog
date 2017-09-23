package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: ScoreInfo
 * @Description: 用户评分信息表bean工具类
 * @author Chengxi
 * @Date: 2017-7-2上午10:26:41
 */
public class ScoreInfo implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer blogid;
	private String username;
	private Integer score;
	
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
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
	}
	
	@Override
	public String toString() {
		return "Score [blogid=" + blogid + ", username=" + username
				+ ", score=" + score + "]";
	}
	
}

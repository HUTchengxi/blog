package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: GuestScore
 * @Description: 留言评论映射类
 * @author Chengxi
 * @Date: 2017-7-24下午10:20:29
 */
public class GuestScore implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String ussername;
	private String score;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUssername() {
		return ussername;
	}
	public void setUssername(String ussername) {
		this.ussername = ussername;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	
	@Override
	public String toString() {
		return "GuestScore [id=" + id + ", ussername=" + ussername + ", score="
				+ score + "]";
	}
}

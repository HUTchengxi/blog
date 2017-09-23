package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: BlogInfo
 * @Description: bloginfo博客数据bean类
 * @author Chengxi
 * @Date: 2017-6-23上午9:28:02
 */
public class BlogInfo implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private Integer readcount;
	private Integer goodcount;
	private Integer badcount;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getReadcount() {
		return readcount;
	}
	public void setReadcount(Integer readcount) {
		this.readcount = readcount;
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
	public String toString(){
		return "bloginfo.id->"+id+" bloginfo.readcount->"+readcount+"  blog.goodcount->"+goodcount+
				"   blog.badcount->"+badcount;
	}
}

package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Tags
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午9:41:46
 */
public class Tags implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String tagname;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTagname() {
		return tagname;
	}
	public void setTagname(String tagname) {
		this.tagname = tagname;
	}
	@Override
	public String toString() {
		return "Tags [id=" + id + ", tagname=" + tagname + "]";
	}
	
}

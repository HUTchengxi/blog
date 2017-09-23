/**
 * 
 */
package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Blogtags
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-30上午1:36:41
 *
 * 
 */
public class Blogtags implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer blogid;
	private String tag;
	private Integer tagid;
	public Integer getBlogid() {
		return blogid;
	}
	public void setBlogid(Integer blogid) {
		this.blogid = blogid;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public Integer getTagid() {
		return tagid;
	}
	public void setTagid(Integer tagid) {
		this.tagid = tagid;
	}
	@Override
	public String toString() {
		return "Blogtags [blogid=" + blogid + ", tag=" + tag + ", tagid="
				+ tagid + "]";
	}
	
}

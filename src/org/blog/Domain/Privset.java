package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Privset
 * @Description: 密码权限表
 * @author Chengxi
 * @Date: 2017-8-5下午5:38:02
 */
public class Privset implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer liid;
	private Integer haspass;
	private String password;
	
	public Integer getLiid() {
		return liid;
	}
	public void setLiid(Integer liid) {
		this.liid = liid;
	}
	public Integer getHaspass() {
		return haspass;
	}
	public void setHaspass(Integer haspass) {
		this.haspass = haspass;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "Privset [liid=" + liid + ", haspass=" + haspass + ", password="
				+ password + "]";
	}
}

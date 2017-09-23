package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Admin
 * @Description: admin工具bean类
 * @author Chengxi
 * @Date: 2017-6-16下午9:52:59
 */
public class Admin implements Serializable {

	private final static long serialVersionUID = 32765L;
	
	private Integer id;
	private String username;
	private String password;
	private String nickname;
	private String imgsrc;
	private String phone;
	private String address;
	
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getImgsrc() {
		return imgsrc;
	}
	public void setImgsrc(String imgsrc) {
		this.imgsrc = imgsrc;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String toString(){
		return "admin.id->"+this.id+"  admin.username->"+this.username+"  admin.password->"+this.password+"  admin.nickname->"+
				this.nickname+"  admin.imgsrc->"+this.imgsrc+"  admin.phone->"+this.phone+"  admin.address->"+this.address;
	}
	
}

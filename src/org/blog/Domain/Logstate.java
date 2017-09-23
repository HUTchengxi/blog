package org.blog.Domain;

import java.io.Serializable;

/**
 * @ClassName: Logstate
 * @Description: 登录状态bean类
 * @author Chengxi
 * @Date: 2017-7-31下午8:47:09
 */
public class Logstate implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String username;
	private String logdate;
	private Integer attime;
	private String ip;
	private String pos;
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
	public String getLogdate() {
		return logdate;
	}
	public void setLogdate(String logdate) {
		this.logdate = logdate;
	}
	public Integer getAttime() {
		return attime;
	}
	public void setAttime(Integer attime) {
		this.attime = attime;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getPos() {
		return pos;
	}
	public void setPos(String pos) {
		this.pos = pos;
	}
	
	@Override
	public String toString() {
		return "Logstate [id=" + id + ", username=" + username + ", logdate="
				+ logdate + ", attime=" + attime + ", ip=" + ip + ", pos="
				+ pos + "]";
	}
}

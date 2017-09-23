package org.blog.Service;

import org.blog.Domain.Tool;


/**
 * @ClassName: ToolService
 * @Description:  tool类服务层接口
 * @author Chengxi
 * @Date: 2017-6-27上午10:10:43
 */
public interface ToolService {

	/**
	 * 获取所有的tool
	 * @return
	 */
	public Tool[] getAllTools();

	/**
	 * 根据id查找对应的tool实用工具
	 * @param id
	 * @return
	 */
	public Tool getToolById(Integer id);

	/**
	 * 删除id对应的tool实用工具
	 * @param toolid
	 */
	public void delToolById(String toolid);

	/**
	 * 添加工具
	 * @param title
	 * @param author
	 * @param href
	 * @param pubtype
	 * @param pubdate
	 */
	public void addTool(String title, String author, String href,
			String pubtype, String pubdate);

	/**
	 * 修改作者名
	 * @param nickname
	 * @param newnick
	 */
	public void modAuthor(String nickname, String newnick);

	/**
	 * 获取指定用户的工具
	 * @param username
	 * @param startpos
	 * @return
	 */
	public Tool[] getMyTools(String username, Integer startpos);

	/**
	 * 获取指定用户的工具总数量
	 * @param nickname
	 * @return
	 */
	public Integer getMyToolLenByType(String nickname);
}

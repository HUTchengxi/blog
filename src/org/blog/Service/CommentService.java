package org.blog.Service;

import org.blog.Domain.Comment;

/**
 * @ClassName: CommentService
 * @Description: 评论表服务层接口
 * @author Chengxi
 * @Date: 2017-7-4上午9:59:07
 */
public interface CommentService {

	/**
	 * 查询blogid博客对应的所有评论
	 * @param blogid
	 * @param startpo
	 * @return
	 */
	Comment[] getCommentById(Integer blogid,Integer startpos);

	/**
	 * 发表评论或回复
	 * @param count
	 * @param blogid
	 * @param username
	 * @param nickname
	 * @param comuser
	 * @param comnick
	 * @param content
	 * @param date
	 */
	void pubComment(Integer count,Integer blogid, String username, String nickname,
			String comuser, String comnick, String content,String date);

	/**
	 * 获取当前博客的所有评论数
	 * @param blogid
	 * @return
	 */
	Integer getCommentCountById(Integer blogid);

	/**
	 * 删除博客对应的所有评论
	 * @param id
	 */
	void delteById(Integer id);

}

package org.blog.ServiceImp;

import org.blog.Domain.Comment;
import org.blog.Mapper.CommentMapper;
import org.blog.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: CommentServiceImp
 * @Description: 评论表服务层实现类
 * @author Chengxi
 * @Date: 2017-7-4上午9:59:32
 */
@Service("commentService")
public class CommentServiceImp implements CommentService {

	/**
	 * 自动注入commentMapper
	 */
	@Autowired
	private CommentMapper commentMapper;
	
	@Override
	public Comment[] getCommentById(Integer blogid,Integer startpos) {

		return commentMapper.getCommentById(blogid,startpos);
	}

	@Override
	public void pubComment(Integer count, Integer blogid, String username, String nickname,
			String comuser, String comnick, String content,String date) {

		commentMapper.pubComment(count, blogid,username,nickname,comuser,comnick,content,date);
	}

	@Override
	public Integer getCommentCountById(Integer blogid) {

		return commentMapper.getCommentCountById(blogid);
	}

	@Override
	public void delteById(Integer id) {

		commentMapper.deleteById(id);
	}

}

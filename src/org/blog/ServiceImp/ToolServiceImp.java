package org.blog.ServiceImp;


import org.blog.Domain.Tool;
import org.blog.Mapper.ToolMapper;
import org.blog.Service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: ToolServiceImp
 * @Description: tool类服务层实现类
 * @author Chengxi
 * @Date: 2017-6-27上午10:13:12
 */
@Service("toolService")
public class ToolServiceImp implements ToolService {

	/**
	 * 自动注入toolMapper
	 */
	@Autowired
	private ToolMapper toolMapper;
	
	public Tool[] getAllTools() {
		
		return toolMapper.getAllTools();
	}

	public Tool getToolById(Integer id) {

		return toolMapper.getToolById(id);
	}

	public void delToolById(String toolid) {
			
		toolMapper.delToolById(toolid);
	}

	public void addTool(String title, String author, String href,
			String pubtype, String pubdate) {
		
		toolMapper.addTool(title,author,href,pubtype,pubdate);
	}

	@Override
	public void modAuthor(String nickname, String newnick) {

		toolMapper.modAuthor(nickname,newnick);
	}

	@Override
	public Tool[] getMyTools(String username, Integer startpos) {

		return toolMapper.getMyTools(username, startpos);
	}

	@Override
	public Integer getMyToolLenByType(String nickname) {

		return toolMapper.getMyToolLenByType(nickname);
	}

}

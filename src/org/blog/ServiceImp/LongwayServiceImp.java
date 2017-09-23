package org.blog.ServiceImp;

import org.blog.Domain.Longway;
import org.blog.Mapper.LongwayMapper;
import org.blog.Service.LongwayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: LongwayServiceImp
 * @Description: 
 * @author Chengxi
 * @Date: 2017-8-18上午12:16:56
 */
@Service("longwayService")
public class LongwayServiceImp implements LongwayService{

	/**
	 * 自动注入longwayMapper
	 */
	@Autowired
	private LongwayMapper longwayMapper;
	
	@Override
	public Longway[] selectMyLongway() {

		return longwayMapper.selectMyLongway();
	}

	@Override
	public Longway[] getLongwayByYear(String year) {

		return longwayMapper.getLongwayByYear(year);
	}

	@Override
	public Longway[] getAll() {

		return longwayMapper.getAll();
	}

	
}

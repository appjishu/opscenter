package com.appjishu.opscenter.db.service;

import java.util.List;
import java.util.Map;

import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.grid.bean.GridBean;

/**
 * 方法服务接口
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月16日 下午1:12:38
 * @version v1.0
 */
public interface MethodService {

	/**
	 * 简单SQL执行
	 * 
	 * @param sql
	 * @param gridBean
	 * @return String
	 */
	public void sqlRunner(String poolName, String sql);

	/**
	 * 执行表格控件查询
	 * 
	 * @param methodName
	 * @param paramMap
	 * @param gridBean
	 * @throws Exception
	 */
	public void execMethodForGrid(GridBean gridBean) throws Exception;

	/**
	 * 执行方法
	 * 
	 * @param name
	 * @return DatabaseBean
	 * @throws Exception
	 */
	public Map<String, Object> execMethod(String methodName, String poolName, Map<String, Object> paramMap)
			throws Exception;

	/**
	 * 获取方法列表结果集
	 * 
	 * @return List<Map<String,Object>>
	 */
	public int[] insert(MethodBean methodBean);

	/**
	 * 获取方法列表结果集
	 * 
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryList();

	/**
	 * 获取方法列表结果集
	 * 
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryListByPoolName(String poolName);

	/**
	 * 获取方法结果集
	 * 
	 * @param name
	 * @return Map<String,Object>
	 */
	public MethodBean query(String methodName, String poolName);

	/**
	 * 更新方法
	 * 
	 * @param name
	 * @return Map<String,Object>
	 */
	public int update(MethodBean methodBean);

	/**
	 * 删除方法
	 * 
	 * @param name
	 * @return Map<String,Object>
	 */
	public int deleteByIds(String methodIds);

	/**
	 * 创建方法基本表
	 */
	public void createTable();
}

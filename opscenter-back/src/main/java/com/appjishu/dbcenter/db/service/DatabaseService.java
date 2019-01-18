package com.appjishu.dbcenter.db.service;

import java.util.List;
import java.util.Map;

import com.appjishu.dbcenter.db.bean.DatabaseBean;
import com.zaxxer.hikari.HikariConfig;

/**
 * 数据库服务接口
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月16日 下午1:12:38
 * @version v1.0
 */
public interface DatabaseService {
	
	/**
	 * 创建数据源
	 * @param name
	 * @return DatabaseBean
	 * @throws Exception
	 */
	public DatabaseBean createDatabaseBean(String poolName);
	
	/**
	 * 获取数据源名称列表
	 * @return String[]
	 */
	public String[] queryPoolList() ;
	
	/**
	 * 获取数据源列表结果集
	 * @return List<Map<String,Object>>
	 */
	public int insert(HikariConfig hikariConfig);
	
	/**
	 * 获取数据源列表结果集
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String,Object>> queryList();
	
	/**
	 * 获取数据源结果集
	 * @param name
	 * @return Map<String,Object>
	 */
	public Map<String,Object> query(String poolName);
	
	/**
	 * 更新数据源
	 * @param name
	 * @return Map<String,Object>
	 */
	public int update(HikariConfig hikariConfig);
	
	/**
	 * 删除数据源
	 * @param poolNames
	 * @return Map<String,Object>
	 */
	public int[] deleteByNames(String poolNames);
	
	/**
	 * 创建数据源基本表
	 */
	public void createTable() ;
	
	/**
	 * 查询数据源表列表语句
	 * @return String
	 */
	public String getQueryList();
}

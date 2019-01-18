package com.appjishu.dbcenter.db.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.appjishu.dbcenter.db.bean.DatabaseBean;
import com.appjishu.dbcenter.db.service.DatabaseService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

/**
 * 数据库服务类
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月16日 下午1:12:38
 * @version v1.0
 */
@Service
@ConfigurationProperties(prefix = "ingrid.database")
public class DatabaseServiceImpl implements BeanClassLoaderAware, InitializingBean,DatabaseService {
	@Resource
	private JdbcTemplate jdbcTemplate;
	
	private String table;
	private String insert;
	private String query;
	private String queryList;
	private String update;
	private String delete;
	
	/**
	 * 创建名称列表
	 * @param poolNames
	 * @return List<Object[]>
	 */
	private List<Object[]> createNames(String poolNames) {
		String[] nameArr = poolNames.split(",");
		List<Object[]> nameList = new ArrayList<Object[]>();
		for (int i = 0; i < nameArr.length; i++) {
			nameList.add(new Object[] {nameArr[i]});
		}
		return nameList;
	}
	
	/**
	 * 创建数据源
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private DataSource createDataSource(Map<String,Object> map) {
		Properties properties = new Properties();
        Set<Entry<String, Object>> set = map.entrySet();
        for (Entry<String, Object> e : set) properties.put(String.valueOf(e.getKey()), String.valueOf(e.getValue()));
    	HikariConfig HikariConfig =  new HikariConfig(properties);
		DataSource dataSource = new HikariDataSource(HikariConfig);
		return dataSource;
	}
	
	/**
	 * 获取数据源名称列表
	 * @return String[]
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String[] queryPoolList() {
		List<Map<String,Object>> dmsList = this.queryList();
		List<String> dmsArrList = new ArrayList<String>();
		dmsArrList.add("normal");
		for (Iterator iterator = dmsList.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			dmsArrList.add(String.valueOf(map.get("poolName")));
		}
		return (String[]) dmsArrList.toArray(new String[dmsArrList.size()]);
	}
	
	/**
	 * 创建数据源
	 * @param name
	 * @return DatabaseBean
	 * @throws Exception
	 */
	@Cacheable(value="databaseService" , key="#poolName")
	public DatabaseBean createDatabaseBean(String poolName)  {
		if(poolName.equals("normal")) return new DatabaseBean(jdbcTemplate.getDataSource());
		return new DatabaseBean(this.createDataSource(this.query(poolName)));
	}
	
	/**
	 * 获取数据源列表结果集
	 * @return List<Map<String,Object>>
	 */
	public int insert(HikariConfig hikariConfig){
		if(hikariConfig.getMaximumPoolSize()<0) hikariConfig.setMaximumPoolSize(10);
		if(hikariConfig.getMinimumIdle()<0) hikariConfig.setMinimumIdle(10);
		return jdbcTemplate.update(this.insert,new Object[] {hikariConfig.getPoolName(),hikariConfig.getDriverClassName(),
				hikariConfig.getJdbcUrl(),hikariConfig.getUsername(),
				hikariConfig.getPassword(),hikariConfig.getMaximumPoolSize(),
				hikariConfig.getConnectionTimeout(),hikariConfig.getMinimumIdle(),
				hikariConfig.getIdleTimeout()
		});
	}
	
	
	/**
	 * 获取数据源列表结果集
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String,Object>> queryList(){
		return jdbcTemplate.queryForList(this.queryList);
	}
	
	/**
	 * 获取数据源结果集
	 * @param name
	 * @return Map<String,Object>
	 */
	public Map<String,Object> query(String poolName){
		return jdbcTemplate.queryForMap(this.query,new Object[] {poolName});
	}
	
	/**
	 * 更新数据源
	 * @param name
	 * @return Map<String,Object>
	 */
	@CacheEvict(value="databaseService" , key="#hikariConfig.poolName")
	public int update(HikariConfig hikariConfig){
		if(hikariConfig.getMaximumPoolSize()<0) hikariConfig.setMaximumPoolSize(10);
		if(hikariConfig.getMinimumIdle()<0) hikariConfig.setMinimumIdle(10);
		return jdbcTemplate.update(this.update,new Object[] {hikariConfig.getDriverClassName(),
				hikariConfig.getJdbcUrl(),hikariConfig.getUsername(),
				hikariConfig.getPassword(),hikariConfig.getMaximumPoolSize(),
				hikariConfig.getConnectionTimeout(),hikariConfig.getMinimumIdle(),
				hikariConfig.getIdleTimeout(),hikariConfig.getPoolName()});
	}
	
	/**
	 * 删除数据源
	 * @param name
	 * @return Map<String,Object>
	 */
	@CacheEvict(value="databaseService" , key="#poolName")
	public int[] deleteByNames(String poolNames){
		List<Object[]> nameList = createNames(poolNames);
		return jdbcTemplate.batchUpdate(this.delete,nameList);
	}
	
	/**
	 * 创建数据源基本表
	 */
	public void createTable() {
		jdbcTemplate.execute(this.table);
	}

	/**
	 * 创建数据源表语句
	 * @return String
	 */
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	
	/**
	 * 新增数据源表语句
	 * @return String
	 */
	public String getInsert() {
		return insert;
	}
	public void setInsert(String insert) {
		this.insert = insert;
	}

	/**
	 * 查询数据源表语句
	 * @return String
	 */
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	
	/**
	 * 查询数据源表列表语句
	 * @return String
	 */
	public String getQueryList() {
		return queryList;
	}
	public void setQueryList(String queryList) {
		this.queryList = queryList;
	}

	
	/**
	 * 更新数据源表语句
	 * @return String
	 */
	public String getUpdate() {
		return update;
	}
	public void setUpdate(String update) {
		this.update = update;
	}
	
	/**
	 * 删除数据源表语句
	 * @return String
	 */
	public String getDelete() {
		return delete;
	}
	public void setDelete(String delete) {
		this.delete = delete;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
	}

	@Override
	public void setBeanClassLoader(ClassLoader classLoader) {
	}

}
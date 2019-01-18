package com.appjishu.opscenter.db.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.appjishu.opscenter.db.bean.DatabaseBean;
import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.db.bean.TransactionBean;
import com.appjishu.opscenter.db.service.DatabaseService;
import com.appjishu.opscenter.db.service.MethodService;
import com.appjishu.opscenter.grid.bean.GridBean;

/**
 * 方法服务类
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月16日 下午1:12:38
 * @version v1.0
 */
@Service
@ConfigurationProperties(prefix = "ingrid.method")
public class MethodServiceImpl implements BeanClassLoaderAware, InitializingBean, MethodService {
	@Resource
	private JdbcTemplate jdbcTemplate;

	@Autowired
	DatabaseService databaseServiceImpl;

	private String table;
	private String tableSub;
	private String insert;
	private String insertSub;
	private String queryByPoolName;
	private String query;
	private String querySub;
	private String queryList;
	private String update;
	private String delete;
	private String deleteSub;

	/**
	 * 创建ID列表
	 * 
	 * @param ids
	 * @return
	 */
	private List<Object[]> createIds(String ids) {
		String[] idArr = ids.split(",");
		List<Object[]> idList = new ArrayList<Object[]>();
		for (int i = 0; i < idArr.length; i++) {
			idList.add(new Object[] { idArr[i] });
		}
		return idList;
	}

	/**
	 * @return the queryByPoolName
	 */
	public String getQueryByPoolName() {
		return queryByPoolName;
	}

	/**
	 * @param queryByPoolName the queryByPoolName to set
	 */
	public void setQueryByPoolName(String queryByPoolName) {
		this.queryByPoolName = queryByPoolName;
	}

	/**
	 * 创建方法SQL
	 * 
	 * @param sqlList
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private String createSql(List<Map<String, Object>> sqlList) {
		String sql = "";
		for (Iterator iterator = sqlList.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			sql += map.get("content");
		}
		return sql;
	}

	/**
	 * 创建方法内容明细
	 * 
	 * @param methodId
	 * @param sql
	 * @return
	 */
	private List<Object[]> createSqlList(int methodId, String sql) {
		int len = sql.length();
		int line = 0;
		List<Object[]> param = new ArrayList<Object[]>();
		while (len > 2000) {
			param.add(new Object[] { methodId, line, sql.substring(0, 2000) });
			sql = sql.substring(2000);
			len = sql.length();
			line++;
		}
		if (len > 0)
			param.add(new Object[] { methodId, line, sql });
		return param;
	}

	private String[] createOutParam(String outParam) {
		if (null == outParam || !outParam.contains(","))
			return new String[] {};
		return outParam.split(",");
	}

	/**
	 * 根据方法名获取方法
	 * 
	 * @param methodName
	 * @return
	 */
	private MethodBean queryMethodBean(String methodName, String poolName) {
		return jdbcTemplate.queryForObject(this.query, new Object[] { methodName, poolName },
				new BeanPropertyRowMapper<MethodBean>(MethodBean.class));
	}

	/**
	 * 创建分页SQL
	 * 
	 * @param sql
	 * @param gridBean
	 * @return String
	 */
	private String createPageSql(String sql, GridBean gridBean) {
		String dial = gridBean.getDial().toLowerCase();
		StringBuffer pageSql = new StringBuffer();
		int startNum = (gridBean.getCurPage() - 1) * gridBean.getRpp();
		int endNum = startNum + gridBean.getRpp();
		String sort = gridBean.getSortQuery();
		String filter = gridBean.getFilterQuery();
		if (StringUtils.isEmpty(sort))
			sort = "";
		if (StringUtils.isEmpty(filter))
			filter = "";
		if ("mysql".equals(dial)) {
			pageSql.append("SELECT tmp_tb.* FROM (");
			pageSql.append(sql);
			pageSql.append(") tmp_tb");
			pageSql.append(filter);
			pageSql.append(sort);
			pageSql.append(" LIMIT " + startNum + "," + endNum);
		} else if ("oracle".equals(dial)) {
			pageSql.append("select * from (select tmp_tb.*,ROWNUM row_id from (");
			pageSql.append(sql);
			pageSql.append(") tmp_tb ");
			pageSql.append(filter);
			pageSql.append(sort);
			pageSql.append(" where ROWNUM<=");
			pageSql.append(endNum);
			pageSql.append(") where row_id>");
			pageSql.append(startNum);
		} else if ("microsoft sql server".equals(dial)) {
			pageSql.append("SELECT top ");
			pageSql.append(endNum - startNum);
			pageSql.append(" row_number() over(");
			pageSql.append(sort);
			pageSql.append(") as row_id,tmp_tb.* FROM (");
			pageSql.append(sql);
			pageSql.append(") tmp_tb");
			pageSql.append(filter);
			pageSql.append(sort);
			pageSql.append(" WHERE row_id");
			pageSql.append(startNum);
		}
		return pageSql.toString();
	}

	/**
	 * 简单SQL执行
	 * 
	 * @param sql
	 * @param gridBean
	 * @return String
	 */
	@Transactional
	public void sqlRunner(String poolName, String sql) {
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(poolName);
		databaseBean.getJdbcTemplate().execute(sql);
	}

	/**
	 * 执行表格控件查询
	 * 
	 * @param methodName
	 * @param paramMap
	 * @param gridBean
	 * @throws Exception
	 */
	public void execMethodForGrid(GridBean gridBean) throws Exception {
		String methodName = gridBean.getMethodName();
		String poolName = gridBean.getPoolName();

		MethodBean methodBean = new MethodBean();
		try {
			methodBean = this.query(methodName, poolName);
		} catch (Exception e) {
		}
		if (null == methodBean.getMethodName()) {
			if ("databaseList".equals(methodName)) {
				methodBean.setMethodName("databaseList");
				methodBean.setPoolName("normal");
				methodBean.setSqlType("LISTONLY");
				methodBean.setSql(databaseServiceImpl.getQueryList().replace(";", ""));
			}
			if ("methodList".equals(methodName)) {
				methodBean.setMethodName("methodList");
				methodBean.setPoolName("normal");
				methodBean.setSqlType("LISTONLY");
				methodBean.setSql(this.queryList.replace(";", ""));
			}
		}
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(methodBean.getPoolName());
		gridBean.setDial(databaseBean.getDial());
		String sql = methodBean.getSql();
		if (gridBean.getCurPage() > 0) {
			String countSql = "select count(0) as num";
			countSql += " from (" + sql + ")  tmp_count";
			countSql += gridBean.getFilterQuery();
			gridBean.setTotalRecords(Integer.valueOf(String.valueOf(databaseBean.getNamedParameterJdbcTemplate()
					.queryForMap(countSql, gridBean.getFilterParam()).get("num"))));
			sql = this.createPageSql(sql, gridBean);
		}
		switch (methodBean.getSqlType()) {
		case LISTONLY:
			gridBean.setData(databaseBean.getNamedParameterJdbcTemplate().queryForList(sql, gridBean.getFilterParam()));
			break;
		default:
			break;
		}
	}

	/**
	 * 执行方法
	 * 
	 * @param methodName
	 * @param paramMap
	 * @return Map<String,Object>
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> execMethod(String methodName, String poolName, Map<String, Object> paramMap)
			throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(poolName);
		MethodBean methodBean = this.query(methodName, poolName);
		ProcedureJdbcTemplate procedureJdbcTemplate = new ProcedureJdbcTemplate(
				databaseBean.getNamedParameterJdbcTemplate());
		TransactionBean beginTran;
		switch (methodBean.getSqlType()) {
		case PROCEDURE:
			map = procedureJdbcTemplate.call(methodBean.getSql(), paramMap, methodBean.getRsStatus(),
					this.createOutParam(methodBean.getOutParam()));
			break;
		case MAPONLY:
			map.put("map", databaseBean.getNamedParameterJdbcTemplate().queryForMap(methodBean.getSql(), paramMap));
			break;
		case LISTONLY:
			map.put("list", databaseBean.getNamedParameterJdbcTemplate().queryForList(methodBean.getSql(), paramMap));
			break;
		case TRANSITION:
			beginTran = databaseBean.BeginTran();
			try {
				map = procedureJdbcTemplate.call(methodBean.getSql(), paramMap, methodBean.getRsStatus(),
						this.createOutParam(methodBean.getOutParam()));
				beginTran.commit();
			} catch (Exception e) {
				beginTran.rollback();
			}
			break;
		case BATCH:
			beginTran = databaseBean.BeginTran();
			try {
				map.put("batch", databaseBean.getNamedParameterJdbcTemplate().batchUpdate(methodBean.getSql(),
						(Map<String, Object>[]) paramMap.get("batch")));
				beginTran.commit();
			} catch (Exception e) {
				beginTran.rollback();
			}
			break;
		default:
			break;
		}
		return map;
	}

	/**
	 * 获取方法列表结果集
	 * 
	 * @return List<Map<String,Object>>
	 */
	@CacheEvict(value = "methodService", key = "#methodBean.methodName+#methodBean.poolName")
	@Transactional
	public int[] insert(MethodBean methodBean) {
		jdbcTemplate.update(this.insert,
				new Object[] { methodBean.getMethodName(), methodBean.getDocument(), methodBean.getPoolName(),
						methodBean.getOutParam(), methodBean.getSqlType().toString(), methodBean.getRsStatus() });
		MethodBean newMethodBean = queryMethodBean(methodBean.getMethodName(), methodBean.getPoolName());
		return jdbcTemplate.batchUpdate(this.insertSub,
				this.createSqlList(newMethodBean.getMethodId(), methodBean.getSql()));
	}

	/**
	 * 获取方法列表结果集
	 * 
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryList() {
		return jdbcTemplate.queryForList(this.queryList);
	}

	/**
	 * 获取方法列表结果集
	 * 
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryListByPoolName(String poolName) {
		return jdbcTemplate.queryForList(this.queryByPoolName, new Object[] { poolName });
	}

	/**
	 * 获取方法结果集
	 * 
	 * @param name
	 * @return Map<String,Object>
	 */
	@Cacheable(value = "methodService", key = "#methodName+#poolName")
	public MethodBean query(String methodName, String poolName) {
		MethodBean methodBean = null;
		try {
			methodBean = this.queryMethodBean(methodName, poolName);
			if (null == methodBean)
				return null;
		} catch (Exception e) {
			return null;
		}

		List<Map<String, Object>> methodSql = jdbcTemplate.queryForList(this.querySub,
				new Object[] { methodBean.getMethodId() });
		methodBean.setSql(this.createSql(methodSql));
		return methodBean;
	}

	/**
	 * 更新方法
	 * 
	 * @param name
	 * @return Map<String,Object>
	 */
	@CacheEvict(value = "methodService", key = "#methodBean.methodName+#methodBean.poolName")
	@Transactional
	public int update(MethodBean methodBean) {
		MethodBean oldMethodBean = this.query(methodBean.getMethodName(), methodBean.getPoolName());
		String sql = methodBean.getSql();
		jdbcTemplate.update(this.deleteSub, new Object[] { oldMethodBean.getMethodId() });
		jdbcTemplate.batchUpdate(this.insertSub, this.createSqlList(oldMethodBean.getMethodId(), sql));
		return jdbcTemplate.update(this.update,
				new Object[] { methodBean.getMethodName(), methodBean.getDocument(), methodBean.getPoolName(),
						methodBean.getOutParam(), methodBean.getSqlType().toString(), methodBean.getRsStatus(),
						oldMethodBean.getMethodId() });
	}

	/**
	 * 删除方法
	 * 
	 * @param name
	 * @return Map<String,Object>
	 */
	@CacheEvict(value = "methodService", allEntries = true)
	@Transactional
	public int deleteByIds(String methodIds) {
		List<Object[]> idList = createIds(methodIds);
		jdbcTemplate.batchUpdate(this.deleteSub, idList);
		return jdbcTemplate.batchUpdate(this.delete, idList)[0];
	}

	/**
	 * 创建方法源基本表
	 */
	@Transactional
	public void createTable() {
		jdbcTemplate.execute(this.table);
		jdbcTemplate.execute(this.tableSub);
	}

	/**
	 * 创建方法表语句
	 * 
	 * @return String
	 */
	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	/**
	 * 创建方法子表语句
	 * 
	 * @return String
	 */
	public String getTableSub() {
		return tableSub;
	}

	public void setTableSub(String tableSub) {
		this.tableSub = tableSub;
	}

	/**
	 * 新增方法表语句
	 * 
	 * @return String
	 */
	public String getInsert() {
		return insert;
	}

	public void setInsert(String insert) {
		this.insert = insert;
	}

	/**
	 * 新增方法子表语句
	 * 
	 * @return String
	 */
	public String getInsertSub() {
		return insertSub;
	}

	public void setInsertSub(String insertSub) {
		this.insertSub = insertSub;
	}

	/**
	 * 查询方法表语句
	 * 
	 * @return String
	 */
	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	/**
	 * 查询方法子表语句
	 * 
	 * @return String
	 */
	public String getQuerySub() {
		return querySub;
	}

	public void setQuerySub(String querySub) {
		this.querySub = querySub;
	}

	/**
	 * 查询方法表列表语句
	 * 
	 * @return String
	 */
	public String getQueryList() {
		return queryList;
	}

	public void setQueryList(String queryList) {
		this.queryList = queryList;
	}

	/**
	 * 更新方法表语句
	 * 
	 * @return String
	 */
	public String getUpdate() {
		return update;
	}

	public void setUpdate(String update) {
		this.update = update;
	}

	/**
	 * 删除方法表语句
	 * 
	 * @return String
	 */
	public String getDelete() {
		return delete;
	}

	public void setDelete(String delete) {
		this.delete = delete;
	}

	/**
	 * 删除方法子表语句
	 * 
	 * @return String
	 */
	public String getDeleteSub() {
		return deleteSub;
	}

	public void setDeleteSub(String deleteSub) {
		this.deleteSub = deleteSub;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
	}

	@Override
	public void setBeanClassLoader(ClassLoader classLoader) {
	}

}

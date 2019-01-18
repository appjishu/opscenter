package com.appjishu.opscenter.db.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import com.appjishu.opscenter.db.bean.DatabaseBean;
import com.appjishu.opscenter.db.bean.ProcedureBean;
import com.appjishu.opscenter.db.bean.TableBean;

/**
 * 存储过程管理类
 * 
 * @author Dennie 2017-09-17
 */
@Service
@ConfigurationProperties(prefix = "ingrid.procedure.mssql")
public class MssqlProcedureServiceImpl implements BeanClassLoaderAware, InitializingBean {

	private String queryList;
	private String queryText;
	private String queryTableList;
	private String queryColums;

	/**
	 * 创建存储过程内容
	 * 
	 * @param sqlList
	 * @return String
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private String createText(List<Map<String, Object>> textList) {
		String content = "";
		for (Iterator iterator = textList.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			content += map.get("text");
		}
		return content;
	}

	/**
	 * 读取存储过程列表
	 * 
	 * @param procedureBean
	 * @return List<Map<String,Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> queryList(DatabaseBean databaseBean, ProcedureBean procedureBean) {
		return databaseBean.getJdbcTemplate().queryForList(this.queryList);
	}

	/**
	 * 查询存储过程内容
	 * 
	 * @param procedureBean
	 * @return ProcedureBean
	 * @throws Exception
	 */
	public ProcedureBean query(DatabaseBean databaseBean, ProcedureBean procedureBean) {
		List<Map<String, Object>> textList = databaseBean.getJdbcTemplate().queryForList(this.queryText,
				new Object[] { procedureBean.getName() });
		procedureBean.setText(this.createText(textList));
		return procedureBean;
	}

	/**
	 * 读取数据表列表
	 * 
	 * @param procedureBean
	 * @return List<Map<String,Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> queryTableList(DatabaseBean databaseBean, TableBean tableBean) {
		return databaseBean.getJdbcTemplate().queryForList(this.queryTableList);
	}

	/**
	 * 获取字段列表
	 * 
	 * @param tableBean
	 * @return TableBean
	 * @throws Exception
	 */
	public TableBean queryColums(DatabaseBean databaseBean, TableBean tableBean) {
		tableBean.setMssqlColumns(databaseBean.getJdbcTemplate().queryForList(this.queryColums,
				new Object[] { tableBean.getName(), tableBean.getName(), tableBean.getName(), tableBean.getName() }));
		return tableBean;
	}

	/**
	 * 存储过程列表
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
	 * 存储过程内容
	 * 
	 * @return String
	 */
	public String getQueryText() {
		return queryText;
	}

	public void setQueryText(String queryText) {
		this.queryText = queryText;
	}

	/**
	 * 获取表列表
	 * 
	 * @return String
	 */
	public String getQueryTableList() {
		return queryTableList;
	}

	public void setQueryTableList(String queryTableList) {
		this.queryTableList = queryTableList;
	}

	/**
	 * 获取字段列表
	 * 
	 * @return String
	 */
	public String getQueryColums() {
		return queryColums;
	}

	public void setQueryColums(String queryColums) {
		this.queryColums = queryColums;
	}

	@Override
	public void afterPropertiesSet() {
		// TODO Auto-generated method stub

	}

	@Override
	public void setBeanClassLoader(ClassLoader classLoader) {
		// TODO Auto-generated method stub

	}
}

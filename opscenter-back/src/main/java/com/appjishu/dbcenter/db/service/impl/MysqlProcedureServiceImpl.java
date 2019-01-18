package com.appjishu.dbcenter.db.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import com.appjishu.dbcenter.db.bean.DatabaseBean;
import com.appjishu.dbcenter.db.bean.ProcedureBean;
import com.appjishu.dbcenter.db.bean.TableBean;

/**
 * 存储过程管理类
 * 
 * @author Dennie 2017-09-17
 */
@Service
@ConfigurationProperties(prefix = "ingrid.procedure.mysql")
public class MysqlProcedureServiceImpl implements BeanClassLoaderAware, InitializingBean {

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
			try {
				String name = (String) map.get("name");
				byte[] param_list = (byte[]) map.get("param_list");
				byte[] body = (byte[]) map.get("body");
				content += "DROP PROCEDURE IF EXISTS `" + name + "`; \r\n";
				content += "CREATE DEFINER=`root`@`%` PROCEDURE `" + name + "`(";
				content += new String(param_list, "UTF-8");
				content += ") \r\n";
				content += new String(body, "UTF-8") + "\r\n";
			} catch (UnsupportedEncodingException e) {
			}
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
		return databaseBean.getJdbcTemplate().queryForList(this.queryList, new Object[] { procedureBean.getDb() });
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
				new Object[] { procedureBean.getDb(), procedureBean.getName() });
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
		return databaseBean.getJdbcTemplate().queryForList(this.queryTableList, new Object[] { tableBean.getDb() });
	}

	/**
	 * 获取字段列表
	 * 
	 * @param tableBean
	 * @return TableBean
	 * @throws Exception
	 */
	public TableBean queryColums(DatabaseBean databaseBean, TableBean tableBean) {
		List<Map<String, Object>> list = databaseBean.getJdbcTemplate()
				.queryForList(this.queryColums + " " + tableBean.getName());
		List<Map<String, Object>> newList = new ArrayList<Map<String, Object>>();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Map<String, Object> temp = list.get(i);
			Map<String, Object> column = new HashMap<String, Object>();
			column.put("field", temp.get("Field"));
			column.put("defaultx", temp.get("Default"));
			column.put("extra", temp.get("Extra"));
			column.put("keyx", temp.get("Key"));
			column.put("nullStatus", temp.get("Null"));
			column.put("type", temp.get("Type"));
			column.put("comment", temp.get("Comment"));
			newList.add(column);
		}
		tableBean.setMysqlColumns(newList);
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

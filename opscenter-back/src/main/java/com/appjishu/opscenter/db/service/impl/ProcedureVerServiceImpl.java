package com.appjishu.opscenter.db.service.impl;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.appjishu.opscenter.db.bean.DatabaseBean;
import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.db.bean.ProcedureBean;
import com.appjishu.opscenter.db.bean.TableBean;
import com.appjishu.opscenter.db.service.DatabaseService;
import com.appjishu.opscenter.db.service.ProcedureVerService;
import com.appjishu.opscenter.util.ResultSetUtil;
import com.zaxxer.hikari.HikariDataSource;

/**
 * 存储过程版本管理类
 * 
 * @author Dennie 2017-09-17
 */
@Service
@ConfigurationProperties(prefix = "ingrid.procedure.ver")
public class ProcedureVerServiceImpl implements BeanClassLoaderAware, InitializingBean, ProcedureVerService {
	@Resource
	private JdbcTemplate jdbcTemplate;

	@Autowired
	DatabaseService databaseServiceImpl;

	@Autowired
	private MssqlProcedureServiceImpl mssqlProcedureServiceImpl;

	@Autowired
	private MysqlProcedureServiceImpl mysqlProcedureServiceImpl;

	private String table;
	private String tableSub;
	private String insertVer;
	private String insertVerText;
	private String queryVer;
	private String queryVerText;

	private String getMysqlDb(HikariDataSource dataSource) {
		String dbName = "";
		String jdbcUrl = dataSource.getJdbcUrl();
		Pattern p = Pattern.compile("jdbc:mysql://(.*?)/(.*?)\\?");
		Matcher m = p.matcher(jdbcUrl);
		if (m.find()) {
			dbName = m.group(2);
		}
		return dbName;
	}

	/**
	 * 读取存储过程列表
	 * 
	 * @param procedureBean
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryList(ProcedureBean procedureBean) {
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(procedureBean.getPoolName());
		String dial = databaseBean.getDial().toLowerCase();
		if ("mysql".equals(dial)) {
			procedureBean.setDb(getMysqlDb((HikariDataSource) databaseBean.getDataSource()));
			return mysqlProcedureServiceImpl.queryList(databaseBean, procedureBean);
		} else if ("microsoft sql server".equals(dial)) {
			return mssqlProcedureServiceImpl.queryList(databaseBean, procedureBean);
		}
		return null;
	}

	/**
	 * 查询存储过程内容
	 * 
	 * @param procedureBean
	 * @return ProcedureBean @
	 */
	public ProcedureBean query(ProcedureBean procedureBean) {
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(procedureBean.getPoolName());
		String dial = databaseBean.getDial().toLowerCase();
		if ("mysql".equals(dial)) {
			procedureBean.setDb(getMysqlDb((HikariDataSource) databaseBean.getDataSource()));
			return mysqlProcedureServiceImpl.query(databaseBean, procedureBean);
		} else if ("microsoft sql server".equals(dial)) {
			return mssqlProcedureServiceImpl.query(databaseBean, procedureBean);
		}
		return null;
	}

	/**
	 * 读取数据表列表
	 * 
	 * @param procedureBean
	 * @return List<Map<String,Object>> @
	 */
	public List<Map<String, Object>> queryTableList(TableBean tableBean) {
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(tableBean.getPoolName());
		String dial = databaseBean.getDial().toLowerCase();
		if ("mysql".equals(dial)) {
			tableBean.setDb(getMysqlDb((HikariDataSource) databaseBean.getDataSource()));
			return mysqlProcedureServiceImpl.queryTableList(databaseBean, tableBean);
		} else if ("microsoft sql server".equals(dial)) {
			return mssqlProcedureServiceImpl.queryTableList(databaseBean, tableBean);
		}
		return null;
	}

	public String setSql(String sql) {
		return "";
	}

	/**
	 * 创建存储过程方法
	 * 
	 * @param poolName,name
	 * @return MethodBean
	 */
	public MethodBean createProcedureMethod(String poolName, String name) throws SQLException {
		MethodBean methodBean = new MethodBean();
		methodBean.setPoolName(poolName);
		methodBean.setMethodName(name);
		String sql = "";
		String outParam = "";
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(poolName);
		String dial = databaseBean.getDial().toLowerCase();
		if ("mysql".equals(dial)) {
			sql = "call " + name + " (";
		} else if ("microsoft sql server".equals(dial)) {
			sql = "exec " + name;
		}
		Connection conn = null;
		ResultSet rs = null;
		Boolean[] len = new Boolean[] { false, false, false };
		try {
			conn = databaseBean.getDataSource().getConnection();
			conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			DatabaseMetaData meta = conn.getMetaData();
			rs = meta.getProcedureColumns(null, null, name, "%");
			List<Map<String, Object>> list = ResultSetUtil.parseResultSetToMapList(rs);
			for (Map<String, Object> map : list) {
				len[0] = true;
				String columnName = String.valueOf(map.get("COLUMN_NAME"));
				String columnType = String.valueOf(map.get("COLUMN_TYPE"));
				if ("mysql".equals(dial)) {
					if ("2".equals(columnType) || "4".equals(columnType)) {
						len[1] = true;
						outParam += columnName + ",";
					}
				} else if ("microsoft sql server".equals(dial)) {
					columnName = columnName.replace("@", "");
					if ("2".equals(columnType)) {
						len[2] = true;
						outParam += columnName + ",";
					}
				}
				sql += " :" + columnName + ",";
			}
		} finally {
			if (null != rs)
				rs.close();
			if (null != conn)
				conn.close();
		}
		if (len[0])
			sql = sql.substring(0, sql.length() - 1);
		if (len[1] || len[2])
			outParam = outParam.substring(0, outParam.length() - 1);
		if ("mysql".equals(dial)) {
			sql += " )";
		}
		methodBean.setSql(sql);
		methodBean.setOutParam(outParam);
		return methodBean;
	}

	/**
	 * 获取字段列表
	 * 
	 * @param tableBean
	 * @return TableBean
	 */
	public TableBean queryColums(TableBean tableBean) {
		DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean(tableBean.getPoolName());
		String dial = databaseBean.getDial().toLowerCase();
		if ("mysql".equals(dial)) {
			tableBean.setDb(getMysqlDb((HikariDataSource) databaseBean.getDataSource()));
			return mysqlProcedureServiceImpl.queryColums(databaseBean, tableBean);
		} else if ("microsoft sql server".equals(dial)) {
			return mssqlProcedureServiceImpl.queryColums(databaseBean, tableBean);
		}
		return null;
	}

	/**
	 * 存储过程版本总表
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
	 * 存储过程版本子表
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
	 * 添加版本
	 * 
	 * @return String
	 */
	public String getInsertVer() {
		return insertVer;
	}

	public void setInsertVer(String insertVer) {
		this.insertVer = insertVer;
	}

	/**
	 * 版本内容
	 * 
	 * @return String
	 */
	public String getInsertVerText() {
		return insertVerText;
	}

	public void setInsertVerText(String insertVerText) {
		this.insertVerText = insertVerText;
	}

	/**
	 * 获取版本
	 * 
	 * @return String
	 */
	public String getQueryVer() {
		return queryVer;
	}

	public void setQueryVer(String queryVer) {
		this.queryVer = queryVer;
	}

	/**
	 * 获取版本内容
	 * 
	 * @return String
	 */
	public String getQueryVerText() {
		return queryVerText;
	}

	public void setQueryVerText(String queryVerText) {
		this.queryVerText = queryVerText;
	}

	@Override
	public void afterPropertiesSet() {
	}

	@Override
	public void setBeanClassLoader(ClassLoader classLoader) {
	}
}

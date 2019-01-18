package com.appjishu.opscenter.db.bean;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.appjishu.opscenter.db.service.impl.ProcedureJdbcTemplate;

/**
 * 数据源实体类
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月16日 上午11:13:38
 * @version v1.0
 */
public class DatabaseBean {
	private String dial;
	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	private ProcedureJdbcTemplate procedureJdbcTemplate;

	/**
	 * 初始化数据源
	 * 
	 * @param dataSource
	 */
	public DatabaseBean(DataSource dataSource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
		this.procedureJdbcTemplate = new ProcedureJdbcTemplate(this.namedParameterJdbcTemplate);
		this.jdbcTemplate = this.namedParameterJdbcTemplate.getJdbcTemplate();
		this.dataSource = this.jdbcTemplate.getDataSource();
		try {
			this.dial = dataSource.getConnection().getMetaData().getDatabaseProductName();
		} catch (SQLException e) {
		}

	}

	/**
	 * 开始事务
	 * 
	 * @return TransactionBean
	 */
	public TransactionBean BeginTran() {
		TransactionBean transactionBean = new TransactionBean();
		transactionBean.setDtm(new DataSourceTransactionManager(this.dataSource));
		transactionBean.setDtf(new DefaultTransactionDefinition());
		transactionBean.setTs(transactionBean.getDtm().getTransaction(transactionBean.getDtf()));
		return transactionBean;
	}

	/**
	 * 数据源类型
	 * 
	 * @return String
	 */
	public String getDial() {
		return dial;
	}

	public void setDial(String dial) {
		this.dial = dial;
	}

	/**
	 * 真实数据源
	 * 
	 * @return DataSource
	 */
	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	/**
	 * 数据源模板
	 * 
	 * @return JdbcTemplate
	 */
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**
	 * 命名数据源模板
	 * 
	 * @return NamedParameterJdbcTemplate
	 */
	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
		return namedParameterJdbcTemplate;
	}

	public void setNamedParameterJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}

	/**
	 * 存储过程数据库模板
	 * 
	 * @return ProcedureJdbcTemplate
	 */
	public ProcedureJdbcTemplate getProcedureJdbcTemplate() {
		return procedureJdbcTemplate;
	}

	public void setProcedureJdbcTemplate(ProcedureJdbcTemplate procedureJdbcTemplate) {
		this.procedureJdbcTemplate = procedureJdbcTemplate;
	}

}

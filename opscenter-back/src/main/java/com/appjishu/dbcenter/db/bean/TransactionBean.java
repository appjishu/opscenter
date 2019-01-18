package com.appjishu.dbcenter.db.bean;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

/**
 * 事务实体类
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月16日 上午11:37:39
 * @version v1.0
 */
public class TransactionBean {
	private DataSourceTransactionManager dtm;
	private DefaultTransactionDefinition dtf ;
	private TransactionStatus ts;
	
	/**
	 * 提交事务
	 */
	public void commit() {
		this.dtm.commit(this.ts);
	}
	
	/**
	 * 回滚事务
	 */
	public void rollback() {
		this.dtm.rollback(this.ts);
	}
	
	/**
	 * 事务管理器
	 * @return DataSourceTransactionManager
	 */
	public DataSourceTransactionManager getDtm() {
		return dtm;
	}
	
	public void setDtm(DataSourceTransactionManager dtm) {
		this.dtm = dtm;
	}
	/**
	 * 默认事务定义
	 * @return DefaultTransactionDefinition
	 */
	public DefaultTransactionDefinition getDtf() {
		return dtf;
	}
	
	public void setDtf(DefaultTransactionDefinition dtf) {
		this.dtf = dtf;
	}
	
	/**
	 * 传输状态
	 * @return TransactionStatus
	 */
	public TransactionStatus getTs() {
		return ts;
	}
	
	public void setTs(TransactionStatus ts) {
		this.ts = ts;
	}	
}

package com.appjishu.dbcenter.db.bean;

import javax.persistence.EnumType;

/**
 * 方法实体类
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月21日 上午8:58:30
 * @version v1.0
 */
public class MethodBean {
	private int methodId;
	private String methodName;
	private String document;
	private String poolName;
	private String sql;
	private String outParam;
	private MethodType sqlType;
	private boolean rsStatus;

	/**
	 * 方法ID
	 * 
	 * @return
	 */
	public int getMethodId() {
		return methodId;
	}

	public void setMethodId(int methodId) {
		this.methodId = methodId;
	}

	/**
	 * 方法名
	 */
	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	/**
	 * 说明
	 */
	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	/**
	 * 数据源名
	 */
	public String getPoolName() {
		return poolName;
	}

	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}

	/**
	 * 执行sql
	 */
	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	/**
	 * 输出参数
	 */
	public String getOutParam() {
		return outParam;
	}

	public void setOutParam(String outParam) {
		this.outParam = outParam;
	}

	/**
	 * 语句类型
	 */
	public MethodType getSqlType() {
		return sqlType;
	}

	public void setSqlType(String sqlType) {
		this.sqlType = EnumType.valueOf(MethodType.class, sqlType);
	}

	/**
	 * 是否有结果集
	 */
	public boolean getRsStatus() {
		return rsStatus;
	}

	public void setRsStatus(boolean rsStatus) {
		this.rsStatus = rsStatus;
	}

}

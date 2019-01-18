package com.appjishu.dbcenter.db.bean;

import java.util.Date;

/**
 * 存储过程实体类
 * @author  Dennie 495927@QQ.com
 * @date	 2018年12月3日 下午12:30:58
 * @version v1.0
 */
public class ProcedureBean {
	private String poolName;
	private String db;
	private String name;
	private Date crdate;
	private Date refdate;
	private String text;
	private int verId;
	private Date verdate;
	
	
	/**
	 * 数据源名称
	 * @return String
	 */
	public String getPoolName() {
		return poolName;
	}
	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}
	
	/**
	 * 数据库名称
	 * @return String
	 */
	public String getDb() {
		return db;
	}
	public void setDb(String db) {
		this.db = db;
	}
	/**
	 * 存储过程名称
	 * @return String
	 */
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 创建时间
	 * @return Date
	 */
	public Date getCrdate() {
		return crdate;
	}
	public void setCrdate(Date crdate) {
		this.crdate = crdate;
	}
	
	/**
	 * 刷新时间
	 * @return Date
	 */
	public Date getRefdate() {
		return refdate;
	}
	public void setRefdate(Date refdate) {
		this.refdate = refdate;
	}
	
	/**
	 * 存储过程内容
	 * @return String
	 */
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	
	/**
	 * 版本ID
	 * @return int
	 */
	public int getVerId() {
		return verId;
	}
	public void setVerId(int verId) {
		this.verId = verId;
	}
	
	
	/**
	 * 版本时间
	 * @return Date
	 */
	public Date getVerdate() {
		return verdate;
	}
	public void setVerdate(Date verdate) {
		this.verdate = verdate;
	}
	

}

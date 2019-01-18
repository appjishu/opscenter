package com.appjishu.opscenter.db.bean;

/**
 * 方法实体类
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月21日 上午8:58:30
 * @version v1.0
 */
public class MethodSqlBean {
	private int methodId;
	private int line;
	private String content;

	/**
	 * 功能ID
	 * 
	 * @return int
	 */
	public int getMethodId() {
		return methodId;
	}

	public void setMethodId(int methodId) {
		this.methodId = methodId;
	}

	/**
	 * 功能内容
	 * 
	 * @return String
	 */
	public String getContent() {
		return content;
	}

	/**
	 * @param content the content to set
	 */
	public void setContent(String content) {
		this.content = content;
	}

	/**
	 * 行号
	 * 
	 * @return int
	 */
	public int getLine() {
		return line;
	}

	/**
	 * @param line
	 */
	public void setLine(int line) {
		this.line = line;
	}

}

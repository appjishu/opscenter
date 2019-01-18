package com.appjishu.dbcenter.db.bean;

/**
 * 操作信息
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月28日 下午1:48:51
 * @version v1.0
 */
public class MessageBean {
	private String code;
	private String message;

	public MessageBean() {
		this.code = "200";
		this.message = "success";
	}

	public MessageBean(String message) {
		this.code = "200";
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

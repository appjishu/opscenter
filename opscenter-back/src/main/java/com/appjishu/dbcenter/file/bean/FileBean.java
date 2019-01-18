package com.appjishu.dbcenter.file.bean;

import java.util.List;

/**
 * 文件实体类
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月30日 上午10:06:45
 * @version v1.0
 */
public class FileBean {
	private String filePath;
	private String fileName;
	private String fileNewName;
	private String content;
	private String code;
	private String message;
	private List<String> names;
	
	/**
	 * 文件路径
	 * @return String
	 */
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	
	/**
	 * 文件名
	 * @return String
	 */
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	/**
	 * 新文件名
	 * @return String
	 */
	public String getFileNewName() {
		return fileNewName;
	}
	public void setFileNewName(String fileNewName) {
		this.fileNewName = fileNewName;
	}
	
	
	/**
	 * 文件内容
	 * @return String
	 */
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
	/**
	 * 文件状态
	 * @return String
	 */
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	
	/**
	 * 状态信息
	 * @return String
	 */
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	/**
	 * 名称列表
	 * @return
	 */
	public List<String> getNames() {
		return names;
	}
	public void setNames(List<String> names) {
		this.names = names;
	}
	
	
}

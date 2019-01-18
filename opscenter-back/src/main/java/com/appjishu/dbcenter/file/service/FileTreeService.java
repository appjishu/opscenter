package com.appjishu.dbcenter.file.service;

import java.io.IOException;
import java.util.List;

import com.appjishu.dbcenter.file.bean.ZtreeNodeBean;

/**
 * 文件树服务接口
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月30日 上午9:24:27
 * @version v1.0
 */
public interface FileTreeService {
	/**
	 * 获取路径目录树
	 * @param basePath
	 * @return
	 */
	public List<ZtreeNodeBean> getJobTree(String basePath) ;
	
	/**
	 * 读取文件
	 * @param file
	 * @return
	 */
	public String read(String file)  throws IOException;
	
	/**
	 * 保存文件
	 * @param file_name
	 * @param content
	 * @return
	 */
	public boolean save(String file_name, String content)  throws IOException;
}

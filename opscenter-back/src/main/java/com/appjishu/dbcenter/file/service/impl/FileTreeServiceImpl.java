package com.appjishu.dbcenter.file.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import com.appjishu.dbcenter.file.bean.ZtreeNodeBean;
import com.appjishu.dbcenter.file.service.FileTreeService;


/**
 * 文件树服务
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月30日 上午8:57:15
 * @version v1.0
 */
@Service
public class FileTreeServiceImpl implements FileTreeService{

	public static void main(String[] args) {
		// FileTreeHelper fileTreeService =new FileTreeHelper();
		// List<ZtreeNodeBean> fileTree = fileTreeService.getJobTree("D:\");
		// System.out.println(fileTree);
	}

	/**
	 * 获取路径目录树
	 * @param basePath
	 * @return
	 */
	public List<ZtreeNodeBean> getJobTree(String basePath) {
		List<ZtreeNodeBean> nodes = new ArrayList<ZtreeNodeBean>();
		File baseDir = new File(basePath);
		if (baseDir.listFiles().length != 0) {
			ZtreeNodeBean node = traverse(baseDir, null);
			nodes.add(node);
		}
		return nodes;
	}

	/**
	 * 转换格式
	 * @param file
	 * @param flag
	 * @return
	 */
	private ZtreeNodeBean traverse(File file, String flag) {
		ZtreeNodeBean pathNode = new ZtreeNodeBean();
		pathNode.setId(file.getAbsolutePath());
		pathNode.setEname(file.getName());
		pathNode.setPid(file.getParent());
		pathNode.setName(file.getName());
		if (file.isDirectory()) {
			if (flag == null) {
				pathNode.setIconFlag("0");
				pathNode.setPid("-1");
			} else if (flag.equals("0")) {
				pathNode.setIconFlag("1");
			} else {
				pathNode.setIconFlag("2");
			}
			pathNode.setParent(true);
			List<ZtreeNodeBean> subNodes = new ArrayList<ZtreeNodeBean>();
			int size = 0;
			File[] subFiles = file.listFiles();
			if (null != subFiles) {
				for (File subFile : subFiles) {
					ZtreeNodeBean subNode = traverse(subFile, pathNode.getIconFlag());
					if (subNode != null) {
						subNodes.add(subNode);
						size += subNode.getSize();
					}
				}
			}
			pathNode.setChildren(subNodes);
			pathNode.setSize(size);
		} else {
			pathNode.setParent(false);
			pathNode.setSize(1);
			pathNode.setIconFlag("3");
		}
		return pathNode;
	}

	/**
	 * 读取文件
	 * @param file
	 * @return
	 * @throws Exception 
	 */
	public String read(String file) throws IOException {
		StringBuilder result = new StringBuilder();
		try {
			// 构造一个BufferedReader类来读取文件
			BufferedReader br = new BufferedReader(new FileReader(file));
			String s = null;
			// 使用readLine方法，一次读一行
			while ((s = br.readLine()) != null) {
				result.append(System.lineSeparator() + s);
			}
			br.close();
		} catch (IOException e) {
			throw e;
		}
		return result.toString();
	}

	/**
	 * 保存文件
	 * @param file_name
	 * @param content
	 * @return
	 * @throws IOException 
	 */
	public boolean save(String file_name, String content) throws IOException {
		boolean stauts = false;
		FileOutputStream fop = null;
		File file;
		try {
			file = new File(file_name);
			fop = new FileOutputStream(file);
			if (!file.exists()) {
				file.createNewFile();
			}
			byte[] contentInBytes = content.getBytes();
			fop.write(contentInBytes);
			fop.flush();
			fop.close();
			stauts = true;
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				if (fop != null) {
					fop.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return stauts;
	}
}

package com.appjishu.dbcenter.web;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ClassUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.appjishu.dbcenter.file.bean.FileBean;
import com.appjishu.dbcenter.file.bean.ZtreeNodeBean;
import com.appjishu.dbcenter.file.service.FileTreeService;

/**
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月30日 上午9:21:22
 * @version v1.0
 */
@RestController
@RequestMapping(value = "/project")
public class FileController {
	@Autowired
	FileTreeService fileTreeServiceImpl;

	private String INIT_SQL = "initSql.sql";

	/**
	 * 项目根路径
	 */
	private String root = ClassUtils.getDefaultClassLoader().getResource("").getPath();

	/**
	 * 路径标识符
	 */
	private String SEPARATOR = FileSystems.getDefault().getSeparator();

	/**
	 * 创建文件夹
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	private FileBean createFolder(FileBean fileBean) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件创建成功");
			File file = new File(fileBean.getFileName());
			file.mkdir();
		} catch (Exception e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件夹创建失败");
		}
		return fileBean;
	}

	/**
	 * 创建文件
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	private FileBean createFile(FileBean fileBean) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件创建成功");
			fileTreeServiceImpl.save(fileBean.getFileName(), "");
			fileBean.setContent(fileTreeServiceImpl.read(fileBean.getFileName()));
		} catch (IOException e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件创建失败");
		}
		return fileBean;
	}

	/**
	 * 创建文件
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	@RequestMapping(value = "/initsqlfile")
	public FileBean initSqlFile() {
		FileBean fileBean = new FileBean();
		fileBean.setFileName(root + SEPARATOR + INIT_SQL);
		FileBean fileBeanOld = this.fileRead(fileBean);
		if (fileBeanOld.getCode().equals("500")) {
			fileBean.setContent("");
			return fileBean;
		}
		return fileBeanOld;
	}

	/**
	 * 获取文件树
	 * 
	 * @return List<ZtreeNodeBean>
	 */
	@RequestMapping(value = "/filetree")
	public List<ZtreeNodeBean> fileTree() {
		List<ZtreeNodeBean> tree = fileTreeServiceImpl.getJobTree(root);
		return tree;
	}

	/**
	 * 创建文件
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	@RequestMapping(value = "/filecreate")
	public FileBean fileCreate(FileBean fileBean) {
		if (fileBean.getFileName().indexOf(".") > 0) {
			return createFile(fileBean);
		} else {
			return createFolder(fileBean);
		}
	}

	/**
	 * 读取文件
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	@RequestMapping(value = "/fileread")
	public FileBean fileRead(FileBean fileBean) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件已读取");
			String content = fileTreeServiceImpl.read(fileBean.getFileName());
			fileBean.setContent(content);
		} catch (Exception e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件读取失败: " + e.getMessage());
		}
		return fileBean;
	}

	/**
	 * 文件保存
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	@RequestMapping(value = "/filesave")
	public FileBean fileSave(FileBean fileBean) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件已保存");
			fileTreeServiceImpl.save(fileBean.getFileName(), fileBean.getContent());
			fileBean.setContent(fileTreeServiceImpl.read(fileBean.getFileName()));
		} catch (Exception e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件保存失败: " + e.getMessage());
		}
		return fileBean;
	}

	/**
	 * 文件上传
	 * 
	 * @param file
	 * @param fileBean
	 * @return FileBean
	 */
	@RequestMapping(value = "/fileupload", method = RequestMethod.POST)
	public FileBean fileUpload(@RequestParam(value = "file") MultipartFile file, FileBean fileBean) {
		String fileName = FilenameUtils.getName(file.getOriginalFilename());
		fileBean.setFileName(fileBean.getFilePath() + SEPARATOR + fileName);
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件上传成功");
			ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(file.getBytes());
			FileOutputStream outputStream = new FileOutputStream(fileBean.getFileName());
			FileCopyUtils.copy(byteArrayInputStream, outputStream);
			byteArrayInputStream.close();
			outputStream.flush();
			fileBean.setContent(fileTreeServiceImpl.read(fileBean.getFileName()));
		} catch (IOException e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件上传失败: " + e.getMessage());
		}
		return fileBean;
	}

	/**
	 * 文件重命名
	 * 
	 * @param fileBean
	 * @return FileBean
	 */
	@RequestMapping(value = "/filerename")
	public FileBean fileRename(FileBean fileBean) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件重命名成功");
			File file = new File(fileBean.getFileName());
			assert file.exists();
			file.renameTo(new File(fileBean.getFileNewName()));
		} catch (Exception e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件重命名失败: " + e.getMessage());
		}
		return fileBean;
	}

	/**
	 * 文件复制
	 * 
	 * @param names
	 * @param fileBean
	 * @param session
	 * @return FileBean
	 */
	@RequestMapping(value = "/filecopy")
	public FileBean fileCopy(FileBean fileBean, HttpSession session) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件已复制");
			session.setAttribute("command", "copy");
			session.setAttribute("sourcePath", fileBean.getFilePath());
			session.setAttribute("names", fileBean.getNames());
		} catch (Exception e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件复制失败: " + e.getMessage());
		}
		return fileBean;
	}

	/**
	 * 文件剪切
	 * 
	 * @param names
	 * @param fileBean
	 * @param session
	 * @return FileBean
	 */
	@RequestMapping(value = "/filemove")
	public FileBean fileMove(FileBean fileBean, HttpSession session) {
		try {
			fileBean.setCode("200");
			fileBean.setMessage("文件已剪切");
			session.setAttribute("command", "move");
			session.setAttribute("sourcePath", fileBean.getFilePath());
			session.setAttribute("names", fileBean.getNames());
		} catch (Exception e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件剪切失败: " + e.getMessage());
		}
		return fileBean;
	}

	/**
	 * 文件粘贴
	 * 
	 * @param fileBean
	 * @param session
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/filepaste")
	public FileBean filePaste(FileBean fileBean, HttpSession session) {
		try {
			String sourcePath = (String) session.getAttribute("sourcePath");
			String command = (String) session.getAttribute("command");
			List<String> names = (List<String>) session.getAttribute("names");
			if (names == null) {
				fileBean.setCode("400");
				fileBean.setMessage("没有需要粘贴的文件");
				return fileBean;
			}
			fileBean.setCode("200");
			fileBean.setMessage("文件已粘贴");
			for (String name : names) {
				File sourceFile = new File(sourcePath + SEPARATOR + name);
				if (sourceFile.isFile()) {
					File targetFile = new File(fileBean.getFilePath() + SEPARATOR + name);
					if ("copy".equals(command))
						FileUtils.copyFile(sourceFile, targetFile);
					else if ("move".equals(command))
						FileUtils.moveFile(sourceFile, targetFile);
				} else {
					File targetPath = new File(fileBean.getFilePath());
					if ("copy".equals(command))
						FileUtils.copyDirectoryToDirectory(sourceFile, targetPath);
					else if ("move".equals(command))
						FileUtils.moveDirectoryToDirectory(sourceFile, targetPath, true);
				}
			}
		} catch (IOException e) {
			fileBean.setCode("500");
			fileBean.setMessage("文件粘贴失败: " + e.getMessage());
		}
		return fileBean;
	}

}

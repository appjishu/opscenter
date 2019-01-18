package com.appjishu.opscenter.rpt.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.bstek.ureport.provider.report.ReportFile;
import com.bstek.ureport.provider.report.ReportProvider;

/**
 * 报表存储服务
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月22日 上午10:32:41
 * @version v1.0
 */
@ConfigurationProperties(prefix = "ingrid.report")
@Service
public class ReportProviderImpl implements ReportProvider{
	@Resource
	private JdbcTemplate jdbcTemplate;
	
	private String table;
	private String insert;
	private String query;
	private String queryList;
	private String update;
	private String delete;
	private String check;
	
	private boolean disabled ;
	private String prefix;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private List<ReportFile> createReportFileList(List<Map<String,Object>> list){
		List<ReportFile> reportFileList = new ArrayList<ReportFile>();
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			String name = String.valueOf(map.get("name"));
			Date  updateDate = (Date)map.get("updateDate");
			reportFileList.add(new ReportFile(name, updateDate));
		}
		return reportFileList;
	}
	
    
	@Override
	public InputStream loadReport(String file) {
		if(file.startsWith(prefix)) file=file.substring(prefix.length(),file.length());
		InputStream InputStream;
		try {
			Map<String, Object> map = jdbcTemplate.queryForMap(this.query, new Object[] {file});
			InputStream = new ByteArrayInputStream(String.valueOf(map.get("content")).getBytes("utf-8"));
			return InputStream;
		} catch ( IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void deleteReport(String file) {
		if(file.startsWith(prefix)) file=file.substring(prefix.length(),file.length());
		jdbcTemplate.update(this.delete,new Object[] {file});
	}

	
	@Override
	public List<ReportFile> getReportFiles() {
		try {
			List<Map<String, Object>> files = jdbcTemplate.queryForList(this.queryList);
			return createReportFileList(files);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public void saveReport(String file, String content) {
		if(file.startsWith(prefix)) file=file.substring(prefix.length(),file.length());
		Map<String, Object> map = jdbcTemplate.queryForMap(this.check, new Object[] {file});
		if(Integer.valueOf(String.valueOf(map.get("num")))>0) {
			jdbcTemplate.update(this.update,new Object[] {
					content,file
			});
		}else {
			jdbcTemplate.update(this.insert,new Object[] {
					file,content
			});
		}
		
	}

	@Override
	public String getName() {
		return "ingrid";
	}

	@Override
	public boolean disabled() {
		return this.disabled;
	}
	public boolean isDisabled() {
		return disabled;
	}
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	@Override
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	/**
	 * 创建报表表语句
	 * @return String
	 */
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	
	/**
	 * 新增报表表语句
	 * @return String
	 */
	public String getInsert() {
		return insert;
	}
	public void setInsert(String insert) {
		this.insert = insert;
	}

	/**
	 * 查询报表表语句
	 * @return String
	 */
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	
	/**
	 * 查询报表表列表语句
	 * @return String
	 */
	public String getQueryList() {
		return queryList;
	}
	public void setQueryList(String queryList) {
		this.queryList = queryList;
	}

	
	/**
	 * 更新报表表语句
	 * @return String
	 */
	public String getUpdate() {
		return update;
	}
	public void setUpdate(String update) {
		this.update = update;
	}
	
	/**
	 * 删除报表表语句
	 * @return String
	 */
	public String getDelete() {
		return delete;
	}
	public void setDelete(String delete) {
		this.delete = delete;
	}

	/**
	 * 检查报表语句
	 * @return String
	 */
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}


}

package com.appjishu.opscenter.web;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.appjishu.opscenter.db.bean.MessageBean;
import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.db.bean.ProcedureBean;
import com.appjishu.opscenter.db.bean.TableBean;
import com.appjishu.opscenter.db.service.DatabaseService;
import com.appjishu.opscenter.db.service.ProcedureVerService;
import com.appjishu.opscenter.util.HanyuPinyinHelper;
import com.appjishu.opscenter.util.ReflectBeanUtil;
import com.zaxxer.hikari.HikariConfig;

import io.swagger.annotations.ApiOperation;

/**
 * 功能控制类
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月30日 上午9:35:23
 * @version v1.0
 */
@RestController
@RequestMapping("/database")
public class DatabaseController {
	@Autowired
	DatabaseService databaseServiceImpl;

	@Autowired
	ProcedureVerService procedureVerServiceImpl;

	/**
	 * 获取数据源
	 * 
	 * @param poolName
	 * @return Map<String,Object>
	 */
	@ApiOperation(value = "查询具体数据源", httpMethod = "GET", notes = "查询具体功能")
	@RequestMapping(value = "/querydatabase", method = RequestMethod.GET)
	public Map<String, Object> queryDatabase(String poolName) {
		return databaseServiceImpl.query(poolName);
	}

	@GetMapping("querylist")
	public String[] queryList() {
		return databaseServiceImpl.queryPoolList();
	}

	/**
	 * 获取方法
	 * 
	 * @param methodName
	 * @return
	 */
	@RequestMapping(value = "/createdatabase", method = RequestMethod.POST)
	public MessageBean createDatabase(HikariConfig hikariConfig) {
		MessageBean messageBean = new MessageBean("创建功能成功 !");
		Map<String, Object> map = null;
		try {
			map = databaseServiceImpl.query(hikariConfig.getPoolName());
		} catch (Exception e) {
		}
		try {
			if (null != map) {
				databaseServiceImpl.update(hikariConfig);
			} else {
				databaseServiceImpl.insert(hikariConfig);
			}

		} catch (Exception e) {
			messageBean.setCode("500");
			messageBean.setMessage(e.getMessage());
		}
		return messageBean;
	}

	/**
	 * 更新数据源
	 * 
	 * @param hikariConfig
	 * @return MessageBean
	 */
	@RequestMapping(value = "/updatedatabase", method = RequestMethod.POST)
	public MessageBean updateDatabase(HikariConfig hikariConfig) {
		MessageBean messageBean = new MessageBean();
		try {
			databaseServiceImpl.update(hikariConfig);
		} catch (Exception e) {
			messageBean.setCode("500");
			messageBean.setMessage(e.getMessage());
		}
		return messageBean;
	}

	/**
	 * 删除数据源
	 * 
	 * @param ids
	 * @return MessageBean
	 */
	@RequestMapping(value = "/deletedatabase", method = RequestMethod.POST)
	public MessageBean deleteDatabase(String ids) {
		MessageBean messageBean = new MessageBean();
		try {
			databaseServiceImpl.deleteByNames(ids);
		} catch (Exception e) {
			messageBean.setCode("500");
			messageBean.setMessage(e.getMessage());
		}
		return messageBean;
	}

	@GetMapping("loadtablelist")
	public List<Map<String, Object>> queryTableList(String poolName) {
		TableBean tableBean = new TableBean();
		tableBean.setPoolName(poolName);
		return procedureVerServiceImpl.queryTableList(tableBean);
	}

	@GetMapping("loadtable")
	public TableBean queryTable(String poolName, String name) {
		TableBean tableBean = new TableBean();
		tableBean.setPoolName(poolName);
		tableBean.setName(name);
		return procedureVerServiceImpl.queryColums(tableBean);
	}

	@GetMapping("loadcolumn")
	public Map<String, Object> loadColumn(String column) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("comment", column);
		map.put("type", "varchar(32)");
		HanyuPinyinHelper hanyuPinyinHelper = new HanyuPinyinHelper();
		map.put("field", hanyuPinyinHelper.toHanyuPinyin(column));
		return map;
	}

	@PostMapping("loadcreatetable")
	public TableBean loadCreateTable(String poolName, String name, String columns) {
		String dial = databaseServiceImpl.createDatabaseBean(poolName).getDial().toLowerCase();
		TableBean tableBean = new TableBean();
		tableBean.setName(name);
		ReflectBeanUtil reflectBeanUtil = new ReflectBeanUtil();
		List<Map<String, Object>> list = reflectBeanUtil.handleJSONArray(JSON.parseArray(columns));
		if ("mysql".equals(dial)) {
			tableBean.setMysqlColumns(list);
		} else if ("microsoft sql server".equals(dial)) {
			tableBean.setMssqlColumns(list);
		}
		return tableBean;
	}

	@GetMapping("loadprocedurelist")
	public List<Map<String, Object>> queryProcedureList(String poolName) {
		ProcedureBean procedureBean = new ProcedureBean();
		procedureBean.setPoolName(poolName);
		return procedureVerServiceImpl.queryList(procedureBean);
	}

	@GetMapping("loadprocedure")
	public ProcedureBean queryProcedure(String poolName, String name) {
		ProcedureBean procedureBean = new ProcedureBean();
		procedureBean.setPoolName(poolName);
		procedureBean.setName(name);
		return procedureVerServiceImpl.query(procedureBean);
	}

	/**
	 * 创建存储过程方法
	 * 
	 * @param poolName,name
	 * @return MethodBean
	 */
	@GetMapping("queryproceduremethod")
	public MethodBean queryproceduremethod(String poolName, String name) {
		try {
			return procedureVerServiceImpl.createProcedureMethod(poolName, name);
		} catch (SQLException e) {
		}
		return null;
	}

}

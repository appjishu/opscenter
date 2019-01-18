package com.appjishu.opscenter.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.db.bean.MethodType;
import com.appjishu.opscenter.db.service.DatabaseService;
import com.appjishu.opscenter.db.service.MethodService;
import com.appjishu.opscenter.db.service.Test;
import com.appjishu.opscenter.file.bean.ZtreeNodeBean;
import com.appjishu.opscenter.file.service.FileTreeService;

@Controller
@RequestMapping("/dev")
public class DeveloperController {
	@Autowired
	Test test;
	@Autowired
	DatabaseService databaseServiceImpl;
	@Autowired
	MethodService methodServiceImpl;
	@Autowired
	FileTreeService fileTreeServiceImpl;

	private String root = ClassUtils.getDefaultClassLoader().getResource("").getPath();

	@RequestMapping("procedure")
	public String procedure(ModelMap model) {
		// databaseService.createTable();
		// model.addAttribute("aa", test.aa());
		// HikariConfig hikariConfig = new HikariConfig();
		// hikariConfig.setPoolName("dms");
		// hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
		// hikariConfig.setJdbcUrl("jdbc:mysql://61.164.47.179:2286/dms?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true");
		// hikariConfig.setUsername("root");
		// hikariConfig.setPassword("root");
		// model.addAttribute("ab", databaseService.insert(hikariConfig));
		// model.addAttribute("ac", databaseService.update(hikariConfig));
		// model.addAttribute("ad", databaseService.queryList());
		// model.addAttribute("ae", databaseService.query("dms"));
		// model.addAttribute("ae", databaseService.delete("dms"));
		try {

			// methodServiceImpl.createTable();
			MethodBean method = new MethodBean();
			method.setMethodName("kaoshi");
			method.setPoolName("dms");
			method.setOutParam("");
			method.setRsStatus(true);
			method.setSql("select * from dms_org");
			method.setSqlType(MethodType.LISTONLY.toString());
			methodServiceImpl.update(method);
			// method = methodServiceImpl.query(method.getMethodName());

			// DatabaseBean databaseBean = databaseServiceImpl.createDatabaseBean("dms");
			//
			// Map<String,Object> map = new HashMap<>();
			// map.put("aa", 9);
			// map.put("bb", 1);
			// TransactionBean transactionBean = databaseBean.BeginTran();
			// model.addAttribute("ae",databaseBean.getProcedureJdbcTemplate().call("call
			// test (:aa ,:bb)",map , true, new String[] {"bb"}));
			// model.addAttribute("ae",methodServiceImpl.execMethod(method.getMethodName(),
			// new HashMap<String,Object>()));

			// transactionBean.commit();
			// String rs =
			// databaseBean.getNamedParameterJdbcTemplate().queryForObject("select id from
			// dms_disp_config where id=:id",map,String.class);
			// model.addAttribute("ae", rs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// model.addAttribute("aa", databaseService.update("aa", "abcdefg"));

		return "/dev/procedure.html";
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("method")
	public String method(ModelMap model) {
		Map map = new HashMap<String, Object>();
		String[] sqlType = new String[] { "PROCEDURE", "READONLY", "TRANSITION", "MAPONLY", "LISTONLY" };
		boolean[] booleanList = new boolean[] { true, false };
		map.put("sqlType", sqlType);
		map.put("poolList", databaseServiceImpl.queryPoolList());
		map.put("booleanList", booleanList);
		model.addAttribute("map", map);
		return "/dev/method.html";
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("database")
	public String database(ModelMap model) {
		Map map = new HashMap<String, Object>();
		String[] sqlType = new String[] { "PROCEDURE", "READONLY", "TRANSITION", "MAPONLY", "LISTONLY" };
		boolean[] booleanList = new boolean[] { true, false };
		map.put("sqlType", sqlType);
		map.put("poolList", databaseServiceImpl.queryPoolList());
		map.put("booleanList", booleanList);
		model.addAttribute("map", map);
		return "/dev/database.html";
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("table")
	public String table(ModelMap model) {
		Map map = new HashMap<String, Object>();
		String[] sqlType = new String[] { "PROCEDURE", "READONLY", "TRANSITION", "MAPONLY", "LISTONLY" };
		boolean[] booleanList = new boolean[] { true, false };
		map.put("sqlType", sqlType);
		map.put("poolList", databaseServiceImpl.queryPoolList());
		map.put("booleanList", booleanList);
		model.addAttribute("map", map);
		return "/dev/table.html";
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("projecteditor")
	public String projectEditor(ModelMap model) {
		List<ZtreeNodeBean> tree = fileTreeServiceImpl.getJobTree(root);
		String[] sqlType = new String[] { "PROCEDURE", "READONLY", "TRANSITION", "MAPONLY", "LISTONLY" };
		boolean[] booleanList = new boolean[] { true, false };
		Map map = new HashMap<String, Object>();
		map.put("projectedTree", tree);
		map.put("sqlType", sqlType);
		map.put("poolList", databaseServiceImpl.queryPoolList());
		map.put("booleanList", booleanList);
		model.addAttribute("map", map);
		return "/dev/projecteditor";
	}

}

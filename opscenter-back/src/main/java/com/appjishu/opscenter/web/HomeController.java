package com.appjishu.opscenter.web;

import java.io.IOException;
import java.util.HashMap;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.appjishu.opscenter.db.bean.TableBean;
import com.appjishu.opscenter.db.service.impl.ProcedureVerServiceImpl;
import com.appjishu.opscenter.jwt.TokenAuthentication;
import com.appjishu.opscenter.util.NamePictureUtil;

@Controller
@RequestMapping("/")
public class HomeController {
	@Autowired
	ProcedureVerServiceImpl procedureVerServiceImpl;
	
	@Value("${appjishu.img.path}")
    private String imgPath;
	
	@RequestMapping("loginpage")
	public String loginPage(ModelMap model) {
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("name", "开发工具");
		model.addAttribute("site", map);
		return "login.html";
	}
		
	@RequestMapping("/")
	public String homePage(ModelMap model) throws IOException {
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("name", "开发工具");
		NamePictureUtil.generateImg("哈哈", HomeController.class.getResource("/").getPath()+"/static/imgs/avatar" ,"哈哈");
		map.put("avatar", "/imgs/avatar/"+"哈哈.jpg");
		model.addAttribute("site", map);
		return "index.html";
	}
	
	@RequestMapping("logoutpage")
	@ResponseBody
	public HashMap<String,Object> logoutPage(HttpServletResponse response) {
		TokenAuthentication.removeAuthentication(response);
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("status", 0);
		map.put("result", "logout");
		return map;
	}
	
	@RequestMapping("/welcome")
	public String welcome(ModelMap model) {
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("name", "开发工具");
		model.addAttribute("site", map);
		return "welcome.html";
	}
	
	@RequestMapping("modeler")
	public String modeler(ModelMap model) {
//		Map map = new HashMap<String, Object>();
//		String[] sqlType = new String[] {"PROCEDURE","READONLY","TRANSITION","MAPONLY","LISTONLY"};
//		boolean[] booleanList = new boolean[] {true,false};
//		map.put("sqlType",sqlType);
//		map.put("poolList", databaseServiceImpl.queryPoolList());
//		map.put("booleanList", booleanList);
//		model.addAttribute("map",map);
		return "/dev/modeler.html";
	}
	
	@RequestMapping("/testx")
	public String testx(ModelMap model) {
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("name", "开发工具");
		model.addAttribute("site", map);
		TableBean tableBean = new TableBean();
		tableBean.setPoolName("normal");
		try {
			map.put("aa",procedureVerServiceImpl.queryTableList(tableBean));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "/dev/procedure.html";
	}
	
}

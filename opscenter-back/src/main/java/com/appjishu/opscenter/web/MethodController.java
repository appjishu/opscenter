package com.appjishu.opscenter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.appjishu.opscenter.db.bean.MessageBean;
import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.db.service.MethodService;

import io.swagger.annotations.ApiOperation;

/**
 * 功能控制类
 * 
 * @author Dennie 495927@QQ.com
 * @date 2018年11月30日 上午9:35:23
 * @version v1.0
 */
@RestController
@RequestMapping("/method")
public class MethodController {
	@Autowired
	MethodService methodServiceImpl;

	/**
	 * 执行简单SQL
	 * 
	 * @param sql
	 * @return Map<String, Object>
	 */
	@PostMapping("sqlrunner")
	public Map<String, Object> sqlRunner(String poolName, String sql) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			methodServiceImpl.sqlRunner(poolName, sql);
			map.put("code", 200);
			map.put("message", "执行基本SQL完成 !");
		} catch (Exception e) {
			map.put("code", 500);
			map.put("message", "执行基本SQL错误:" + e.getCause());
		}
		return map;
	}

	/**
	 * 获取方法
	 * 
	 * @param methodName
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@ApiOperation(value = "查询具体功能", httpMethod = "POST", notes = "查询具体功能")
	@RequestMapping(value = "/execMethod", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public Map<String, Object> execMethod(@RequestBody String json) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> m = mapper.readValue(json, Map.class);
		try {
			return methodServiceImpl.execMethod(String.valueOf(m.get("methodName")), String.valueOf(m.get("poolName")), m);
		} catch (Exception e) {
			Map<String, Object> message = new HashMap<>();
			message.put("out_Flag", 500);
			message.put("out_nszRtn", e.getMessage());
			m.put("message", message);
			return m;
		}
		 
	}

	/**
	 * 获取方法
	 * 
	 * @param methodName
	 * @return
	 */
	@ApiOperation(value = "查询具体功能", httpMethod = "GET", notes = "查询具体功能")
	@RequestMapping(value = "/querymethod", method = RequestMethod.GET)
	public MethodBean queryMethod(@RequestParam(required = false) String methodName, String poolName) {
		return methodServiceImpl.query(methodName, poolName);
	}

	@GetMapping("/loadmethodlist")
	public List<Map<String, Object>> loadMethodList(String poolName) {
		return methodServiceImpl.queryListByPoolName(poolName);
	}

	@GetMapping("/loadmethodedit")
	public MethodBean loadMethodEdit(String poolName, String methodName) {
		return methodServiceImpl.query(methodName, poolName);
	}

	/**
	 * 获取方法
	 * 
	 * @param methodName
	 * @return
	 */
	@RequestMapping(value = "/createmethod", method = RequestMethod.POST)
	public MessageBean createMethod(MethodBean methodBean) {
		MessageBean messageBean = new MessageBean("创建功能成功 !");
		MethodBean methodBeanOld = methodServiceImpl.query(methodBean.getMethodName(), methodBean.getPoolName());
		try {
			if (null != methodBeanOld) {
				methodServiceImpl.update(methodBean);
			} else {
				methodServiceImpl.insert(methodBean);
			}

		} catch (Exception e) {
			messageBean.setCode("500");
			messageBean.setMessage(e.getMessage());
		}
		return messageBean;
	}

	/**
	 * 获取方法
	 * 
	 * @param methodName
	 * @return
	 */
	@RequestMapping(value = "/updatemethod", method = RequestMethod.POST)
	public MessageBean updateMethod(@ModelAttribute MethodBean methodBean) {
		MessageBean messageBean = new MessageBean("更新功能成功 !");
		try {
			methodServiceImpl.update(methodBean);
		} catch (Exception e) {
			messageBean.setCode("500");
			messageBean.setMessage(e.getMessage());
		}
		return messageBean;
	}

	/**
	 * 删除方法
	 * 
	 * @param methodName
	 * @return
	 */
	@RequestMapping(value = "/deletemethod", method = RequestMethod.POST)
	public MessageBean deleteMethod(@RequestParam(required = false) String methodIds) {
		MessageBean messageBean = new MessageBean("删除功能成功 !");
		try {
			methodServiceImpl.deleteByIds(methodIds);
		} catch (Exception e) {
			messageBean.setCode("500");
			messageBean.setMessage(e.getMessage());
		}
		return messageBean;
	}
}

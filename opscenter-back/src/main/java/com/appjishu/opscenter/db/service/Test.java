package com.appjishu.opscenter.db.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.appjishu.opscenter.db.bean.DatabaseBean;

@Service
public class Test {
	@Resource
	DatabaseService databaseServiceImpl;
	public Map<String,Object> aa() {
		DatabaseBean databaseBean;
		try {
			databaseBean = databaseServiceImpl.createDatabaseBean("dms");
//			TransactionBean transactionBean = databaseBean.BeginTran();
//			transactionBean.commit();
//			transactionBean.rollback();
			return databaseBean.getJdbcTemplate().queryForMap("select * from dms_org limit 1");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}
	
	public static void main(String[] args) {
	}
}

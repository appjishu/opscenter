package com.appjishu.dbcenter.rpt.service.impl;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bstek.ureport.definition.datasource.BuildinDatasource;

/**
 * ureport2调用系统数据源
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月22日 上午10:13:54
 * @version v1.0
 */
@Service
public class BuildinDatasourceImpl implements BuildinDatasource{
	@Autowired
	DataSource dataSource;
	
	@Override
	public String name() {
		return "系统数据源";
	}

	@Override
	public Connection getConnection() {
		try {
			return dataSource.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

}

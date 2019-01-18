package com.appjishu.dbcenter.db.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.appjishu.dbcenter.db.bean.MethodBean;
import com.appjishu.dbcenter.db.bean.ProcedureBean;
import com.appjishu.dbcenter.db.bean.TableBean;

public interface ProcedureVerService {

	/**
	 * 创建存储过程方法
	 * 
	 * @param poolName,name
	 * @return MethodBean
	 */
	public MethodBean createProcedureMethod(String poolName, String name) throws SQLException;

	/**
	 * 读取存储过程列表
	 * 
	 * @param procedureBean
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryList(ProcedureBean procedureBean);

	/**
	 * 查询存储过程内容
	 * 
	 * @param procedureBean
	 * @return ProcedureBean @
	 */
	public ProcedureBean query(ProcedureBean procedureBean);

	/**
	 * 读取数据表列表
	 * 
	 * @param procedureBean
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> queryTableList(TableBean tableBean);

	/**
	 * 获取字段列表
	 * 
	 * @param tableBean
	 * @return TableBean
	 */
	public TableBean queryColums(TableBean tableBean);
}

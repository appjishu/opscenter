package com.appjishu.dbcenter.db.service.impl;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.CallableStatementCreatorFactory;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.RowMapperResultSetExtractor;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.lang.Nullable;

import com.appjishu.dbcenter.db.bean.ParsedSqlBean;
import com.appjishu.dbcenter.util.ProcedureParameterUtils;


/**
 * 存储过程数据库模板
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月20日 下午3:36:15
 * @version v1.0
 */
public class ProcedureJdbcTemplate {
	
	/**
	 * 命名数据库模板
	 */
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	private final int MAX_LOOP = 999 ;
	
	/**
	 * 引自NamedParameterJdbcTemplate
	 */
	public static final int DEFAULT_CACHE_LIMIT = 256;
	
	/**
	 * 引自NamedParameterJdbcTemplate
	 */
	private volatile int cacheLimit = DEFAULT_CACHE_LIMIT;
	
	/**
	 * 引自NamedParameterJdbcTemplate
	 */
	@SuppressWarnings("serial")
	private final Map<String, ParsedSqlBean> parsedSqlCache =
			new LinkedHashMap<String, ParsedSqlBean>(DEFAULT_CACHE_LIMIT, 0.75f, true) {
				@Override
				protected boolean removeEldestEntry(Map.Entry<String, ParsedSqlBean> eldest) {
					return size() > getCacheLimit();
				}
			};
			
	/**
	 * 通过命名数据库模板创建构造器
	 * @param namedParameterJdbcTemplate
	 */
	public ProcedureJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}
	
	/**
	 * 存储过程调用
	 * @param sql 存储过程名称
	 * @param paramMap 存储过程参数
	 * @param rsStatus 是否有结果集
	 * @param outParam 输出参数
	 * @return
	 */
	public Map<String,Object> call(String sql,Map<String,Object> paramMap,boolean rsStatus,String[] outParam){
		return this.execProcedure(getCallableStatementCreator(sql, paramMap, outParam),rsStatus,outParam);
	}
	
	/**
	 * 引自NamedParameterJdbcTemplate
	 * @param sql
	 * @param paramSource
	 * @return PreparedStatementCreator
	 */
	private CallableStatementCreator getCallableStatementCreator(String sql, Map<String,Object> paramMap , String[] outParam) {
		SqlParameterSource paramSource = new MapSqlParameterSource(paramMap);
		ParsedSqlBean parsedSqlBean = getParsedSqlBean(sql);
		parsedSqlBean.setOutParam(outParam);
		String sqlToUse = ProcedureParameterUtils.substituteNamedParameters(parsedSqlBean, paramSource);
		List<SqlParameter> declaredParameters = ProcedureParameterUtils.buildSqlParameterList(parsedSqlBean, paramSource);
		CallableStatementCreatorFactory cscf = new CallableStatementCreatorFactory(sqlToUse, declaredParameters);
		return cscf.newCallableStatementCreator(paramMap);
	}

	/**
	 * 引自NamedParameterJdbcTemplate
	 * @param sql
	 * @return ParsedSql
	 */
	private ParsedSqlBean getParsedSqlBean(String sql) {
		if (getCacheLimit() <= 0) {
			return ProcedureParameterUtils.parseSqlStatement(sql);
		}
		synchronized (this.parsedSqlCache) {
			ParsedSqlBean parsedSqlBean = this.parsedSqlCache.get(sql);
			if (parsedSqlBean == null) {
				parsedSqlBean = ProcedureParameterUtils.parseSqlStatement(sql);
				this.parsedSqlCache.put(sql, parsedSqlBean);
			}
			return parsedSqlBean;
		}
	}
	
	/**
	 * 执行存储过程
	 * @param psc
	 * @param rsStatus
	 * @param outParam
	 * @return T
	 * @throws DataAccessException
	 */
	@Nullable
	private <T> T execProcedure(CallableStatementCreator csc,boolean rsStatus,String[] outParam)	throws DataAccessException {
		return namedParameterJdbcTemplate.getJdbcTemplate().execute(csc, new CallableStatementCallback<T>() {
			@SuppressWarnings("unchecked")
			@Override
			public T doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				Map<String,Object> result = new HashMap<String, Object>();
				Map<String,Object> message = new HashMap<String, Object>();
				ResultSet rs = null;
				boolean sqlExecuteStatus = false;
				int outParamLen = outParam.length;
				try {
					if(rsStatus) {
						rs = cs.executeQuery();
						result.put("rows", createRows(cs, rs));
						sqlExecuteStatus = true;
					}else {
						sqlExecuteStatus = cs.execute();
					}
					for (int i = 0; i <  outParamLen; i++) {
						message.put(outParam[i], cs.getString(outParam[i]));
					}
					message.put("sqlExecuteStatus", sqlExecuteStatus);
					result.put("message", message);
				} catch (IOException e) {
				}finally {
					JdbcUtils.closeResultSet(rs);
				}
				return (T) result;
			}
		});
	}
	
	/**
	 * 创建结果集列表
	 * @param cstmt
	 * @param rs
	 * @return List<List<Map<String, Object>>>
	 * @throws IOException
	 */
	public List<List<Map<String, Object>>> createRows(PreparedStatement ps, ResultSet rs) throws IOException{
		List<List<Map<String, Object>>> list = new ArrayList<>();
		RowMapperResultSetExtractor<Map<String, Object>> rse = new RowMapperResultSetExtractor<>(new ColumnMapRowMapper());
		boolean label = true;
		int health = 0;
		while(label){
			try {
				rs=ps.getResultSet();
				if(rs !=null){
					list.add(rse.extractData(rs));
			    	label = ps.getMoreResults();
			    	health++;
			    	if(health > MAX_LOOP) break;
					continue;
			    }
			    label = false;
			} catch (SQLException e) {
				label = false;
			}
		}
		return list;
	}
	
	public int getCacheLimit() {
		return cacheLimit;
	}

	public void setCacheLimit(int cacheLimit) {
		this.cacheLimit = cacheLimit;
	}			
}

package com.appjishu.dbcenter.grid.bean;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class GridBean {
	private String methodName;
	private String poolName;
	private int totalRecords;
	private int curPage;
	private int rpp;
	private String dial;
	private String sortQuery;
	private String filterQuery;
	private Map<String, Object> filterParam;
	private List<Map<String, Object>> data;
	private String code;
	private String message;

	public GridBean() {
		this.code = "200";
		this.message = "success";
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getPoolName() {
		return poolName;
	}

	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		if (curPage == 0)
			curPage = 1;
		this.curPage = curPage;
	}

	public int getRpp() {
		return rpp;
	}

	public void setRpp(int rpp) {
		this.rpp = rpp;
	}

	public String getDial() {
		return dial;
	}

	public void setDial(String dial) {
		this.dial = dial;
	}

	public String getSortQuery() {
		if (StringUtils.isEmpty(sortQuery) || "null".equals(sortQuery))
			return "";
		return sortQuery;
	}

	public void setSortQuery(String sortQuery) {
		if (StringUtils.isEmpty(sortQuery) || "null".equals(sortQuery))
			sortQuery = "";
		this.sortQuery = sortQuery;
	}

	public String getFilterQuery() {
		if (StringUtils.isEmpty(filterQuery) || "null".equals(filterQuery))
			return "";
		return filterQuery;
	}

	public void setFilterQuery(String filterQuery) {
		if (StringUtils.isEmpty(filterQuery) || "null".equals(filterQuery))
			filterQuery = "";
		this.filterQuery = filterQuery;
	}

	public Map<String, Object> getFilterParam() {
		return filterParam;
	}

	public void setFilterParam(Map<String, Object> filterParam) {
		this.filterParam = filterParam;
	}

	public List<Map<String, Object>> getData() {
		return data;
	}

	public void setData(List<Map<String, Object>> data) {
		this.data = data;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}

package com.appjishu.dbcenter.grid.service;

import com.appjishu.dbcenter.grid.bean.GridBean;

public interface GridService {
	/**
	 * 调用grid方法
	 * @param curPage
	 * @param methodName
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	public GridBean gridMethod(String pq_method, String pq_filter, int pq_curpage, int pq_rpp,  String pq_sort) throws Exception ;
	
}

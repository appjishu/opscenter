package com.appjishu.dbcenter.grid.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appjishu.dbcenter.db.service.MethodService;
import com.appjishu.dbcenter.grid.bean.GridBean;
import com.appjishu.dbcenter.grid.service.GridService;
import com.appjishu.dbcenter.grid.util.FilterHelper;
import com.appjishu.dbcenter.grid.util.SortHelper;

@Service
public class GridServiceImpl implements GridService{
	@Autowired
	MethodService methodServiceImpl; 
		
	/**
	 * 调用grid方法
	 * @param curPage
	 * @param methodName
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public GridBean gridMethod(String pq_method, String pq_filter, int pq_curpage, int pq_rpp,  String pq_sort) {
		String formatDate = "yyyy-MM-dd hh:mm:ss";
		String filterQuery = "";
		String sortQuery = "";            
		Map<String,Object> filterParam = new HashMap<String, Object>();
        GridBean gridBean = new GridBean();
        gridBean.setMethodName(pq_method);
        if(0 == pq_curpage) pq_curpage = 1;
        gridBean.setCurPage(pq_curpage);
        gridBean.setRpp(pq_rpp);
        if (pq_filter != null && pq_filter.length() > 0){
            Map filterMap = FilterHelper.deSerialize(pq_filter, formatDate);
            filterQuery = (String) filterMap.get("query");
            filterParam = (Map<String,Object>) filterMap.get("param");
            gridBean.setFilterQuery(filterQuery);
            gridBean.setFilterParam(filterParam);
        }
        if (pq_sort != null && pq_sort.length() > 0){                  
            sortQuery = SortHelper.deSerialize(pq_sort);
            gridBean.setSortQuery(sortQuery);
        }
        try {
        	methodServiceImpl.execMethodForGrid(gridBean);
		} catch (Exception e) {
			gridBean.setCode("500");
			gridBean.setMessage(e.getMessage());
		}
		
		return gridBean;
	}  
}

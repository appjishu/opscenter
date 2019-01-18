package com.appjishu.opscenter.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.appjishu.opscenter.grid.bean.GridBean;
import com.appjishu.opscenter.grid.service.GridService;

import lombok.extern.slf4j.Slf4j;


/**
 * 表格控件控制器
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月23日 上午11:15:39
 * @version v1.0
 */
@Controller
@Slf4j
public class GridController {
	@Autowired
	GridService gridServiceImpl; 
	
    @RequestMapping(value="/grid",method=RequestMethod.GET)  
    public @ResponseBody GridBean grid(
		@RequestParam(required=false) String pq_method, 
		@RequestParam(required=false) String pq_filter,
		@RequestParam(required=false) int pq_curpage,
		@RequestParam(required=false) int pq_rpp,
		@RequestParam(required=false) String pq_sort){
    	
        try {
        	return gridServiceImpl.gridMethod(pq_method, pq_filter, pq_curpage, pq_rpp, pq_sort);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
        return new GridBean();
        
    }    
}

package com.appjishu.dbcenter.grid.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class SortHelper {
    
    @SuppressWarnings("rawtypes")
	public static String deSerialize(String pq_sort){        
        List<Map> sorters = JSON.parseArray(pq_sort, Map.class);        
        List<String> columns = new ArrayList<String>();
        String sortby = "";
        for (Map sorter : sorters)
        {
            String dataIndx = (String) sorter.get("dataIndx");
            String dir = (String) sorter.get("dir");
            if (dir.equals("up")) {
                dir = "asc";
            } else {
                dir = "desc";
            }
            if (ColumnHelper.isValidColumn(dataIndx)) {
                columns.add(dataIndx + " " + dir);
            }            
        }

        if (columns.size() > 0) {       
            sortby = " order by " + stringJoin(", ", columns); 
        }
        return sortby;                
    }
    
    private static String stringJoin (String connector, List<String> list){
        String str = "";
        for(int i=0, len = list.size(); i< len; i++){                
            str += list.get(i);
            if(i<len-1){
                str += connector;
            }
        }
        return str;
    }    
}
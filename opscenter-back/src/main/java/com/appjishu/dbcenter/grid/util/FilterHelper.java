//FilterHelper.java
package com.appjishu.dbcenter.grid.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.alibaba.fastjson.JSON;


/**
 * 筛选条件功能
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月23日 下午1:00:58
 * @version v1.0
 */
public class FilterHelper {

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map deSerialize(String pq_filter, String formatDate) {
        Map filterObj = JSON.parseObject(pq_filter);
        List<Map> filters = JSON.parseArray(String.valueOf(filterObj.get("data")),Map.class);
        String mode = (String) filterObj.get("mode");
        List<String> fc = new ArrayList<String>();
        Map<String,Object> param = new HashMap<String, Object>();
        for (Map filter : filters) {
            String dataIndx = (String) filter.get("dataIndx");
            if (ColumnHelper.isValidColumn(dataIndx) == false) {
                continue;
            }
            String dataType = (String) filter.get("dataType");

            String value = "";
            String value2 = "";

            String condition = (String) filter.get("condition");

            if (condition.equals("range") == false) {
                value = (String) filter.get("value");
                value2 = (String) filter.get("value2");
                
                value = (value!=null)?value.trim():"";                
                value2 = (value2!=null)?value2.trim():"";
                
                if (dataType.equals("bool")) {
                    if (value.equals("true")) {
                        value = "1";
                    } else {
                        value = "0";
                    }
                }
                else if (dataType.equals("date")) {
                    if(value.length()>1){
                        value =  dateFormat(value, formatDate);
                    }
                    if(value2.length()>1){
                        value2 = dateFormat(value2, formatDate);
                    }
                }                            
            }
            if (condition.equals("contain")) {
                fc.add(dataIndx + " like :"+dataIndx);
                param.put(dataIndx, "%" + value + "%");
            } else if (condition.equals("notcontain")) {
                fc.add(dataIndx + " not like :"+dataIndx);
                param.put(dataIndx, "%" + value + "%");
            } else if (condition.equals("begin")) {
                fc.add(dataIndx + " like :"+dataIndx);
                param.put(dataIndx, value + "%");
            } else if (condition.equals("end")) {
                fc.add(dataIndx + " like :"+dataIndx);
                param.put(dataIndx, "%" + value);
            } else if (condition.equals("equal")) {
                fc.add(dataIndx + "= :"+dataIndx);
                param.put(dataIndx, value);
            } else if (condition.equals("notequal")) {
                fc.add(dataIndx + "!= :"+dataIndx);
                param.put(dataIndx, value);
            } else if (condition.equals("empty")) {
                fc.add("isnull(" + dataIndx + ",'')=''");
            } else if (condition.equals("notempty")) {
                fc.add("isnull(" + dataIndx + ",'')!=''");
            } else if (condition.equals("less")) {
                fc.add(dataIndx + "< :"+dataIndx);
                param.put(dataIndx, value);
            } else if (condition.equals("lte")) {
                fc.add(dataIndx + "<= :"+dataIndx);
                param.put(dataIndx, value);
            } else if (condition.equals("great")) {
                fc.add(dataIndx + "> :"+dataIndx);
                param.put(dataIndx, value);
            } else if (condition.equals("gte")) {
                fc.add(dataIndx + ">= :"+dataIndx);
                param.put(dataIndx, value);
            } else if (condition.equals("between")) {
                fc.add("(" + dataIndx + ">= :"+dataIndx+" AND " + dataIndx + "<= :"+dataIndx+"End )");
                param.put(dataIndx, value);
                param.put(dataIndx+"End", value2);
            } else if (condition.equals("range")) {
                List<Object> arrValue = (List<Object>) filter.get("value");
                List<String> fcRange = new ArrayList<String>();
                for (Object val : arrValue) {
                    String strVal = (String) val;                    
                    if (strVal == null || strVal.isEmpty()) {
                        continue;
                    }
                    strVal = strVal.trim();
                    if (dataType.equals("date")) {
                        strVal =  dateFormat(strVal, formatDate);
                    }                                                
                    fcRange.add(dataIndx + "= :"+dataIndx);
                    param.put(dataIndx, strVal);
                }
                if (fcRange.size() > 0) {
                    fc.add("(" + stringJoin(" OR ", fcRange) + ")");
                }
            }
        }
        String query = "";
        if (fc.size() > 0) {
            query = " where " + stringJoin(" " + mode + " ", fc);
        }
        
        Map ds = new HashMap();
        ds.put("query", query);
        ds.put("param", param);
        return ds;
    }
    private static String dateFormat(String strDate, String format) {
        String newStr ="";
        try {
            Date date = new SimpleDateFormat(format).parse(strDate);
            newStr = new SimpleDateFormat("yyyy-MM-dd").format(date);
        } catch (ParseException ex) {
            Logger.getLogger(FilterHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
        return newStr;
    }
    private static String stringJoin(String connector, List<String> list) {
        String str = "";
        for (int i = 0, len = list.size(); i < len; i++) {
            str += list.get(i);
            if (i < len - 1) {
                str += connector;
            }
        }
        return str;
    }
}
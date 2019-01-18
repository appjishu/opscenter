package com.appjishu.dbcenter.util;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResultSetUtil {
    public static List<Map<String, Object>> parseResultSetToMapList(ResultSet rs) {
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (null == rs)
            return null;
        try {
            while (rs.next()) {
                Map<String, Object> map = parseResultSetToMap(rs);
                // map.forEach((key, value) -> {
                // System.out.println(key + "：" + value);
                // });

                if (null != map) {
                    result.add(map);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 解析ResultSet的单条记录,不进行 ResultSet 的next移动处理
     * 
     * @param rs
     * @return
     */
    private static Map<String, Object> parseResultSetToMap(ResultSet rs) {
        if (null == rs)
            return null;
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            ResultSetMetaData meta = rs.getMetaData();
            int colNum = meta.getColumnCount();
            for (int i = 1; i <= colNum; i++) {
                // 列名
                String name = meta.getColumnLabel(i); // i+1
                Object value = rs.getObject(i);
                // 加入属性
                map.put(name, value);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        //
        return map;
    }
}

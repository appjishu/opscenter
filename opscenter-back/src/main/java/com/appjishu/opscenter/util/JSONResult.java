package com.appjishu.opscenter.util;

import net.sf.json.JSONObject;

public class JSONResult{
    public static String fillResultString(Integer status, String message, Object result){
        JSONObject jsonObject = new JSONObject();
        	jsonObject.put("status", status);
        	jsonObject.put("message", message);
        	jsonObject.put("result", result);

        return jsonObject.toString();
    }
}
package com.appjishu.dbcenter.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * cookies管理工具
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月1日 上午9:02:25
 * @version v1.0
 */
public class CookiesUtil {
    
    
	
	/**
     * 获取指定cookie值
     * @param request
     * @param name
     * @return String
     */
    public static String getCookieValueByName(HttpServletRequest request, String name) {
    	Cookie cookie = getCookieByName(request, name);
    	if (null != cookie) return cookie.getValue();
    	return null;
    }
	
    /**
     * 获取指定cookie
     * @param request
     * @param name
     * @return Cookie
     */
    public static Cookie getCookieByName(HttpServletRequest request, String name) {
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = (Cookie) cookieMap.get(name);
            return cookie;
        } else {
            return null;
        }
    }


    /**
     * 获取cookies Map
     * @param request
     * @return Map<String, Cookie>
     */
    private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }


    /**
     * 保存cookies
     * @param response
     * @param name
     * @param value
     * @param time
     * @return HttpServletResponse
     */
    public static HttpServletResponse setCookie(HttpServletResponse response, String name, String value,int expiry) {
        // new一个Cookie对象,键值对为参数
        Cookie cookie = new Cookie(name, value);
        // tomcat下多应用共享
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(expiry);
        // 如果cookie的值中含有中文时，需要对cookie进行编码，不然会产生乱码
        try {
            URLEncoder.encode(value, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        // 将Cookie添加到Response中,使之生效
        response.addCookie(cookie); // addCookie后，如果已经存在相同名字的cookie，则最新的覆盖旧的cookie
        return response;
    }
}
package com.appjishu.opscenter.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.appjishu.opscenter.jwt.TokenAuthentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月30日 上午9:21:22
 * @version v1.0
 */
@RestController
@RequestMapping(value = "/vue")
public class VueController {

    @PostMapping("init")
    public Map<String, Object> init(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        boolean loginStatus = false;
        Authentication authentication = TokenAuthentication.getAuthentication(request);
        if (null != authentication) {
            loginStatus = authentication.isAuthenticated();
        }
        map.put("loginStatus", loginStatus);
        return map;
    }

    @PostMapping("logout")
    public Map<String, Object> logout(HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        TokenAuthentication.removeAuthentication(response);
        map.put("code", 200);
        map.put("message", "用户注销成功 !");
        return map;
    }
}
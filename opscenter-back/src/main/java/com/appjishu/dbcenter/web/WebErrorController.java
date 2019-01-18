package com.appjishu.dbcenter.web;


import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class WebErrorController implements ErrorController {

	@RequestMapping("/error")
    public String handleError(HttpServletRequest request,ModelMap model){
        //获取statusCode:401,404,500
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("name", "开发工具");
		model.addAttribute("site", map);
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        log.error(String.valueOf(statusCode));
        if(statusCode == 401){
            return "401.html";
        }else if(statusCode == 403){
            return "403.html";
        }else if(statusCode == 404){
            return "404.html";
        }else{
            return "500.html";
        }
    }

	@Override
	public String getErrorPath() {
		return null;
	}
    
}

package com.appjishu.opscenter.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/sd")
@Controller
public class SdController{

    @GetMapping("xiaos")
    public String xiaos(){
        return "/sd/xiaos.html";
    }

    @GetMapping("demo")
    public String demo(){
        return "/sd/demo.html";
    }

}
package com.appjishu.opscenter.config;

import javax.servlet.Servlet;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

import com.bstek.ureport.console.UReportServlet;


@ImportResource("classpath:ureport-console-context.xml")
@Configuration
public class ServletRegistrationConfig {
	@Bean
	public ServletRegistrationBean<Servlet> buildUreportServlet(){
		return new ServletRegistrationBean<Servlet>(new UReportServlet(), "/ureport/*");
	}
	
}

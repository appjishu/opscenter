package com.appjishu.opscenter.config;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.appjishu.opscenter.jwt.CustomAuthenticationProvider;
import com.appjishu.opscenter.jwt.JWTAuthenticationFilter;
import com.appjishu.opscenter.jwt.JWTLoginFilter;


/**
 * 系统安全配置
 * @author  Dennie 495927@QQ.com
 * @date	 2018年9月25日 上午11:32:44
 * @version v1.0
 */
@Configuration
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    // 设置 HTTP 验证规则
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
//		List<Map<String,Object>> list = mysqlservice.queryNormal("userNQUERY", "{}");
//		System.out.println(list.size());
		http.formLogin()
			.loginPage("/app/login.html#/")
			.successForwardUrl("/homepage");
		http.authorizeRequests()
			//所有前端文件夹
			.antMatchers("/vue/**").permitAll()
			//所有样式文件夹
			.antMatchers("/skin/**").permitAll()
			//所有组件文件夹
			.antMatchers("/vue/**").permitAll()
			//所有前端文件夹
			.antMatchers("/app/**").permitAll()

	        .antMatchers("/loginpage").permitAll()
	        .antMatchers("/logoutpage").permitAll()
	        .antMatchers("/ureport/**").permitAll()
	        .antMatchers("/css/**").permitAll()
	        .antMatchers("/js/**").permitAll()
	        .antMatchers("/imgs/**").permitAll()
			.antMatchers("/vendor/**").permitAll()

	        .antMatchers("/index").hasRole("AUTH_UPDATE")
	        .anyRequest().authenticated();		
		
		http.headers().frameOptions().sameOrigin();
        // 关闭csrf验证
		http.csrf().disable()
                // 对请求进行认证
                .authorizeRequests()
				.antMatchers(HttpMethod.POST, "/login").permitAll()
				.antMatchers(HttpMethod.GET, "/login").permitAll()
                // 角色检测
                .antMatchers("/rest/query").hasRole("AUTH_QUERY")
                .antMatchers("/rest/get").hasRole("AUTH_GET")
                .antMatchers("/rest/insert").hasRole("AUTH_INSERT")
                .antMatchers("/rest/update").hasRole("AUTH_UPDATE")
                // 所有请求需要身份认证
				.anyRequest().authenticated()
            .and()
				// 添加一个过滤器 所有访问 /login 的请求交给 JWTLoginFilter 来处理 这个类处理所有的JWT相关内容
				.addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
				// 添加一个过滤器验证其他请求的Token是否合法
				.addFilterBefore(new JWTAuthenticationFilter(),
						UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 使用自定义身份验证组件
        auth.authenticationProvider(new CustomAuthenticationProvider());

    }

    @Bean
    public MappingJackson2HttpMessageConverter getMappingJackson2HttpMessageConverter() {
    	MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
    	//设置日期格式
    	ObjectMapper objectMapper = new ObjectMapper();
    	SimpleDateFormat smt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
    	objectMapper.setDateFormat(smt);
    	mappingJackson2HttpMessageConverter.setObjectMapper(objectMapper);
    	//设置中文编码格式
    	List<MediaType> list = new ArrayList<MediaType>();
    	list.add(MediaType.APPLICATION_JSON_UTF8);
    	list.add(MediaType.TEXT_HTML);
    	list.add(MediaType.APPLICATION_FORM_URLENCODED);
    	mappingJackson2HttpMessageConverter.setSupportedMediaTypes(list);
    	return mappingJackson2HttpMessageConverter;
    }
    
}
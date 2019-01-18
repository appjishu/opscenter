package com.appjishu.opscenter.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;


public class JWTAuthenticationFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, javax.servlet.FilterChain chain)
			throws IOException, ServletException {
		Authentication authentication = TokenAuthentication
                .getAuthentication((HttpServletRequest)request);
        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
        chain.doFilter(request,response);
	}
}
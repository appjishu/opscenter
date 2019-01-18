package com.appjishu.opscenter.rpt.service.impl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bstek.ureport.console.ServletAction;

public class ServletActionImpl implements ServletAction{

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int a= 0;
		a++;
	}

	@Override
	public String url() {
		return null;
	}

}

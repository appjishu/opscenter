package com.appjishu.opscenter.jwt;

import java.io.Serializable;


/**
 * 
 * @author  Dennie 495927@QQ.com
 * @date	 2018年9月24日 下午4:19:31
 * @version v1.0
 */
public class AccountCredentials implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
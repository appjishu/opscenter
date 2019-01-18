package com.appjishu.opscenter.jwt;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import com.appjishu.opscenter.util.CookiesUtil;
import com.appjishu.opscenter.util.JSONResult;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * JWT创建及验证类
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月1日 上午9:11:13
 * @version v1.0
 */
public class TokenAuthentication {
	static final long EXPIRATIONTIME = 432_000_000;     // 5天
	static final int EXPIRY = 5*24*60*60;
	static final String SECRET = "P@ssw02d";            // JWT密码
	static final String TOKEN_PREFIX = "Bearer";        // Token前缀
	static final String HEADER_STRING = "Authorization";// 存放Token的Header Key

	public static void removeAuthentication(HttpServletResponse response) {
		Cookie c1 = new Cookie(HEADER_STRING, null);
		c1.setPath("/");
    	response.addCookie(c1);
	}
	
	/**
	 * 创建JWT写入cookies并返回JSON
	 * @param response
	 * @param username
	 */
	public static void addAuthentication(HttpServletResponse response, String username) {
        // 生成JWT
		String JWT = Jwts.builder()
                // 保存权限（角色）
                .claim("authorities", "ROLE_ADMIN,AUTH_WRITE")
                // 用户名写入标题
                .setSubject(username)
                // 有效期设置
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                // 签名设置
				.signWith(SignatureAlgorithm.HS512, SECRET)
				.compact();
		// 将 JWT 写入 body
        try {
        	CookiesUtil.setCookie(response, HEADER_STRING, JWT, EXPIRY);
        	response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getOutputStream().println(JSONResult.fillResultString(0, "", JWT));
        } catch (IOException e) {
            e.printStackTrace();
        }
	}

	/**
	 * 根据JWT获取验证令牌
	 * @param request
	 * @return
	 */
	public static Authentication getAuthentication(HttpServletRequest request) {
        // 从Header中拿到token
        String token = request.getHeader(HEADER_STRING);
        if (StringUtils.isEmpty(token)) token = CookiesUtil.getCookieValueByName(request, HEADER_STRING);
		if (StringUtils.isEmpty(token)) return null;
        // 解析 Token
        Claims claims = Jwts.parser()
                // 验签
				.setSigningKey(SECRET)
                // 去掉 Bearer
				.parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
				.getBody();

        // 拿用户名
        String user = claims.getSubject();

        // 得到 权限（角色）
        List<GrantedAuthority> authorities =  AuthorityUtils.commaSeparatedStringToAuthorityList((String) claims.get("authorities"));

        // 返回验证令牌
        return user != null ?
				new UsernamePasswordAuthenticationToken(user, null, authorities) :
				null;
	}
	
}
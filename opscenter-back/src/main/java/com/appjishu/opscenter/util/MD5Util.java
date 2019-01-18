package com.appjishu.opscenter.util;

import java.security.MessageDigest;

/**
 * MD5加密工具
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月1日 下午12:30:08
 * @version v1.0
 */
public class MD5Util {
	
	/**
	 * 生成MD5字符串
	 * @param plainText
	 * @return
	 */
	public static String toMD5(String plainText) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			return buf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}

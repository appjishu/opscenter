package com.appjishu.opscenter.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class ReflectBeanUtil {
	private Connection connection;
	private PreparedStatement UserQuery;
	/* mysql url的连接字符串 */
//	private static String url = "jdbc:mysql://127.0.0.1:3306/test1?useUnicode=true&characterEncoding=utf-8&useOldAliasMetadataBehavior=true";
	private static String url = "jdbc:mysql://127.0.0.1:3306/ingrid?useUnicode=true&characterEncoding=utf-8&useOldAliasMetadataBehavior=true";
	// 账号
	private static String user = "root";
	// 密码
	private static String password = "lsm666999";
	private Vector<String> vector = new Vector<String>();
	// mysql jdbc的java包驱动字符串
	private String driverClassName = "com.mysql.jdbc.Driver";
	// 数据库中的表名
	String table = "e_task_result";
	// 数据库的列名称
	private String[] colnames; // 列名数组
	// 列名类型数组
	private String[] colTypes;

	public ReflectBeanUtil() {
		try {// 驱动注册
			Class.forName(driverClassName);
			if (connection == null || connection.isClosed())
				// 获得链接
				connection = DriverManager.getConnection(url, user, password);
		} catch (ClassNotFoundException ex) {
			ex.printStackTrace();
			System.out.println("Oh,not");
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Oh,not");
		}
	}

	public Connection getConnection() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}

	public void doAction() {
		String sql = "select * from " + table;
		try {
			PreparedStatement statement = connection.prepareStatement(sql);
			// 获取数据库的元数据
			ResultSetMetaData metadata = statement.getMetaData();
			// 数据库的字段个数
			int len = metadata.getColumnCount();
			// 字段名称
			colnames = new String[len + 1];
			// 字段类型 --->已经转化为java中的类名称了
			colTypes = new String[len + 1];
			for (int i = 1; i <= len; i++) {
				// System.out.println(metadata.getColumnName(i)+":"+metadata.getColumnTypeName(i)+":"+sqlType2JavaType(metadata.getColumnTypeName(i).toLowerCase())+":"+metadata.getColumnDisplaySize(i));
				// metadata.getColumnDisplaySize(i);
				colnames[i] = metadata.getColumnName(i); // 获取字段名称
				colTypes[i] = sqlType2JavaType(metadata.getColumnTypeName(i)); // 获取字段类型
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * sql类型转java类型
	 * 
	 * @param sqlType
	 * @return
	 */
	private String sqlType2JavaType(String sqlType) {
		if (sqlType.equalsIgnoreCase("bit")) {
			return "boolean";
		} else if (sqlType.equalsIgnoreCase("tinyint")) {
			return "byte";
		} else if (sqlType.equalsIgnoreCase("smallint")) {
			return "short";
		} else if (sqlType.equalsIgnoreCase("int")) {
			return "int";
		} else if (sqlType.equalsIgnoreCase("bigint")) {
			return "long";
		} else if (sqlType.equalsIgnoreCase("float")) {
			return "float";
		} else if (sqlType.equalsIgnoreCase("decimal") || sqlType.equalsIgnoreCase("numeric")
				|| sqlType.equalsIgnoreCase("real") || sqlType.equalsIgnoreCase("money")
				|| sqlType.equalsIgnoreCase("smallmoney")) {
			return "double";
		} else if (sqlType.equalsIgnoreCase("varchar") || sqlType.equalsIgnoreCase("char")
				|| sqlType.equalsIgnoreCase("nvarchar") || sqlType.equalsIgnoreCase("nchar")
				|| sqlType.equalsIgnoreCase("text")) {
			return "String";
		} else if (sqlType.equalsIgnoreCase("datetime") || sqlType.equalsIgnoreCase("date")) {
			return "Date";
		} else if (sqlType.equalsIgnoreCase("image")) {
			return "Blod";
		}
		return null;
	}

	/*
	 * 获取整个类的字符串并且输出为java文件
	 */
	public StringBuffer getClassStr() {
		// 输出的类字符串
		StringBuffer str = new StringBuffer("");
		// 获取表类型和表名的字段名
		this.doAction();
		// 校验
		if (null == colnames && null == colTypes)
			return null;
		// 拼接
		str.append("public class " + table + " {\r\n");
		// 拼接属性
		for (int index = 1; index < colnames.length; index++) {
			str.append(getAttrbuteString(colnames[index], colTypes[index]));
		}
		// 拼接get，Set方法
		for (int index = 1; index < colnames.length; index++) {
			str.append(getGetMethodString(colnames[index], colTypes[index]));
			str.append(getSetMethodString(colnames[index], colTypes[index]));
		}
		str.append("}\r\n");
		// 输出到文件中
		File file = new File(table + ".java");
		BufferedWriter write = null;

		try {
			write = new BufferedWriter(new FileWriter(file));
			write.write(str.toString());
			write.close();
		} catch (IOException e) {

			e.printStackTrace();
			if (write != null)
				try {
					write.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
		}
		return str;
	}

	/*
	 * 获取字段字符串
	 */
	public StringBuffer getAttrbuteString(String name, String type) {
		if (!check(name, type)) {
			System.out.println("类中有属性或者类型为空");
			return null;
		}
		;
		String format = String.format("    private %s %s;\n\r", new String[] { type, name });
		return new StringBuffer(format);
	}

	/*
	 * 校验name和type是否合法
	 */
	public boolean check(String name, String type) {
		if ("".equals(name) || name == null || name.trim().length() == 0) {
			return false;
		}
		if ("".equals(type) || type == null || type.trim().length() == 0) {
			return false;
		}
		return true;

	}

	/*
	 * 获取get方法字符串
	 */
	private StringBuffer getGetMethodString(String name, String type) {
		if (!check(name, type)) {
			System.out.println("类中有属性或者类型为空");
			return null;
		}
		;
		String Methodname = "get" + getHump(name);
		String format = String.format("    public %s %s(){\n\r", new Object[] { type, Methodname });
		format += String.format("        return this.%s;\r\n", new Object[] { name });
		format += "    }\r\n";
		return new StringBuffer(format);
	}

	private String getHump(String name) {
		name = name.trim();
		if (name.length() > 1) {
			name = name.substring(0, 1).toUpperCase() + name.substring(1);
		} else {
			name = name.toUpperCase();
		}
		return name;
	}

	/*
	 * 获取字段的get方法字符串
	 */
	private Object getSetMethodString(String name, String type) {
		if (!check(name, type)) {
			System.out.println("类中有属性或者类型为空");
			return null;
		}
		;
		String Methodname = "set" + getHump(name);
		String format = String.format("    public void %s(%s %s){\n\r", new Object[] { Methodname, type, name });
		format += String.format("        this.%s = %s;\r\n", new Object[] { name, name });
		format += "    }\r\n";
		return new StringBuffer(format);
	}

	public static void main(String[] args) {
		ReflectBeanUtil bean = new ReflectBeanUtil();
		System.err.println(bean.getClassStr());
	}

	// 将jsonString转化为hashmap
	public Map<String, Object> fromJson2Map(String jsonString) {
		Map jsonMap = JSON.parseObject(jsonString, HashMap.class);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		for (Iterator iter = jsonMap.keySet().iterator(); iter.hasNext();) {
			String key = (String) iter.next();
			if (jsonMap.get(key) instanceof JSONArray) {
				JSONArray jsonArray = (JSONArray) jsonMap.get(key);
				List list = handleJSONArray(jsonArray);
				resultMap.put(key, list);
			} else {
				resultMap.put(key, jsonMap.get(key));
			}
		}
		return resultMap;
	}

	public List<Map<String, Object>> handleJSONArray(JSONArray jsonArray) {
		List list = new ArrayList();
		for (Object object : jsonArray) {
			JSONObject jsonObject = (JSONObject) object;
			Map map = new HashMap<String, Object>();
			for (Map.Entry entry : jsonObject.entrySet()) {
				if (entry.getValue() instanceof JSONArray) {
					map.put((String) entry.getKey(), handleJSONArray((JSONArray) entry.getValue()));
				} else {
					map.put((String) entry.getKey(), entry.getValue());
				}
			}
			list.add(map);
		}
		return list;
	}

}

package com.appjishu.dbcenter.db.bean;

import java.util.List;
import java.util.Map;

public class TableBean {
	private String name;
	private String poolName;
	private String db;
	private String createTable;
	private List<Map<String, Object>> columns;

	/**
	 * 数据表名称
	 * 
	 * @return String
	 */
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 数据源
	 * 
	 * @return String
	 */
	public String getPoolName() {
		return poolName;
	}

	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}

	/**
	 * 数据库名称
	 * 
	 * @return String
	 */
	public String getDb() {
		return db;
	}

	public void setDb(String db) {
		this.db = db;
	}

	/**
	 * 字段列表
	 * 
	 * @return List<Map<String, Object>>
	 */
	public List<Map<String, Object>> getColumns() {
		return columns;
	}

	public void setColumns(List<Map<String, Object>> columns) {
		this.columns = columns;
	}

	public void setMysqlColumns(List<Map<String, Object>> columns) {
		this.columns = columns;
		StringBuffer createTableBuffer = new StringBuffer();
		createTableBuffer.append("-- drop table " + name + ";\r\n");
		createTableBuffer.append("create table " + name + "(\r\n");
		int size = columns.size();
		Object pri = null;
		StringBuffer uni = new StringBuffer();
		for (int i = 0; i < size; i++) {
			Map<String, Object> column = columns.get(i);
			createTableBuffer.append("    ");
			createTableBuffer.append(column.get("field"));
			createTableBuffer.append(" ");
			createTableBuffer.append(column.get("type"));

			if (null != column.get("defaultx")) {
				createTableBuffer.append(" ");
				createTableBuffer.append("default " + "'" + column.get("defaultx") + "'");
			}

			if ("NO".equals(String.valueOf(column.get("nullStatus")))) {
				createTableBuffer.append(" ");
				createTableBuffer.append("NOT NULL");
			}
			if ("auto_increment".equals(column.get("extra"))) {
				createTableBuffer.append(" ");
				createTableBuffer.append(column.get("extra"));
			}
			if (null != column.get("comment") && String.valueOf(column.get("comment")).length() > 0) {
				createTableBuffer.append(" ");
				createTableBuffer.append("comment");
				createTableBuffer.append(" '");
				createTableBuffer.append(column.get("comment"));
				createTableBuffer.append("'");
			}
			if ("PRI".equals(String.valueOf(column.get("keyx")))) {
				pri = String.valueOf(column.get("field"));
			}
			if ("UNI".equals(String.valueOf(column.get("keyx")))) {
				System.out.println(uni.length());
				if (uni.length() > 0)
					uni.append(",\r\n");
				uni.append("    ");
				uni.append("UNIQUE KEY ");
				uni.append(column.get("field"));
				uni.append(column.get(" "));
				uni.append(column.get("("));
				uni.append(column.get("field"));
				uni.append(column.get(")"));
			}
			if (i != size - 1) {
				createTableBuffer.append(",\r\n");
			}

		}
		if (pri != null) {
			createTableBuffer.append(",\r\n");
			createTableBuffer.append("    ");
			createTableBuffer.append("PRIMARY KEY (");
			createTableBuffer.append(pri);
			createTableBuffer.append(")");
		}
		if (uni.length() > 0) {
			createTableBuffer.append(",\r\n");
			createTableBuffer.append(uni);
		}
		createTableBuffer.append("\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;");
		this.createTable = createTableBuffer.toString();
	}

	public void setMssqlColumns(List<Map<String, Object>> columns) {
		this.columns = columns;
		StringBuffer createTableBuffer = new StringBuffer();
		createTableBuffer.append("-- drop table " + name + ";\r\n");
		createTableBuffer.append("create table " + name + "(\r\n");
		int size = columns.size();
		for (int i = 0; i < size; i++) {
			Map<String, Object> column = columns.get(i);
			createTableBuffer.append("    ");
			createTableBuffer.append(column.get("field"));
			createTableBuffer.append(" ");
			createTableBuffer.append(column.get("type"));
			if (null != column.get("defaultx") && (String.valueOf(column.get("defaultx")).contains("default"))) {
				createTableBuffer.append(" ");
				createTableBuffer.append(column.get("defaultx"));
			}

			if ("NO".equals(String.valueOf(column.get("nullStatus")))) {
				createTableBuffer.append(" ");
				createTableBuffer.append("NOT NULL");
			}
			if (null != column.get("extra") && (String.valueOf(column.get("extra")).contains("IDENTITY"))) {
				createTableBuffer.append(" ");
				createTableBuffer.append(column.get("extra"));
			}
			if (("PRIMARY KEY").equals(String.valueOf(column.get("keyx")))||("PRI").equals(String.valueOf(column.get("keyx")))) {
				column.put("keyx", "PRI");
				createTableBuffer.append(" ");
				createTableBuffer.append("PRIMARY KEY");
			}
			if ("UNIQUE".equals(String.valueOf(column.get("keyx")))||"UNI".equals(String.valueOf(column.get("keyx")))) {
				column.put("keyx", "UNI");
				createTableBuffer.append(" ");
				createTableBuffer.append("UNIQUE");
			}
			if (i != size - 1) {
				createTableBuffer.append(",\r\n");
			}

		}
		createTableBuffer.append("\r\n);");
		this.createTable = createTableBuffer.toString();
	}

	/**
	 * @return the createTable
	 */
	public String getCreateTable() {
		return createTable;
	}

	/**
	 * @param createTable the createTable to set
	 */
	public void setCreateTable(String createTable) {
		this.createTable = createTable;
	}

}

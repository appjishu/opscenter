package com.appjishu.dbcenter.file.bean;

import java.util.List;

public class ZtreeNodeBean {  
    private String id;  
    private String pid;  
    private String name;  
    private String Ename;  
    private boolean parent;  
    private String iconFlag;// 0：admin目录，1：工程目录，2：普通目录，3：叶子节点  
    private int size;  
    private List<ZtreeNodeBean> children;  
      
    public String getId() {  
        return id;  
    }  
    public void setId(String id) {  
        this.id = id;  
    }  
    public String getPid() {  
        return pid;  
    }  
    public void setPid(String pid) {  
        this.pid = pid;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
      
    public int getSize() {  
        return size;  
    }  
    public void setSize(int size) {  
        this.size = size;  
    }  
      
    public List<ZtreeNodeBean> getChildren() {  
        return children;  
    }  
    public void setChildren(List<ZtreeNodeBean> children) {  
        this.children = children;  
    }  
    public String getEname() {  
        return Ename;  
    }  
    public void setEname(String ename) {  
        Ename = ename;  
    }  
      
    public boolean isParent() {  
        return parent;  
    }  
    public void setParent(boolean parent) {  
        this.parent = parent;  
    }  
    public String getIconFlag() {  
        return iconFlag;  
    }  
    public void setIconFlag(String iconFlag) {  
        this.iconFlag = iconFlag;  
    }  
      
      
}  

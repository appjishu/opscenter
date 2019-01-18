package com.appjishu.dbcenter.db.bean;

public class ColumnBean {
    private String Field;
    private String Type;
    private String Null;
    private String Default;
    private String Comment;

    /**
     * @return the field
     */
    public String getField() {
        return Field;
    }

    /**
     * @return the comment
     */
    public String getComment() {
        return Comment;
    }

    /**
     * @param comment the comment to set
     */
    public void setComment(String comment) {
        this.Comment = comment;
    }

    /**
     * @return the default
     */
    public String getDefault() {
        return Default;
    }

    /**
     * @param default1 the default to set
     */
    public void setDefault(String default1) {
        this.Default = default1;
    }

    /**
     * @return the null
     */
    public String getNull() {
        return Null;
    }

    /**
     * @param null1 the null to set
     */
    public void setNull(String null1) {
        this.Null = null1;
    }

    /**
     * @return the type
     */
    public String getType() {
        return Type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.Type = type;
    }

    /**
     * @param field the field to set
     */
    public void setField(String field) {
        this.Field = field;
    }

}

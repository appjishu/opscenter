package com.appjishu.opscenter.db.mapper;

import java.util.List;

import com.appjishu.opscenter.db.bean.MethodBean;
import com.appjishu.opscenter.db.bean.MethodSqlBean;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.mapstruct.Mapper;

/**
 * 功能数据源接口 Dennie 2018-12-25
 */
@Mapper
public interface MethodMapper {
    /**
     * 获取指定功能
     */
    @Select("select methodId,methodName,document,poolName,outParam,sqlType,rsStatus from ingrid_method where methodName=#{methodName} and poolName=#{poolName}")
    public MethodBean selectMethodBean(String methodName, String poolName);

    /**
     * 获取指定数据源功能
     */
    @Select("select methodId,methodName,document,poolName,outParam,sqlType,rsStatus from ingrid_method where poolName=#{poolName}")
    public List<MethodBean> selectMethodBeanByPoolName(String poolName);

    /**
     * 获取指定功能内容
     */
    @Select("select methodId,line,content from ingrid_method_sql methodId=#{methodId}")
    public List<MethodSqlBean> selectMethodSqlBeanList(int methodId);

    /**
     * 插入功能
     */
    @Insert("insert ingrid_method(methodName,document,poolName,outParam,sqlType,rsStatus)values(#{methodBean.methodName},#{methodBean.document},#{methodBean.poolName},#{methodBean.outParam},#{methodBean.sqlType},#{methodBean.rsStatus})")
    @Options(useGeneratedKeys = true, keyProperty = "methodBean.methodId")
    public void insertMethodBean(@Param("method") MethodBean methodBean);

    /**
     * 更新功能
     */
    @Insert("update ingrid_method set methodName=#{methodBean.methodName},document=#{methodBean.document},poolName=#{methodBean.poolName},outParam=#{methodBean.outParam},sqlType=#{methodBean.sqlType},rsStatus=#{methodBean.rsStatus} WHERE methodId=#{methodBean.methodId}")
    public void updateMethodBean(@Param("method") MethodBean methodBean);

    /**
     * 批量插入SQL内容
     */
    @Insert({ "<script>", "insert ingrid_method_sql (methodId,line,content) values",
            "<foreach collection='methodSqlBeanList' item='item' index='index' separator=','>",
            "(#{methodSqlBeanList.methodId}, #{methodSqlBeanList.line}, #{methodSqlBeanList.content})", "</foreach>",
            "</script>" })
    public void insertMethodSqlBeanList(@Param(value = "methodSqlBeanList") List<MethodSqlBean> methodSqlBeanList);

    /**
     * 批量删除SQL内容
     */
    @Delete("delete from ingrid_method where methodId = #{methodId}")
    public void deleteMethodBeanById(int methodId);

    /**
     * 批量删除SQL内容
     */
    @Delete("delete from ingrid_method_sql where methodId = #{methodId}")
    public void deleteMethodSqlBeanById(int methodId);
}
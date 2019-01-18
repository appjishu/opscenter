package com.appjishu.dbcenter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ImportResource;

@EnableCaching
@ImportResource("classpath:context.xml")
@SpringBootApplication(exclude = {
        org.activiti.spring.boot.SecurityAutoConfiguration.class,
})
public class DBCenterApplication {
	public static void main(String[] args) {
		SpringApplication.run(DBCenterApplication.class, args);
	}
}

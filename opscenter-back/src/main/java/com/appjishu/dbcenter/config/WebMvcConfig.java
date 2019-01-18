package com.appjishu.dbcenter.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

 

/**
 * web资源配置
 * @author  Dennie 495927@QQ.com
 * @date	 2018年11月6日 下午3:21:18
 * @version v1.0
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {
    
//    @Value("${ruerp.img.path}")
//    private String imgPath;
 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
       registry.addResourceHandler("/**").addResourceLocations( "classpath:/static/");
//       registry.addResourceHandler("/upload/images/**").addResourceLocations(imgPath);
       registry.addResourceHandler("swagger-ui.html")
       .addResourceLocations("classpath:/META-INF/resources/");
       registry.addResourceHandler("/webjars/**")
       .addResourceLocations("classpath:/META-INF/resources/webjars/");
       super.addResourceHandlers(registry);
    }
 
}



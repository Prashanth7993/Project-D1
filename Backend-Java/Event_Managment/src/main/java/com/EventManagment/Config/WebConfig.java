package com.EventManagment.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Allow all endpoints
                .allowedOrigins("http://3.136.165.99:30007")  // React frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }

}

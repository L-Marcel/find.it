package com.find.it.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ImagesConfig implements WebMvcConfigurer {
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/users/**")
        .addResourceLocations("file:data/users/");
    registry.addResourceHandler("/items/**")
        .addResourceLocations("file:data/users/");
  }
}

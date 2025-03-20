package com.iforddow.league_management.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
* A class to configure the path prefix for the RestController
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /*
    * A method to configure the path prefix for the RestController
    *
    * @param configurer: PathMatchConfigurer
    * @return void
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("api", c -> c.isAnnotationPresent(RestController.class));
    }

}

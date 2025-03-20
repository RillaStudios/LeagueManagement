package com.iforddow.league_management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        System.out.println("Initializing CORS Configuration...");

        CorsConfiguration configuration = new CorsConfiguration();

        // Allow all origins (for development purposes)
        configuration.setAllowedOriginPatterns(List.of("*"));
        // Allow all HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // Allow these headers (adjust as needed)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        // Allow credentials (useful if you are using cookies)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply to all routes
        return source;
    }
}

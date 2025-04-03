package com.iforddow.league_management.config;

import com.iforddow.league_management.jwt.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

/*
* This class is responsible for configuring the security of the application.
* It defines the security filter chain and the security filter chain builder.
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    // The authentication provider
    private final AuthenticationProvider authenticationProvider;

    // The JWT authentication filter
    private final JwtAuthFilter jwtAuthFilter;

    // The logout handler
    private final LogoutHandler logoutHandler;

    // The CORS configuration source
    private final CorsConfigurationSource corsConfigurationSource;

    // The constructor
    @Autowired
    public SecurityConfig(AuthenticationProvider authenticationProvider, JwtAuthFilter jwtAuthFilter, LogoutHandler logoutHandler, CorsConfigurationSource corsConfigurationSource) {

        this.authenticationProvider = authenticationProvider;
        this.jwtAuthFilter = jwtAuthFilter;
        this.logoutHandler = logoutHandler;
        this.corsConfigurationSource = corsConfigurationSource;

    }

    /*
    * Security filter chain builder
    *
    * @param http The HttpSecurity object
    * @return The SecurityFilterChain object
    * @throws Exception
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    @Bean
    protected SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                // Disable CSRF
                .csrf(AbstractHttpConfigurer::disable)

                // Authorize requests
                .authorizeHttpRequests((requests) -> requests
                        .anyRequest().permitAll()
                )

                // Set session management
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))

                // Set authentication provider
                .authenticationProvider(authenticationProvider)

                // Add JWT authentication filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                // Set logout
                .logout(logout ->
                        logout.logoutUrl("/logout")

                                // Add logout handler
                                .addLogoutHandler(logoutHandler)

                                // Clear the security context
                                .logoutSuccessHandler((_, _, _) -> SecurityContextHolder.clearContext())
                );

        // Return the HttpSecurity object
        return http.build();
    }

}

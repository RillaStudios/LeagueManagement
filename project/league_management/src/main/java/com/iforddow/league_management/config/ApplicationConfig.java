package com.iforddow.league_management.config;

import com.iforddow.league_management.auditing.ApplicationAuditAware;
import com.iforddow.league_management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/*
* ApplicationConfig class
* This class is used to configure the application and
* provide beans for the application.
*
* @Author IFD
* @Since 2024-02-04
* */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    // UserRepository object
    private final UserRepository repository;

    /*
    * UserDetailsService method to provide user details
    * for the application.
    *
    * @return userDetailsService
    *
    * @Author IFD
    * @Since 2025-02-04
    * */
    @Bean
    public UserDetailsService userDetailsService() {
        return email -> repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /*
    * AuthenticationProvider method to provide authentication
    * for the application.
    *
    * @return authProvider
    *
    * @Author IFD
    * @Since 2025-02-04
    * */
    @Bean
    public AuthenticationProvider authenticationProvider() {

        // DaoAuthenticationProvider object
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        // Set userDetailsService and passwordEncoder
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        // Return authProvider
        return authProvider;
    }

    /*
    * AuditorAware method to provide auditing for the application.
    *
    * @return applicationAuditAware
    *
    * @Author IFD
    * @Since 2025-02-04
    * */
    @Bean
    public AuditorAware<Integer> auditorAware() {
        return new ApplicationAuditAware();
    }

    /*
    * AuthenticationManager method to provide authentication
    * manager for the application.
    *
    * @param config
    *
    * @return config.getAuthenticationManager()
    *
    * @Author IFD
    * @Since 2025-02-04
    * */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /*
    * PasswordEncoder method to provide password encoding
    * for the application.
    *
    * @return new BCryptPasswordEncoder()
    *
    * @Author IFD
    * @Since 2025-02-04
    * */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}

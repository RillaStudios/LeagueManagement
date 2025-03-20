package com.iforddow.league_management.service;

import com.iforddow.league_management.jpa.entity.Token;
import com.iforddow.league_management.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;


/*
* LogoutService class
*
* This class implements the LogoutHandler interface and provides a method
* to logout a user by setting the token to expired and revoked and clearing
* the security context.
*
* This code was largely lifted from https://github.com/ali-bouali/spring-boot-3-jwt-security/tree/main
*
* @Since 2025-02-04
* @Author Ali Bouali
*
* @Modified 2025-02-04
* @Modified by IFD
* */
@Slf4j
@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    // Inject the TokenRepository
    private final TokenRepository tokenRepository;

    /*
    * A method to logout a user by setting the token to expired and revoked
    * and clearing the security context. This method is called when a user
    * logs out of the application.
    *
    * @param request The HttpServletRequest object
    * @param response The HttpServletResponse object
    * @param authentication The Authentication object
    * */
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        // Get the Authorization header from the request
        final String authHeader = request.getHeader("Authorization");

        // Log the Authorization header
        log.debug("Logout request Authorization header: {}", authHeader);

        // Create a variable to store the JWT token
        final String jwt;

        // Check if the Authorization header is null or does not start with "Bearer "
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }

        // Extract the JWT token from the Authorization header
        jwt = authHeader.substring(7);

        // Log the extracted JWT token
        Token storedToken = tokenRepository.findByToken(jwt)
                .orElse(null);

        // Check if the stored token is not null
        if (storedToken != null) {

            // Set the stored token to expired and revoked
            storedToken.setExpired(true);
            storedToken.setRevoked(true);

            // Save the updated token
            tokenRepository.save(storedToken);


            log.info("Logged out user {}" , storedToken.getUser().getUsername());

            // Clear the security context
            SecurityContextHolder.clearContext();
            log.info("Security context cleared");

            // Set the authentication to null
            SecurityContextHolder.getContext().setAuthentication(null);
            log.info("Authentication set to null");

        }   else {

            log.info("Token not found");

        }
    }
}


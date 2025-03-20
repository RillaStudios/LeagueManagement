package com.iforddow.league_management.service.auth;

import com.iforddow.league_management.repository.TokenRepository;
import com.iforddow.league_management.service.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
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

    //Inject the JWTService
    private final JwtService jwtService;

    @Override
    @Transactional
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        String jwt = jwtService.extractToken(request);

        if (jwt == null) {
            log.warn("Logout attempt with missing or invalid Authorization header.");
            return;
        }

        // Find and revoke the token if present
        tokenRepository.findByToken(jwt).ifPresent(token -> {

            token.setExpired(true);
            token.setRevoked(true);

            tokenRepository.save(token);

            log.info("Logged out user: {}", token.getUser().getUsername());
        });

        // Clear security context
        SecurityContextHolder.clearContext();
        log.debug("Security context cleared.");
    }

}


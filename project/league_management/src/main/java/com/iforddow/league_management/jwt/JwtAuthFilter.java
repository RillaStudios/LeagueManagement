package com.iforddow.league_management.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iforddow.league_management.repository.TokenRepository;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.service.jwt.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/*
* JwtAuthFilter class
*
* This class is responsible for filtering the request and response
* for JWT authentication.
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    // Inject the JwtService
    private final JwtService jwtService;

    // Inject the UserDetailsService
    private final UserRepository userRepository;

    // Inject the TokenRepository
    private final TokenRepository tokenRepository;

    /*
    * Filter the request and response
    *
    * @param request the HTTP request
    * @param response the HTTP response
    * @param filterChain the filter chain
    *
    * @throws ServletException if an error occurs
    * @throws IOException if an error occurs
    *
    * @return void
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Auth header string
        final String authHeader = request.getHeader("Authorization");

        // Create variables to store JWT and username
        final String jwt;
        final String username;

        // If the auth header is null or does not start with "Bearer ", continue to the next filter
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract the JWT from the auth header
        jwt = authHeader.substring(7);

        // Extract the username from the JWT
        try {

            // Extract the username from the JWT
            username = jwtService.extractEmail(jwt);

        } catch (JwtException e) {

            // Set the response status to unauthorized
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            // Set the response content type to JSON
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            final Map<String, Object> body = new HashMap<>();

            body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
            body.put("error", "Unauthorized");
            body.put("message", e.getMessage());
            body.put("path", request.getServletPath());

            final ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(response.getOutputStream(), body);

            // Return
            return;
        }

        // If the username is not null and the SecurityContext authentication is null
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Load the user details by username
            UserDetails userDetails = userRepository.findByEmailWithRoles(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Check if the token is valid
            boolean isTokenValid = tokenRepository.findByToken(jwt)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);

            // If the token is valid, set the SecurityContext authentication
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {

                // Create an authentication token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                // Set the authentication token details
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Set the SecurityContext authentication
                log.debug("Setting SecurityContext authentication: {}", authToken);

                // Set the SecurityContext authentication
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue to the next filter
        filterChain.doFilter(request, response);
    }
}

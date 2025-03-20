package com.iforddow.league_management.service;

import com.iforddow.league_management.auth.AuthRequest;
import com.iforddow.league_management.auth.RegisterRequest;
import com.iforddow.league_management.jpa.entity.permissions.Role;
import com.iforddow.league_management.jpa.entity.Token;
import com.iforddow.league_management.repository.permissions.RoleRepository;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.service.jwt.JwtService;
import com.iforddow.league_management.utils.TokenType;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

/*
* AuthService class
* This class is used to handle the authentication of the user,
* it is used to register a new user, authenticate a user, and refresh the token of a user.
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Service
@RequiredArgsConstructor
public class AuthService {

    // UserRepository object
    private final UserRepository repository;

    // TokenRepository object
    private final TokenRepository tokenRepository;

    // PasswordEncoder object
    private final PasswordEncoder passwordEncoder;

    // JwtService object
    private final JwtService jwtService;

    // AuthenticationManager object
    private final AuthenticationManager authenticationManager;

    // RoleRepository object
    private final RoleRepository roleRepository;

    /*
    * A method to register a new user
    *
    * @param request: RegisterRequest object
    *
    * @return AuthResponse object
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public ResponseEntity<?> register(RegisterRequest request) {

        // Try to register a new user
        try {

            Role userRole = roleRepository.findByRoleName("USER")
                    .orElseThrow(() -> new RuntimeException("User Role not found"));

            User user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .accountEnabled(true)
                    .accountExpired(false)
                    .accountLocked(false)
                    .credentialsExpired(false)
                    .roles(Set.of(userRole))
                    .build();

            User savedUser = repository.save(user);

            String jwtToken = jwtService.generateToken(user);

            String refreshToken = jwtService.generateRefreshToken(user);

            saveUserToken(savedUser, jwtToken);

            // Create a response body
            Map<String, Object> responseBody = Map.of(
                    "message", "User registered successfully",
                    "userId", savedUser.getId(),
                    "accessToken", jwtToken,
                    "refreshToken", refreshToken
            );

            return ResponseEntity.ok(responseBody);

        } catch (RuntimeException e) {

            // Create a response body
            Map<String, Object> responseBody = Map.of(
                    "message", "User registration failed due to " + e.getMessage()
            );

            // Return a bad request
            return ResponseEntity.badRequest().body(responseBody);

        }

    }

    /*
    * A method to authenticate a user
    * This method is used to authenticate a user and generate a token for the user
    * and save the token in the database.
    *
    * @param request: AuthRequest object
    *
    * @return AuthResponse object
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public ResponseEntity<?> authenticate(AuthRequest request) {

        try {

            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // Get the user from the database
            User user = repository.findByEmail(request.getEmail())
                    .orElseThrow();

            // Generate the token for the user
            String jwtToken = jwtService.generateToken(user);

            // Generate the refresh token for the user
            String refreshToken = jwtService.generateRefreshToken(user);

            // Revoke all the user tokens
            revokeAllUserTokens(user);

            // Save the token in the database
            saveUserToken(user, jwtToken);

            // Create a response body
            Map<String, Object> responseBody = Map.of(
                    "message", "User signed in successfully",
                    "email", user.getEmail(),
                    "accessToken", jwtToken,
                    "refreshToken", refreshToken,
                    "roles", user.getRoles()
            );

            // Return the AuthResponse object
            return ResponseEntity.ok(responseBody);

        } catch (AuthenticationException e) {

            // Create a response body
            Map<String, Object> responseBody = Map.of(
                    "message", "Unable to authenticate user due to " + e.getMessage()
            );

            // Return a bad request
            return ResponseEntity.badRequest().body(responseBody);

        }
    }

    /*
    * Save the user token in the database
    *
    * @param user: User object
    * @param jwtToken: String
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private void saveUserToken(User user, String jwtToken) {

        // Try to save the user token in the database
        try {

            // Create a new Token object
            Token token = Token.builder()
                    .user(user)
                    .token(jwtToken)
                    .tokenType(TokenType.BEARER)
                    .expired(false)
                    .revoked(false)
                    .build();

            // Save the token in the database
            tokenRepository.save(token);

        } catch (Exception e) {

            // Throw a runtime exception
            throw new RuntimeException(e);

        }
    }

    /*
    * Revoke all the user tokens
    *
    * @param user: User object
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private void revokeAllUserTokens(User user) {

        // Try to revoke all the user tokens
        try {
            // Get all the valid user tokens
            List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());

            // If there are no valid user tokens, return
            if (validUserTokens.isEmpty())
                return;

            // Revoke all the user tokens
            validUserTokens.forEach(token -> {
                token.setExpired(true);
                token.setRevoked(true);
            });

            // Save the user tokens in the database
            tokenRepository.saveAll(validUserTokens);
        } catch (Exception e) {

            // Throw a runtime exception
            throw new RuntimeException(e);

        }
    }

    /*
    * Refresh the token of a user. This is useful when the token of a user expires.
    * This method is used to generate a new token for the user and save it in the database.
    *
    * @param request: HttpServletRequest object
    * @param response: HttpServletResponse object
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {

        // Try to refresh the token
        try {

            // Get the Authorization header from the request
            final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

            // Initialize the refreshToken and userEmail
            final String refreshToken;
            final String userEmail;

            // If the Authorization header is null or does not start with "Bearer ", return
            if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            // Get the refreshToken from the Authorization header
            refreshToken = authHeader.substring(7);

            // Extract the username from the refreshToken
            userEmail = jwtService.extractEmail(refreshToken);

            // If the username is not null, get the user from the database
            if (userEmail != null) {

                // Get the user from the database
                User user = this.repository.findByEmail(userEmail)
                        .orElseThrow();

                // Check if the refreshToken is valid
                if (jwtService.isTokenValid(refreshToken, user)) {

                    // Generate a new token for the user
                    String accessToken = jwtService.generateToken(user);

                    // Revoke all the user tokens
                    revokeAllUserTokens(user);

                    // Save the new token in the database
                    saveUserToken(user, accessToken);

                    // Create a response body
                    Map<String, Object> authResponse = Map.of(
                            "message", "Token refreshed successfully",
                            "accessToken", accessToken,
                            "refreshToken", refreshToken
                    );

                    // Return the AuthResponse object
                    return ResponseEntity.ok(authResponse);

                }   else {

                    // Create a response body
                    Map<String, Object> responseBody = Map.of(
                            "message", "Invalid token"
                    );

                    // Return a bad request
                    return ResponseEntity.badRequest().body(responseBody);

                }
            }   else {

                // Create a response body
                Map<String, Object> responseBody = Map.of(
                        "message", "Invalid token"
                );

                // Return a bad request
                return ResponseEntity.badRequest().body(responseBody);

            }
        } catch (Exception e) {

            // Create a response body
            Map<String, Object> responseBody = Map.of(
                    "message", "Unable to refresh token due to " + e.getMessage()
            );

            return ResponseEntity.badRequest().body(responseBody);

        }

    }
}

package com.iforddow.league_management.service.auth;

import com.iforddow.league_management.dto.TokenDTO;
import com.iforddow.league_management.exception.*;
import com.iforddow.league_management.requests.auth.AuthRequest;
import com.iforddow.league_management.requests.auth.RegisterRequest;
import com.iforddow.league_management.jpa.entity.permissions.Role;
import com.iforddow.league_management.jpa.entity.Token;
import com.iforddow.league_management.repository.permissions.RoleRepository;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.service.jwt.JwtService;
import com.iforddow.league_management.utils.TokenType;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.repository.TokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
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
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    @Value("${spring.app.production}")
    private Boolean production;

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
    * CREATE METHOD (User)
    *
    * @param request: RegisterRequest object
    *
    * @return AuthResponse object
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    @Transactional
    public ResponseEntity<?> register(RegisterRequest request, HttpServletResponse response) {

        Optional<User> existingUser = repository.findByEmail(request.getEmail());

        if(existingUser.isPresent()) {
            throw new ResourceAlreadyExistsException("A user with this email already exists.");
        }

        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new ResourceNotFoundException("Could not find appropriate role for permissions."));

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

        // Set the refresh token as an httpOnly cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(production);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        refreshTokenCookie.setAttribute("SameSite", "None");

        response.addCookie(refreshTokenCookie);

        // Create a response body
        TokenDTO token = new TokenDTO(jwtToken);

        return ResponseEntity.ok(token);

    }

    /*
    * A method to authenticate a user
    * This method is used to authenticate a user and generate a token for the user
    * and save the token in the database.
    *
    * CREATE METHOD (Token)
    *
    * @param request: AuthRequest object
    *
    * @return AuthResponse object
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    @Transactional
    public ResponseEntity<TokenDTO> authenticate(AuthRequest request, HttpServletResponse response) {

        // Get the user from the database
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new
                        ResourceNotFoundException("An account with email "
                        + request.getEmail()
                        + " was not found."));

        // Authenticate the user
        authenticateUser(request);

        // Generate the token for the user
        String jwtToken = jwtService.generateToken(user);

        // Generate the refresh token for the user
        String refreshToken = jwtService.generateRefreshToken(user);

        // Revoke all the user tokens
        revokeAllUserTokens(user);

        // Save the token in the database
        saveUserToken(user, jwtToken);

        // Set the refresh token as an httpOnly cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(production);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        refreshTokenCookie.setAttribute("SameSite", "None");

        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(new TokenDTO(jwtToken));

    }

    /*
     * Refresh the token of a user. This is useful when the token of a user expires.
     * This method is used to generate a new token for the user and save it in the database.
     *
     * CREATE METHOD (Token)
     *
     * @param request: HttpServletRequest object
     * @param response: HttpServletResponse object
     *
     * @Author: IFD
     * @Since: 2025-02-04
     * */
    @Transactional
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {

        String refreshToken = extractRefreshTokenFromCookies(request);

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new NoContentException("Refresh token not found. Please login again.");
        }

        String userEmail = jwtService.extractEmail(refreshToken);

        if (userEmail == null) {
            throw  new GeneralException("Could not extract user from token. Please login again.");
        }

        User user = repository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("A user with email " + userEmail + " was not found."));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new GeneralException("The refresh token provided was invalid. Please login again.");
        }

        // Generate new access token
        String accessToken = jwtService.generateToken(user);

        // Revoke old tokens and save the new one
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        // Return successful response
        return ResponseEntity.ok(new TokenDTO(accessToken));
    }


    public ResponseEntity<?> logout(HttpServletResponse response) {

        try {

            Cookie refreshTokenCookie = new Cookie("refreshToken", "");
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(production);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(0);
            refreshTokenCookie.setAttribute("SameSite", "None");

            response.addCookie(refreshTokenCookie);

            return ResponseEntity.ok("Logged out successfully");

        } catch (Exception e) {

            throw new GeneralException("An error occurred while logging out");

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
    @Transactional
    public void saveUserToken(User user, String jwtToken) {

        // Create a new Token object
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(token);

    }

    /*
     * Revoke all the user tokens
     *
     * @param user: User object
     *
     * @Author: IFD
     * @Since: 2025-02-04
     * */
    @Transactional
    public void revokeAllUserTokens(User user) {

        // Directly perform the batch update to revoke tokens
        int updatedTokensCount = tokenRepository.revokeTokensByUser(user.getId());

        // If no tokens were updated, log that there were no tokens to revoke
        if (updatedTokensCount == 0) {
            log.info("No valid tokens found for user {}", user.getEmail());
            return;
        }

        // Log the result of the token revocation
        log.info("Successfully revoked {} valid tokens for user {}", updatedTokensCount, user.getEmail());

    }

    /*
    * Authenticate the user
    *
    * @param request: AuthRequest object
    *
    * @Author: IFD
    * @Since: 2025-02-09
    * */
    private void authenticateUser(AuthRequest request) {

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

        } catch (AuthenticationException e) {

            throw new AuthenticationFailedException("The password entered is incorrect.");

        }

    }

    /*
    * A method to extract the refresh token from a cookie
    *
    * @param request: HttpServletRequest object
    *
    * @Author: IFD
    * @Since: 2025-02-25
    * */
    private String extractRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;

        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

}

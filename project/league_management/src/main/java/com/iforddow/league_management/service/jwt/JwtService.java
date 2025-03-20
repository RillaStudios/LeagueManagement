package com.iforddow.league_management.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/*
* JwtService class is responsible for generating and validating JWT tokens.
* It uses the secret key and expiration time defined in the application.properties file.
* It also provides methods to extract claims from a token and generate a new token.
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Service
public class JwtService {

    // Injecting the secret key from the application.properties file
    @Value("${spring.app.jwtSecret}")
    private String secretKey;

    // Injecting the expiration time from the application.properties file
    @Value("${spring.app.jwtExpirationMs}")
    private long jwtExpiration;

    // Injecting the refresh token expiration time from the application.properties file
    @Value("${spring.app.refreshExpiration}")
    private long refreshExpiration;

    /*
    * Extracts the username from the token.
    *
    * @param token The JWT token
    * @return The username extracted from the token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public String extractEmail(String token) {

        // Extract the subject from the token
        return extractClaim(token, Claims::getSubject);

    }

    /*
    * Extracts a claim from the token using the provided claims resolver.
    * The claims resolver is a function that takes a Claims object and returns a value of type T.
    * This method is used to extract any claim from the token.
    *
    * @param token The JWT token
    * @param claimsResolver The function to resolve the claim
    * @return The claim extracted from the token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

        // Extract all claims from the token
        final Claims claims = extractAllClaims(token);

        // Apply the claims resolver function to extract the desired claim
        return claimsResolver.apply(claims);

    }

    /*
    * A utility method to generate a new JWT token for the given user details.
    * The token is signed using the secret key and has an expiration time.
    * The extra claims can be provided as a map to include additional information in the token.
    * This method is used to generate access tokens.
    *
    * @param userDetails The user details for which the token is generated
    * @return The generated JWT token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public String generateToken(UserDetails userDetails) {

        // Generate a token with no extra claims
        return generateToken(new HashMap<>(), userDetails);

    }

    /*
    * A utility method to generate a new JWT token for the given user details.
    * The token is signed using the secret key and has an expiration time.
    * The extra claims can be provided as a map to include additional information in the token.
    * This method is used to generate access tokens.
    *
    * @param extraClaims The extra claims to include in the token
    * @param userDetails The user details for which the token is generated
    * @return The generated JWT token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        // Build the token with the extra claims and user details
        return buildToken(extraClaims, userDetails, jwtExpiration);

    }

    /*
    * Generates a new refresh token for the given user details.
    * The refresh token is signed using the secret key and has an expiration time.
    * This method is used to generate refresh tokens.
    *
    * @param userDetails The user details for which the token is generated
    * @return The generated refresh token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public String generateRefreshToken(UserDetails userDetails) {

        // Create extra claims for the refresh token
        Map<String, Object> extraClaims = new HashMap<>();

        // Add a type claim to identify the token as a refresh token
        extraClaims.put("type", "refresh");

        // Build the refresh token with the extra claims and user details
        return buildToken(extraClaims, userDetails, refreshExpiration);

    }

    /*
    * A utility method to build a JWT token with the given claims, user details, and expiration time.
    * The token is signed using the secret key.
    *
    * @param extraClaims The extra claims to include in the token
    * @param userDetails The user details for which the token is generated
    * @param expiration The expiration time for the token
    * @return The generated JWT token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private String buildToken(
            Map<String, Object> extraClaims, UserDetails userDetails, long expiration
    ) {

        // Build the token with the extra claims, user details, and expiration time
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /*
    * Checks if the given token is valid for the provided user details.
    * The token is considered valid if it has not expired and the username matches the user details.
    * This method is used to validate access tokens.
    *
    * @param token The JWT token to validate
    * @param userDetails The user details to validate against
    * @return true if the token is valid, false otherwise
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    public boolean isTokenValid(String token, UserDetails userDetails) {

        // Extract the username from the token
        final String username = extractEmail(token);

        // Check if the username matches the user details and the token has not expired
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);

    }

    /*
    * Checks if the given token has expired.
    *
    * @param token The JWT token to check
    * @return true if the token has expired, false otherwise
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private boolean isTokenExpired(String token) {

        // Extract the expiration date from the token and check if it is before the current date
        return extractExpiration(token).before(new Date());

    }

    /*
    * Extracts the expiration date from the token.
    *
    * @param token The JWT token
    * @return The expiration date extracted from the token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private Date extractExpiration(String token) {

        // Extract the expiration claim from the token
        return extractClaim(token, Claims::getExpiration);

    }

    /*
    * Creates a Claims object from the given token.
    * The Claims object contains all the claims extracted from the token.
    *
    * @param token The JWT token
    * @return The Claims object containing all the claims from the token
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private Claims extractAllClaims(String token) {

        // Parse the token and extract all claims
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    /*
    * A utility method to get the signing key used to sign the JWT tokens.
    * The signing key is derived from the secret key defined in the application.properties file.
    * This method is used to create the signing key for the JWT tokens.
    *
    * @return The signing key used to sign the JWT tokens
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    private Key getSignInKey() {

        // Decode the secret key from Base64 and create an HMAC key
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);

        // Return the HMAC key for signing the JWT tokens
        return Keys.hmacShaKeyFor(keyBytes);

    }
}

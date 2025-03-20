package com.iforddow.league_management.controller;

import com.iforddow.league_management.dto.TokenDTO;
import com.iforddow.league_management.requests.auth.AuthRequest;
import com.iforddow.league_management.requests.auth.RegisterRequest;
import com.iforddow.league_management.service.auth.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/*
* A controller class that handles the authentication requests
*
* @Author: IFD
* @Since: 2025-02-07
* */
@RestController
@RequiredArgsConstructor
public class AuthController {

    // The AuthService class is autowired to this class
    private final AuthService authService;

    /*
    * A method that handles the registration request
    *
    * @param request: The request body that contains the user's information
    * @return ResponseEntity: The response entity that contains the response message
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletResponse response) {

        return authService.register(request, response);

    }

    /*
    * A method that handles the authentication request (login)
    *
    * @param request: The request body that contains the user's information
    * @return ResponseEntity: The response entity that contains the response message
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> authenticate(@RequestBody AuthRequest authRequest, HttpServletResponse response) {

        return authService.authenticate(authRequest, response);

    }

    /*
    * A method that handles the refresh token request
    *
    * @param request: The request object that contains the refresh token
    * @return ResponseEntity: The response entity that contains the response message
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {

        return authService.refreshToken(request);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        return authService.logout(response);

    }


}


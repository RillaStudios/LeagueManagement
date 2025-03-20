package com.iforddow.league_management.requests.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* A class to represent the request body for the registration endpoint
*
* @param username the username of the user
* @param firstName the first name of the user
* @param lastName the last name of the user
* @param password the password of the user
* @return a RegisterRequest object
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    // The username of the user
    private String email;

    // The password of the user
    private String password;

}

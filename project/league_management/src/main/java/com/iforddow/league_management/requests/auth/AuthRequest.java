package com.iforddow.league_management.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/*
* Class to hold the request body for the authentication endpoint.
*
* @param username: The username of the user.
* @param password: The password of the user.
*
* @Author: IFD
* @Since: 2024-02-04
*/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    // The username of the user.
    private String email;

    // The password of the user.
    private String password;

}

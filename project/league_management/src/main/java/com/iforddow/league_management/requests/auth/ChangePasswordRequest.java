package com.iforddow.league_management.requests.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* A class to represent the request body for changing password
*
* @param currentPassword: the current password of the user
* @param newPassword: the new password of the user
* @param confirmationPassword: the confirmation password of the user
* @return ChangePasswordRequest object
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {

    // The current password of the user
    private String currentPassword;

    // The new password of the user
    private String newPassword;

    // The confirmation password of the user
    private String confirmationPassword;
    
}

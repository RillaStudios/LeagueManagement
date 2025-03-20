package com.iforddow.league_management.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* A class to represent the request body for creating a role
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleRequest {

    // The name of the role
    private String roleName;

    // The description of the role
    private String roleDescription;

}

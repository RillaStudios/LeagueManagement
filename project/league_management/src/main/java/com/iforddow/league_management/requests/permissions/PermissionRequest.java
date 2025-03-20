package com.iforddow.league_management.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* A class to represent the request body for creating a permission
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermissionRequest {

    // The name of the permission
    private String permissionName;

    // The description of the permission
    private String permissionDescription;

}

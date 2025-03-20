package com.iforddow.league_management.dto.permissions;

import com.iforddow.league_management.jpa.entity.permissions.Permission;

public record PermissionDTO(Integer id, String name, String description) {

    public PermissionDTO(Permission permission) {
        this(permission.getId(), permission.getPermissionName(), permission.getPermissionDesc());
    }

}

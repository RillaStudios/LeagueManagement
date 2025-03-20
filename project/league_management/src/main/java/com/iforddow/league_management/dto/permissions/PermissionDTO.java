package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.permissions.Permission;

public record PermissionDTO(Long id, String name, String description) {

    public PermissionDTO(Permission permission) {
        this(permission.getId(), permission.getPermissionName(), permission.getPermissionDesc());
    }

}
